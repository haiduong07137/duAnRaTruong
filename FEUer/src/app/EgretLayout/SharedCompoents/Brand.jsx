import React, { Component } from "react";
import ConstantList from "../../appConfig";
class Brand extends Component {
  state = {};
  render() {
    return (
      <div className="flex flex-middle flex-space-between brand-area">
        <div className="flex flex-middle brand">
          <img src= {ConstantList.ROOT_PATH+ "assets/images/logos/natureorigin.jpg"} alt="company-logo" />
          <span className="brand__text">Offer Pro</span>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Brand;
