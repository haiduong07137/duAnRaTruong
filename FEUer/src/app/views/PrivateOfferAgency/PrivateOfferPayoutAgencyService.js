import axios from "axios";
import ConstantList from "../../appConfig";

const API_PATH = ConstantList.API_ENPOINT + "/api/offerPayout";
export const historyOfPrivateOfferPayout = privateOfferPayoutObjectId => {  
  return axios.post(API_PATH + "/historyOfPrivateOfferPayout", privateOfferPayoutObjectId);  
};

export const exportToExcel = (offerpayout,privateOfferPayoutObjectId) => {
  return axios({
    method: 'post',
    url: ConstantList.API_ENPOINT + "/api/fileDownload/historyOfferPayoutToExcel",privateOfferPayoutObjectId,
    data: offerpayout,
    responseType: 'blob',
  })
}

export const exportToExcelByAgency = (agencyID) => {
  return axios({
    method: 'post',
    url: ConstantList.API_ENPOINT + "/api/fileDownload/historyOfferPayoutToExcel/"+agencyID, 
    responseType: 'blob',
  })
}

