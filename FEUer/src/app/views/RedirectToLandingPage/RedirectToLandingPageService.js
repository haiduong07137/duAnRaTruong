import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/offer";

export const RedirectToLandingPage = (id) => {
  var url = API_PATH + "/redirectToWebsite/"+id;
  return axios.get(url);
};
 