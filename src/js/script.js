const navigation = document.querySelector('.nav');
const menuButton = document.querySelector('.burger');
const navigationMenu = document.querySelector('.nav__menu');

menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('open');
    navigationMenu.classList.toggle('visible-menu');

    if (menuButton.classList.contains('open')) {
        menuButton.setAttribute("aria-label", "close menu");
        menuButton.setAttribute("aria-expanded", "true");
        document.querySelectorAll('.nav__link').forEach(link => {
            link.tabIndex = 0;
        })

    } else {
        menuButton.setAttribute("aria-label", "open menu");
        menuButton.setAttribute("aria-expanded", "false");
        document.querySelectorAll('.nav__link').forEach(link => {
            link.tabIndex = -1;
        })
    }

})