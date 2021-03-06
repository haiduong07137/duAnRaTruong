import React from "react";
import {
  Icon,
  Badge,
  MuiThemeProvider,
  Card,
  Button,
  IconButton,
  Drawer,
  Fab
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import { getTimeDifference } from "utils.js";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import {
  getNotification,
  deleteAllNotification,
  deleteNotification
} from "../../redux/actions/NotificationActions";

function NotificationBar(props) {
  const {
    container,
    theme,
    settings,
    notification: notifcationList = [],
    getNotification,
    deleteAllNotification,
    deleteNotification
  } = props;

  const [panelOpen, setPanelOpen] = React.useState(false);

  function handleDrawerToggle() {
    if (!panelOpen) {
      getNotification();
    }
    setPanelOpen(!panelOpen);
  }
  const parentThemePalette = theme.palette;
  // console.log(notifcationList);

  return (
    <MuiThemeProvider theme={settings.themes[settings.activeTheme]}>
      <IconButton
        onClick={handleDrawerToggle}
        style={{
          color:
            parentThemePalette.type === "light"
              ? parentThemePalette.text.secondary
              : parentThemePalette.text.primary
        }}
      >
        <Badge color="secondary" badgeContent={5}>
          <Icon>notifications</Icon>
        </Badge>
      </IconButton>

      <Drawer
        width={"100px"}
        container={container}
        variant="temporary"
        anchor={"right"}
        open={panelOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
      >
        <div className="notification">
          <div className="notification__topbar flex flex-middle p-16 mb-24">
            <Icon color="primary">notifications</Icon>
            <h5 className="ml-8 my-0 font-weight-500">Notifications</h5>
          </div>

          {notifcationList.map(notification => (
            <div
              key={notification.id}
              className="notification__card position-relative"
            >
              <IconButton
                size="small"
                className="delete-button bg-light-gray mr-24"
                onClick={() => deleteNotification(notification.id)}
              >
                <Icon className="text-muted" fontSize="small">
                  clear
                </Icon>
              </IconButton>
              <Link to={`/agency/offer/${notification.agency?.id}`} onClick={handleDrawerToggle}>
                <Card className="mx-16 mb-24" elevation={3}>
                  <div className="card__topbar flex flex-middle flex-space-between p-8 bg-light-gray">
                    <div className="flex">
                      <div className="card__topbar__button">
                        <Icon
                          className="card__topbar__icon"
                          fontSize="small"
                          color="primary"
                        >
                          notifications
                        </Icon>
                      </div>
                      <span className="ml-4 font-weight-500 text-muted">
                        {notification.agency?.name}
                      </span>
                    </div>
                    <small className="card__topbar__time text-muted">
                      {getTimeDifference(new Date())} ago
                    </small>
                  </div>
                  <div className="px-16 pt-8 pb-16">
                    <p className="m-0">{notification.product?.name}</p>
                    <small className="text-muted">
                      {notification.status}
                    </small>
                  </div>
                </Card>
              </Link>
            </div>
          ))}

          <div className="text-center">
            <Button onClick={deleteAllNotification}>Clear Notifications</Button>
          </div>
        </div>
      </Drawer>
    </MuiThemeProvider>
  );
}

NotificationBar.propTypes = {
  settings: PropTypes.object.isRequired,
  notification: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  getNotification: PropTypes.func.isRequired,
  deleteNotification: PropTypes.func.isRequired,
  deleteAllNotification: PropTypes.func.isRequired,
  notification: state.notification,
  settings: state.layout.settings
});

export default withStyles({}, { withTheme: true })(
  connect(
    mapStateToProps,
    { getNotification, deleteNotification, deleteAllNotification }
  )(NotificationBar)
);
