import React, { Component } from 'react'
import ConstantList from '../../appConfig'
import {
  IconButton,
  Dialog,
  Button,
  Icon,
  Grid,
  FormControlLabel,
  TablePagination,
  Switch,
  DialogActions,
  Checkbox,
} from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { checkCode, addNewData, updateData, getItemById } from './AgencyService'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Autocomplete from '@material-ui/lab/Autocomplete'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Draggable from 'react-draggable'
import Paper from '@material-ui/core/Paper'
import MaterialTable, {
  MTableToolbar,
  Chip,
  MTableBody,
  MTableHeader,
} from 'material-table'
import { useTranslation, withTranslation, Trans } from 'react-i18next'
function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  )
}
function MaterialButton(props) {
  const { t, i18n } = useTranslation()
  const item = props.item
  return (
    <div>
      <IconButton onClick={() => props.onSelect(item, 0)}>
        <Icon color="primary">edit</Icon>
      </IconButton>
      <IconButton onClick={() => props.onSelect(item, 1)}>
        <Icon color="error">delete</Icon>
      </IconButton>
    </div>
  )
}
class AgencyDialog extends Component {
  state = {
    name: '',
    code: '',
    listCategory: [],
    category: [],
    description: '',
    totalElements: 0,
    rowsPerPage: 25,
    page: 0,
  }

  handleChange = (event, source) => {
    event.persist()
    if (source === 'switch') {
      this.setState({ isActive: event.target.checked })
      return
    }
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleFormSubmit = () => {
    let { id } = this.state
    if (id) {
      updateData({
        ...this.state,
      }).then(() => {
        this.props.handleOKEditClose()
      })
    } else {
      addNewData({
        ...this.state,
      }).then(() => {
        this.props.handleOKEditClose()
      })
    }
  }

  selectCategory = (categorySelected) => {
    this.setState({ category: categorySelected }, function () {})
  }

  componentWillMount() {
    this.setState({
      ...this.props.item,
    })
  }

  componentDidMount() {
    var searchObject = {}
    searchObject.keyword = this.state.keyword
    searchObject.pageIndex = this.state.page + 1
    searchObject.pageSize = this.state.rowsPerPage
  }

  render() {
    let {
      name,
      code,
      listCategory,
      category,
      mainImageUrl,
      price,
      description,
    } = this.state
    let { open, handleClose, handleOKEditClose, t, i18n } = this.props
    return (
      <Dialog
        open={open}
        PaperComponent={PaperComponent}
        maxWidth="md"
        fullWidth={true}
      >
        <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
          <div
            style={{ cursor: 'move' }}
            id="draggable-dialog-title"
            className="flex flex-space-between flex-middle pl-16 pr-8 py-8 bg-primary"
          >
            <h4 className="m-0 text-white">{t('general.saveUpdate')}</h4>
            <IconButton onClick={this.props.handleClose}>
              <Icon className="text-white">clear</Icon>
            </IconButton>
          </div>
          <DialogContent>
            <Grid className="mb-10" container spacing={3}>
              <Grid item md={6} sm={6} xs={6}>
                <TextValidator
                  className="w-100"
                  label={t('Product.code')}
                  onChange={this.handleChange}
                  type="text"
                  name="code"
                  value={code}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </Grid>

              <Grid item md={6} sm={6} xs={6}>
                <TextValidator
                  className="w-100"
                  label={t('Product.name')}
                  onChange={this.handleChange}
                  type="text"
                  name="name"
                  value={name}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </Grid>

              <Grid item md={6} sm={6} xs={6}>
                <TextValidator
                  className="w-100"
                  label={t('Product.mainImageUrl')}
                  onChange={this.handleChange}
                  type="text"
                  name="mainImageUrl"
                  value={mainImageUrl}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </Grid>
              <Grid item md={6} sm={6} xs={6}>
                <TextValidator
                  className="w-100"
                  label={t('Product.price')}
                  onChange={this.handleChange}
                  type="number"
                  name="price"
                  value={price}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </Grid>
              <Grid item md={6} sm={6} xs={6}>
                <TextValidator
                  className="w-100 h-5"
                  label={t('Product.description')}
                  onChange={this.handleChange}
                  type="text"
                  name="description"
                  value={description}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </Grid>
              <Grid item md={6} item sm={6} xs={6}>
                {listCategory && (
                  <Autocomplete
                    style={{ width: '100%' }}
                    multiple
                    id="combo-box-demo"
                    defaultValue={category}
                    options={listCategory}
                    getOptionSelected={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => {
                      this.selectCategory(value)
                    }}
                    renderInput={(params) => (
                      <TextValidator
                        {...params}
                        value={category}
                        label={t('ProductCategory.title')}
                        fullWidth
                        validators={['required']}
                        errorMessages={[t('Category.please_select_category')]}
                      />
                    )}
                  />
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <div className="flex flex-space-between flex-middle mt-36">
              <Button
                variant="contained"
                color="secondary"
                className="mr-36"
                onClick={() => this.props.handleClose()}
              >
                {t('general.cancel')}
              </Button>
              <Button variant="contained" color="primary" type="submit">
                {t('general.save')}
              </Button>
            </div>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    )
  }
}

export default AgencyDialog
