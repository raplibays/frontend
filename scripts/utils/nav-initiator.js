const NavInitiator = {
  init({ button, nav, content }) {
    button.addEventListener('click', (event) => {
      this._toggleNav(event, nav)
    })

    content.addEventListener('click', (event) => {
      this._closeNav(event, nav)
    })
  },

  _toggleNav(event, nav) {
    event.stopPropagation()
    nav.classList.toggle('open')
  },

  _closeNav(event, nav) {
    event.stopPropagation()
    nav.classList.remove('open')
  },
}

export default NavInitiator
