import React, { Component } from 'react'
import {
  Icon,
  IconButton,
  Badge,
  Hidden,
  withStyles,
  MuiThemeProvider,
  MenuItem,
} from '@material-ui/core'
import { EgretMenu, EgretToolbarMenu, EgretSearchBox } from 'egret'
import { setLayoutSettings } from 'app/redux/actions/LayoutActions'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import NotificationBar from '../SharedCompoents/NotificationBar'
import ShoppingCart from '../SharedCompoents/ShoppingCart'
import ConstantList from '../../appConfig'
import localStorageService from '../../services/localStorageService'
import LanguageSelect from '../SharedCompoents/LanguageSelect'
import { EgretHorizontalNav } from "egret";
import { navigations } from "../../navigations";
import Sidenav from "../SharedCompoents/Sidenav";
import { useTranslation, withTranslation, Trans } from 'react-i18next'
import { logoutUser } from 'app/redux/actions/UserActions'
import {getCurrentUser} from '../../views/page-layouts/UserProfileService'
import { ConfirmationDialog } from 'egret'
const ViewEgretHorizontalNav = withTranslation()(EgretHorizontalNav);
const ViewLanguageSelect = withTranslation()(LanguageSelect)
function MaterialButton(props) {
  const { t, i18n } = useTranslation()
  const item = props.item
}

class Layout2Topbar extends Component {
  state = {
    imagePath: '',
    name: ''
  }

  // handleSignOut = () => {
  //   this.props.logoutUser()
  // }

  handleDialogClose = () => {
    this.setState({
      shouldOpenConfirmationDialog: false
    })
  }

  handleConfirmationResponse = () => {
    this.props.logoutUser();
  }

  updateSidebarMode = (sidebarSettings) => {
    let { settings, setLayoutSettings } = this.props

    setLayoutSettings({
      ...settings,
      layout2Settings: {
        ...settings.layout2Settings,
        leftSidebar: {
          ...settings.layout2Settings.leftSidebar,
          ...sidebarSettings,
        },
      },
    })
  }

  componentDidMount = () => {
    getCurrentUser().then((request) => {
      let user = request.data
      this.setState({
        imagePath: user.imagePath,
        name: user.name
      })
    })
  }

  handleSidebarToggle = () => {
    let { settings } = this.props
    let { layout2Settings } = settings

    let mode = layout2Settings.leftSidebar.mode === 'close' ? 'mobile' : 'close'

    this.updateSidebarMode({ mode })
  }

  render() {
    let {
      shouldOpenConfirmationDialog,
      imagePath,
      name
    } = this.state
    const { t, i18n } = this.props
    let { theme, settings } = this.props
    const topbarTheme =
      settings.themes[settings.layout2Settings.topbar.theme] || theme
    return (
      <MuiThemeProvider theme={topbarTheme}>
        <Helmet>
          <style>
            {`.topbar {
              background-color: ${topbarTheme.palette.primary.main};
              border-color: ${topbarTheme.palette.divider} !important;
            }
            .topbar .brand__text {
              color: ${topbarTheme.palette.primary.contrastText};
            }
            `}
          </style>
        </Helmet>

        <div className="topbar">
          <div className="flex flex-space-between flex-middle container h-100">
            <div className="flex flex-middle brand">
              <img
                src={
                  ConstantList.ROOT_PATH +
                  'assets/images/logos/natureorigin.jpg'
                }
                alt="company-logo"
              />
              <span className="brand__text" style={{marginRight:46}} >Offer Pro</span>
              {/* <ViewEgretHorizontalNav  navigation={navigations} max={6} /> */}
            </div>
            <div className="mx-auto"></div>
            <div className="flex flex-middle">
              <EgretToolbarMenu offsetTop="80px">
                <ViewLanguageSelect />
                <EgretSearchBox />

                {/* <NotificationBar /> */}

                {/* <ShoppingCart/> */}
                {shouldOpenConfirmationDialog && (
          <ConfirmationDialog
            title={t('general.confirm')}
            open={shouldOpenConfirmationDialog}
            onConfirmDialogClose={this.handleDialogClose}
            onYesClick={this.handleConfirmationResponse}
            text={t('general.logoutConfirm')}
            agree={t('general.agree')}
            cancel={t('general.cancel')}
          />
        )}

                <EgretMenu
                  menuButton={
                    <span className="pl-16">  
               
                    <img
                     className="mx-8 text-middle circular-image-small cursor-pointer"
                     src={!imagePath ? ConstantList.ROOT_PATH+"assets/images/avatar.jpg" : imagePath != null ? imagePath : ConstantList.ROOT_PATH+"assets/images/avatar.jpg"}
                     alt={name!=null ? name : 'User'}
                   />
                         {name!=null ? name : 'User'} 
              
              
                    </span>
                  }
                >
                  {/* <MenuItem
                    className="flex flex-middle"
                    style={{ minWidth: 185 }}
                  >
                    <Icon> home </Icon>
                    <span className="pl-16"> Home </span>
                  </MenuItem>
                  <MenuItem
                    className="flex flex-middle"
                    style={{ minWidth: 185 }}
                  >
                    <Icon> person </Icon>
                    <span className="pl-16"> Person </span>
                  </MenuItem>
                  <MenuItem
                    className="flex flex-middle"
                    style={{ minWidth: 185 }}
                  >
                    <Icon> settings </Icon>
                    <span className="pl-16"> Settings </span>
                  </MenuItem>
                  <MenuItem
                    className="flex flex-middle"
                    style={{ minWidth: 185 }}
                  >
                    <Icon> person </Icon>
                    <span className="pl-16"> Person </span>
                  </MenuItem> */}
                  <MenuItem style={{ minWidth: 185 }}>
                    <Link
                      className="flex flex-middle"
                      to={ConstantList.ROOT_PATH +"page-layouts/user-profile"}
                    >
                      <Icon> person </Icon>
                      <span className="pl-16"> {t('User.personal_info')} </span>
                    </Link>
                  </MenuItem>
                  <MenuItem
                    // onClick={this.handleSignOut}
                    onClick={() =>
                      this.setState({ shouldOpenConfirmationDialog: true })
                      }
                    className="flex flex-middle"
                    style={{ minWidth: 185 }}
                  >
                    <Icon> power_settings_new </Icon>
                    <span className="pl-16"> {t('User.logout')} </span>
                  </MenuItem>
                </EgretMenu>
              </EgretToolbarMenu>

              <Hidden mdUp>
                <IconButton onClick={this.handleSidebarToggle}>
                  <Icon>menu</Icon>
                </IconButton>
              </Hidden>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

Layout2Topbar.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  settings: state.layout.settings,
})

export default withStyles(
  {},
  { withTheme: true }
)(connect(mapStateToProps, { setLayoutSettings, logoutUser })(Layout2Topbar))
