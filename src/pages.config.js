import Portfolio from './pages/Portfolio';
import AddProject from './pages/AddProject';
import EditProject from './pages/EditProject';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Portfolio": Portfolio,
    "AddProject": AddProject,
    "EditProject": EditProject,
}

export const pagesConfig = {
    mainPage: "Portfolio",
    Pages: PAGES,
    Layout: __Layout,
};