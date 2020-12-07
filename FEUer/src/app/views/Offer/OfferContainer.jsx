import React, { Fragment } from "react";
import {
  Grid,
  TextField,
  Icon,
  Button,
  MenuItem,
  IconButton,
  TablePagination,
} from "@material-ui/core";

import ListOfferCard from "./ListOfferCard";

import * as _ from "lodash";

const OfferContainer = ({
  orderBy,
  view,
  offerList,
  page,
  rowsPerPage,
  toggleSidenav,
  toggleView,
  handleChange,
  handleChangePage,
  setRowsPerPage,
  totalOffer,
  t,
}) => {
  const havePublicOffer =
    offerList == null || offerList.length === 0 ? false : true;
  return (
    <Fragment>
      {havePublicOffer ? (
        <div className="position-relative h-100 w-100">
          <Grid container spacing={2}>
            {_.orderBy(
              offerList,
              orderBy !== "false" ? "price" : "",
              orderBy
            ).map((offer) => (
              <Grid item key={offer.id} lg={12} md={12} sm={12} xs={12}>
                <ListOfferCard offer={offer}></ListOfferCard>
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <p
          style={{
            textAlign: "center",
            fontSize: "20px",
            letterSpacing: "1px",
          }}
        >
          {t("Offer.no_offer_available")}
        </p>
      )}
      {havePublicOffer ? (
        <TablePagination
          rowsPerPageOptions={[6, 12, 24]}
          component="div"
          count={totalOffer}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={setRowsPerPage}
        />
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default OfferContainer;
