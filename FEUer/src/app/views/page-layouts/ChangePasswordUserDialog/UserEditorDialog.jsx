import React, { Component } from 'react'
import {
  Dialog,
  Button,
  Grid,
  IconButton,
  Icon,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Checkbox,
  TextField,
  FormControlLabel,
  DialogActions,
  InputAdornment
} from '@material-ui/core'
import { RemoveRedEye } from '@material-ui/icons';
import { useTranslation, withTranslation, Trans } from 'react-i18next'
import Autocomplete from '@material-ui/lab/Autocomplete'
import MaterialTable, {
  MTableToolbar,
  Chip,
  MTableBody,
  MTableHeader,
} from 'material-table'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
  changePasswordAgency,
  checkPassword
} from './UserService'
import { find } from 'lodash'
import ConstantList from '../../../appConfig'
import JwtAuthService from '../../../services/jwtAuthService';

function MaterialButton(props) {
  const { t, i18n } = useTranslation()
  const item = props.item
  return (
    <div>
      {/* <IconButton onClick={() => props.onSelect(item, 0)}>
      <Icon color="primary">edit</Icon>
    </IconButton> */}
      <IconButton onClick={() => props.onSelect(item, 1)}>
        <Icon color="error">delete</Icon>
      </IconButton>
    </div>
  )
}


