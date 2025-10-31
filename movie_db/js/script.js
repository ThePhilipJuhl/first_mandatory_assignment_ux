import { queryFilms } from './movies.js';

document.querySelectorAll('nav button').forEach((menuOption) => {
    menuOption.addEventListener('click', (e) => {
        queryFilms(e.target.id);

        document.querySelector('nav button.selected')?.classList.remove('selected');
        e.target.classList.add('selected');
    });
});