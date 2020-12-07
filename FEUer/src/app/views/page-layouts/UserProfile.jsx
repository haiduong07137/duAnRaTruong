import React, { Component, Fragment } from 'react'
import ConstantList from '../../appConfig'
import {
  Card,
  Icon,
  Avatar,
  Grid,
  Badge,
  Fab,
  Divider,
  IconButton,
  Button,
  withStyles,
  Hidden,
  TextField, Image, FormControl, InputLabel, Select, RadioGroup, FormControlLabel, Radio
} from '@material-ui/core'
import { PHONE } from '../sessions/Country'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { EgretSidenavContainer, EgretSidenav, EgretSidenavContent } from 'egret'
import DummyChart from './DummyChart'
import ProfileBarChart from './ProfileBarChart'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import localStorageService from '../../services/localStorageService'
import { updateInfo, getCurrentUser } from './UserProfileService'
import { useTranslation, withTranslation, Trans } from 'react-i18next'
import MenuItem from '@material-ui/core/MenuItem';
import UploadImage from "../forms/UploadImage";
import UploadFormPopup from '../Component/UploadFormPopup/UploadFormPopup'
import UserEditorDialog from './ChangePasswordUserDialog/UserEditorDialog'
import { getItemById } from './ChangePasswordUserDialog/UserService'
class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      user: {}, shouldOpenImageDialog: false,
      socialContactFake: '',
      shouldOpenChangePasswordDialog: false,
    }
  }
  windowResizeListener

  toggleSidenav = () => {
    this.setState({
      open: !this.state.open,
    })
  }

  handleWindowResize = () => {
    return (event) => {
      if (event.target.innerWidth < 768) {
        this.setState({ mobile: true })
      } else this.setState({ mobile: false })
    }
  }

  handleChangeCombo = (event, source) => {
    this.setState({ nameSocial: event.target.value + ': ' })
  }

  updateData = () => {
    let user1 = localStorageService.getItem('auth_user');
    
    getCurrentUser(user1.id).then((request) => {
      let user = request.data
      this.setState({
        id: user.id,
        name: user.name,
        email: user.email,
        description: user.description,
        website: user.website,
        phone: user.phone,
        country: user.country,
        imagePath: user.imagePath
      })
    })

    
  }


  componentDidMount() {
    // this.setState({ user: user })
    this.updateData();
    

    if (window.innerWidth < 768) {
      this.setState({ open: false })
    }
    if (window)
      this.windowResizeListener = window.addEventListener('resize', (event) => {
        if (event.target.innerWidth < 768) {
          this.setState({ open: false })
        } else this.setState({ open: true })
      })
  }


  // getNameSocialContact = (user) => {

  //   if (user.socialContact.includes("Zalo: ")) {
  //     return "Zalo"
  //   } else if (user.socialContact.includes("Facebook: ")) {
  //     return "Facebook"
  //   } else if (user.socialContact.includes("Skype: ")) {
  //     return "Skype"
  //   } else if (user.socialContact.includes("Telegram: ")) {
  //     return "Telegram"
  //   } else {
  //     return "Other"
  //   }
  // }

  handleFormSubmit = (event) => {
    this.setState({ loading: true })
    updateInfo({
      id: this.state.id,
      name: this.state.name,
      phone: this.state.phone,
      website: this.state.website,
      description: this.state.description,
      imagePath: this.state.imagePath,
    }).then((user) => {
      this.setState({ loading: false })
      this.setState({ showRegisterSuccessDialog: true })
      alert(
        'Success!'
      )
      this.updateData();
    }).catch(() => {
      console.log("Code đã được sử dụng");
    })
  }




  componentWillUnmount() {

    if (window) window.removeEventListener('resize', this.windowResizeListener)
  }
  handleOpenUploadDialog = () => {
    this.setState({
      shouldOpenImageDialog: true,
    })
  }
  handleDialogClose = () => {
    this.setState({
      shouldOpenImageDialog: false,
      shouldOpenChangePasswordDialog: false
    })
  }




  handleChange = (event, source) => {
    event.persist()
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    let { theme } = this.props
    const { t, i18n } = this.props

    console.log(this.sta)
    let {
      id,
      email,
      phone,
      description,
      website,
      user,
      item,
      trafficSource, imagePath,
      name, socialContactFake, socialContact,
      shouldOpenChangePasswordDialog,
    } = this.state
    const phoneList = PHONE

    return (
      <div className="m-sm-30">
        <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>

          {this.state.shouldOpenImageDialog && (
            <UploadFormPopup
              t={t}
              i18n={i18n}
              handleClose={this.handleDialogClose}
              open={this.state.shouldOpenImageDialog}
              uploadUrl={
                // user?.photoURL!=null ? user?.photoURL:ConstantList.ROOT_PATH+"assets/images/avatar.jpg"
                ConstantList.API_ENPOINT + '/api/upload/avatarUpload'
              }
              userId={id}
              acceptType="png;jpg;gif;jpeg"
            />
          )}

          <Grid className="mb-10" container spacing={3}>
            <Grid container item md={6} sm={6}  spacing={2} xs={12}>
              <Grid item md={12} sm={12} xs={12}>
                <div className="user-profile__sidenav flex-column flex-middle">
                  <img
                    src={imagePath != null ? imagePath : ConstantList.ROOT_PATH+"assets/images/avatar.jpg"}
                    alt="Profile Image"
                    width="300"
                    height="300"
                    onClick={this.handleOpenUploadDialog}
                  />
                </div>
              </Grid>
              <Grid item md={12} sm={12} xs={12}  >
                <div className="user-profile__sidenav flex-column flex-middle">
                  <Button disabled={this.state.loading} variant="contained" color="primary"
                    onClick={this.handleOpenUploadDialog}
                  >
                    {t("sign_in.change_avatar")}
                  </Button>
                </div>

              </Grid>
            </Grid>
            <Grid item lg={6} md={6} sm={6}  container spacing={2} xs={12}   >
              <Grid item md={6} sm={6} xs={6}>
                <TextValidator
                  className="w-100 mb-16 mr-16 ml-16 "
                  label={
                    <span>
                      {t("sign_up.name")}{' '}
                      <span style={{ color: 'red' }}> * </span>
                    </span>
                  }
                  type="text"
                  variant="outlined"
                  name="name"
                  onChange={this.handleChange}
                  InputLabelProps={{ shrink: true }}
                  value={name}
                  validators={['required']}
                  errorMessages={t('Validation.this_field_is_required')}
                />
              </Grid>
              {/* <Grid item md={6} sm={6} xs={6}>
                <TextValidator
                  className="w-100 mb-16 mr-16 ml-16 "
                  label={
                    <span>
                      {"Email address"}{' '}
                      <span style={{ color: 'red' }}> * </span>
                    </span>
                  }
                  disabled
                  type="text"
                  variant="outlined"
                  name="email"
                  onChange={this.handleChange}
                  InputLabelProps={{ shrink: true }}
                  value={email}
                  validators={['required']}
                  errorMessages={t('Validation.this_field_is_required')}
                />
              </Grid> */}


              <Grid item lg={6} md={6} sm={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-100 mb-16 mr-16 ml-16"
                  label={
                    <span>
                      {t("sign_up.phone")}{' '}
                      <span style={{ color: 'red' }}> * </span>
                    </span>
                  }
                  onChange={this.handleChange} 
                  InputLabelProps={{ shrink: true }}
                  type="text"
                  name="phone"
                  value={phone}
                  validators={['required']}
                  errorMessages={t('Validation.this_field_is_required')}
                />
              </Grid>
              {/* <Grid item md={6} sm={6} xs={12}>
                <TextValidator
                  id="standard-basic"
                  className="w-100 mb-16 mr-16 ml-16 "
                  label={<span>{t('sign_up.traffic_Source')}</span>}
                  type="text"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  name="trafficSource"
                  onChange={this.handleChange}
                  value={trafficSource}
                  validators={['required']}
                  errorMessages={t('Validation.this_field_is_required')}
                />
              </Grid> */}
              <Grid item md={12} sm={12} xs={12}>
                <TextValidator
                  id="standard-basic"
                  className="w-100 mb-16 mr-16 ml-16 "
                  label={<span>{t("sign_up.website")}</span>}
                  type="text"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  name="website"
                  onChange={this.handleChange}
                  value={website}
                  validators={[
                    'required',
                    'matchRegexp:[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,256}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)',
                  ]}
                  errorMessages={[
                    t('Validation.this_field_is_required'),
                    t('Validation.invalid_url'),
                  ]}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <TextValidator
                  variant="outlined"
                  className="w-100 mb-16 mr-16 ml-16"
                  label={
                    <span> {`${t('sign_up.description')} (${t(
                      'general.maximum_255_characters'
                    )})`}
                    </span>
                  }
                  multiline
                  rows={6}
                  rowsMax={6} onChange={this.handleChange}
                  type="text"
                  InputLabelProps={{ shrink: true }}
                  name="description"
                  value={description}
                  validators={['required']}
                  errorMessages={t('Validation.this_field_is_required')}
                />
              </Grid>


              <Grid item md={12} sm={12} xs={12} container  >
                <Grid item xs />
                <Grid item xs={8} alignItems>
                  <Button className=" mb-16 mr-16 ml-16" disabled={this.state.loading} variant="contained" color="secondary" onClick={() =>
                    this.setState({ shouldOpenChangePasswordDialog: true })
                  }
                  >
                    {t("sign_in.change_pass")}
                  </Button>
                  <Button className=" mb-16 mr-16 ml-16 " disabled={this.state.loading} variant="contained" color="primary" type="submit">{t("general.save")}</Button>
                </Grid>
                <Grid item xs />
              </Grid>
            </Grid>
          </Grid>



        </ValidatorForm>

        <div>
          {shouldOpenChangePasswordDialog && (
            <UserEditorDialog
              t={t}
              i18n={i18n}
              handleClose={this.handleDialogClose}
              open={shouldOpenChangePasswordDialog}
            />
          )}
        </div>
      </div>




    )
  }
}

export default withStyles({}, { withTheme: true })(UserProfile)
