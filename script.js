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
      priority
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

// event to add a new divider
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-divider-btn")) {
    document.querySelector(".add-divider-btn").classList.add("hideAddDivider")

    let newDivider = document.createElement("div");
    newDivider.classList.add("divider-format")
    newDivider.setAttribute("Id", "divider-format")
    let dividerInput = document.createElement("input");
    dividerInput.setAttribute("type", "text")
    dividerInput.classList.add("divider-input")
    newDivider.append(dividerInput);

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

    newDivider.append(dividerSection)
    document.querySelector(".add-divider-btn").before(newDivider)
    event.stopPropagation();
  }
})
//event to name the divider or cancel
document.addEventListener("click", (event) => {

  if (event.target.classList.contains("enter-green-btn")) {
    const newDivider = document.querySelector(".divider-input").value;
    if (newDivider != "") {
      let temp = new divider(newDivider);
      dividers.push(temp);
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
    let divider_parent_node = event.target.parentNode;
    dividers.splice(dividers.indexOf(delete_divider_name), 1);
    divider_parent_node.remove();
  }
})
