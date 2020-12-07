import React from "react";
import { Card, Button, Icon, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addProductToCart } from "app/redux/actions/EcommerceActions";
import ConstantList from "../../appConfig";
import { useHistory } from "react-router-dom";
import { useTranslation, withTranslation, Trans } from "react-i18next";
import axios from "axios";

const USER_REQUESTED = "USER_REQUESTED";
const NEW = "NEW";
const APPROVED = "APPROVED";

const ListOfferCard = (data) => {
  const history = useHistory();
  const routeChange = (offerId) => {

    axios.get(ConstantList.API_ENPOINT + "/api/offer/" + offerId).then(res => {
      console.log(res);
      if (res.data.isPublicPayout) {
        let path = ConstantList.ROOT_PATH + `offers/list/` + offerId;
        history.push({
          pathname: path,
        });
      } else {
        let path = ConstantList.ROOT_PATH + `offers/my-list/` + offerId;
        history.push({
          pathname: path,
        });
      }
    });


  };

  const { t, i18n } = useTranslation();

  let currencyIcon = null;
  let currencyPayoutIcon = null;
  let currencyPayoutIcons = null;
  let payout = null;

  switch (data.offer.product?.currency) {
    case "VND":
      currencyIcon = "₫";
      break;
    case "THB":
      currencyIcon = " Thb";
      break;
    case "USD":
      currencyIcon = "$";
      break;
    case "IDR":
      currencyIcon = " Rp";
      break;
    default:
      currencyIcon = "";
  }

  switch (data.offer.product?.currencyPayout) {
    case "VND":
      currencyPayoutIcon = "₫";
      break;
    case "THB":
      currencyPayoutIcon = " Thb";
      break;
    case "USD":
      currencyPayoutIcon = "$";
      break;
    case "IDR":
      currencyPayoutIcon = " Rp";
      break;
    default:
      currencyPayoutIcon = "";
  }

  switch (data.offer.currency) {
    case "VND":
      currencyPayoutIcons = "₫";
      break;
    case "THB":
      currencyPayoutIcons = " Thb";
      break;
    case "USD":
      currencyPayoutIcons = "$";
      break;
    case "IDR":
      currencyPayoutIcons = " Rp";
      break;
    default:
      currencyPayoutIcons = "";
  }

  switch (data.offer.isPublicPayout) {
    case "true":
      payout = data.offer.product.currentPayout.toLocaleString("en-US");
      break;
    case "false":
      payout = data.offer.payoutValue.toLocaleString("en-US");
      break;
    default:
      payout = "";
  }





  // const overlayDivStyle = {
  //   position: 'absolute',
  //   top: 0,
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   display: data.offer.status === 'NEW' ? 'none' : 'normal',
  //   background: `url(${
  //     ConstantList.ROOT_PATH + 'assets/images/checkmark.svg'
  //   }) center center no-repeat, rgba(0, 0, 0, 0.74)`,
  //   zIndex: 1,
  // }

  return (
    <Card
      elevation={3}
      className="ecommerce__product-card p-16 position-relative h-100"
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <div className="product__image-box flex flex-center flex-middle position-relative">
            <img
              src={
                data.offer.product?.mainImageUrl !== null &&
                  data.offer.product?.mainImageUrl !== ""
                  ? data.offer.product?.mainImageUrl
                  : ConstantList.ROOT_PATH + "assets/images/placeholder.jpg"
              }
              alt={"publicOffer"}
              width="350"
              height="350"
              style={{border:'5px ',borderRadius: '5px'}}
            />
            {/* <div style={overlayDivStyle}></div> */}
            <div className="image-box__overlay">
              <Button
                variant="outlined"
                className="bg-default"
                onClick={() => routeChange(data.offer.id)}
              >
                <Icon className="mr-8">pageview</Icon>
                <span>Detail</span>
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12} className="p-24">
           
       
    
          <div class="movie-card">

            <div class="movie-content">
              <div class="movie-content-header">
          
                  <h3 class="movie-title">{data.offer.product?.name}</h3>
           
                {/* <div class="imax-logo"></div> */}
              </div>
              <div class="movie-info">
                <div class="info-section">
                  <span>  {t("Offer.price")}:{" "}</span>
                </div>
                <div class="info-section">
                  <label>  {data.offer.product?.price.toLocaleString("en-US")}
                    {currencyIcon}</label>
                </div>


              </div>
            </div>


            {data.offer?.status === NEW ? (<span></span>) : (
              <div class="movie-content">
                <div class="movie-info">
                  <div class="info-section">
                    <span>   {t("Offer.Origin_Payout")}:{" "}</span>
                  </div>
                  <div class="info-section"> 
                      {data.offer?.status === NEW ? (
                        <label className="text-muted">
                          {data.offer.product.payoutValue?.toLocaleString("en-US")}&nbsp;  {currencyPayoutIcon} 
                        </label>
                      ) : (
                          <label className="text-muted">
                            {data.offer.product.currentPayout?.toLocaleString("en-US")}  &nbsp;{currencyPayoutIcon} 
                          </label>
                        )}
                    
                  </div>
                </div>
              </div>
            )}



            <div class="movie-content">
              <div class="movie-info">
                <div class="info-section">
                  <span>      {t("Offer.payout")}:{" "}</span>
                </div>
                <div class="info-section">
                  {data.offer.status === NEW ? (
                    <label>
                      {data.offer.product.currentPayout?.toLocaleString("en-US")}&nbsp;{currencyPayoutIcon}
                    </label>
                  ) : (
                      <label>
                        {data.offer.payoutValue?.toLocaleString("en-US")}&nbsp; {currencyPayoutIcon}
                      </label>
                    )}
                </div>
              </div>
            </div>


            {/* <div class="movie-content">
              <div class="movie-info">
                <div class="info-section">
                  <span>   {t("Offer.conversion_type")}:{" "}</span>
                </div>
                <div class="info-section">
                  <label>    {data.offer.product?.conversionType}</label>
                </div>
              </div>
            </div>

            <div class="movie-content">
              <div class="movie-info">
                <div class="info-section">
                  <span>      {t("Offer.geography")}:</span>
                </div>
                <div class="info-section">
                  <label>    {data.offer.product?.location}</label>
                </div>
              </div>
            </div> */}

            <div class="movie-content">
              <div class="movie-info">
                <div class="info-section">
                  <span>      {t("Offer.category")}:{" "}</span>
                </div>
                <div class="info-section">
                  <label>  {data.offer.product?.categories
                    .map((category) => category.name)
                    .join()}</label>
                </div>
              </div>
            </div>

            <div class="movie-content">
              <div class="movie-info">
                <div class="info-section">
                  <span>        {t("Offer.description")}:</span>
                </div>
                <div class="info-section">
                  <label>     {data.offer.product?.description}</label>
                </div>
              </div>
            </div>


          </div>



        </Grid>
      </Grid>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  addProductToCart: PropTypes.func.isRequired,
  user: state.user,
});

export default connect(mapStateToProps, { addProductToCart })(ListOfferCard);
