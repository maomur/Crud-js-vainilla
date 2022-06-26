//CRUD VAINLA JAVASCRIPT 

//Cazar Elementos
const taskName = document.querySelector('#inputName');
const priority = document.querySelector('#inputPriority');
const addButton = document.querySelector('#addButton');
const search = document.querySelector('#inputSearch');
const selectFilter = document.querySelector('#inputSelectFilter');
const boxContent = document.querySelector('#box-content');
const searchButton = document.querySelector('#searchButton');

let array = [];

eventListeners();
selectFilter.addEventListener('change', () => filterPriority())


addButton.addEventListener('click', ()=>{
    addTask();
    taskName.focus();
})


search.addEventListener('keyup', ()=>{
    console.clear();
     searchTask();
 })


function eventListeners(){
    document.addEventListener('DOMContentLoaded', () => {
        array = JSON.parse(localStorage.getItem('Tasks')) || [];
        createElement();
    })
}


function addTask(){
    const task = taskName.value;
    if(task === '' || !isNaN(task)){
        alertSuccessFuncion('Error: no has ingresado una tarea válida.', 'alert-danger', 'text-ligth')
        return; 
    }
    const ObjectTask = {
        task,
        id: `${taskName.value.slice(0,2)}_${Date.now()}`,
        priorityS: priority.value,
    }
    array = [...array, ObjectTask]
    alertSuccessFuncion('Registro creado con éxito', 'alert-success', 'text-ligth');
    createElement();
}


function createElement(){
    resetItems();
    if(array.length > 0){
        array.forEach( (task)=>{
            const article = document.createElement('article');
            let iPriority = document.createElement('i');
            const title = document.createElement('h3');
            const iDelete = document.createElement('i');

            iDelete.addEventListener('click', (e)=>removeTask(e)
            )

            article.className = 'd-flex align-items-center border-bottom mt-2 myArticle';

            if(task.priorityS === 'unselect'){
                iPriority.className = "bi bi-exclamation-diamond-fill fs-4 p-2 mt-2 text-muted";
            } else if (task.priorityS === 'urgentes'){
                iPriority.className = "bi bi-bell-fill fs-4 p-2 mt-2 text-danger";
            } else if (task.priorityS === 'intermedias'){
                iPriority.className = "bi bi-bell-fill fs-4 p-2 mt-2 text-warning";
            } else {
                iPriority.className = "bi bi-bell-fill fs-4 p-2 mt-2 text-success";
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
}


function removeTask(e){
    array = array.filter( (task)=>{
        return task.id !== e.target.dataset.id;
    })
    alertSuccessFuncion('Registro Eliminado', 'alert-danger', 'text-ligth');
    createElement();
}


function filterPriority(){
    resetItems();

    if(selectFilter.value === "unselect"){
        createElement()
    }

    newArray = array.filter( (task)=> {return task.priorityS === selectFilter.value});

    newArray.forEach( (task)=>{
        const article = document.createElement('article');
        let iPriority = document.createElement('i');
        const title = document.createElement('h3');
        const iDelete = document.createElement('i');

        iDelete.addEventListener('click', (e)=>removeTask(e)
        )

        article.className = 'd-flex align-items-center border-bottom mt-2 myArticle';

        if(task.priorityS === 'unselect'){
            iPriority.className = "bi bi-exclamation-diamond-fill fs-4 p-2 mt-2 text-muted";
        } else if (task.priorityS === 'urgentes'){
            iPriority.className = "bi bi-bell-fill fs-4 p-2 mt-2 text-danger";
        } else if (task.priorityS === 'intermedias'){
            iPriority.className = "bi bi-bell-fill fs-4 p-2 mt-2 text-warning";
        } else {
            iPriority.className = "bi bi-bell-fill fs-4 p-2 mt-2 text-success";
        }

        title.innerHTML = `${task.task}`
        title.className = "text-start me-auto fs-5 mt-3";


        iDelete.className = "bi bi-trash-fill fs-3 text-danger pointer";
        iDelete.dataset.id = task.id;

        article.append(iPriority, title, iDelete)
        boxContent.append(article);
    })
sincLocalS();
}


function searchTask(){   
    resetItems();
    array.forEach( (task)=>{
        const taskSearched = search.value.toLowerCase();
        const taskArray = task.task.toLowerCase();
        if(taskArray.indexOf(taskSearched) != -1){
            
            const article = document.createElement('article');
        let iPriority = document.createElement('i');
        const title = document.createElement('h3');
        const iDelete = document.createElement('i');

        iDelete.addEventListener('click', (e)=>removeTask(e)
        )

        article.className = 'd-flex align-items-center border-bottom mt-2 myArticle';

        if(task.priorityS === 'unselect'){
            iPriority.className = "bi bi-exclamation-diamond-fill fs-4 p-2 mt-2 text-muted";
        } else if (task.priorityS === 'urgentes'){
            iPriority.className = "bi bi-bell-fill fs-4 p-2 mt-2 text-danger";
        } else if (task.priorityS === 'intermedias'){
            iPriority.className = "bi bi-bell-fill fs-4 p-2 mt-2 text-warning";
        } else {
            iPriority.className = "bi bi-bell-fill fs-4 p-2 mt-2 text-success";
        }

        title.innerHTML = `${task.task}`
        title.className = "text-start me-auto fs-5 mt-3";


        iDelete.className = "bi bi-trash-fill fs-3 text-danger pointer";
        iDelete.dataset.id = task.id;

        article.append(iPriority, title, iDelete)
        boxContent.append(article);                   

        } 
        })
}


function sincLocalS(){
    localStorage.setItem('Tasks', JSON.stringify(array));
}


function alertSuccessFuncion(mensaje = "Ha ocurrido un error", color = ''){
    const alertS = document.createElement('div');
    alertS.className = `alert alert-success fade show alert-style ${color}`;
    alertS.setAttribute('role', 'alert');
    alertS.innerHTML = `
    ${mensaje}`;
    document.body.prepend(alertS);
    setTimeout( ()=> {
        alertS.remove();
      }, 3000)
}

