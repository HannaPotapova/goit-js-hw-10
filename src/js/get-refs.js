export default function getRefs() {
    return {
        inputElement: document.querySelector('#search-box'),
        listElement: document.querySelector('.country-list'),
        containerElement: document.querySelector('.country-info')
    };
}