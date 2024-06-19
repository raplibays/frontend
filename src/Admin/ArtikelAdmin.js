import axios from 'axios'
import { getElement1 } from '../../scripts/utils'

const apiUrl = 'http://localhost:3000/artikel'
const kategoriApiUrl = 'http://localhost:3000/kategori' // Endpoint kategori

export function initArticleAdmin() {
  const content = getElement1('#mainContent')
  content.innerHTML = `
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-4">Manage Articles</h2>
      <div id="articleList" class="mb-4"></div>
      <button id="addArticleButton" class="bg-blue-500 text-white px-4 py-2">Add Article</button>
      <div id="articleForm" class="hidden mt-4"></div>
    </div>
  `

  const articleList = getElement1('#articleList')
  const addArticleButton = getElement1('#addArticleButton')
  const articleForm = getElement1('#articleForm')

  // Function to fetch and display all articles
  const fetchArticles = () => {
    axios
      .get(apiUrl)
      .then((response) => {
        articleList.innerHTML = '' // Clear previous articles
        const articles = response.data
        articles.forEach((article) => {
          const articleElement = document.createElement('div')
          articleElement.innerHTML = `
            <div class="border p-2 mb-2">
              <h3 class="font-bold">${article.judul_artikel}</h3>
              <p>${article.isi_artikel}</p>
              <img src="${article.url}" alt="${
            article.judul_artikel
          }" class="my-2">
              <p><strong>Kategori:</strong> ${
                article.Kategori ? article.Kategori.nama_kategori : '-'
              }</p>
              <button data-id="${
                article.id
              }" class="editArticleButton bg-yellow-500 text-white px-2 py-1">Edit</button>
              <button data-id="${
                article.id
              }" class="deleteArticleButton bg-red-500 text-white px-2 py-1">Delete</button>
            </div>
          `
          articleList.appendChild(articleElement)
        })

        // Add event listeners to edit and delete buttons
        const editButtons = document.querySelectorAll('.editArticleButton')
        const deleteButtons = document.querySelectorAll('.deleteArticleButton')

        editButtons.forEach((button) =>
          button.addEventListener('click', handleEdit),
        )
        deleteButtons.forEach((button) =>
          button.addEventListener('click', handleDelete),
        )
      })
      .catch((error) => {
        console.error('Error fetching articles:', error)
      })
  }

  // Initial fetch when page loads
  fetchArticles()

  // Add article button click event
  addArticleButton.addEventListener('click', () => {
    articleForm.innerHTML = getArticleForm()
    fetchCategories() // Fetch categories after form is rendered
    articleForm.classList.remove('hidden')
    const saveButton = getElement1('#saveArticleButton')
    saveButton.addEventListener('click', handleSave)
  })

  // Handle edit article button click
  function handleEdit(event) {
    const id = event.target.dataset.id
    axios
      .get(`${apiUrl}/${id}`)
      .then((response) => {
        const article = response.data
        articleForm.innerHTML = getArticleForm(article)
        fetchCategories() // Fetch categories after form is rendered
        articleForm.classList.remove('hidden')
        const saveButton = getElement1('#saveArticleButton')
        saveButton.addEventListener('click', () => handleUpdate(id))
      })
      .catch((error) => {
        console.error('Error fetching article for edit:', error)
      })
  }

  // Handle delete article button click
  function handleDelete(event) {
    const id = event.target.dataset.id
    axios
      .delete(`${apiUrl}/${id}`)
      .then(() => {
        fetchArticles() // Refresh article list after deletion
      })
      .catch((error) => {
        console.error('Error deleting article:', error)
      })
  }

  // Handle save article button click
  function handleSave() {
    const article = getArticleData()
    const formData = new FormData()
    formData.append('judul_artikel', article.judul_artikel)
    formData.append('isi_artikel', article.isi_artikel)
    formData.append('id_kategori', article.id_kategori)
    formData.append('image', article.image)

    axios
      .post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        fetchArticles() // Refresh article list after addition
      })
      .catch((error) => {
        console.error('Error saving article:', error.response.data)
      })
  }

  // Handle update article button click
  function handleUpdate(id) {
    const article = getArticleData()
    const formData = new FormData()
    formData.append('judul_artikel', article.judul_artikel)
    formData.append('isi_artikel', article.isi_artikel)
    formData.append('id_kategori', article.id_kategori)
    formData.append('image', article.image)

    axios
      .put(`${apiUrl}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        fetchArticles() // Refresh article list after update
      })
      .catch((error) => {
        console.error('Error updating article:', error.response.data)
      })
  }

  // Function to fetch categories and populate select input
  const fetchCategories = () => {
    axios
      .get(kategoriApiUrl)
      .then((response) => {
        const categories = response.data
        const selectInput = getElement1('#kategori')
        selectInput.innerHTML = ''
        categories.forEach((category) => {
          const option = document.createElement('option')
          option.value = category.id
          option.textContent = category.nama_kategori
          selectInput.appendChild(option)
        })
      })
      .catch((error) => {
        console.error('Error fetching categories:', error)
      })
  }

  // Function to generate article form HTML
  function getArticleForm(article = {}) {
    return `
      <div class="border p-4">
        <input type="text" id="title" value="${
          article.judul_artikel || ''
        }" placeholder="Title" class="mb-2 p-2 border w-full" />
        <textarea id="description" placeholder="Description" class="mb-2 p-2 border w-full">${
          article.isi_artikel || ''
        }</textarea>
        <select id="kategori" class="mb-2 p-2 border w-full">
          <option value="">Select Category</option>
        </select>
        <input type="file" id="image" accept="image/*" class="mb-2 p-2 border w-full" />
        <button id="saveArticleButton" class="bg-green-500 text-white px-4 py-2">Save</button>
      </div>
    `
  }

  // Function to get article data from form
  function getArticleData() {
    const imageInput = getElement1('#image')
    const image = imageInput.files[0]
    return {
      judul_artikel: getElement1('#title').value,
      isi_artikel: getElement1('#description').value,
      id_kategori: getElement1('#kategori').value,
      image: image,
    }
  }
}
