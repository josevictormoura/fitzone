const btnCreateTable = document.querySelector('#btn-create-table')
const btnCloseModalCreateTable = document.querySelector('#close-modal')
const modalCreateTable = document.querySelector('#modal-create-table')
const modalCreateTreino = document.querySelector('#modal-create-treino')
const btnSaveTable = document.querySelector('#btn-save-table')
const dayWeek = document.querySelector('#day')
const containerTables = document.querySelector('.container-tables')
const btnCloseModalCreateTreino = document.querySelector('#close-modal-row')

const inputExercicio = document.querySelector('#exercicio');
const inputMusculo = document.querySelector('#musculo');
const inputRepeticoes = document.querySelector('#repeticoes');
const inputKg = document.querySelector('#kg');
const inputDescanso = document.querySelector('#descanso');

const setLocalStorage = (table) => localStorage.setItem('bdTreinos', JSON.stringify(table))
const getLocalStorage = () => JSON.parse(localStorage.getItem('bdTreinos')) ?? []

function createTreino(table) {
    const bdTreinos = getLocalStorage()
    bdTreinos.push(table)
    setLocalStorage(bdTreinos)
    console.log('Tabela de Treino Criada', table)
}

function createElementTable(table, index){
    const newTable = document.createElement('div')
    newTable.setAttribute('id', `table-${index}`)
    newTable.classList.add('overflow-x-auto')

    newTable.innerHTML = `
    <div class="flex justify-between items-center">
        <div class="text-xl italic font-normal text-start pt-0 px-2 pb-2">${table.day}</div>
        <div class="flex justify-end items-center gap-5 pr-2">
            <span class="font-semibold text-sm">Adicione uma nova linha</span>
            <button class="bg-blue-800 rounded-full border-none flex items-center justify-center
                 text-white cursor-pointer mb-1" onclick="addRowTable(${index})">
                <ion-icon name="add-outline" size="large"></ion-icon>
            </button>
        </div>
    </div>
    <table class="border-separate" id="table-content-${index}">
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

function updateScreenUer() {
    containerTables.innerHTML = ""
    const bdTreinos = getLocalStorage()

    bdTreinos.forEach((table, index) => {
        createElementTable(table, index)
        table.treinos.forEach(rowTable => {
            createElementRow(rowTable, index)
        })
    });
}

updateScreenUer()

function initCreateTable() {
    const dayValue = dayWeek.value
    if (dayValue && dayValue !== "") {
        const newTable = {day: dayValue, treinos: []};
        createTreino(newTable)
        updateScreenUer()
        showCloseModalCreateTable()
        clearFildDay()
    }else{
        alert('Por favor, ensira um dia valido!')
        showCloseModalCreateTable()
        clearFildDay()
    }
}

function clearFildDay() {
    dayWeek.value = ""
}

function createElementRow(treino, indexTable) {
    const tableBody = document.querySelector(`#table-${indexTable} tbody`)

    if (!tableBody) {
        console.error(`Não foi possível encontrar o tbody para a tabela com id #table-content-${indexTable}`);
        return;
    }
    
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td class="text-center border-none bg-slate-200 p-[5px] text-[12px] font-bold">${treino.musculo}</td>
        <td class="text-center border-none bg-slate-200 p-[5px] text-[12px] font-bold">${treino.exercicio}</td>
        <td class="text-center border-none bg-slate-200 p-[5px] text-[12px] font-bold">${treino.repeticoes}</td>
        <td class="text-center border-none bg-slate-200 p-[5px] text-[12px] font-bold">${treino.kg}</td>
        <td class="text-center border-none bg-slate-200 p-[5px] text-[12px] font-bold">${treino.descanso}</td>
        <td class="flex gap-2 items-center bg-slate-200 p-[5px] justify-center *:cursor-pointer *:p-[5px] *:rounded-full">
            <ion-icon class="icon edit-icon hover:text-green-950 hover:bg-green-300 text-lg" name="create-outline"></ion-icon>
            <ion-icon class="icon delete-icon hover:text-red-950 hover:bg-red-300 text-lg" name="trash-outline"></ion-icon>
        </td>
    `;
    tableBody.appendChild(tr);
}

function addRowTable(index) {
    showCloseModalCreateTreino();
    const form = document.querySelector('#form-treino');
    form.onsubmit = event => {
        event.preventDefault();
        saveTreinoRow(index);
    };
}

function isDadosFormValid() {
    const form = document.querySelector('#form-treino')
    return form.reportValidity()
}

function saveTreinoRow(index) {
    if (isDadosFormValid()) {
        const treinoRow = {
            musculo: inputMusculo.value,
            exercicio: inputExercicio.value,
            repeticoes: inputRepeticoes.value,
            kg: inputKg.value,
            descanso: inputDescanso.value
        };

        const bdTreinos = getLocalStorage();
        bdTreinos[index].treinos.push(treinoRow);
        setLocalStorage(bdTreinos);

        updateScreenUer();
        clearFildsForm();
        showCloseModalCreateTreino();
    }
}

function clearFildsForm() {
    inputMusculo.value = '';
    inputExercicio.value = '';
    inputRepeticoes.value = '';
    inputKg.value = '';
    inputDescanso.value = ''; 
}

const showCloseModalCreateTable = () => {
    modalCreateTable.classList.toggle('hidden')
    modalCreateTable.classList.toggle('flex')
}

const showCloseModalCreateTreino = () =>{
    modalCreateTreino.classList.toggle('hidden')
    modalCreateTreino.classList.toggle('flex')
}

btnCreateTable.addEventListener('click', showCloseModalCreateTable)
btnCloseModalCreateTable.addEventListener('click', showCloseModalCreateTable)
btnCloseModalCreateTreino.addEventListener('click', showCloseModalCreateTreino)
btnSaveTable.addEventListener('click', initCreateTable)