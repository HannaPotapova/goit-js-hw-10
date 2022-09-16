import './css/styles.css';
import API from './js/fetchCountries';
import getRefs from './js/get-refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = getRefs();

const onDebounceSearch = debounce(onSearch, DEBOUNCE_DELAY);
refs.inputElement.addEventListener('input', onDebounceSearch);

function onSearch(event) {
    event.preventDefault();
    clearMurkup();
    
    const searchQuery = refs.inputElement.value.trim();
    console.log(searchQuery);
    
    API.fetchCountries(searchQuery)
        .then(renderCountryCard)
        .catch(onFetchError);    
}

function renderCountryCard(countries) {
    console.log(countries.length);
  
    if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.',
            {
                position: 'center-top',
                width: '400px',
                fontSize: '21px',
            });
    }
    
    if (countries.length >= 2 && countries.length <= 10) {
        refs.listElement.insertAdjacentHTML(
            'beforeend', createCountryList(countries)
        );
    }
    
    if (countries.length < 2) {
        refs.containerElement.insertAdjacentHTML(
            'beforeend', createCountryCard(countries)
        );
    }   
}

function createCountryList(countries) {
    return countries
    .map((country) => {
      return `
        <li class="list__country">
        <img src="${country.flags.svg}" 
            alt="${country.name.common}" 
            width=50></img>
        ${country.name.official}
        </li>
      `;
    })
    .join("");
}

function createCountryCard(countries) {
    return countries
    .map(
      ({
        flags: { svg },
        name: { official, common },
        capital,
        population,
        languages,
      }) => {
      return `
            <img src="${svg}" alt="${common}" width=200></img>
            <h2>${official}</h2>
            <p><b>Capital</b>: ${capital}</p>
            <p><b>Population</b>: ${population}</p>
            <p><b>Languages</b>: ${Object.values(
            languages
          ).join(', ')}</p>
             `;
    })
    .join("");
}

function onFetchError() {
    error => { console.log(error) };
}
      
function clearMurkup() {
  refs.listElement.innerHTML = '';
  refs.containerElement.innerHTML = '';
}
