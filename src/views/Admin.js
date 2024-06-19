import { initArticleAdmin } from '../Admin/ArtikelAdmin'
import { initCategoryAdmin } from '../Admin/KategoriAdmin'
import { initMountainAdmin } from '../Admin/GunungAdmin'
import { initBasecampAdmin } from '../Admin/BasecampAdmin'
import { getElement } from '../../scripts/utils'

function initAdminPage() {
  const content = getElement('#mainContent')
  content.innerHTML = `
    <div class="p-4">
      <h1 class="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div class="grid grid-cols-2 gap-4">
        <button id="manageArticles" class="bg-blue-500 text-white px-4 py-2">Manage Articles</button>
        <button id="manageCategories" class="bg-blue-500 text-white px-4 py-2">Manage Categories</button>
        <button id="manageMountains" class="bg-blue-500 text-white px-4 py-2">Manage Mountains</button>
        <button id="manageBasecamps" class="bg-blue-500 text-white px-4 py-2">Manage Basecamps</button>
      </div>
      <div id="adminContent" class="mt-4"></div>
    </div>
  `

  const manageArticlesButton = getElement('#manageArticles')
  const manageCategoriesButton = getElement('#manageCategories')
  const manageMountainsButton = getElement('#manageMountains')
  const manageBasecampsButton = getElement('#manageBasecamps')

  manageArticlesButton.addEventListener('click', () => {
    initArticleAdmin()
  })

  manageCategoriesButton.addEventListener('click', () => {
    initCategoryAdmin()
  })

  manageMountainsButton.addEventListener('click', () => {
    initMountainAdmin()
  })

  manageBasecampsButton.addEventListener('click', () => {
    initBasecampAdmin()
  })
}

export default initAdminPage
