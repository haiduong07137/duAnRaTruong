import React from 'react'
import { Redirect } from 'react-router-dom'

import dashboardRoutes from './views/dashboard/DashboardRoutes'
import utilitiesRoutes from './views/utilities/UtilitiesRoutes'
import sessionRoutes from './views/sessions/SessionRoutes'
import materialRoutes from './views/material-kit/MaterialRoutes'

import formsRoutes from './views/forms/FormsRoutes' 
import pageLayoutRoutes from './views/page-layouts/PageLayoutRoutees'
 
import homeRoutes from './views/home/HomeRoutes'
import otherRoutes from './views/others/OtherRoutes'
import scrumBoardRoutes from './views/scrum-board/ScrumBoardRoutes' 

import ConstantList from './appConfig'   
import OfferDetailRoutes from './views/OfferDetail/OfferDetailRoutes'
import OfferRoutes from './views/Offer/OfferRoutes' 
import RegistrationConfirmationRoutes from './views/RegistrationConfirmation/RegistrationConfirmationRoutes'
import RedirectToLandingPageRoutes from './views/RedirectToLandingPage/RedirectToLandingPageRoutes'
import Agency1Routes from "./views/Agency1/Agency1Routes";   
import ProductRoutes from "./views/Product/ProductRoutes";   
import CategoriesRoutes from "./views/Categories/CategoriesRoutes"; 
import LeadRoutes from "./views/Lead/LeadRoutes"; 
import offerAgencyRoutes from "./views/OfferAgency/OfferAgencyRoutes"; 
import privateOfferAgencyRoutes from "./views/PrivateOfferAgency/PrivateOfferAgencyRoutes";  

const redirectRoute = [
  {
    path: ConstantList.ROOT_PATH,
    exact: true,
    component: () => <Redirect to={ConstantList.HOME_PAGE} />, //Luôn trỏ về HomePage được khai báo trong appConfig
  },
]

const errorRoute = [
  {
    component: () => <Redirect to={ConstantList.ROOT_PATH + 'session/404'} />,
  },
]

const routes = [
  ...homeRoutes,
  ...sessionRoutes,
  ...RedirectToLandingPageRoutes,
  ...dashboardRoutes,  
  ...materialRoutes,
  ...utilitiesRoutes, 
  ...RegistrationConfirmationRoutes,
  ...formsRoutes, 
  ...OfferRoutes,
  ...scrumBoardRoutes,
  ...pageLayoutRoutes,
  ...ProductRoutes,
  ...offerAgencyRoutes,
  ...CategoriesRoutes,
  ...Agency1Routes,
  ...privateOfferAgencyRoutes,
  ...LeadRoutes,
  ...otherRoutes, 
  ...redirectRoute, 
  ...OfferDetailRoutes,
  ...errorRoute,
]

export default routes
