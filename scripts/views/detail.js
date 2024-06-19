import axios from 'axios';
import { getElement } from '../utils';

export function initDetailPage(type, id) {
  const content = getElement('#mainContent');
  const gunungApiUrl = `http://localhost:3000/gunung/${id}`;
  const basecampApiUrl = `http://localhost:3000/basecamp`;

  // Function to create basecamp card
  const createBasecampCardTemplate = (basecamp) => {
    return `
      <article class="max-w-sm rounded overflow-hidden shadow-lg mx-auto my-4">
        <div class="relative">
          <img src="${basecamp.url}" alt="${basecamp.nama_basecamp}" class="w-full h-48 object-cover">
          <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="text-center text-white px-4">
              <h3 class="text-xl font-bold">${basecamp.nama_basecamp}</h3>
              <p class="text-sm">${basecamp.alamat}</p>
            </div>
          </div>
        </div>
        <div class="px-6 py-4">
          <p class="text-lg">Jam Buka: ${basecamp.jam_buka}</p>
          <p class="text-lg">Jam Tutup: ${basecamp.jam_tutup}</p>
        </div>
        <div class="px-6 pt-4 pb-2 flex justify-between">
          <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 focus:outline-none detail-button" data-id="${basecamp.id}" data-type="basecamp">View Details</button>
        </div>
      </article>
    `;
  };

  // Fetch gunung data
  axios
    .get(gunungApiUrl)
    .then((response) => {
      const gunungData = response.data;
      content.innerHTML = `
        <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div class="relative">
            <img src="${gunungData.url}" alt="${gunungData.nama_gunung || gunungData.kode_gunung}" class="w-full h-96 object-cover" />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75"></div>
            <h2 class="absolute bottom-4 left-4 text-3xl font-bold text-white">${gunungData.nama_gunung || gunungData.kode_gunung}</h2>
          </div>
          <div class="p-8">
            <a href="${gunungData.maps}" class="font-bold text-xl">Lokasi</a>
            <p class="text-gray-700 leading-relaxed">${gunungData.deskripsi}</p>
          </div>
          <div id="basecampContainer" class="p-8">
            <h3 class="text-2xl font-bold mb-4">Basecamps</h3>
            <div id="basecampList" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
          </div>
        </div>
      `;

      // Fetch basecamp data
      return axios.get(basecampApiUrl);
    })
    .then((response) => {
      const basecamps = response.data;
      const filteredBasecamps = basecamps.filter(basecamp => basecamp.gunung_id == id);
      const basecampList = getElement('#basecampList');
      basecampList.innerHTML = '';

      filteredBasecamps.forEach((basecamp) => {
        const basecampCard = createBasecampCardTemplate(basecamp);
        basecampList.innerHTML += basecampCard;
      });
    })
    .catch((error) => {
      console.error('Error fetching data from API:', error);
    });
}
