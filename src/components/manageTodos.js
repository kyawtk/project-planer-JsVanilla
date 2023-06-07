import Todo from "./todo";
import { manageProjects } from "./manageProject";
function createTodo({project, title, description, dueDate, priority, notes}) {
  if (!project) {
    project = manageProjects.getDefaultProject();
  }
  const todo = new Todo(title, description, dueDate, priority, notes);
  project.todos.push(todo);
  return todo;
}
function deleteTodo(project, todo) {
  let index = project.todos.indexOf(todo);
  if (index !== -1) {
    project.todos.splice(index, 1);
  }
}
export const manageTodos =  {
  createTodo,
  deleteTodo,
};
