const todoListContainer = document.querySelector(".todolist-container");
const todoInput = document.querySelector(".todo-input");
const addToDoListButton = document.querySelector(".add-todolist-button");
const clearToDoListButton = document.querySelector(".clear-todolist-button");
const searchInList = document.getElementById("searchInList");
const date = new Date();
let todoList;
let list = "";
let counter = 0;

function createToDoList() {
    const title = document.createElement("h1");
    title.textContent = "Listeniz";
    title.classList.add("list-title");
    todoList = document.createElement("ul");
    todoList.classList.add("todo-list");
    todoListContainer.appendChild(title);
    todoListContainer.appendChild(todoList);
}

function addToDo(todo){
    if (todoList == undefined && todo != "") {
        createToDoList();
        searchInList.style.display = "inline-block";
    }
    const inputMessage = document.querySelector(".input-message");
    if(!todo) {
        inputMessage.textContent = "*** Lütfen boş bırakmayınız ***";
        inputMessage.style.color = "red";
        return;
    } else{
        const li = document.createElement("li");
        li.textContent = todo.trim();
        todoList.appendChild(li);
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "SİL";
        li.appendChild(deleteButton);

        deleteButton.addEventListener("click", function() {
            list = list.replaceAll(li.textContent.trim().replace(deleteButton.textContent,"") + ",", "");
            localStorage.setItem("list", list);
            todoList.removeChild(li);
            counter--;
            const listTitle = document.querySelector(".list-title");
            listTitle.textContent = `Listeniz (${counter} adet)`;

            if (counter === 0) {
                searchInList.style.display = "none";
                todoList.style.display = "none";
                listTitle.style.display = "none";
            }
        });

        todoInput.value = "";
        inputMessage.textContent = "";
        list += todo.trim() + ",";
        localStorage.setItem("list", list);
        counter++;
        const listTitle = document.querySelector(".list-title");
        listTitle.textContent = `Listeniz (${counter} adet)`;
    }
}

function searchFilter() {
    const searchTerm = searchInList.value.toLowerCase();
    const listItems = document.querySelectorAll(".todo-list li");

    listItems.forEach(function(item){
        if(item.textContent.toLocaleLowerCase().includes(searchTerm)) {
            item.style.display = "";
        }else{
            item.style.display = "none";
        }
    });
}

window.addEventListener("load", function() {
    if(localStorage.getItem("list") != null) {
        let listArray = localStorage.getItem("list").split(",");
        listArray.forEach(function(item) {
            if (item.trim()) { // Boş olmayan öğeleri kontrol et
                addToDo(item);
            }
        });
    }

    addToDoListButton.addEventListener("click", function(){
        let todoText = String(todoInput.value).trim();
        addToDo(todoText);
    });

    clearToDoListButton.addEventListener("click", function(){
        if(list.length>0 && counter>0) {
            let isConfirm = confirm("Listenizi silmek üzeresiniz.\nEmin misiniz?");
            if(isConfirm){
                list = "";
                localStorage.clear();
                location.reload();
            }
        } else{
            alert("Silinecek bir mesaj yok.");
        }
    });

    searchInList.addEventListener("input", searchFilter);

    todoInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addToDoListButton.click();
        }
    });
});