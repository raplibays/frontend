import axios from 'axios'
import { getElement1, getElements1 } from '../../scripts/utils'

const apiUrl = 'http://localhost:3000/gunung'

export function initMountainAdmin() {
  const content = getElement1('#mainContent')
  content.innerHTML = `
      <div class="p-4">
        <h2 class="text-2xl font-bold mb-4">Manage Mountains</h2>
        <div id="mountainList" class="mb-4"></div>
        <button id="addMountainButton" class="bg-blue-500 text-white px-4 py-2">Add Mountain</button>
        <div id="mountainForm" class="hidden mt-4"></div>
      </div>
    `

  const mountainList = getElement1('#mountainList')
  const addMountainButton = getElement1('#addMountainButton')
  const mountainForm = getElement1('#mountainForm')

  axios.get(apiUrl).then((response) => {
    const mountains = response.data
    mountains.forEach((mountain) => {
      const mountainElement = document.createElement('div')
      mountainElement.innerHTML = `
          <div class="border p-2 mb-2">
            <h3 class="font-bold">${mountain.nama_gunung}</h3>
            <button data-id="${mountain.id}" class="editMountainButton bg-yellow-500 text-white px-2 py-1">Edit</button>
            <button data-id="${mountain.id}" class="deleteMountainButton bg-red-500 text-white px-2 py-1">Delete</button>
          </div>
        `
      mountainList.appendChild(mountainElement)
    })

    const editButtons = getElements1('.editMountainButton', mountainList)
    const deleteButtons = getElements1('.deleteMountainButton', mountainList)

    editButtons.forEach((button) =>
      button.addEventListener('click', handleEdit),
    )
    deleteButtons.forEach((button) =>
      button.addEventListener('click', handleDelete),
    )
  })

  addMountainButton.addEventListener('click', () => {
    axios.get('http://localhost:3000/basecamp').then((response) => {
      const basecamps = response.data
      mountainForm.innerHTML = getMountainForm({}, basecamps)
      mountainForm.classList.remove('hidden')
      const saveButton = getElement1('#saveMountainButton')
      saveButton.addEventListener('click', handleSave)
    })
  })

  function handleEdit(event) {
    const id = event.target.dataset.id
    axios.get(`${apiUrl}/${id}`).then((response) => {
      const mountain = response.data
      axios.get('http://localhost:3000/basecamp').then((response) => {
        const basecamps = response.data
        mountainForm.innerHTML = getMountainForm(mountain, basecamps)
        mountainForm.classList.remove('hidden')
        const saveButton = getElement1('#saveMountainButton')
        saveButton.addEventListener('click', () => handleUpdate(id))
      })
    })
  }

  function handleDelete(event) {
    const id = event.target.dataset.id
    axios.delete(`${apiUrl}/${id}`).then(() => {
      initMountainAdmin()
    })
  }

  function handleSave() {
    const mountain = getMountainData()
    const formData = new FormData()
    formData.append('kode_gunung', mountain.kode_gunung)
    formData.append('nama_gunung', mountain.nama_gunung)
    formData.append('deskripsi', mountain.deskripsi)
    formData.append('province', mountain.province)
    formData.append('kota', mountain.kota)
    formData.append('maps', mountain.maps)
    mountain.images.forEach((image) => {
      formData.append('image', image)
    })
    axios
      .post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        initMountainAdmin()
      })
  }

  function handleUpdate(id) {
    const mountain = getMountainData()
    const formData = new FormData()
    formData.append('kode_gunung', mountain.kode_gunung)
    formData.append('nama_gunung', mountain.nama_gunung)
    formData.append('deskripsi', mountain.deskripsi)
    formData.append('province', mountain.province)
    formData.append('kota', mountain.kota)
    formData.append('maps', mountain.maps)
    mountain.images.forEach((image) => {
      formData.append('image', image)
    })
    axios
      .put(`${apiUrl}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        initMountainAdmin()
      })
  }

  function getMountainForm(mountain = {}, basecamps = []) {
    const basecampOptions = basecamps
      .map(
        (basecamp) =>
          `<option value="${basecamp.id}" ${
            mountain.basecamp_id === basecamp.id ? 'selected' : ''
          }>${basecamp.nama_basecamp}</option>`,
      )
      .join('')

    return `
          <div class="border p-4">
            <input type="text" id="kode_gunung" value="${
              mountain.kode_gunung || ''
            }" placeholder="Kode Gunung" class="mb-2 p-2 border w-full" />
            <input type="text" id="nama_gunung" value="${
              mountain.nama_gunung || ''
            }" placeholder="Nama Gunung" class="mb-2 p-2 border w-full" />
            <textarea id="deskripsi" placeholder="Deskripsi" class="mb-2 p-2 border w-full">${
              mountain.deskripsi || ''
            }</textarea>
            
            <input type="text" id="province" value="${
              mountain.province || ''
            }" placeholder="Province" class="mb-2 p-2 border w-full" />
            <input type="text" id="kota" value="${
              mountain.kota || ''
            }" placeholder="Kota" class="mb-2 p-2 border w-full" />
            <input type="text" id="maps" value="${
              mountain.maps || ''
            }" placeholder="Maps" class="mb-2 p-2 border w-full" />
            <input type="file" id="images" accept="image/*" class="mb-2 p-2 border w-full" multiple />
            <button id="saveMountainButton" class="bg-green-500 text-white px-4 py-2">Save</button>
          </div>
        `
  }

  function getMountainData() {
    const imageFiles = getElement1('#images').files
    const imageList = []
    for (let i = 0; i < imageFiles.length; i++) {
      imageList.push(imageFiles[i])
    }

    return {
      kode_gunung: getElement1('#kode_gunung').value,
      nama_gunung: getElement1('#nama_gunung').value,
      deskripsi: getElement1('#deskripsi').value,
      province: getElement1('#province').value,
      kota: getElement1('#kota').value,
      maps: getElement1('#maps').value,
      images: imageList,
    }
  }
}
