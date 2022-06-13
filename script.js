const todo = (title, description, dueDate) =>{
  priority = " ";
  const setPriority = (value) =>{
    priority = value;
  }
  return { title, description, dueDate, setPriority};
}

document.addEventListener("click", (event) =>{
  if(event.target.classList.contains("add-divider")){
     let newDivider = document.createElement("div");
     newDivider.classList.add("Divider");
     let display = document.querySelector(".display");

  }
})
