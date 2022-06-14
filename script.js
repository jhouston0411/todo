// const todo = (title, description, dueDate) =>{
//   priority = " ";
//   const setPriority = (value) =>{
//     priority = value;
//   }
//   return { title, description, dueDate, setPriority};
// }
//
// const dividers = (name) =>{
//   const todo = [];
//   return {name, todo}
// }
let dividers = [];
function divider(name){
  this.name = name;
  this.todo = (title, description, priority) =>{
    return{title, description, priority}
  }
}

let person3 = new divider("person3")
let personal = new divider("personal");
let todo1 = personal.todo("g", "j", "k");
let todo2 = personal.todo("john")
console.log(todo1)
console.log(todo2)
localStorage.setItem("personal", JSON.stringify(todo1))
dividers.push(personal);
dividers.push(person3);
localStorage.setItem("dividers", JSON.stringify(dividers))

document.addEventListener("click", (event) =>{
   if(event.target.classList.contains("add-divider-btn")){
     document.querySelector(".add-divider-btn").classList.add("hideAddDivider")

     let newDivider = document.createElement("div");
     newDivider.classList.add("divider-format")
     let dividerInput = document.createElement("input");
     dividerInput.setAttribute("type", "text")
     dividerInput.classList.add("divider-input")
     newDivider.append(dividerInput);

     let dividerSection = document.createElement("div");
     dividerSection.classList.add("divider-section-format")
     let enter = document.createElement("button");
     enter.classList.add("enter-green-btn");
     enter.textContent =  "Enter"
     let exit = document.createElement("button");
     exit.classList.add("exit-red-btn")
     exit.textContent = "Exit"
     dividerSection.append(enter);
     dividerSection.append(exit);

     newDivider.append(dividerSection)
     document.querySelector(".add-divider-btn").before(newDivider)





   }
})
