const btnCreateTable = document.querySelector('#btn-create-table')
const btnCloseModalCreateTable = document.querySelector('#close-modal')
const modalCreateTable = document.querySelector('#modal-create-table')
const btnSaveTable = document.querySelector('#btn-save-table')
const dayWeek = document.querySelector('#day')
const containerTables = document.querySelector('.container-tables')

const showCloseModalCreateTable = () => {
    modalCreateTable.classList.toggle('hidden')
    modalCreateTable.classList.toggle('flex')
}

const setLocalStorage = (table) => localStorage.setItem('bdTreinos', JSON.stringify(table))
const getLocalStorage = () => JSON.parse(localStorage.getItem('bdTreinos')) ?? []

function createTreino(table) {
    const bdTreinos = getLocalStorage()
    bdTreinos.push(table)
    setLocalStorage(bdTreinos)
    console.log('Tabela de Treino Criada', table)
}

function initCreateTable() {
    const dayValue = dayWeek.value
    if (dayValue && dayValue !== "") {
        const newTable = {day: dayValue, treinos: []};
        createTreino(newTable)
        updateScreenUer()
        clearFildDay()
        showCloseModalCreateTable()
    }else{
        alert('Por favor, ensira um dia valido!')
        clearFildDay()
        showCloseModalCreateTable()
    }
}

function clearFildDay() {
    dayWeek.value = ""
}

function updateScreenUer() {
    containerTables.innerHTML = ""
    const bdTreinos = getLocalStorage()

    bdTreinos.forEach((table, index) => {
        createElementTable(table, index)
    });
}

updateScreenUer()

function createElementTable(table, index){
    const newTable = document.createElement('div')
    newTable.setAttribute('id', `table-${index}`)
    newTable.classList.add('overflow-x-auto')

    newTable.innerHTML = `
        <div class="flex justify-between items-center">
            <div class="text-xl italic font-normal text-start pt-0 px-2 pb-2">${table.day}</div>
            <div class="flex justify-end items-center gap-5 pr-2">
                <span class="font-semibold text-sm">Adicione uma nova linha</span>
                <button class="bg-blue-800 rounded-full border-none flex items-center justify-center text-white cursor-pointer mb-1" onclick="adicionarLinhaTabela(${index})">
                    <ion-icon name="add-outline" size="large"></ion-icon>
                </button>
            </div>
        </div>
        <table class="border-separate" id="table-${index}">
            <thead>
                <tr class="*:bg-[#48cfff] *:border-none *:text-[rgb(2_2_56)] *:p-[10px] *:text-[15px]">
                    <th>MÚSCULOS</th>
                    <th>EXERCÍCIOS</th>
                    <th>REPETIÇÕES</th>
                    <th>Kg</th>
                    <th>DESCANSO</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    `;

    containerTables.appendChild(newTable)
} 

btnCreateTable.addEventListener('click', showCloseModalCreateTable)
btnCloseModalCreateTable.addEventListener('click', showCloseModalCreateTable)
btnSaveTable.addEventListener('click', initCreateTable)