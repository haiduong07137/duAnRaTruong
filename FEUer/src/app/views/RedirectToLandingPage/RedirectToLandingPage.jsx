import React, { Component } from "react";
import {
  IconButton,
  Grid,
  Icon,
  TablePagination,
  Button,
  TextField
} from "@material-ui/core";
import MaterialTable, { MTableToolbar, Chip, MTableBody, MTableHeader } from 'material-table';
import { RedirectToLandingPage } from "./RedirectToLandingPageService"; 
import { Breadcrumb, ConfirmationDialog } from "egret";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { saveAs } from 'file-saver';
import { Helmet } from 'react-helmet';



class Landing3 extends Component {
  state = {}
  
  handleRedirectToLandingPage = () => { 
    RedirectToLandingPage(this.props.match.params.id).then(({ data }) => {  
      window.location =  data.websiteUrl ;
      // console.log(data.websiteUrl);
    });
  };

  componentWillMount() { 
    this.handleRedirectToLandingPage()
  }

  render() {
    const { t, i18n } = this.props
    return (
      <div className="landing">  
      </div>
    )
  }
}
 

export default Landing3;
