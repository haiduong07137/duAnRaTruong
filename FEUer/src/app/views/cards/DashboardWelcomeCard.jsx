import React from "react";
import { Card, Grid, Icon, Fab, withStyles } from "@material-ui/core";
import ConstantList from "../../appConfig";

const styles = theme => ({
  root: {
    background: `url("/assets/images/dots.png"),
    linear-gradient(90deg, ${theme.palette.primary.main} -19.83%, ${theme.palette.primary.light} 189.85%)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%"
  }
});

const DashboardWelcomeCard = ({ classes, t,  totalProduct, countClick, countPublicOffer, countPrivateOffer, price, countClickPrivate, countClickPublic}) => {
  return (
    
    <Grid container spacing={3}>
      <Grid item lg={2} md={2} sm={6} xs={12}>
        <Card
          elevation={3}
          className={`p-16 py-28 text-center h-100 w-100 ${classes.root}`}
        >
          <a href={ConstantList.ROOT_PATH + "asset/list_asset"} >
            <div className="font-weight-300 flex flex-space-between">
              <div className="text-white margin-auto">
                <div className="font-size-32"><b>{t('Total')}</b></div>
                  <p className="uppercase bold m-0"><b>{countPublicOffer + countPrivateOffer}</b></p>
              </div>
            </div>
          </a>
        </Card>
      </Grid>
      <Grid item lg={2} md={2} sm={6} xs={12}>
        <Card
          elevation={3}
          className={`p-16 py-28 text-center h-100 w-100 ${classes.root}`}
        >
          <a href={ConstantList.ROOT_PATH + "asset/allocation_asset"} >
          <div className="font-weight-300 flex flex-space-between">
            <div className="text-white margin-auto">
              <div className="font-size-32"><b>{t('Offer Public')}</b></div>
                <p className="uppercase m-0"><b>{countPublicOffer}</b></p>
            </div>
          </div>
          </a>
        </Card>
      </Grid>
      <Grid item lg={2} md={2} sm={6} xs={12}>
        <Card
          elevation={3}
          className={`p-16 py-28 text-center h-100 w-100 ${classes.root}`}
        >
          <a href={ConstantList.ROOT_PATH + "asset/transfer_asset"} >
          <div className="font-weight-300  flex flex-space-between">
            <div className="text-white margin-auto">
              <div className="font-size-32"><b>{t('Offer private')}</b></div>
              <p className="uppercase m-0"><b>{countPrivateOffer}</b></p>
            </div>
          </div>
          </a>
        </Card>
      </Grid>
      <Grid item lg={2} md={2} sm={6} xs={12}>
        <Card
          elevation={3}
          className={`p-16 py-28 text-center h-100 w-100 ${classes.root}`}
        >
          <a href={ConstantList.ROOT_PATH + "asset/maintain_request"} >
          <div className="font-weight-300 flex flex-space-between">
            <div className="text-white margin-auto">
              <div className="font-size-32"><b>{t('Click')}</b></div>
              <p className="uppercase m-0"><b>{countClickPrivate}</b></p>
            </div>
          </div>
          </a>
        </Card>
      </Grid>
      <Grid item lg={2} md={2} sm={6} xs={12}>
        <Card
          elevation={3}
          className={`p-16 py-28 text-center h-100 w-100 ${classes.root}`}
        >
          <a href={ConstantList.ROOT_PATH + "asset/maintain_request"} >
          <div className="font-weight-300 flex flex-space-between">
            <div className="text-white margin-auto">
              <div className="font-size-32"><b>{t('Price')}</b></div>
              <p className="uppercase m-0"><b>{price.toLocaleString("en-US")}</b> đ</p>
            </div>
          </div>
          </a>
        </Card>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(DashboardWelcomeCard);
