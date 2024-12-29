const inputHeight = document.querySelector("#height")
const inputWeight = document.querySelector("#weight")
const btnCalc = document.querySelector('#btn-calc-imc')
const btnClear = document.querySelector('#btn-clear-imc')
const resultImc = document.querySelector('.result-imc')
const spanImc = document.querySelector('.imc-atual')
const spanCituation = document.querySelector('.cituacao-atual')
const containerResult = document.querySelector('.container-result')
const containerCalculator = document.querySelector('.container-calculator')
const btnBack = document.querySelector('#btn-back')

async function getDataImc() {
 const dataImc = await fetch('../imc.json')
 const infoImc = await dataImc.json()
 return infoImc.imc
}

async function creatElement() {
  const data = await getDataImc()

  resultImc.innerHTML = ""

  data.forEach(imc => {
    const div = document.createElement('div')
    div.className = "flex justify-between text-center *:flex-1 *:text-sm *:font-normal border-b-2 border-black/10  pb-2 mb-2"
    
    const classification = document.createElement('p')
    classification.innerText = imc.classication
    
    const info = document.createElement('p')
    info.innerText = imc.info
    
    const obesity = document.createElement('p')
    obesity.innerText = imc.obesity
    
    div.appendChild(classification)
    div.appendChild(info)
    div.appendChild(obesity)
    resultImc.appendChild(div)
  })
}

function imcValue(height, weight) {
  const imc = (weight / (height * height)).toFixed(1)
  return +imc
}

function showResults() {
  containerCalculator.classList.toggle('hidden')
  containerResult.classList.toggle('hidden')
}

function setErroInputs() {
  const regexHeight = /^([1-2](,|\.)(\d{1,2})?)$/;
  const regexWeight = /^(\d{2,3}(,|\.)(\d)?)$/;

  if (!regexHeight.test(inputHeight.value)) {
    document.querySelector('.span-erro-height').classList.remove('hidden')
  }
  if (!regexWeight.test(inputWeight.value)) {
    document.querySelector('.span-erro-weight').classList.remove('hidden')
  }
}

function removeErroInput() {
  document.querySelector('.span-erro-height').classList.add('hidden')
  document.querySelector('.span-erro-weight').classList.add('hidden')
}

async function calculateImc() {
  setErroInputs()

  const height = +inputHeight.value.replace(',','.')
  const weight = +inputWeight.value.replace(',','.')

  if (!height && !weight) return

  const imcAtual = imcValue(height, weight)

  const data = await getDataImc()

  const infoImc = data.find(imc => imcAtual >= imc.min && imcAtual <= imc.max)?.info;

  if (!infoImc) {
    alert("IMC fora do intervalo registrado.");
    return;
  }
  
  spanImc.innerText = imcAtual
  spanCituation.innerText = infoImc

  switch (infoImc) {
    case "Abaixo do Peso":
      spanImc.classList.add('text-verder-claro')
      spanCituation.classList.add('text-verde-claro')
      break;
    case "Peso Ideal":
      spanImc.classList.add('text-verde')
      spanCituation.classList.add('text-verde')
      break;
    case "Levemente Acima do Peso":
      spanImc.classList.add('text-laranja-claro')
      spanCituation.classList.add('text-laranja-claro')
      break;
    case "Obesidade":
      spanImc.classList.add('text-laranja')
      spanCituation.classList.add('text-laranja')
      break;
    case "Obesidade (severa)":
      spanImc.classList.add('text-vermelho-claro')
      spanCituation.classList.add('text-vermelho-claro')
      break;
    case "Obesidade (morbida)":
      spanImc.classList.add('text-vermelho')
      spanCituation.classList.add('text-vermelho')
      break;
    default:
      break;
  }

  creatElement()
  showResults()
}

function clearInputs() {
  inputHeight.value = ""
  inputWeight.value = ""
  removeErroInput()
}

btnClear.addEventListener('click', clearInputs)

inputHeight.addEventListener('input',()=>{
  if (inputHeight.value.length === 0) {
    document.querySelector('.span-erro-height').classList.add('hidden')
  }
})

inputWeight.addEventListener('input',()=>{
  if (inputWeight.value.length === 0) {
    document.querySelector('.span-erro-weight').classList.add('hidden')
  }
})

btnBack.addEventListener('click', () =>{
  showResults()
  clearInputs()
})
btnCalc.addEventListener('click', calculateImc)