import axios from 'axios'
import { getElement } from '../../scripts/utils'

const apiUrl = 'http://localhost:3000/kategori'

export function initCategoryAdmin() {
  const content = getElement('#mainContent')
  content.innerHTML = `
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-4">Manage Categories</h2>
      <div id="categoryList" class="mb-4"></div>
      <button id="addCategoryButton" class="bg-blue-500 text-white px-4 py-2">Add Category</button>
      <div id="categoryForm" class="hidden mt-4"></div>
    </div>
  `

  const categoryList = getElement('#categoryList')
  const addCategoryButton = getElement('#addCategoryButton')
  const categoryForm = getElement('#categoryForm')

  axios.get(apiUrl).then((response) => {
    const categories = response.data
    categories.forEach((category) => {
      const categoryElement = document.createElement('div')
      categoryElement.innerHTML = `
        <div class="border p-2 mb-2">
          <h3 class="font-bold">${category.nama_kategori}</h3>
          <button data-id="${category.id}" class="editCategoryButton bg-yellow-500 text-white px-2 py-1">Edit</button>
          <button data-id="${category.id}" class="deleteCategoryButton bg-red-500 text-white px-2 py-1">Delete</button>
        </div>
      `
      categoryList.appendChild(categoryElement)
    })

    const editButtons = document.querySelectorAll('.editCategoryButton')
    const deleteButtons = document.querySelectorAll('.deleteCategoryButton')

    editButtons.forEach((button) =>
      button.addEventListener('click', handleEdit),
    )
    deleteButtons.forEach((button) =>
      button.addEventListener('click', handleDelete),
    )
  })

  addCategoryButton.addEventListener('click', () => {
    categoryForm.innerHTML = getCategoryForm()
    categoryForm.classList.remove('hidden')
    const saveButton = getElement('#saveCategoryButton')
    saveButton.addEventListener('click', handleSave)
  })

  function handleEdit(event) {
    const id = event.target.dataset.id
    axios.get(`${apiUrl}/${id}`).then((response) => {
      const category = response.data
      categoryForm.innerHTML = getCategoryForm(category)
      categoryForm.classList.remove('hidden')
      const saveButton = getElement('#saveCategoryButton')
      saveButton.addEventListener('click', () => handleUpdate(id))
    })
  }

  function handleDelete(event) {
    const id = event.target.dataset.id
    axios.delete(`${apiUrl}/${id}`).then(() => {
      initCategoryAdmin()
    })
  }

  function handleSave() {
    const category = getCategoryData()
    axios
      .post(apiUrl, category)
      .then(() => {
        initCategoryAdmin()
      })
      .catch((error) => {
        console.error('Error saving category:', error.response.data)
      })
  }

  function handleUpdate(id) {
    const category = getCategoryData()
    axios
      .put(`${apiUrl}/${id}`, category)
      .then(() => {
        initCategoryAdmin()
      })
      .catch((error) => {
        console.error('Error updating category:', error.response.data)
      })
  }

  function getCategoryForm(category = {}) {
    return `
      <div class="border p-4">
        <input type="text" id="nama_kategori" value="${
          category.nama_kategori || ''
        }" placeholder="Nama Kategori" class="mb-2 p-2 border w-full" />
        <button id="saveCategoryButton" class="bg-green-500 text-white px-4 py-2">Save</button>
      </div>
    `
  }

  function getCategoryData() {
    return {
      nama_kategori: getElement('#nama_kategori').value,
    }
  }
}
