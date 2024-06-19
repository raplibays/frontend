import axios from 'axios'
import { getElement1 } from '../../scripts/utils'

const apiUrl = 'http://localhost:3000/basecamp'
const gunungApiUrl = 'http://localhost:3000/gunung'

export function initBasecampAdmin() {
  const content = getElement1('#mainContent')
  content.innerHTML = `
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-4">Manage Basecamps</h2>
      <div id="basecampList" class="mb-4"></div>
      <button id="addBasecampButton" class="bg-blue-500 text-white px-4 py-2">Add Basecamp</button>
      <div id="basecampForm" class="hidden mt-4"></div>
    </div>
  `

  const basecampList = getElement1('#basecampList')
  const addBasecampButton = getElement1('#addBasecampButton')
  const basecampForm = getElement1('#basecampForm')

  let gunungs = []

  const fetchGunungs = () => {
    return axios.get(gunungApiUrl).then((response) => {
      gunungs = response.data
    })
  }

  const fetchBasecamps = () => {
    axios.get(apiUrl).then((response) => {
      const basecamps = response.data
      basecampList.innerHTML = '' // Clear previous basecamps
      basecamps.forEach((basecamp) => {
        const basecampElement = document.createElement('div')
        basecampElement.innerHTML = `
          <div class="border p-2 mb-2">
            <h3 class="font-bold">${basecamp.nama_basecamp}</h3>
            <p>${basecamp.alamat}</p>
            <button data-id="${basecamp.id}" class="editBasecampButton bg-yellow-500 text-white px-2 py-1">Edit</button>
            <button data-id="${basecamp.id}" class="deleteBasecampButton bg-red-500 text-white px-2 py-1">Delete</button>
          </div>
        `
        basecampList.appendChild(basecampElement)
      })

      const editButtons = basecampList.querySelectorAll('.editBasecampButton')
      const deleteButtons = basecampList.querySelectorAll('.deleteBasecampButton')

      editButtons.forEach((button) => button.addEventListener('click', handleEdit))
      deleteButtons.forEach((button) => button.addEventListener('click', handleDelete))
    })
  }

  addBasecampButton.addEventListener('click', () => {
    basecampForm.innerHTML = getBasecampForm()
    basecampForm.classList.remove('hidden')
    const saveButton = getElement1('#saveBasecampButton')
    saveButton.addEventListener('click', handleSave)
  })

  function getBasecampForm(basecamp = {}) {
    const gunungOptions = gunungs.map((gunung) =>
      `<option value="${gunung.id}" ${basecamp.gunung_id === gunung.id ? 'selected' : ''}>${gunung.nama_gunung}</option>`
    ).join('')
    return `
      <div class="border p-4">
        <input type="text" id="kode_id" value="${basecamp.kode_id || ''}" placeholder="Kode ID" class="mb-2 p-2 border w-full" />
        <input type="text" id="kode_basecamp" value="${basecamp.kode_basecamp || ''}" placeholder="Kode Basecamp" class="mb-2 p-2 border w-full" />
        <input type="text" id="nama_basecamp" value="${basecamp.nama_basecamp || ''}" placeholder="Nama Basecamp" class="mb-2 p-2 border w-full" />
        <input type="text" id="alamat" value="${basecamp.alamat || ''}" placeholder="Alamat" class="mb-2 p-2 border w-full" />
        <input type="time" id="jam_buka" value="${basecamp.jam_buka || ''}" placeholder="Jam Buka" class="mb-2 p-2 border w-full" />
        <select id="gunung_id" class="mb-2 p-2 border w-full">
          ${gunungOptions}
        </select>
        <input type="time" id="jam_tutup" value="${basecamp.jam_tutup || ''}" placeholder="Jam Tutup" class="mb-2 p-2 border w-full" />
        <input type="text" id="provinsi" value="${basecamp.provinsi || ''}" placeholder="Provinsi" class="mb-2 p-2 border w-full" />
        <input type="text" id="rating" value="${basecamp.rating || ''}" placeholder="Rating" class="mb-2 p-2 border w-full" />
        <input type="file" id="image" accept="image/*" class="mb-2 p-2 border w-full" />
        <button id="saveBasecampButton" class="bg-green-500 text-white px-4 py-2">Save</button>
      </div>
    `
  }

  function getBasecampData() {
    return {
      kode_id: getElement1('#kode_id').value,
      kode_basecamp: getElement1('#kode_basecamp').value,
      nama_basecamp: getElement1('#nama_basecamp').value,
      alamat: getElement1('#alamat').value,
      jam_buka: getElement1('#jam_buka').value,
      jam_tutup: getElement1('#jam_tutup').value,
      provinsi: getElement1('#provinsi').value,
      rating: parseFloat(getElement1('#rating').value),
      gunung_id: parseInt(getElement1('#gunung_id').value),
      image: getElement1('#image').files[0],
    }
  }

  function handleEdit(event) {
    const id = event.target.dataset.id
    axios.get(`${apiUrl}/${id}`).then((response) => {
      const basecamp = response.data
      basecampForm.innerHTML = getBasecampForm(basecamp)
      basecampForm.classList.remove('hidden')
      const saveButton = getElement1('#saveBasecampButton')
      saveButton.addEventListener('click', () => handleUpdate(id))
    })
  }

  function handleDelete(event) {
    const id = event.target.dataset.id
    axios.delete(`${apiUrl}/${id}`).then(() => {
      fetchBasecamps()
    })
  }

  function handleSave() {
    const basecamp = getBasecampData()
    const formData = new FormData()
    formData.append('kode_id', basecamp.kode_id)
    formData.append('kode_basecamp', basecamp.kode_basecamp)
    formData.append('nama_basecamp', basecamp.nama_basecamp)
    formData.append('alamat', basecamp.alamat)
    formData.append('jam_buka', basecamp.jam_buka)
    formData.append('jam_tutup', basecamp.jam_tutup)
    formData.append('provinsi', basecamp.provinsi)
    formData.append('rating', basecamp.rating)
    formData.append('gunung_id', basecamp.gunung_id)
    formData.append('image', basecamp.image)

    axios
      .post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        fetchBasecamps()
        basecampForm.classList.add('hidden')
      })
  }

  function handleUpdate(id) {
    const basecamp = getBasecampData()
    const formData = new FormData()
    formData.append('kode_id', basecamp.kode_id)
    formData.append('kode_basecamp', basecamp.kode_basecamp)
    formData.append('nama_basecamp', basecamp.nama_basecamp)
    formData.append('alamat', basecamp.alamat)
    formData.append('jam_buka', basecamp.jam_buka)
    formData.append('jam_tutup', basecamp.jam_tutup)
    formData.append('provinsi', basecamp.provinsi)
    formData.append('rating', basecamp.rating)
    formData.append('gunung_id', basecamp.gunung_id)
    formData.append('image', basecamp.image)

    axios
      .put(`${apiUrl}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        fetchBasecamps()
        basecampForm.classList.add('hidden')
      })
  }

  fetchGunungs().then(fetchBasecamps)
}
