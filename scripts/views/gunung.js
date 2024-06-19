import axios from 'axios'
import { createGunungCardTemplate } from '../../templates/templateCreator'
import { getElement } from '../utils'

export function initGunungPage() {
  const gunungContainer = getElement('#gunung')
  gunungContainer.innerHTML = `
    <h2 class="text-3xl font-bold mb-4 text-center">Daftar Gunung</h2>
    <div class="flex flex-wrap justify-center" id="gunungList"></div>
  `

  const gunungList = getElement('#gunungList')
  const apiUrl = 'http://localhost:3000/gunung'

  axios
    .get(apiUrl)
    .then((response) => {
      const gunungData = response.data
      console.log('data gunung', gunungData)
      gunungData.forEach((gunung) => {
        const gunungCardTemplate = createGunungCardTemplate({
          id: gunung.id,
          name: gunung.nama_gunung,
          maps: gunung.maps,
          imgSrc: gunung.url,
          location: `${gunung.province}, ${gunung.kota}`,
        })
        gunungList.insertAdjacentHTML('beforeend', gunungCardTemplate)
      })

      // Add event listener to detail buttons
      const detailButtons = gunungList.querySelectorAll('.detail-button')
      detailButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
          const id = event.target.dataset.id
          const type = event.target.dataset.type
          window.location.hash = `#/detail/gunung/${id}`
        })
      })

      const favoriteButtons = gunungList.querySelectorAll('.favorite-button')
      favoriteButtons.forEach((button) => {
        button.addEventListener('click', addToFavorites)
      })
    })
    .catch((error) => {
      console.error('Error fetching data from API:', error)
    })
}

function addToFavorites(event) {
  const id = event.target.dataset.id
  const name = event.target.dataset.name
  const imgSrc = event.target.dataset.img
  const maps = event.target.dataset.maps

  // Simpan informasi gunung ke local storage, misalnya
  let favorites = JSON.parse(localStorage.getItem('favorites')) || []

  // Cek apakah gunung sudah ada di favorit
  const isFavorite = favorites.some(favorite => favorite.id === id)
  if (!isFavorite) {
    favorites.push({ id, name, imgSrc, maps })
    localStorage.setItem('favorites', JSON.stringify(favorites))

    // Redirect to favorites page
    window.location.href = '#/favorit' // Ganti dengan path favorit yang sesuai
  } else {
    alert('Gunung ini sudah ada di daftar favorit Anda.')
  }
}
