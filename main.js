const taskName = document.querySelector('#inputName');
const priority = document.querySelector('#inputPriority');
const addButton = document.querySelector('#addButton');
const boxContent = document.querySelector('#box-content')

addButton.addEventListener('click', ()=>{
    addTask();
})

let array = [];

eventListeners();

function eventListeners(){
    document.addEventListener('DOMContentLoaded', () => {
        array = JSON.parse(localStorage.getItem('Tasks')) || [];
        createElement();
    })
}


function addTask(){
    const task = taskName.value;
    if(task === ''){
        alert('campo vacio');
        return;
    }
    const ObjectTask = {
        task,
        id: `${taskName.value.slice(0,2)}_${Date.now()}`,
    }

    array = [...array, ObjectTask]
    console.log(array);
    createElement();
}

function createElement(){
    resetItems();
    if(array.length > 0){
        array.forEach( (task)=>{
            const article = document.createElement('article');
            const iPriority = document.createElement('i');
            const title = document.createElement('h3');
            const iDelete = document.createElement('i');

            iDelete.addEventListener('click', (e)=>removeTask(e)
            )

            article.className = 'd-flex align-items-center border-bottom mt-2';


            if(priority.value === 'unselect'){
                iPriority.className = "bi bi-exclamation-diamond-fill fs-4 p-2 mt-2 text-success";
            } else if (priority.value === 'urgente'){
                iPriority.className = "bi bi-exclamation-diamond-fill fs-4 p-2 mt-2 text-danger";
            } else if (priority.value === 'intermedia'){
                iPriority.className = "bi bi-exclamation-diamond-fill fs-4 p-2 mt-2 text-warning";
            } else {
                iPriority.className = "bi bi-exclamation-diamond-fill fs-4 p-2 mt-2 text-success";
            }
            title.innerHTML = `${task.task}`
            title.className = "text-start me-auto fs-5 mt-3";


            iDelete.className = "bi bi-trash-fill fs-3 text-danger pointer";
            iDelete.dataset.id = task.id;

            article.append(iPriority, title, iDelete)
            boxContent.append(article);
        })
    } 
    sincLocalS();
}

function resetItems(){
    boxContent.innerHTML = "";
    taskName.value = "";
    taskName.focus();
}

function removeTask(e){
    console.log(e.target.dataset.id);
    array = array.filter( (task)=>{
        return task.id !== parseInt(e.target.dataset.id);
    })
    console.log(array);
    createElement();
}

function sincLocalS(){
    localStorage.setItem('Tasks', JSON.stringify(array));
}


