let dividers = [];

function divider(name) {
  this.dividername = name;
  this.todolist = [];
  this.addTodo = (todoItem) => {
    this.todolist.push(todoItem);
  }
  this.todo = (title, description, priority, duedate) => {
    return {
      title,
      description,
      priority,
      duedate

    }
  }
}

window.addEventListener("load", () => {
  let storageDividers = JSON.parse(localStorage.getItem("dividers"));
  let storedDivider;

  if (storageDividers.length === 0) {
       let today = new divider("Today");
       dividers.push(today);
       createDividers(today.dividername)
  } else {
    for (let stored in storageDividers) {
      storedDivider = new divider(storageDividers[stored].dividername);
      storedDivider.todolist = storageDividers[stored].todolist;
      dividers.push(storedDivider);
      createDividers(storedDivider.dividername);
    }
  }
  event.stopPropagation();
})

//need to put event listener on divider name so it will bubble up to side-li

// event to add a new divider
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-divider-btn")) {
    document.querySelector(".add-divider-btn").classList.add("hideAddDivider")

    let newDividerSection = document.createElement("div");
    newDividerSection.classList.add("divider-format")
    newDividerSection.setAttribute("Id", "divider-format")
    let dividerInput = document.createElement("input");
    dividerInput.setAttribute("type", "text")
    dividerInput.setAttribute("placeholder", "Enter todo Item here")
    dividerInput.classList.add("divider-input")
    newDividerSection.append(dividerInput);

    let dividerSection = document.createElement("div");
    dividerSection.classList.add("divider-section-format")
    let enter = document.createElement("button");
    enter.classList.add("submit-green-btn");
    enter.textContent = "Submit"
    let exit = document.createElement("button");
    exit.classList.add("cancel-red-btn")
    exit.textContent = "Cancel"
    dividerSection.append(enter);
    dividerSection.append(exit);

    newDividerSection.append(dividerSection)
    document.querySelector(".add-divider-btn").before(newDividerSection)
    event.stopPropagation();
  }
})

//event to confirm and name the divider or cancel new divider
document.addEventListener("click", (event) => {

  if (event.target.classList.contains("submit-green-btn")) {
    let newDivider = document.querySelector(".divider-input").value;
    if (newDivider != "") {
      let temp = newDivider;
      createDividers(newDivider);
      document.querySelector("#divider-format").remove()
      document.querySelector(".add-divider-btn").classList.remove("hideAddDivider")
      temp = new divider(newDivider);
      dividers.push(temp);
      localStorage.setItem('dividers', JSON.stringify(dividers));
    } else {
      alert("Please Enter A Todo list Divider Name")
    }
  } else if (event.target.classList.contains("cancel-red-btn")) {
    document.querySelector("#divider-format").remove()
    document.querySelector(".add-divider-btn").classList.remove("hideAddDivider")
  }

  event.stopPropagation();
})

// event to delete a divider
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-x")) {
    let delete_divider_name = event.target.previousElementSibling;
    let divider_name_content = delete_divider_name.textContent;

    let divider_parent_node = event.target.parentNode;
    for (let i in dividers) {
      if (dividers[i].dividername === divider_name_content)
        dividers.splice(i, 1);
    }
    localStorage.setItem('dividers', JSON.stringify(dividers));
    divider_parent_node.remove();


    //if the divider is opened in main-body delete that as well
    let mainBody = document.querySelector(".main-body").firstElementChild;
    let todo_divider = document.querySelector(".todo-divider-tab")

    if (todo_divider != null && todo_divider.firstElementChild.textContent === divider_name_content) {
      mainBody.remove(todo_divider);
    }
  }
  event.stopPropagation();
})

// event to open a divider
document.addEventListener("click", (event) => {
  let mainBody = document.querySelector(".main-body");
  let todo_divider = document.querySelector(".todo-divider-tab")

  if (event.target.classList.contains("side-li")) {
    let dividerTitle = event.target.firstChild.textContent
    if (todo_divider != null && mainBody.firstElementChild === todo_divider) {
      todo_divider.remove()

      openDivider(mainBody, dividerTitle);
    } else {
      openDivider(mainBody, dividerTitle);
    }
  }
  event.stopPropagation();
})

