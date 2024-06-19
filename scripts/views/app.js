import NavInitiator from '../utils/nav-initiator'
import { initHomePage } from './home'
import { initGunungPage } from './gunung'
import { initDetailPage } from './detail'
import { initDetailArtikelPage } from './detailartikel'
import initAdminPage from '../../src/views/Admin'
import { createFavoriteCardTemplate } from '../../templates/templateCreator'
import { getElement } from '../utils'

import rafliImage from '../../assets/tim/rafli.jpg';
import ajeng from '../../assets/tim/ajeng.jpg';
import nova from '../../assets/tim/nova.jpeg';

class App {
  constructor({ button, nav, content }) {
    this._button = button
    this._nav = nav
    this._content = content

    this._initialApp()
  }

  _initialApp() {
    NavInitiator.init({
      button: this._button,
      nav: this._nav,
      content: this._content,
    })
  }

  async renderPage() {
    const url = window.location.hash.slice(1).toLowerCase()
    const urlParts = url.split('/')
    const page = urlParts[1]
    const type = urlParts[2]
    const id = urlParts[3]

    if (page === 'detail' && type === 'gunung' && id) {
      initDetailPage(type, id)
      return
    }

    if (page === 'detail' && type === 'artikel' && id) {
      initDetailArtikelPage(id)
      return
    }

    this._content.innerHTML = this._getPage(url)
    switch (url) {
      case '/home':
        initHomePage()
        break
      case '/gunung':
        initGunungPage()
        break
      case '/favorit':
        this.renderFavoritePage()
        break
      case '/about':
        // Implementasi halaman about
        break
      case '/admin':
        initAdminPage()
        break
      default:
        this._content.innerHTML = this._getPage('/home')
        initHomePage()
        break
    }
  }

  renderFavoritePage() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    const favoritListContainer = getElement('#favoritList')
    favoritListContainer.innerHTML = ''

    favorites.forEach((favorite) => {
      const favoriteCardTemplate = createFavoriteCardTemplate(favorite)
      favoritListContainer.insertAdjacentHTML('beforeend', favoriteCardTemplate)
    })

    const detailButtons = favoritListContainer.querySelectorAll('.detail-button')
    detailButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const id = event.target.dataset.id
        const type = event.target.dataset.type
        window.location.hash = `#/detail/gunung/${id}`
      })
    })

    // Add event listener to unfavorite buttons
    const unfavoriteButtons = favoritListContainer.querySelectorAll('.unfavorite-button')
    unfavoriteButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const id = event.target.dataset.id
        this.removeFromFavorites(id)
        // Re-render the favorites list
        this.renderPage()
      })
    })
  }

  _getPage(url) {
    switch (url) {
      case '/home':
        return `
          <section id="home">
            <center><h2 class="text-3xl font-bold mb-4">New Artikel</h2></center>
            <div class="flex flex-wrap justify-center" id="articlesContainer"></div>
          </section>
          <section class="py-8 px-4">
            <h1 class="text-2xl font-bold text-center mb-4">Our Team</h1>
            <p class="text-gray-600 text-center mb-8">Tim support pembuatan website JavaSummit</p>
            <div class="flex flex-wrap justify-center gap-8">
              <div class="bg-white rounded-lg shadow-md p-6 max-w-xs">
                <img src="${ajeng}" alt="Ajeng Soumiatun N" class="w-32 h-32 rounded-full object-cover mx-auto mb-4">
                <h2 class="text-xl font-bold mb-2 text-center">Ajeng Soumiatun N</h2>
                <p class="text-gray-600 mb-2 text-center">Frontend & Backend Developer</p>
                <p class="text-gray-600 text-center">Universitas Muhammadiyah Purwokerto</p>
              </div>
              <div class="bg-white rounded-lg shadow-md p-6 max-w-xs">
                <img src="${rafliImage}" alt="Rafli Bayu Satrio" class="w-32 h-32 rounded-full object-cover mx-auto mb-4">
                <h2 class="text-xl font-bold mb-2 text-center">Rafli Bayu Satrio</h2>
                <p class="text-gray-600 mb-2 text-center">Leader & Backend Developer</p>
                <p class="text-gray-600 text-center">Universitas AMIKOM Purwokerto</p>
              </div>
              <div class="bg-white rounded-lg shadow-md p-6 max-w-xs">
                <img src="${nova}" alt="Nova Sukmawati" class="w-32 h-32 rounded-full object-cover mx-auto mb-4">
                <h2 class="text-xl font-bold mb-2 text-center">Nova Sukmawati</h2>
                <p class="text-gray-600 mb-2 text-center">Designer & Frontend Developer</p>
                <p class="text-gray-600 text-center">Institut Pertanian Bogor</p>
              </div>
            </div>
          </section>
          `
      case '/gunung':
        return `
          <section id="gunung">
            <h2 class="text-3xl font-bold mb-4">Daftar Gunung</h2>
            <div class="flex flex-wrap justify-center" id="gunungList"></div>
          </section>`
      case '/favorit':
        return `
              <section id="favorit">
                <h2 class="text-3xl font-bold mb-4 text-center">Gunung Favorit</h2>
                <div class="flex flex-wrap justify-center" id="favoritList"></div>
              </section>`
      case '/about':
        return `
           <section class="py-8 px-4">
            <h1 class="text-2xl font-bold text-center mb-4">Our Team</h1>
            <p class="text-gray-600 text-center mb-8">Tim support pembuatan website JavaSummit</p>
            <div class="flex flex-wrap justify-center gap-8">
              <div class="bg-white rounded-lg shadow-md p-6 max-w-xs">
                <img src="${ajeng}" alt="Ajeng Soumiatun N" class="w-32 h-32 rounded-full object-cover mx-auto mb-4">
                <h2 class="text-xl font-bold mb-2 text-center">Ajeng Soumiatun N</h2>
                <p class="text-gray-600 mb-2 text-center">Frontend & Backend Developer</p>
                <p class="text-gray-600 text-center">Universitas Muhammadiyah Purwokerto</p>
              </div>
              <div class="bg-white rounded-lg shadow-md p-6 max-w-xs">
                <img src="${rafliImage}" alt="Rafli Bayu Satrio" class="w-32 h-32 rounded-full object-cover mx-auto mb-4">
                <h2 class="text-xl font-bold mb-2 text-center">Rafli Bayu Satrio</h2>
                <p class="text-gray-600 mb-2 text-center">Leader & Backend Developer</p>
                <p class="text-gray-600 text-center">Universitas AMIKOM Purwokerto</p>
              </div>
              <div class="bg-white rounded-lg shadow-md p-6 max-w-xs">
                <img src="${nova}" alt="Nova Sukmawati" class="w-32 h-32 rounded-full object-cover mx-auto mb-4">
                <h2 class="text-xl font-bold mb-2 text-center">Nova Sukmawati</h2>
                <p class="text-gray-600 mb-2 text-center">Designer & Frontend Developer</p>
                <p class="text-gray-600 text-center">Institut Pertanian Bogor</p>
              </div>
            </div>
          </section>`
      default:
        return '<section id="home"></section>'
    }
  }

  removeFromFavorites(id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []
    favorites = favorites.filter((favorite) => favorite.id !== id)
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }
}

export default App
