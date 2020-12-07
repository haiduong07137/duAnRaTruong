import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import HelpIcon from "@material-ui/icons/Help";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import moment from "moment";
import {
  Typography,
  Tabs,
  Box,
  Tab,
  AppBar,
  Checkbox,
  FormLabel,
  Button,
  Grid,
  FormControlLabel,
  IconButton,
  Icon,
  FormControl,
  RadioGroup,
  Radio,
  DialogActions,
  TablePagination,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import MaterialTable, {
  MTableToolbar,
  Chip,
  MTableBody,
  MTableHeader,
} from "material-table";
import AttachmentIcon from '@material-ui/icons/Attachment';
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip"; 

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
    position: "absolute",
    top: "-10px",
    left: "-25px",
    width: "80px",
  },
}))(Tooltip);

function MaterialButton(props) {
  const { t, i18n } = props;
  return (
    <span>
      <LightTooltip
        title={t("Asset.reload_code")}
        placement="top"
        enterDelay={300}
        leaveDelay={200}
      >
        <IconButton onClick={() => props.refreshCode()}>
          <Icon color="primary">refresh</Icon>
        </IconButton>
      </LightTooltip>
    </span>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <React.Fragment>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    </React.Fragment>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonForce(props) {
  const t = props.t;
  const i18n = props.i18n;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [checked, setChecked] = useState(false);
  const landingPages = props.offer.product?.landingPages;
  let currency = props.offer;
  console.log(currency);

  const handleChangeValue = (event, newValue) => {
    setValue(newValue);
  };

  const handleChecked = (event) => {
    setChecked(event.target.checked);
  };

  const renderLandingPages = (landingPage) => {
    return (
      <p className="w-100 p-12 m-0">
        <Checkbox
          checked={checked}
          onChange={handleChecked}
          color="default"
          inputProps={{ "aria-label": "checkbox with default color" }}
        />
        <a href={landingPage.url} target="_blank" rel="noopener noreferrer">
          {landingPage.url}
        </a>{" "}
        <a href={landingPage.url} target="_blank" rel="noopener noreferrer">
          <IconButton>
            <Icon className="inline-block verticle-bottom text-green">
              open_in_new
            </Icon>
          </IconButton>
        </a>
      </p>
    );
  };

  // console.log(moment(props.item.createDate).format('DD/MM/YYYY'))
  return (
    <div className={classes.root} value={value} index={0}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChangeValue}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label={t("Offer.description")}></Tab>
          <Tab label={t("Offer.landing")}></Tab>
          {/* <Tab label={t("Offer.postback")}></Tab>
          <Tab label={t("Offer.history_offer")} /> */}
          {/* {props.user?.netWork === true &&
          props.offer.isPublicPayout === false ? (
            <Tab label={t("Offer.list_specific_publisher")} />
          ) : (
            ""
          )}
          {/* <Tab label="Item Three" /> */}
        </Tabs> 
      </AppBar>

      <TabPanel value={value} index={0}>
        <section>
          <div className="text fs-16">{props.offer.product?.description}</div>
        </section>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <section>
          {/* <h6>
            Step 1: Choose landing page and prelanding. You can choose multiple
            items which be opened randomly in your campaign
          </h6>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <p style={{ fontWeight: "bold", margin: "10px" }}>
                Landing Pages
              </p>
              {typeof landingPages !== "undefined" && landingPages !== null
                ? landingPages
                    .filter(
                      (landingPage) => landingPage.type === "Landing Page"
                    )
                    .filter((landingPage) => landingPage.isShow)
                    .map((landingPage) => renderLandingPages(landingPage))
                : ""}
            </Grid>
            <Grid item xs={6}>
              <p style={{ fontWeight: "bold", margin: "10px" }}>
                Pre Landing Pages
              </p>
              {typeof landingPages !== "undefined" && landingPages !== null
                ? landingPages
                    .filter(
                      (landingPage) => landingPage.type === "Pre Landing Page"
                    )
                    .filter((landingPage) => landingPage.isShow)
                    .map((landingPage) => renderLandingPages(landingPage))
                : ""}
            </Grid>
          </Grid>
          <h6 style={{ marginTop: 30 }}>
            Step 2: Enter new name for your campaign and click Generere URL
            button to save it.
          </h6> */}
          {/* <div>
          <label style={{ marginBottom: 10 }}>Website URL</label>
            <div className="form mt-30">
              <h3></h3>
              <Button
              variant="contained"
              style={{ marginRight: "10px", minWidth: 0 }}
              color="primary"
            >
              Generate URL
            </Button>
            </div>
          </div> */}

          {props.offer.isPublicPayout === false ? (
            <Grid container>
              <a href={props.offer.linkRedirect}>
                <Grid container spacing={3}
                  
                >
                  <span
                    style={{
                      margin: 0,
                      padding: 0,
                    }}
                  >{props.offer.product?.websiteUrl}</span>
                  <AttachmentIcon
                    color="primary"
                    style={{
                      marginLeft: 5,
                    }}
                  />
                </Grid>
                
              </a>
            </Grid>
            
          ) : (
              <Grid>
                <a href={props.offer.product?.websiteUrl}>
                  <Grid container spacing={3}
                  >
                  <span
                    style={{
                      margin: 0,
                      padding: 0,
                    }}
                  >{props.offer.product?.websiteUrl}</span>
                  <AttachmentIcon
                    color="primary"
                    style={{
                      marginLeft: 5,
                    }}
                  />
                  </Grid>
                </a>
              </Grid>
          ) }
        </section>
      </TabPanel>
      <TabPanel value={value} index={2}> 
      </TabPanel>
      <TabPanel value={value} index={3} style={{ height: "450px" }}>
        <MaterialTable
          title={t("Offer.private_offer_list")}
          localization={{
            body: {
              emptyDataSourceMessage: `${t("general.emptyDataMessageTable")}`,
            },
            toolbar: {
              nRowsSelected: `${t("general.selects")}`,
            },
          }}
          data={props.itemListHistory ? props.itemListHistory : []}
          columns={props.columnsHistory}
          options={{
            headerStyle: {
              color: "#ffffff",
              backgroundColor: "#7467ef",
            },
            rowStyle: (rowData) => ({
              backgroundColor: rowData.tableData.id % 2 == 1 ? "#EEE" : "#FFF",
            }),
            maxBodyHeight: "450px",
            minBodyHeight: "370px",
            selection: false,
            padding: "dense",
            actionsColumnIndex: -1,
            paging: false,
            search: false,
            toolbar: false,
          }}
          components={{
            Toolbar: (props) => <MTableToolbar {...props} />,
          }}
          onSelectionChange={(rows) => {
            this.data = rows;
          }}
        />
        <TablePagination
          align="left"
          className="px-16"
          labelRowsPerPage={t("general.rowperpage")}
          rowsPerPageOptions={[1, 5, 10, 25, 50]}
          component="div"
          count={props.totalElementsHistory}
          rowsPerPage={props.rowsPerPageHistory}
          page={props.pageHistory}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onChangePage={props.handleChangePageHistory}
          onChangeRowsPerPage={props.setRowsPerPageHistory}
        />
      </TabPanel>

      <TabPanel
        value={value}
        index={4}
        style={{ height: "450px", overflow: "hidden" }}
      >
        <MaterialTable
          title={t("Offer.private_offer_list")}
          localization={{
            body: {
              emptyDataSourceMessage: `${t("general.emptyDataMessageTable")}`,
            },
            toolbar: {
              nRowsSelected: `${t("general.selects")}`,
            },
          }}
          data={props.itemList ? props.itemList : []}
          columns={props.columns}
          options={{
            headerStyle: {
              color: "#ffffff",
              backgroundColor: "#7467ef",
            },
            rowStyle: (rowData) => ({
              backgroundColor: rowData.tableData.id % 2 == 1 ? "#EEE" : "#FFF",
            }),
            maxBodyHeight: "450px",
            minBodyHeight: "370px",
            selection: false,
            padding: "dense",
            actionsColumnIndex: -1,
            paging: false,
            search: false,
            toolbar: false,
          }}
          components={{
            Toolbar: (props) => <MTableToolbar {...props} />,
          }}
          onSelectionChange={(rows) => {
            this.data = rows;
          }}
        />
        <TablePagination
          align="left"
          className="px-16"
          labelRowsPerPage={t("general.rowperpage")}
          rowsPerPageOptions={[1, 5, 10, 25, 50]}
          component="div"
          count={props.totalElements}
          rowsPerPage={props.rowsPerPage}
          page={props.page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onChangePage={props.handleChangePage}
          onChangeRowsPerPage={props.setRowsPerPage}
        />
      </TabPanel>
    </div>
  );
}
