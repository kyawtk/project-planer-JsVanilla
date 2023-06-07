import { manageProjects } from "./manageProject";
import { manageTodos } from "./manageTodos";

const UI = (function () {
  // DOM elements
  const projectList = document.getElementById("project-list");
  const todoList = document.getElementById("todo-list");
  const todoDetails = document.getElementById("todo-details");

  function renderProjectForm() {
    let projectFormContainer = document.createElement("div");
    projectFormContainer.classList.add("project-form-container");

    // create the project input form
    let projectForm = document.createElement("form");
    projectForm.classList.add("project-form");
    //creat the project name in put

    const projectLabel = document.createElement("label");
    projectLabel.textContent = "Create New Project here :";
    const projectInput = document.createElement("input");
    projectInput.required = true;
    projectInput.type = "text";
    projectInput.name = "name";
    projectLabel.appendChild(projectInput);

    //create submit button

    let creatProjectbtn = document.createElement("button");
    creatProjectbtn.type = "submit";
    creatProjectbtn.textContent = "Create Project";
    projectForm.addEventListener("submit", (e) => {
      e.preventDefault();

      let myformData = Object.fromEntries(new FormData(e.target).entries());
      console.log(myformData);
      manageProjects.createProject(myformData.name)
      projectForm.reset();
      renderProjectList(manageProjects.getAllProjects())
      updateProjectSelectList(manageProjects.getAllProjects())

    });

    projectForm.appendChild(projectLabel);
    projectForm.appendChild(creatProjectbtn);
    projectFormContainer.appendChild(projectForm);

    projectList.appendChild(projectFormContainer);
  }
   
  function updateProjectSelectList(newListofProjects){
     
      const projectSelect = document.querySelector("select[name='project']");
    projectSelect.innerHTML = "";
    for (let project of newListofProjects) {
      const projectOption = document.createElement("option");
      projectOption.value = project.name;
      projectOption.textContent = project.name;
      projectSelect.appendChild(projectOption);
    }
  }

  
  function renderProjectList(projects) {
    projectList.innerHTML = ""
    let projectItem = document.createElement("h2");
    projectItem.classList.add("project-list-item");

    for (let project of projects) {
      let h1 = document.createElement("h1");
      h1.innerText = project.name;
      h1.classList.add("project-list-item");

      h1.addEventListener("click", () => {
        renderProjectTodoList(project);
      });

      projectList.appendChild(h1);
    }
    renderProjectForm();
  }

  function renderProjectTodoList(project) {
    todoList.innerHTML = ``;

    let projectName = project.name;
    let projectTodos = project.todos;

    let h1 = document.createElement("h1");
    h1.innerText = projectName;
    todoList.appendChild(h1);
    for (let todo of projectTodos) {
      let todoitem = document.createElement("div");
      todoitem.innerHTML = `${todo.title} <button class='delete-btn'>Delete</button>`;

      let delbtn = todoitem.querySelector(".delete-btn");
      delbtn.addEventListener("click", (e) => {
        e.stopPropagation();
        console.log("dele-btn aalled");
        manageTodos.deleteTodo(project, todo);
        renderTodoDetails("");
        renderProjectTodoList(project);
      });

      todoitem.addEventListener("click", (e) => {
        console.log("item is called");
        renderTodoDetails(todo);
      });
      todoList.appendChild(todoitem);
    }
  }

  function renderTodoForm() {
    let formdiv = document.createElement("div");
    formdiv.classList.add("popup-form");

    // Create the form element
    const form = document.createElement("form");
    form.classList.add("form-container");
    // Create the title input field
    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title:";
    const titleInput = document.createElement("input");
    titleInput.required = true;
    titleInput.type = "text";
    titleInput.name = "title";
    titleLabel.appendChild(titleInput);

    // Create the description input field
    const descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "Description:";
    const descriptionInput = document.createElement("input");
    descriptionInput.required = true;
    descriptionInput.type = "text";
    descriptionInput.name = "description";
    descriptionLabel.appendChild(descriptionInput);

    // Create the due date input field
    const dueDateLabel = document.createElement("label");
    dueDateLabel.textContent = "Due Date:";
    const dueDateInput = document.createElement("input");
    dueDateInput.type = "date";
    dueDateInput.name = "dueDate";
    dueDateLabel.appendChild(dueDateInput);

    // Create the priority select field
    const priorityLabel = document.createElement("label");
    priorityLabel.textContent = "Priority:";
    const prioritySelect = document.createElement("select");
    prioritySelect.name = "priority";
    const options = ["high", "medium", "low"];
    for (let option of options) {
      const priorityOption = document.createElement("option");
      priorityOption.value = option;
      priorityOption.textContent = option;
      prioritySelect.appendChild(priorityOption);
    }
    priorityLabel.appendChild(prioritySelect);

    // Create the notes input field
    const notesLabel = document.createElement("label");
    notesLabel.textContent = "Notes:";
    const notesInput = document.createElement("input");
    notesInput.type = "text";
    notesInput.name = "notes";
    notesLabel.appendChild(notesInput);

    // Create the submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Submit";

    //create close button
    const closebtn = document.createElement("button");
    closebtn.classList.add("close-btn");
    closebtn.type = "button";
    closebtn.innerText = "Close";
    // Add event listener to the form
    form.addEventListener("submit", handleSubmit);

    // Create the project select field
    const projectLabel = document.createElement("label");
    projectLabel.textContent = "Project:";
    const projectSelect = document.createElement("select");
    projectSelect.name = "project";
    const projectOptions = manageProjects.getAllProjects();

    for (let project of projectOptions) {
      const projectOption = document.createElement("option");
      projectOption.value = project.name;
      projectOption.textContent = project.name;
      projectSelect.appendChild(projectOption);
    }
    projectLabel.appendChild(projectSelect);

    // Append all elements to the form
    form.appendChild(projectLabel);

    form.appendChild(titleLabel);
    form.appendChild(descriptionLabel);
    form.appendChild(dueDateLabel);
    form.appendChild(priorityLabel);
    form.appendChild(notesLabel);
    form.appendChild(submitButton);
    form.appendChild(closebtn);
    // Append the form to the desired element in the HTML

    formdiv.appendChild(form);

    function handleSubmit(e) {
      e.preventDefault();
      let myformData = Object.fromEntries(new FormData(e.target).entries());

      let [project] = manageProjects
        .getAllProjects()
        .filter((item) => item.name == myformData.project);
      myformData.project = project;

      manageTodos.createTodo(myformData);
      renderProjectTodoList(project);
      renderTodoForm()
      form.reset();
    }

    document.body.appendChild(formdiv);
    //handling form display
    let addBtn = document.getElementById("add-btn");

    let popupForm = document.querySelector(".popup-form");
    addBtn.addEventListener("click", () => {
      popupForm.style.display = "block";
    });
    closebtn.addEventListener("click", () => {
      popupForm.style.display = "none";
    });
    //..................................................
  }

  function renderTodoDetails(todo) {
    if (!todo) {
      todoDetails.innerHTML = "";
      console.log("called here");
    } else {
      let { title, description, dueDate, priority, notes } = todo;
      todoDetails.innerHTML = "";

      let titledetail = document.createElement("p");
      titledetail.innerText = `Title : ${title}`;

      let descriptionDetail = document.createElement("small");
      descriptionDetail.innerText = `Description : ${description}`;

      let dueDateDetail = document.createElement("i");
      dueDateDetail.innerText = `Due Date : ${dueDate}`;
      dueDateDetail.style.display = "block";

      let priorityDetail = document.createElement("p");
      priorityDetail.innerText = `Priority : ${priority}`;

      let notesDetail = document.createElement("b");
      notesDetail.innerText = `Notes : ${notes}`;

      // todoDetails.appendChild(titledetail)

      let arr = [
        titledetail,
        descriptionDetail,
        dueDateDetail,
        priorityDetail,
        notesDetail,
      ];
      for (let element of arr) {
        todoDetails.appendChild(element);
      }
    }
  }

  return {
    renderProjectList,
    renderProjectTodoList,
    renderTodoForm,
  };
})();

export default UI;
