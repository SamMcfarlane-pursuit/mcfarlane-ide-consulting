import { lazy } from 'react';
import __Layout from './Layout.jsx';

// Lazy-loaded pages for code splitting
const Portfolio = lazy(() => import('./pages/Portfolio'));
const AddProject = lazy(() => import('./pages/AddProject'));
const EditProject = lazy(() => import('./pages/EditProject'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));


export const PAGES = {
    "Portfolio": Portfolio,
    "AddProject": AddProject,
    "EditProject": EditProject,
    "About": About,
    "Contact": Contact,
}

export const pagesConfig = {
    mainPage: "Portfolio",
    Pages: PAGES,
    Layout: __Layout,
};