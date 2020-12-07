import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import VerifyPage from "./VerifyPage";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
// const RegistrationConfirmationComponent = EgretLoadable({
//   loader: () => import("./A")
// });
const ViewComponent = withTranslation()(VerifyPage);

const RegistrationConfirmationRoutes = [
  {
    path: ConstantList.ROOT_PATH + "confirmRegistration",
    exact: true,
    component: ViewComponent,
    settings: {
      activeLayout: "layout2",
      layout1Settings: {
        topbar: {
          show: true
        },
        leftSidebar: {
          show: false,
          mode: "close"
        }
      },
      layout2Settings: {
        mode: "full",
        topbar: {
          show: false
        },
        navbar: { show: false }
      },
      secondarySidebar: { show: false },
      footer: { show: true }
    }
  }
];

export default RegistrationConfirmationRoutes;
