import axios from 'axios';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import cardHTML from '../tamlates/gallery-card.hbs';
import { refs } from './refs-homepage';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getFilmCardsBySearch, isSubmitActiv } from './search';

// const gallery = document.querySelector('.main');
document.addEventListener('DOMContentLoaded', contentLoad);

export const options = {
  totalItems: 20000,
  itemsPerPage: 20,
  visiblePages: 10,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
};

export const trendPagination = new Pagination(refs.container, options);

trendPagination.on('afterMove', eventData => {
  options.page = eventData.page;

  console.log(isSubmitActiv);
  if (isSubmitActiv === true) {
    getFilmCardsBySearch(options.page);
    return;
  }
  contentLoad();
});

// -------------------Збірна функуція при завантаженні сторінки-----------------------------------------------------------------

async function contentLoad() {
  refs.gallery.innerHTML = '';
  refs.spinner.classList.remove('hidden');
  try {
    const arrCards = await fetchMovieCard();
    await fetchGenreIds();
    appendCardMarkup(arrCards);
    refs.spinner.classList.add('hidden');
  } catch (error) {
    Notify.failure(error.message);
    return;
  }
}

// ----------------Запит на бекенд за трендами---------------------------
async function fetchMovieCard() {
  const res = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=9cda16d98a6e510af2decf0d66e8e7d5&page=${options.page}`
  );
  return res.data;
}

// ---------------Запит на бекенд за списком жанрів та запис на SessionStorage-------------------
async function fetchGenreIds() {
  if (sessionStorage.getItem('genres') !== null) {
    return;
  }
  const arrGenres = await axios.get(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=9cda16d98a6e510af2decf0d66e8e7d5'
  );

  sessionStorage.setItem('genres', JSON.stringify(arrGenres.data.genres));
}

// -------------Створення нового массиву з зміненими данними і рендер карток---------
export function appendCardMarkup(arrCards) {
  const newArrCard = arrCards.results.map(result => {
    return {
      ...result,
      release_date: result.release_date.slice(0, 4),
      vote_average: result.vote_average.toFixed(1),
      genre_names: result.genre_ids.map(id => definitionGenre(id)).join(', '),
    };
  });

  refs.gallery.insertAdjacentHTML('beforeend', cardHTML(newArrCard));
}

export function definitionGenre(id) {
  const listAllGenres = JSON.parse(sessionStorage.getItem('genres'));
  const searchedGenre = listAllGenres.find(genre => genre.id === id);

  return searchedGenre.name;
}
