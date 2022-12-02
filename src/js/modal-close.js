'use strict';
import axios from 'axios';
import { fetchMovieBuId } from './fatch-movie-by-id';
import createModalMurkupById from '../tamlates/modal.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { definitionGenre } from './trends';
import { addSelectedWatched } from './local-storage';
import { addSelectedQueue } from './local-storage';
import * as basicLightbox from 'basiclightbox';
const refs = {
  btnAddWatched: null,
  btnAddQueue: null,
  btnCloseEl: null,
  backdropEl: document.querySelector('.backdrop'),
  galleryEl: document.querySelector('.gallery'),
};
let instance;
async function fetchAndCreateTrailer(id) {
  const responseWithVideo = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=9cda16d98a6e510af2decf0d66e8e7d5&language=en-US`
  );

  instance = basicLightbox.create(
    `
  <iframe class='iframe' width="560" height="315" src="https://www.youtube.com/embed/${responseWithVideo.data.results[0].key}" frameborder="0" allowfullscreen></iframe>
`
  );
  instance.show();
}
// const instance = basicLightbox.create(
//   `
//   <iframe class='iframe' width="560" height="315" src="https://www.youtube.com/embed/${some}" frameborder="0" allowfullscreen></iframe>
// `
// );
async function onGalleryClick(e) {
  const item = e.target.closest('.gallery_card');
  const idMovie = item.dataset.id;

  if (!item) {
    return;
  }

  try {
    const response = await fetchMovieBuId(idMovie);
    gangePropertiesOfMovie(response);
    console.log(response.data);

    refs.backdropEl.innerHTML = createModalMurkupById(response.data);
  } catch (error) {
    Notify.failure(error.message);
    return;
  }

  refs.backdropEl.classList.remove('visually-hidden');

  refs.btnCloseEl = document.querySelector('.modal__btn-close');
  refs.btnAddWatched = document.querySelector('.btn-add-watched');
  refs.btnAddQueue = document.querySelector('.btn-add-queue');
  refs.btnTrailer = document.querySelector('.btn-trailer');

  refs.btnCloseEl.addEventListener('click', closeModal);

  document.addEventListener('keydown', onEscDown);

  refs.backdropEl.addEventListener('click', onBackdropClick);

  refs.btnAddWatched.addEventListener('click', addSelectedWatched);
  refs.btnAddQueue.addEventListener('click', addSelectedQueue);

  refs.btnTrailer.addEventListener('click', async e => {
    const imgSelected = document.querySelector('.modal__img');
    const idMovie = imgSelected.dataset.id;

    console.log(idMovie);
    await fetchAndCreateTrailer(idMovie);
  });
}

function closeModal() {
  document.removeEventListener('keydown', onEscDown);
  refs.backdropEl.removeEventListener('click', onBackdropClick);
  refs.btnCloseEl.removeEventListener('click', closeModal);
  refs.backdropEl.classList.add('visually-hidden');
}

function onEscDown(e) {
  if (e.code === 'Escape') {
    instance.close();
    closeModal();
  }
}

function onBackdropClick(e) {
  if (e.target.classList.contains('backdrop')) {
    instance.close();
    closeModal();
  }
}

function gangePropertiesOfMovie(movie) {
  movie.data.popularity = Number(movie.data.popularity).toFixed(1);
  movie.data.vote_average = movie.data.vote_average.toFixed(1);
}

refs.galleryEl.addEventListener('click', onGalleryClick);
