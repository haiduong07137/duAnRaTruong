import React from "react";
import { Redirect } from "react-router-dom";

import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import utilitiesRoutes from "./views/utilities/UtilitiesRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";
import materialRoutes from "./views/material-kit/MaterialRoutes";   
import formsRoutes from "./views/forms/FormsRoutes";  
import pageLayoutRoutes from "./views/page-layouts/PageLayoutRoutees";  
import datatablePageRootes from "./views/MDBDataTable/DatatablePageRootes";
import tablePageRoutes from "./views/MDBDataTable/TablePageRoutes";
import homeRoutes from "./views/home/HomeRoutes";
import otherRoutes from "./views/others/OtherRoutes";
import LeadRoutes from "./views/Lead/LeadRoutes";
import NapTienRoutes from "./views/napTienTk/NapTienRoutes";
import scrumBoardRoutes from "./views/scrum-board/ScrumBoardRoutes"; 
import offerAgencyRoutes from "./views/OfferAgency/OfferAgencyRoutes"; 
import privateOfferAgencyRoutes from "./views/PrivateOfferAgency/PrivateOfferAgencyRoutes"; 
import userRoutes from "./views/User/UserRoutes";   
import Agency1Routes from "./views/Agency1/Agency1Routes";   
import ProductRoutes from "./views/Product/ProductRoutes";  
import departmentRoutes from "./views/Department/DepartmentRoutes";
import CategoriesRoutes from "./views/Categories/CategoriesRoutes";
import roleRoutes from "./views/Role/RoleRoutes";
import ConstantList from "./appConfig";  
const redirectRoute = [
  {
    path: ConstantList.ROOT_PATH,
    exact: true,
    component: () => <Redirect to={ConstantList.HOME_PAGE} />, //Luôn trỏ về HomePage được khai báo trong appConfig
  },
];

const errorRoute = [
  {
    component: () => <Redirect to={ConstantList.ROOT_PATH + "session/404"} />,
  },
];

const routes = [
  ...homeRoutes,
  ...sessionRoutes,
  ...dashboardRoutes, 
  ...datatablePageRootes,
  ...LeadRoutes,
  ...privateOfferAgencyRoutes,
  ...tablePageRoutes, 
  ...Agency1Routes,
  ...materialRoutes,
  ...offerAgencyRoutes,
  ...CategoriesRoutes,
  ...utilitiesRoutes,    
  ...ProductRoutes,
  ...formsRoutes,   
  ...scrumBoardRoutes, 
  ...pageLayoutRoutes,
  ...otherRoutes, 
  ...departmentRoutes,
  ...userRoutes,
  ...roleRoutes,
  ...redirectRoute, 
  ...NapTienRoutes,
  ...errorRoute,


];

export default routes;
