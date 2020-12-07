import React, { Component } from 'react'
import {
  IconButton,
  Grid,
  Icon,
  TablePagination,
  Button,
  TextField,
  Tooltip
} from '@material-ui/core'
import MaterialTable, {
  MTableToolbar,
  Chip,
  MTableBody,
  MTableHeader,
} from 'material-table'
import {
  deleteItem,
  searchByPage,
  getItemById,

} from './napTienService'
import ListOfferDiaglog from './ListOfferDiaglog'
import { Breadcrumb, ConfirmationDialog } from 'egret'
import { useTranslation, withTranslation, Trans } from 'react-i18next'
import { saveAs } from 'file-saver'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import localStorageService from "../../services/localStorageService";
import {getNapTien} from './napTienService'

toast.configure();

function MaterialButton(props) {
  const { t, i18n } = useTranslation()
  const item = props.item

  return (
    <div>
      <Tooltip title="Edit">
        <IconButton onClick={() => props.onSelect(item, 0)}>
          <Icon color="primary">edit</Icon>
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton onClick={() => props.onSelect(item, 1)}>
          <Icon color="error">delete</Icon>
        </IconButton>
      </Tooltip>
    </div>
  )
}

class Categories extends Component {
  state ={
    id :'',
    sotien : 0,
    user:{}
  }
  handleChange = event => {
 
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  componentDidMount(){
   let user = localStorageService.getItem("auth_user"); 
 
    this.setState({
      id:user.id,
       
    })

  }
  onNap =()=>{
   let {id,sotien,user}=this.state;
   user.id = id;
   getNapTien(id,sotien).then(result=>{
     console.log(result);
   })
  }
  render() {
    const { t, i18n } = this.props

    let TitlePage = "Nap Tien"


    return (
      <div className="m-sm-30">
        <Helmet>
          <title>Offer Pro | {TitlePage}</title>
        </Helmet>
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: TitlePage}]} />
        </div>

        <div style={{margin: '0 auto', width: '500px'}}>
        <h3 style={{marginBottom: '20px'}}><span className="label label-primary">Thanh toán  trực tuyến</span></h3>
        <form  >
          <input type="hidden" name="fnapthe" defaultValue="ok" />
          <table className="table table-condensed table-bordered">
            <tbody>                        
              <tr>
                <td>Tên ngân hàng</td>
                <td>
                  <select name="card_type_id" style={{width: '390px', border: '1px solid #ccc', height: '30px'}}>
                    <option value={1}>Viettel</option>
                    <option value={2}>viettin</option>
                    <option value={3}>BIDV</option>
                    <option value={4}>Techcom</option>
                    <option value={6}>ACB</option>
                  
                  </select>
                </td>
              </tr>
              <tr>
                <td>Số tài khoản</td>
                <td><input type="text" defaultValue name="pin" style={{width: '390px', border: '1px solid #ccc', height: '30px'}} /></td>
              </tr>
              <tr>
                <td>Số tiền</td>
                <td><input type="text"    onChange={this.handleChange}  name="sotien" style={{width: '390px', border: '1px solid #ccc', height: '30px'}} /></td>
              </tr>
            </tbody>
          </table>
          <center>
            <input className="btn btn-primary" type="button" onClick={this.onNap} defaultValue="Nạp thẻ" /> 
            <div id="loading_napthe" style={{display: 'none', float: 'center'}}> &nbsp;Xin mời chờ...</div><br />
            <div className="label label-success" id="msg_success_napthe" /><br />
            <div className="label label-danger" id="msg_err_napthe">{/*?php echo $status; ?*/}</div><br />
          </center>
        </form>
      </div>
      </div>
    )
  }
}

export default Categories
