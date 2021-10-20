import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingServiceService {

  public themeSelected = document.querySelector('#theme');
  public elementSelector: NodeListOf<Element>;

  constructor() {
    const newTheme = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.themeSelected.setAttribute( 'href', newTheme );
  }

  changeColor( color: string ) {
    const selectedTheme = `./assets/css/colors/${ color }.css`;
    localStorage.setItem( 'theme', selectedTheme );
    this.themeSelected.setAttribute( 'href', selectedTheme );
    this.checkCurrentTheme();
  }

  public checkCurrentTheme() {

    this.elementSelector = document.querySelectorAll('.selector');
    // const elementSelector = document.querySelectorAll('.selector');
    this.elementSelector.forEach(elem => {

      // Eliminamos la clase working (si la tiene)
      elem.classList.remove('working');

      // comparamos los Links del elemento contra el css que ya esta establecido
      const dataTheme = elem.getAttribute('data-theme');
      const urlTheme  = `./assets/css/colors/${ dataTheme }.css`;
      const urlLink   = this.themeSelected.getAttribute('href');

      if (urlLink === urlTheme) {
        // si son iguales, agregamos la clase working para mostrar el check
        elem.classList.add('working');
      }

    });

  }

}
