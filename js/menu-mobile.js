const menuMobile = document.querySelector('#menu-mobile')
const buttonMobile = document.querySelector('#button-mobile')
const closeMenuMobile = document.querySelector('#close-menu-mobile')

function showMenuMobile() {
  menuMobile.classList.toggle('hidden')
  menuMobile.classList.toggle('flex')
}

function hiddenMenuMobile({target}) {
  if (target.tagName === 'A' || target.id === "close-menu-mobile") {
    menuMobile.classList.toggle('hidden')
    menuMobile.classList.toggle('flex')
  }
}

buttonMobile.addEventListener('click', showMenuMobile)
menuMobile.addEventListener('click', hiddenMenuMobile)