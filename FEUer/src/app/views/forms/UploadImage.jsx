import React, { Component } from 'react'
import { Breadcrumb, SimpleCard, EgretProgressBar } from 'egret'
import { Fab, Icon, Card, Grid, Divider, Button } from '@material-ui/core'
import axios from 'axios'
import ConstantList from '../../appConfig'
import { red } from '@material-ui/core/colors'
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
toast.configure({
  autoClose: 3000,
  draggable: false,
  limit: 3,
  //etc you get the idea
});
class UploadImage extends Component {
  state = {
    dragClass: '',
    files: [],
    statusList: [],
    queProgress: 0,
    file: null,
    imagePreviewUrl: '',
  }
  handleFileUploadOnSelect = (event) => {
    let files = event.target.files
    this.fileUpload(files[0]).then((res) => {
      console.log(res.data)
      alert('File uploaded successfully.')
    })
  }
  handleFileSelect = (event) => {
    event.preventDefault();
    const { t, i18n } = this.props;
    let { handleImageSelect } = this.props
    let files = event.target.files
    let file = files[0]
    let list = []
    if (file.type != 'image/jpg' && file.type != 'image/jpeg' && file.type != 'image/png'){
      toast.error(t('FileUpload.note_format'));
    }
    else{
      if (file.size >= 2097152) {
        toast.error(t('FileUpload.note_size'));
      }
      else {
        for (const iterator of files) {
          list.push({
            file: iterator,
            uploading: false,
            error: false,
            progress: 0,
          })
        }
        handleImageSelect(file)
        this.setState({
          files: [...list],
        })
      }
    }
  }

  handleDragOver = (event) => {
    event.preventDefault()
    this.setState({ dragClass: '' })
  }

  handleDrop = (event) => {
    event.preventDefault();
    const { handleImageSelect, t } = this.props
    const files = event.dataTransfer.files
    const file = files[0]
    let list = []
    if (file.type != 'image/jpg' && file.type != 'image/jpeg' && file.type != 'image/png') {
      toast.error(t('FileUpload.note_format'));
    }
    else {
      if (file.size >= 2097152) {
        toast.error(t('FileUpload.note_size'));
      }
      else {
        for (const iterator of files) {
          list.push({
            file: iterator,
            uploading: false,
            error: false,
            progress: 0,
          })
        }
        handleImageSelect(file)
        this.setState({ files: [...list], dragClass: 'drag-shadow' });
      }
    }
    
  }

  handleDragStart = (event) => {
    this.setState({ dragClass: 'drag-shadow' })
  }

  handleSingleRemove = (index) => {
    let files = [...this.state.files]
    files.splice(index, 1)
    this.setState({
      files: [...files],
    })
    this.props.handleImageRemove()
  }

  handleAllRemove = () => {
    this.setState({ files: [] })
  }
  fileUpload(file) {
    const url = ConstantList.API_ENPOINT + '/api/file/upload'
    let formData = new FormData()
    formData.append('uploadfile', file) //Lưu ý tên 'uploadfile' phải trùng với tham số bên Server side
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    return axios.post(url, formData, config)
  }

  uploadSingleFile = (index) => {
    let allFiles = [...this.state.files]
    let file = this.state.files[index]
    this.fileUpload(file.file).then((res) => {
      console.log(res.data)
      alert('File uploaded successfully.')
    })

    allFiles[index] = { ...file, uploading: true, error: false }

    this.setState({
      files: [...allFiles],
    })
  }

  uploadAllFile = () => {
    let allFiles = []

    this.state.files.map((item) => {
      allFiles.push({
        ...item,
        uploading: true,
        error: false,
      })

      return item
    })

    this.setState({
      files: [...allFiles],
      queProgress: 35,
    })
  }

  handleSingleCancel = (index) => {
    let allFiles = [...this.state.files]
    let file = this.state.files[index]

    allFiles[index] = { ...file, uploading: false, error: true }

    this.setState({
      files: [...allFiles],
    })
  }

  handleCancelAll = () => {
    let allFiles = []

    this.state.files.map((item) => {
      allFiles.push({
        ...item,
        uploading: false,
        error: true,
      })

      return item
    })

    this.setState({
      files: [...allFiles],
      queProgress: 0,
    })
  }

