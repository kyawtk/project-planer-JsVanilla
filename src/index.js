import { manageProjects } from "./components/manageProject";
import { manageTodos } from "./components/manageTodos";
import './styles.css'
import UI from "./components/ui";


// manageTodos.createTodo('','code todo app','app for odin project','tomorrow','high','practive')
// manageTodos.createTodo('','code music app','personal project','infiniet','low','practive')


UI.renderProjectList(manageProjects.getAllProjects())
UI.renderTodoForm()

