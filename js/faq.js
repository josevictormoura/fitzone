const dts = document.querySelectorAll('dl dt')
dts[0].nextElementSibling.classList.add('block')

function showFaq() {
  if (this.nextElementSibling.classList.contains('hidden')) {
    this.classList.add('active-rotate')
    this.nextElementSibling.classList.toggle('hidden')
    this.nextElementSibling.classList.toggle('block')
  }else{
    this.classList.remove('active-rotate')
    this.nextElementSibling.classList.toggle('hidden')
    this.nextElementSibling.classList.toggle('block')
  }
}

dts.forEach(dt => {
  dt.addEventListener('click', showFaq)  
})