//create a todo item for a divider once the add is clicked within the main-body
document.addEventListener("click", (event) => {
  let todoDividerContainer = document.querySelector(".todoDividerContainer")
  let display = document.querySelector("#display");
  let messageBoxHeader = document.querySelector("#message-box-header");
  let todoBoxItems = document.querySelectorAll(".todo-Box")

  let sideli = document.querySelector(".divider-ul-list");
  let dividerBtn = document.querySelector(".add-divider-btn");

  if (event.target.classList.contains("add-todo-item")) {
    let dividerName = document.querySelector(".todoH2").textContent;
    display.classList.add("active");
    messageBoxHeader.textContent = `${dividerName} Todo Item`;


    // while (todoDividerContainer.firstChild) {
    //   todoDividerContainer.removeChild(todoDividerContainer.firstChild);
    // }

    // disable adding new divider and opening a new divider until user is done with new todo form
    sideli.classList.add("side-li-disable");
    dividerBtn.classList.add("add-divider-btn-disable");
  }
  event.stopPropagation();
})

//event to save todo item to divider
document.addEventListener("click", (event) => {
  let display = document.querySelector("#display");
  let todoDividerContainer = document.querySelector(".todoDividerContainer")
  let sideli = document.querySelector(".divider-ul-list");
  let dividerBtn = document.querySelector(".add-divider-btn");
  let form = new FormData(document.querySelector(".todo-form"));


  if (event.target.classList.contains("form-btn-submit")) {
    let dividerName = document.querySelector(".todoH2").textContent;
    let title = form.get("title");
    let description = form.get("description");
    let priority = form.get("priority");
    let duedate = form.get("duedate");

    if (title === "") {
      return;
    }

    for (let dividerItem in dividers) {
      if (dividers[dividerItem].dividername === dividerName) {
        let tempDivider = dividers[dividerItem];
        let tempTitle = title;
        tempTitle = tempDivider.todo(title, description, priority, duedate);
        tempDivider.addTodo(tempTitle);
        localStorage.setItem('dividers', JSON.stringify(dividers));

        //clear form and close popUp window
        document.querySelector(".todo-form").reset();
        display.classList.remove("active")
        sideli.classList.remove("side-li-disable");
        dividerBtn.classList.remove("add-divider-btn-disable");
        let todoBoxItems = document.querySelectorAll(".todo-Box")

        event.preventDefault();
        populateTodoItems(tempDivider);
      }
    }
  } else if (event.target.classList.contains("form-btn-cancel")) {
    display.classList.remove("active")
    sideli.classList.remove("side-li-disable");
    dividerBtn.classList.remove("add-divider-btn-disable");
  }

})


// event to handle deleting a todo item
document.addEventListener("click", (event) => {

  if (event.target.classList.contains("trashTodo")) {
    let mainDivider = document.querySelector(".todoH2").textContent;
    let parentRemove = event.target.parentNode.parentNode;
    let todoListItem = event.target.parentNode.parentNode.firstElementChild.lastElementChild.textContent
    parentRemove.remove();

    for (let tempDivider in dividers) {
      if (mainDivider === dividers[tempDivider].dividername) {
        for (let tempTodo in dividers[tempDivider].todolist) {

          if (todoListItem === dividers[tempDivider].todolist[tempTodo].title) {

            dividers[tempDivider].todolist.splice(tempTodo, 1)
            localStorage.setItem('dividers', JSON.stringify(dividers));
          }
        }

      }

    }
  }
})

//logic to add divider to side-ul
function createDividers(newDivider) {
  let mainBody = document.querySelector(".main-body");
  let display = document.querySelector(".display");

  let newLi = document.createElement("li");
  newLi.classList.add("side-li")
  let div = document.createElement("div");
  div.setAttribute("class", "divider-name")
  div.append(document.createTextNode(newDivider))
  let i = document.createElement("i")
  i.setAttribute("class", "delete-divider")
  i.classList.add("fa-solid");
  i.classList.add("fa-x")
  newLi.append(div);
  newLi.append(i)
  document.querySelector(".divider-ul-list").append(newLi);

  //if the mainbody is empty open the divider
  if (mainBody.firstElementChild === display) {
    openDivider(mainBody, newDivider);
  }

}

