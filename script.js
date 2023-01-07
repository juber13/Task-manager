const addTaskBtn = document.querySelector('#add-btn');
const closeModalBtn = document.querySelector('.btn-warning');

const saveBtn = document.querySelector('.btn-primary');
const modalContainer = document.querySelector('.container-fluid')

const taskName = document.querySelector('#task-name');
const description =  document.querySelector('#description');
const option =  document.querySelector('#option-value');
const form = document.querySelector('#task-manager-form');

const cards =  document.querySelectorAll('.card');
// const items = document.querySelectorAll('.items');


const showModal = () => modalContainer.classList.add('active');
const closeModal = () => modalContainer.classList.remove('active');

let data = [];
function setToLocalStorage(items){
    data.push(items);
    localStorage.setItem('item-name' , JSON.stringify(data));
}

function getFromLocalStorage(){
    return JSON.parse(localStorage.getItem('item-name')) || [];
}

const datas = getFromLocalStorage();

function renderTask(e){
    var listElement = document.createElement('div');
    listElement.setAttribute('class' , 'items');
    listElement.setAttribute("draggable" , 'true');
    e.preventDefault();
    const value = taskName.value;
    const  optionValue  =  option.value;
    listElement.innerHTML = `<ul><li>${value}</li></ul>`;
    let curr = document.getElementById(`${optionValue}`);
    curr.appendChild(listElement);
    closeModal();
    const obj = {itemName : value , parentElement : optionValue};
    setToLocalStorage(obj);
    draggingFunction(listElement);
    return listElement;
}

function renderHTML(){
    let output = document.createElement('div');
    datas.forEach(data => {
        let currenCard = document.getElementById(`${data.parentElement}`);
        output.innerHTML =  `<div class="items" draggable="true"><ul><li>${data.itemName}</li></ul></div>`;
        currenCard.appendChild(output);
    })
    draggingFunction(output);
}

renderHTML();

function draggingFunction(element){
   element.addEventListener('dragstart' , () => element.classList.add('dragging'));
   element.addEventListener('dragend' , () => element.classList.remove('dragging'));    
}


cards.forEach((card) => {
    card.addEventListener('dragover' , () => {
        const draggingElement = document.querySelector('.dragging');
        card.appendChild(draggingElement);
    })
})



form.addEventListener('submit' , renderTask);
addTaskBtn.addEventListener("click" , showModal);
closeModalBtn.addEventListener("click" , closeModal);
window.addEventListener('keydown', function(e){
    if(e.key == 'Escape') closeModal();
})