class UserEditorDialog extends Component {
  constructor(props) {
    super(props)
    this.handleFormSubmitChangePass = this.handleFormSubmitChangePass.bind(this);
  }
  state = {
    username: '',
    changePass: true,
    password: '',
    confirmPassword: '',
    userDepartments: [],
    id: '',
    loading: false,
    passwordIsMasked: true,
    currentPasswordIsMasked : true,
    confirmPasswordIsMasked : true
  }

  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordIsMasked: !prevState.passwordIsMasked,
    }));
  };

  toggleCurrentPasswordMask = () => {
    this.setState(prevState => ({
      currentPasswordIsMasked: !prevState.currentPasswordIsMasked,
    }));
  };

  toggleConfirmPasswordMask = () => {
    this.setState(prevState => ({
      confirmPasswordIsMasked: !prevState.confirmPasswordIsMasked,
    }));
  };



  handleChange = (event, source) => {
    event.persist()
    this.setState({
      [event.target.name]: event.target.value,
      dupPassword: false

    })
  }

  handleConfirmationResponse = () => {
    this.props.logoutPassword();
  }


  handleFormSubmitChangePass = () =>  {
    //  this.setState({ loading: true })
    let { currentPassword } = this.state
    let { password } = this.state
    let { confirmPassword } = this.state
     checkPassword(currentPassword).then((result) => {
        if (result && result.data != null && result.data === false) {  
          this.setState({ dupPassword: true}) 

        } else {
            if (password === confirmPassword) {
               changePasswordAgency({
                ...this.state,
              }).then((user) => {
                alert("Success!")
                JwtAuthService.logoutPassword();  
                this.setState({ dupPassword: false}) 
                this.props.handleClose()
              })
            } else {
              alert("Failed!")
              return;
            } 
        }
      })

    // if (this.state.password.length <= 0) {
    //   this.setState({ checkPass: true })
    //   this.setState({ loading: false })
    //   return;
    // } else {
    //   this.setState({ checkPass: false })
    // }


  }


  componentWillMount() {
    let { open, handleClose, item, department, userDepartmentId } = this.props

  }

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.password) {
        return false
      }
      return true
    });
    ValidatorForm.addValidationRule('checkPasswordMatch', (value) => {
      if (value == this.state.currentPassword) {
        return false
      }
      return true
    })

  }

  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule('isPasswordMatch')
  }

  render() {
    let { open, handleClose, t, i18n } = this.props
    let {
      currentPassword,
      password,
      confirmPassword,
      passwordIsMasked,
      currentPasswordIsMasked,
      confirmPasswordIsMasked
    
    } = this.state

    let validate
    let dupPassword
    if (this.state.dupPassword === true) {
      dupPassword = (
        <span className="w-100 mb-14 mr-14 ml-14" style={{ fontSize: 13, color: 'red' }}>
          {' '}
          {t('Validation.invalid_current_password')}{' '}
        </span>
      )
    } else {
      dupPassword = ''
    }
    
    // if (this.state.checkPass === true) {
    //   validate = (
    //     <span style={{ color: 'red' }}>
    //       {' '}
    //       {t('Validation.this_field_is_required')}{' '}
    //     </span>
    //   )
    // } else {
    //   validate = ''
    // }

    return (
      <Dialog
        onClose={handleClose}
        open={open}
        maxWidth={'sm'}
        fullWidth={true}
      >
        <div
          style={{ cursor: 'move' }}
          id="draggable-dialog-title"
          className="flex flex-space-between flex-middle pl-16 pr-8 py-8 bg-primary"
        >
          <h4 className="m-0 text-white">{t("general.changePassword")}</h4>
          <IconButton onClick={this.props.handleClose}>
            <Icon className="text-white">clear</Icon>
          </IconButton>
        </div>
        <div className="p-24">
          <ValidatorForm ref="form" onSubmit={this.handleFormSubmitChangePass}>
            <Grid className="mb-16" container spacing={2}>
              <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                  <TextValidator
                    className="mb-16 w-100"
                    label={t("sign_up.current_password")}
                    variant="outlined"
                    onChange={this.handleChange}
                    name="currentPassword"
                    type={currentPasswordIsMasked ? 'password' : 'text'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={this.toggleCurrentPasswordMask}>
                          {currentPasswordIsMasked ? (
                              <Icon>visibility_off</Icon>
                            ) : (
                              <Icon>visibility</Icon>
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    value={currentPassword}
                    validators={[
                      'required',
                      'matchRegexp:((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$]).{8,20})',
                    ]}
                    errorMessages={[
                      t('Validation.this_field_is_required'),
                      t('Validation.invalid_pattern_password'),
                    ]}
                  />
                       {dupPassword}
                </Grid> 
                <Grid item sm={12} xs={12}>
                  <TextValidator
                    className="mb-16 w-100"
                    label={t("sign_up.new_password")}
                    variant="outlined"
                    onChange={this.handleChange}
                    name="password"
                    type={passwordIsMasked ? 'password' : 'text'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={this.togglePasswordMask}>
                          {passwordIsMasked ? (
                              <Icon>visibility_off</Icon>
                            ) : (
                              <Icon>visibility</Icon>
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    value={password}
                    validators={[
                      'required',
                      'matchRegexp:((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$]).{8,20})',
                      'checkPasswordMatch'
                 
                    ]}
                    errorMessages={[
                      t('Validation.this_field_is_required'),
                      t('Validation.invalid_pattern_password'),
                      t('Validation.invalid_new_password')
                
                    ]}
                  />
                </Grid> 
                <Grid item sm={12} xs={12}>
                  <TextValidator
                    className="mb-16 w-100"
                    label={t('sign_up.re_password')}
                    variant="outlined"
                    onChange={this.handleChange}
                    name="confirmPassword"
                    type={confirmPasswordIsMasked ? 'password' : 'text'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton  onClick={this.toggleConfirmPasswordMask}>
                         {confirmPasswordIsMasked ? (
                              <Icon>visibility_off</Icon>
                            ) : (
                              <Icon>visibility</Icon>
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    value={confirmPassword}
                    validators={['required', 'isPasswordMatch',
                    'matchRegexp:((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$]).{8,20})'
                  ]}
                    errorMessages={[
                        t('Validation.this_field_is_required'),
                        t('Validation.invalid_password'),
                        t('Validation.invalid_pattern_password'),
                    ]}
                  />
                </Grid>
              </Grid>
            </Grid>
            <DialogActions>
              <div className="flex flex-space-between flex-middle">
              <Button
                  variant="contained"
                  color="secondary"
                  disabled={this.state.loading}
                  className="mr-36"
                  onClick={() => this.props.handleClose()}
                >
                  {t('general.cancel')}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
          
                  type="submit" 
                  disabled={this.state.loading}
                >
                  {t('general.save')}
                </Button>
            
              </div>
            </DialogActions>
          </ValidatorForm>
        </div>
      </Dialog>
    )
  }
}

export default UserEditorDialog
