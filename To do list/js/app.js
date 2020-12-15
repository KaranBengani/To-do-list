// select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const input = document.getElementById("input");

// DATE
const options = { weekday : "long" , month : "short" , day: "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US" , options); 

// add variable

let LIST , id;
// if local is not used then 
// use LIST = [] , id = 0;
// local storage

// localStorage.setItem("TODO", JASO.stringify(LIST));

// above id++ and the remove to

// get item from local storage
let data = localStorage.getItem("TODO");
// data empty check
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // id will be the last one in the list
    loadList(LIST);     // load the list to the user interface
}else{
    LIST = [];  // data empty if
    id = 0;
}

// load items to the user interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name , item.id , item.done , item.trash);
    });
}

// to clear local storage
clear.addEventListener("click" , function(){
    localStorage.clear();
    location.reload();
});

// Add a to do

const CHECK = "fa-check-circle";
const UNCHECK ="fa-circle-thin";
const LINE_THROUGH = "lineThrough";

const list = document.getElementById("list");

function addToDo(toDo, id , done ,trash ){

    if(trash){return;}
    const DONE = done ? CHECK :  UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">                        <i class ="fa ${DONE} co" job= "complete" id="${id}"></i>                        <p class="text ${LINE}">${toDo}</p>                        <i class="fa fa-trash-o de" job= "delete" id="${id}"></i>                    </li>`;
	
    
//     const item = '<div>
//     <li class="item">
//     <i class ="fas ${DONE} complete" job= "complete" id="${id}"></i>
//     <p class="text ${LINE}">${todo}</p>
//     <i class="fas fa-trash" job= "delete" id="${id}"></i>    
// </li>
// </div>
// ';

 
    const position= "beforeend";
    
    list.insertAdjacentHTML(position,item);

}

// add an item to the list when user press enter key


document.addEventListener("keyup",function(event){

    if(event.defaultPrevented){
        return;   
    }
    console.log(event.keyCode)
    if(key === 13)
    {
        const toDo =input.Value;
        if(toDo){
            addToDo(toDo,id , false, false);
            LIST.push(
                {
                    name:toDo,
                    id: id,
                    done: false,
                    trash : false
                }
            );
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.Value="";
    }
});
// store a to do
// list = [];
// id = 0 ;
// list[0] ->
// {
//     name : "drink coffee",
//     id : 0,
//     done : false,
//     trash : false
// }
// Complete to do
addToDo("coffee",1,false , false);


function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false :true;

}

// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}
// target the items 

list.addEventListener("click",function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete"){
        completeToDo(element);
    }
    else if(elementJob == "delete"){
        removeToDo(element);
    }

    localStorage.setItem("TODO", JSON.stringify(LIST));
});

