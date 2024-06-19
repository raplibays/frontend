import axios from 'axios'
import { getElement } from '../utils'
import { createArticleCardTemplate, createTeamTeamplate } from '../../templates/templateCreator'

export function initHomePage() {
  const articlesContainer = getElement('#articlesContainer')
  const apiUrl = 'http://localhost:3000/artikel'

  axios
    .get(apiUrl)
    .then((response) => {
      const articleData = response.data
      articleData.slice(0, 3).forEach((article) => {
        const articleCardTemplate = createArticleCardTemplate(article)
        articlesContainer.insertAdjacentHTML('beforeend', articleCardTemplate)
      })

      // Add event listener to detail buttons
      const detailButtons = articlesContainer.querySelectorAll('.detail-button')
      detailButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
          const id = event.target.dataset.id
          window.location.hash = `#/detail/artikel/${id}`
        })
      })
    })
    .catch((error) => {
      console.error('Error fetching data from API:', error)
    })
}
