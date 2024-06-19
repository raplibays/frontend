// export function createGunungCardTemplate(gunung) {
//   return `
//     <article class="max-w-sm rounded overflow-hidden shadow-lg mx-auto my-4">
//       <div class="relative">
//         <img src="${gunung.imgSrc}" alt="${gunung.name}" class="w-full h-48 object-cover">
//         <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div class="text-center text-white px-4">
            
//           </div>
//         </div>
//       </div>
//       <div class="px-6 py-4">
//         <!-- Additional content if needed -->
//         <h3 class="text-2xl font-bold">${gunung.name}</h3>
//             <a href="${gunung.maps}">Lokasi</a>
//       </div>
//       <div class="px-6 pt-4 pb-2 flex justify-between">
//         <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 focus:outline-none detail-button" data-id="${gunung.id}" data-type="gunung">View Details</button>
//         <button class="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 focus:outline-none favorite-button" data-id="${gunung.id}" data-nama_gunung="${gunung.nama_gunung}" data-img="${gunung.imgSrc}">Add to Favorites</button>
//       </div>
//     </article>
//   `;
// }


// export function createGunungCardTemplate(gunung) {
//   return `
//     <div class="gunung-card">
//       <img src="${gunung.imgSrc}" alt="${gunung.nama_gunung}" />
//       <div class="card-content">
//         <h3>${gunung.nama_gunung}</h3>
//         <p>${gunung.description}</p>
//         <button class="detail-button" data-id="${gunung.id}" data-type="gunung">View Details</button>
//       </div>
//     </div>
//   `
// }

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}

export function createArticleCardTemplate(article) {
  const truncatedIsiArtikel = truncateText(article.isi_artikel, 150); // Adjust the number based on your needs
  return `
    <article class="max-w-sm rounded overflow-hidden shadow-lg mx-2 mb-4">
      <div class="relative">
        <img src="${article.url}" class="w-full h-48 object-cover">
        <div class="absolute inset-0 flex items-center justify-center bg-black opacity-25">
          <div class="text-center text-white px-4">
            <!-- Additional content if needed -->
          </div>
        </div>
      </div>
      <div class="px-6 py-4">
        <h3 class="text-xl font-bold">${article.judul_artikel}</h3>
        <p class="line-clamp-3">${truncatedIsiArtikel}</p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <button class="detail-button" data-id="${article.id}" data-type="article">View Details</button>
      </div>
    </article>
  `;
}


export function createGunungDetailTemplate(gunung) {
  return `
        <div class="detail-container p-5">
            <h2 class="text-3xl font-bold mb-4">${gunung.nama_gunung}</h2>
            <img src="${gunung.imgSrc}" alt="${gunung.nama_gunung}" class="w-full h-64 object-cover rounded-lg shadow-lg mb-4">
            <p>${gunung.maps}</p>
            
        </div>
    `
}

export function createAboutUsCardTemplate(aboutUsData) {
  return `
      <div class="max-w-md rounded overflow-hidden shadow-lg mx-2 mb-4">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">About Us</div>
          <p class="text-gray-700 text-base">${aboutUsData.description}</p>
        </div>
      </div>
    `
}

export function createGunungCardTemplate({ id, name, maps, imgSrc, location }) {
  return `
    <div class="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img class="w-full" src="${imgSrc}" alt="${name}">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">${name}</div>
        <p class="text-gray-700 text-base">
          ${location}
        </p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <a href="${maps}" target="_blank" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Lihat di Maps</a>
        <button class="favorite-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" data-id="${id}" data-name="${name}" data-img="${imgSrc}" data-maps="${maps}">Tambah ke Favorit</button>
        <button class="detail-button bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" data-id="${id}" data-type="gunung">Detail</button>
      </div>
    </div>
  `
}

export function createFavoriteCardTemplate({ id, name, imgSrc, maps }) {
  return `
    <div class="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img class="w-full" src="${imgSrc}" alt="${name}">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">${name}</div>
      </div>
      <div class="px-6 pt-4 pb-2">
        <a href="${maps}" target="_blank" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Lihat di Maps</a>
        <button class="detail-button bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" data-id="${id}" data-type="gunung">Detail</button>
        <button class="unfavorite-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" data-id="${id}">Hapus dari Favorit</button>
      </div>
    </div>
  `
}

{/* <section class="py-16 px-4 bg-white text-center">
  <h1 class="text-3xl font-bold mb-4">Our Team</h1>
  <p class="text-lg text-gray-600 mb-12">Tim support pembuatan website JavaSummit</p>
  <div class="flex flex-wrap justify-center">
    <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
      <img src="../assets/tim/ajeng.jpg" alt="ajeng" class="rounded-full mx-auto mb-4"/>
      <h2 class="text-xl font-bold mb-2">Ajeng Soumiatun N</h2>
      <p class="text-gray-600 mb-2">Frontend & Backend Developer</p>
      <p class="text-gray-600 mb-4">Universitas Muhammadiyah Purwokerto</p>
      <div class="flex justify-center space-x-4">
        <a href="#" class="text-gray-600 hover:text-gray-800"><i class="fa-brands fa-facebook-f"></i></a>
        <a href="#" class="text-gray-600 hover:text-gray-800"><i class="fa-brands fa-twitter"></i></a>
        <a href="#" class="text-gray-600 hover:text-gray-800"><i class="fa-brands fa-instagram"></i></a>
        <a href="#" class="text-gray-600 hover:text-gray-800"><i class="fa-brands fa-linkedin-in"></i></a>
      </div>
    </div>
    <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
      <img src="../assets/tim/rafli.jpg" alt="rafli" class="rounded-full mx-auto mb-4"/>
      <h2 class="text-xl font-bold mb-2">Rafli Bayu Satrio</h2>
      <p class="text-gray-600 mb-2">Leader & Backend Developer</p>
      <p class="text-gray-600 mb-4">Universitas AMIKOM Purwokerto</p>
      <div class="flex justify-center space-x-4">
        <a href="#" class="text-gray-600 hover:text-gray-800"><i class="fa-brands fa-facebook-f"></i></a>
        <a href="#" class="text-gray-600 hover:text-gray-800"><i class="fa-brands fa-twitter"></i></a>
        <a href="#" class="text-gray-600 hover:text-gray-800"><i class="fa-brands fa-instagram"></i></a>
        <a href="#" class="text-gray-600 hover:text-gray-800"><i class="fa-brands fa-linkedin-in"></i></a>
      </div>
    </div>
    <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
      <img src="../assets/tim/nova.jpeg" alt="nova" class="rounded-full mx-auto mb-4"/>
      <h2 class="text-xl font-bold mb-2">Nova Sukmawati</h2>
      <p class="text-gray-600 mb-2">Designer & Frontend Developer</p>
      <p class="text-gray-600 mb-4">Institut Pertanian Bogor</p>
      <div class="flex justify-center space-x-4">
        <a href="#" class="text-gray-600 hover:text-gray-800"><i class="fa-brands fa-facebook-f"></i></a>
        <a href="#" class="text-gray-600 hover:text-gray-800"><i class="fa-brands fa-twitter"></i></a>
        <a href="#" class="text-gray-600 hover:text-gray-800"><i class="fa-brands fa-instagram"></i></a>
        <a href="#" class="text-gray-600 hover:text-gray-800"><i class="fa-brands fa-linkedin-in"></i></a>
      </div>
    </div>
  </div>
</section> */}
