import 'regenerator-runtime';
import '../styles/styles.css';
import '../styles/responsive.css';
import App from './views/app';
import arjunoImage from '../assets/gunung/arjuno.jpg';

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  nav: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  header.style.backgroundImage = `url(${arjunoImage})`;
});
