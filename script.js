let dividers = [];

function divider(name) {
  this.dividername = name;
  this.todolist = [];
  this.addTodo = (todoItem) => {
    this.todolist.push(todoItem);
  }
  this.todo = (title, description, priority) => {
    return {
      title,
      description,
      priority,

    }
  }
}

// const personal = new divider("personal");
// const gym = new divider("gym");
// todo1 = personal.todo("dr", "dentist", "high");
// todo2 = personal.todo("clun", "fun", "low");
// gym2 = gym.todo("legs","upper&lower", "medium")
// gym1 = gym.todo("cardio", "running", "high")
// gym.addTodo(gym1)
// personal.addTodo(todo1);
// gym.addTodo(gym2)
// personal.addTodo(todo2);
// dividers.push(personal);
// dividers.push(gym);
//
// for(let i in dividers){
//
//   if(dividers[i].dividername === 'personal')
//     dividers.splice(i, 1);
// }

window.addEventListener("load", () => {
  let storageDividers = JSON.parse(localStorage.getItem("dividers"));
  let tempName;
  for (let divider in storageDividers) {
    createDividers(storageDividers[divider].dividername);
  }
})
// event to add a new divider
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-divider-btn")) {
    document.querySelector(".add-divider-btn").classList.add("hideAddDivider")

    let newDividerSection = document.createElement("div");
    newDividerSection.classList.add("divider-format")
    newDividerSection.setAttribute("Id", "divider-format")
    let dividerInput = document.createElement("input");
    dividerInput.setAttribute("type", "text")
    dividerInput.classList.add("divider-input")
    newDividerSection.append(dividerInput);

    let dividerSection = document.createElement("div");
    dividerSection.classList.add("divider-section-format")
    let enter = document.createElement("button");
    enter.classList.add("enter-green-btn");
    enter.textContent = "Enter"
    let exit = document.createElement("button");
    exit.classList.add("exit-red-btn")
    exit.textContent = "Exit"
    dividerSection.append(enter);
    dividerSection.append(exit);

    newDividerSection.append(dividerSection)
    document.querySelector(".add-divider-btn").before(newDividerSection)
    event.stopPropagation();
  }
})

//event to confirm and name the divider or cancel new divider
document.addEventListener("click", (event) => {

  if (event.target.classList.contains("enter-green-btn")) {
    const newDivider = document.querySelector(".divider-input").value;
    if (newDivider != "") {
      createDividers(newDivider);
      document.querySelector("#divider-format").remove()
      document.querySelector(".add-divider-btn").classList.remove("hideAddDivider")
    } else {
      alert("Please Enter A Todo list Divider Name")
    }
  } else if (event.target.classList.contains("exit-red-btn")) {
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
    console.log(mainBody);
    let todo_divider = document.querySelector(".todo-divider-tab")

    if (todo_divider != null && todo_divider.firstElementChild.textContent === divider_name_content) {
      mainBody.remove(todo_divider);
    }
  }

})

// event to open a divider
document.addEventListener("click", (event) => {
  let mainBody = document.querySelector(".main-body");
  let todo_divider = document.querySelector(".todo-divider-tab")

  if (event.target.classList.contains("side-li")) {
    if (todo_divider != null && mainBody.firstElementChild === todo_divider) {
      todo_divider.remove()
      openDivider(mainBody, event);
    } else {
      openDivider(mainBody, event);
    }
  }
})

//create a todo item for a divider once the add is clicked within the main-body
document.addEventListener("click", (event) =>{
   let display = document.querySelector("#display");
   let messageBoxHeader = document.querySelector("#message-box-header");
   let dividerName = event.target.previousElementSibling.textContent
   // let sideli = document.querySelector(".side-li");
   // let dividerBtn = document.querySelector(".add-divider-btn");
   if(event.target.classList.contains("add-todo-item")){
       display.classList.add("active");
       messageBoxHeader.textContent = dividerName;

       // sideli.classList.add("side-li-disable");
       // dividerBtn.classList.add("add-divider-btn-disable";)
   }
})

//logic to open a divider to main body
function createDividers(newDivider) {
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

  let temp = new divider(newDivider);
  dividers.push(temp);

  localStorage.setItem('dividers', JSON.stringify(dividers));
}

//logic to open a divider if one is open close it first then open the clicked divider
function openDivider(mainBody, event) {
  let todoTab = document.createElement("div");
  todoTab.classList.add("todo-divider-tab");

  let dividerName = event.target.firstChild.textContent;
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

  let display = document.querySelector(".display");
  mainBody.insertBefore(todoTab, display);
}
