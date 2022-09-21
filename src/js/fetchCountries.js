export default { fetchCountries };

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = 'https://restcountries.com/v3.1/name';

function fetchCountries(name) {
  return fetch(`${BASE_URL}/${name}?fields=name,capital,population,flags,languages`)
    .then(
      (response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      }
    );
}
    
    
//     ((response) => {
//     if (!response.ok) {Notify.failure('Oops, there is no country with that name!', {
//         position: 'center-top',
//         width: '400px',
//         fontSize: '21px',
//     });
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }