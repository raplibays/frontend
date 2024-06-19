import axios from 'axios';
import { getElement } from '../utils';

export function initDetailArtikelPage(id) {
  const content = getElement('#mainContent');
  const apiUrl = `http://localhost:3000/artikel/${id}`;

  axios
    .get(apiUrl)
    .then((response) => {
      const data = response.data;
      console.log(data);
      content.innerHTML = `
        <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
          <div class="relative">
            <img src="${data.url}" alt="${data.judul_artikel}" class="w-full h-96 object-cover" />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
            <h2 class="absolute bottom-4 left-4 text-3xl font-bold text-white drop-shadow-md">${data.judul_artikel}</h2>
          </div>
          <div class="p-8">
            <p class="text-gray-700 leading-relaxed">${data.isi_artikel}</p>
          </div>
        </div>
      `;
    })
    .catch((error) => {
      console.error('Error fetching data from API:', error);
    });
}
