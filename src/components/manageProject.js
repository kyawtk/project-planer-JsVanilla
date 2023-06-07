import Project from "./project";

let projects = [];
let defaultProject = new Project("defaultProject");

function getDefaultProject() {
  return defaultProject;
}
function createProject(name) {
  let project = new Project(name);
  projects.push(project);
  return project;
}

function deleteProject(project) {
  const index = projects.indexOf(project);
  if (index !== -1) {
    projects.splice(index, 1);
  }
}
function getAllProjects() {
  return [defaultProject].concat(projects);
}

export const manageProjects =  {
  getDefaultProject,
  createProject,
  deleteProject,
  getAllProjects,
};