//logic to open a divider if one is open close it first then open the clicked divider
function openDivider(mainBody, dividerTitle) {
  let todoTab = document.createElement("div");
  todoTab.classList.add("todo-divider-tab");

  let dividerName = dividerTitle;
  let todo_head = document.createElement("div")
  todo_head.classList.add("todo-head-format")
  let todoH2 = document.createElement("h2");
  let i = document.createElement("i")
  i.setAttribute("class", "add-todo-item")
  i.classList.add("fa-solid");
  i.classList.add("fa-plus")
  todoH2.classList.add("todoH2");
  todoH2.append(document.createTextNode(dividerName));
  todo_head.append(todoH2);
  todo_head.append(i)
  todoTab.append(todo_head);
  let todoDividerContainer = document.createElement("div");
  todoDividerContainer.setAttribute("class", "todoDividerContainer");
  todoTab.append(todoDividerContainer);

  let display = document.querySelector(".display");
  mainBody.insertBefore(todoTab, display);

  //event to populate the first divider todo list moved to main body
  for (let temp in dividers) {
    if (dividers[temp].dividername === dividerTitle) {
      populateTodoItems(dividers[temp]);
    }
  }

}

//function to populate a todo item on main body
function populateTodoItems(tempDivider) {
  let todoDividerContainer = document.querySelector(".todoDividerContainer")
  todoDividerContainer.innerHTML = "";
  for (todoItem in tempDivider.todolist) {

    let todoBox = document.createElement("div");
    todoBox.classList.add("todo-Box");

    let titleTodoField = document.createElement("div");
    titleTodoField.classList.add("divTodoField");
    let titleh4 = document.createElement("h4");
    titleh4.classList.add("todoh4");
    let titleInfo = document.createElement("h4");
    titleInfo.setAttribute("class", "todoListTitle")
    titleInfo.classList.add("userInfo")

    let descriptionTodoField = document.createElement("div");
    descriptionTodoField.classList.add("divTodoField");
    let descriptionh4 = document.createElement("h4");
    descriptionh4.classList.add("todoh4");
    let descriptionInfo = document.createElement("h4");
    descriptionInfo.classList.add("userInfo");

    let priorityField = document.createElement("div");
    priorityField.classList.add("divTodoField");
    let priorityh4 = document.createElement("h4");
    priorityh4.classList.add("todoh4");
    let priorityInfo = document.createElement("h4");
    priorityInfo.classList.add("userInfo")

    let dueDateField = document.createElement("div");
    dueDateField.classList.add("divTodoField");
    let duedateh4 = document.createElement("h4");
    duedateh4.classList.add("todoh4");
    let duedateInfo = document.createElement("h4");
    duedateInfo.classList.add("userInfo");

    let todoOptions = document.createElement("div");
    todoOptions.classList.add("todoOptions");
    let trashTodo = document.createElement("div");
    trashTodo.setAttribute("class", "fa-solid fa-trash-can");
    trashTodo.style.color = "red";
    trashTodo.classList.add("trashTodo")
    // let todoComplete = document.createElement("input");
    // todoComplete.classList.add("todoComplete")
    // todoComplete.setAttribute("type", "radio");
    todoOptions.append(trashTodo)

    if (tempDivider.todolist[todoItem].title) {
      titleh4.append(document.createTextNode("Todo:"));
      titleInfo.append(document.createTextNode(`${tempDivider.todolist[todoItem].title}`));
      titleTodoField.append(titleh4, titleInfo);
    }
    if (tempDivider.todolist[todoItem].description) {
      descriptionh4.append(document.createTextNode("Description:"));
      descriptionInfo.append(document.createTextNode(`${tempDivider.todolist[todoItem].description}`));
      descriptionTodoField.append(descriptionh4, descriptionInfo);
    }
    if (tempDivider.todolist[todoItem].priority) {
      priorityh4.append(document.createTextNode("Priority:"));
      priorityInfo.append(document.createTextNode(`${tempDivider.todolist[todoItem].priority}`));
      priorityField.append(priorityh4, priorityInfo);
    }
    if (tempDivider.todolist[todoItem].duedate) {
      duedateh4.append(document.createTextNode("Duedate:"));
      duedateInfo.append(document.createTextNode(`${tempDivider.todolist[todoItem].duedate}`));
      dueDateField.append(duedateh4, duedateInfo);
    }

    todoBox.append(titleTodoField, descriptionTodoField, priorityField, dueDateField, todoOptions);
    todoDividerContainer.append(todoBox)

  }
}