  render() {
    let { dragClass, files, queProgress } = this.state
    let { mainImageUrl, t } = this.props
    let fileName =
      mainImageUrl !== null && mainImageUrl !== ''
        ? mainImageUrl.split('/').pop()
        : ''
    let isEmpty = files.length === 0

    //Image preview
    let { imagePreviewUrl } = this.props
    let $imagePreview = null
    if (imagePreviewUrl) {
      $imagePreview = (
        <img src={imagePreviewUrl} alt="Product" style={{ maxWidth: 300, maxHeight: 180 }} />
      )
    } else {
      $imagePreview =
        mainImageUrl !== null && mainImageUrl !== '' ? (
          <img src={mainImageUrl} alt="Product" style={{ maxWidth: 300, maxHeight: 180 }} />
        ) : (
            ''
          )
    }

    return (
      <SimpleCard title={t('Product.mainImageUrl')} className="w-50" style={{ maxWidth: '100' }}>
        {/* {mainImageUrl !== null && mainImageUrl !== '' ? (
          <img src={mainImageUrl} alt="Product" width="100" height="100" />
        ) : (
          ''
        )} */}
        <div className="flex flex-center flex-middle">
          {$imagePreview === '' ?
            <div
              className={`${dragClass} upload-drop-box flex flex-center flex-middle`}
              onDragEnter={this.handleDragStart}
              onDragOver={this.handleDragOver}
              onDrop={this.handleDrop}
              style={{ alignItems: "center", lineHeight: 'normal' }}
            >
              {isEmpty ? (
                <span>{t('FileUpload.drop_file_here')}</span>
              ) : (
                  <h5 className="m-0">
                    {files.length} file{files.length > 1 ? 's' : ''}{' '}
                    {t('FileUpload.selected')}...
                  </h5>
                )}
            </div> : $imagePreview}
        </div>


        <Card className="mt-16 mb-16" elevation={2}>
          <div
            className="flex flex-wrap mb-16"
            style={{ display: 'inline-block' }}
          >
            <label htmlFor="upload-single-file">
              <Fab
                className="capitalize"
                color="primary"
                component="span"
                variant="extended"
              >
                <div className="flex flex-middle">
                  <Icon className="pr-8">cloud_upload</Icon>
                  <span>{t('FileUpload.upload')}</span>
                </div>
              </Fab>
            </label>
            <div style={{ color: "red" }}>
           {t('FileUpload.note_limit')}</div>
            <input
              className="display-none"
              onChange={this.handleFileSelect}
              id="upload-single-file"
              type="file"
              accept="image/*"
            />
          </div>
          <span style={{ marginLeft: '20px' }}>
            {isEmpty ? (
              fileName !== '' ? (
                <p className="px-16">{fileName}</p>
              ) : (
                  <p className="px-16">{t('FileUpload.no_file_selected')}</p>
                )
            ) : (
                ''
              )}
          </span>

          {files.map((item, index) => {
            let { file, uploading, error, progress } = item
            return (
              <div className="px-16 py-16" key={file?.name}>
                <Grid
                  container
                  spacing={2}
                  justify="center"
                  alignItems="center"
                  direction="row"
                >
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    {/* {this.props.mainImageUrl !== ''
                      ? this.props.mainImageUrl
                      : file?.name} */}
                    {file?.name.length > 30
                      ? file?.name.substring(0, 30) + '...'
                      : file?.name}
                  </Grid>
                  <Grid item lg={1} md={1} sm={12} xs={12}>
                    {(file?.size / 1024 / 1024).toFixed(2)} MB
                  </Grid>
                  <Grid item lg={1} md={1} sm={12} xs={12}>
                    {error && <Icon color="error">error</Icon>}
                    {/* {uploading && <Icon className="text-green">done</Icon>} */}
                  </Grid>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <div className="flex">
                      <Button
                        variant="contained"
                        className="bg-error"
                        onClick={() => this.handleSingleRemove(index)}
                      >
                        {t('general.delete')}
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </div>
            )
          })}
        </Card>
      </SimpleCard>
    )
  }
}

export default UploadImage
