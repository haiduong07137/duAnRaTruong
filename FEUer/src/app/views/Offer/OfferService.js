import axios from "axios";
import ConstantList from "../../appConfig";
export const GET_PRODUCT_LIST = "GET_PRODUCT_LIST";
export const GET_CART_LIST = "GET_CART_LIST";
export const GET_CATEGORY_LIST = "GET_CATEGORY_LIST";
export const GET_RATING_LIST = "GET_RATING_LIST";
export const GET_BRAND_LIST = "GET_BRAND_LIST";
export const GET_OFFER_LIST = "GET_OFFER_LIST";

export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const DELETE_PRODUCT_FROM_CART = "DELETE_PRODUCT_FROM_CART";

export const UPDATE_CART_AMOUNT = "UPDATE_CART_AMOUNT";

const API_PATH = ConstantList.API_ENPOINT + "/api/offer";
export const getProductList = (searchObject) => dispatch => {
  axios.post(ConstantList.API_ENPOINT + "/api/product/searchByPage", searchObject).then(res => {
    dispatch({
      type: GET_PRODUCT_LIST,
      payload: res.data.content
    });
  });
};

const API_PATH_HISTORY = ConstantList.API_ENPOINT + "/api/offerPayout";
export const historyOfPrivateOfferPayout = privateOfferPayoutObjectId => {  
  return axios.post(API_PATH_HISTORY + "/historyOfPrivateOfferPayout", privateOfferPayoutObjectId);  
};

export const searchByPageChildOfOffer = (searchObject,parentID) => {
  var url = API_PATH + "/searchByPageChildOfOffer"+"/"+parentID;
  return axios.post(url, searchObject);
};


export const getCategoryList = () => dispatch => {
  axios.get(ConstantList.ROOT_PATH + "api/ecommerce/get-category-list").then(res => {
    dispatch({
      type: GET_CATEGORY_LIST,
      payload: res.data
    });
  });
};

export const getRatingList = () => dispatch => {
  axios.get(ConstantList.ROOT_PATH + "api/ecommerce/get-rating-list").then(res => {
    dispatch({
      type: GET_RATING_LIST,
      payload: res.data
    });
  });
};

export const getBrandList = () => dispatch => {
  axios.get(ConstantList.ROOT_PATH + "api/ecommerce/get-brand-list").then(res => {
    dispatch({
      type: GET_BRAND_LIST,
      payload: res.data
    });
  });
};

export const getCartList = uid => dispatch => {
  axios.get(ConstantList.ROOT_PATH + "api/ecommerce/get-cart-list", { data: uid }).then(res => {
    dispatch({
      type: GET_CART_LIST,
      payload: res.data
    });
  });
};

export const addProductToCart = (uid, productId) => dispatch => {
  axios.post(ConstantList.ROOT_PATH + "api/ecommerce/add-to-cart", { uid, productId }).then(res => {
    dispatch({
      type: ADD_PRODUCT_TO_CART,
      payload: res.data
    });
  });
};

export const deleteProductFromCart = (uid, productId) => dispatch => {
  axios
    .post(ConstantList.ROOT_PATH + "api/ecommerce/delete-from-cart", { uid, productId })
    .then(res => {
      dispatch({
        type: DELETE_PRODUCT_FROM_CART,
        payload: res.data
      });
    });
};

export const updateCartAmount = (uid, productId, amount) => dispatch => {
  axios
    .post(ConstantList.ROOT_PATH + "api/ecommerce/update-cart-amount", { uid, productId, amount })
    .then(res => {
      dispatch({
        type: UPDATE_CART_AMOUNT,
        payload: res.data
      });
    });
};

// export const getProduct = (productID) => dispatch => {
//   axios.get(ConstantList.API_ENPOINT + "/api/product/" + productID).then(res => {
//     dispatch({
//       type: GET_PRODUCT,
//       payload: res.data
//     })
//   })
// }

