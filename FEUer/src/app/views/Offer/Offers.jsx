import React, { Component } from "react";
import {
  EgretSidenavContainer,
  EgretSidenav,
  EgretSidenavContent,
} from "egret";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getProductList,
  getCategoryList,
  getRatingList,
  getBrandList,
  getOfferList,
} from "../../redux/actions/EcommerceActions";

import * as _ from "lodash";
import OfferSidenav from "./OfferSidenav";
import OfferContainer from "./OfferContainer";
import { useTranslation, withTranslation, Trans } from "react-i18next";
import ControlledExpansionPanels from "../material-kit/expansion-panel/ControlledAccordion";


import localStorageService from "../../services/localStorageService";
class Offers extends Component {
  debounceTimer;
  categories = [];
  brands = [];

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      view: "grid",
      page: 0,
      rowsPerPage: 6,
      orderBy: "",
      propsReceived: false,
      payoutRange: [],
      query: "",
      multilevel: "all",
      shipping: false,
      categories: [],
      locations: [],
      conversionTypes: [],
      times: false,
      currency: "",
      tempCurrency: "USD",
      tempPayoutRange: [0, 100],
      brands: [],
      keyword: "",
      type: "public",
    };
  }

  toggleSidenav = () => {
    this.setState({ open: !this.state.open });
  };

  callSearchByPage = () => {
    let user = localStorageService.getItem('auth_user');
    
    let searchObject = {
      id: user.id,
      keyword: this.state.keyword,
      pageIndex: this.state.page + 1,
      pageSize: this.state.rowsPerPage,
      locations: this.state.locations,
      conversionTypes: this.state.conversionTypes,
      times: this.state.times,
      categories: this.state.categories,
      currency: this.state.currency,
      payoutRange:
        this.state.currency === "VND" && this.state.payoutRange.length > 0
          ? this.state.payoutRange.map((value) => (value = value * 1000))
          : this.state.payoutRange,
    };
    console.log(searchObject);
    this.props.getOfferList(searchObject, this.state.type);
  };

  handleSliderChange = (event, newValue) => {
    this.setState({ tempPayoutRange: newValue });
    // this.filterProductOnPriceRange(newValue[0] * 10, newValue[1] * 10)
  };

  setRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value }, () =>
      this.callSearchByPage()
    );
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage }, () => this.callSearchByPage());
  };

  toggleView = (view) => this.setState({ view });

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeKeyword = (query) => {
    this.setState({ query }, () => {
      if (query === "") {
        this.setState({ keyword: "" }, () => this.callSearchByPage());
      }
    });
  };

  handleKeyDownEnterSearch = (e) => {
    if (e.key === "Enter") {
      this.handleSearch();
    }
  };

  handleSearch = () => {
    this.setState({ keyword: this.state.query }, () => this.callSearchByPage());
  };

  handleMultilevelChange = (event) => {
    let eventValue = event.target.value;
    let range = event.target.value.split(",");
    let { publicOfferList = [] } = this.props;

    if (eventValue === "all") {
      this.setState({ multilevel: eventValue, publicOfferList });
      return;
    }

    this.setState({ multilevel: eventValue });

    range = range.map((value) => parseInt(value));

    if (range.length === 2) {
      this.filterProductOnPriceRange(range[0], range[1]);
    } else {
      this.setState({
        publicOfferList: publicOfferList.filter(
          (product) => product.price >= range[0]
        ),
      });
    }
  };

  handleCategoryChange = (event) => {
    let target = event.target;
    let { categories } = this.state;
    let tempCategories;
    if (target.checked) {
      tempCategories = [...categories, target.name];
      this.setState(
        {
          categories: tempCategories,
        },
        () => this.filterProductOnProperty("category", tempCategories)
      );
    } else {
      tempCategories = categories.filter((item) => item !== target.name);
      this.setState(
        {
          categories: tempCategories,
        },
        () => this.filterProductOnProperty("category", tempCategories)
      );
    }
  };

  handleLocationChange = (event) => {
    let target = event.target;
    let { locations } = this.state;
    let tempLocations;
    if (target.checked) {
      tempLocations = [...locations, target.name];
      this.setState(
        {
          locations: tempLocations,
        },
        () => this.filterProductOnProperty("location", tempLocations)
      );
    } else {
      tempLocations = locations.filter((item) => item !== target.name);
      this.setState(
        {
          locations: tempLocations,
        },
        () => this.filterProductOnProperty("location", tempLocations)
      );
    }
  };

  handleConversionTypeChange = (event) => {
    let target = event.target;
    let { conversionTypes } = this.state;
    let temConversionTypes;
    if (target.checked) {
      temConversionTypes = [...conversionTypes, target.name];
      this.setState(
        {
          conversionTypes: temConversionTypes,
        },
        () => this.filterProductOnProperty("conversionType", temConversionTypes)
      );
    } else {
      temConversionTypes = conversionTypes.filter((item) => item !== target.name);
      this.setState(
        {
          conversionTypes: temConversionTypes,
        },
        () => this.filterProductOnProperty("conversionType", temConversionTypes)
      );
    }
  };

  handleChangeTimeNewestOrOldest = (event) => {
    let { times } = this.state
    this.setState({ times: event.target.value },
      () => this.filterProductOnProperty("time", this.state.times)
    );
  };


  handleCurrencyChange = (event) => {
    this.setState({
      tempCurrency: event.target.value,
    });
  };

  handleBrandChange = (event) => {
    let target = event.target;
    let { brands } = this.state;
    let tempBrands;
    if (target.checked) {
      tempBrands = [...brands, target.name];
      this.setState({
        brands: tempBrands,
        publicOfferList: this.filterProductOnProperty("brand", tempBrands),
      });
    } else {
      tempBrands = brands.filter((item) => item !== target.name);
      this.setState({
        brands: tempBrands,
        publicOfferList: this.filterProductOnProperty("brand", tempBrands),
      });
    }
  };

  handlePayoutFilterClick = () => {
    const { tempPayoutRange, tempCurrency } = this.state;
    this.setState((prevState) => ({
      payoutRange: prevState.tempPayoutRange,
      currency: prevState.tempCurrency,
      publicOfferList: this.filterProductOnProperty(
        "payout",
        tempPayoutRange,
        tempCurrency
      ),
    }));
    console.log(this.state);
  };

  handleRatingClick = (rate) => {
    this.setState({
      publicOfferList: this.filterProductOnProperty("rating", [rate]),
    });
  };

  handleFreeShippingClick = () => {
    let shippingStatus = !this.state.shipping;
    this.setState({
      shipping: shippingStatus,
      publicOfferList: this.filterProductOnProperty("freeShipping", [
        shippingStatus,
      ]),
    });
  };

  filterProductOnProperty = (property, value = [], currency = "") => {
    let { publicOfferList = [] } = this.props;
    let filteredPublicOfferList = publicOfferList;
    let searchObject = {
      keyword: this.state.keyword,
      pageIndex: 1,
      pageSize: this.state.rowsPerPage,
      locations: this.state.locations,
      conversionTypes: this.state.conversionTypes,
      times: this.state.times,
      categories: this.state.categories,
      currency: this.state.currency,
      payoutRange:
        this.state.currency === "VND"
          ? this.state.payoutRange.map((value) => (value = value * 1000))
          : this.state.payoutRange,
    };
    this.setState({
      page: 0,
    });
    switch (property) {
      case "category":
        searchObject.categories = value;
        this.props.getOfferList(searchObject, this.state.type);
        break;
      case "location":
        searchObject.locations = value;
        this.props.getOfferList(searchObject, this.state.type);
        break;
      case "conversionType":
        searchObject.conversionTypes = value;
        this.props.getOfferList(searchObject, this.state.type);
        break;
      case "payout":
        if (currency === "VND") {
          searchObject.payoutRange = value.map((num) => (num = num * 1000));
        } else {
          searchObject.payoutRange = value;
        }
        searchObject.currency = currency;
        this.props.getOfferList(searchObject, this.state.type);
        break;
      case "time":
        searchObject.times = this.state.times;
        this.props.getOfferList(searchObject, this.state.type);
        break;
      default:
        break;
    }

    return filteredPublicOfferList;
  };

  // filterProductOnPriceRange = (lowestPrice, highestPrice) => {
  //   let { publicOfferList = [] } = this.props
  //   this.setState({
  //     publicOfferList: publicOfferList.filter(
  //       (product) =>
  //         product.price >= lowestPrice && product.price <= highestPrice
  //     ),
  //   })
  // }

  handleClearPayoutRangeFilter = () => {
    this.setState(
      {
        payoutRange: [],
        currency: "",
        tempPayoutRange: [0, 100],
        tempCurrency: "USD",
      },
      () => this.callSearchByPage()
    );
  };

  handleClearAllFilter = () => {
    this.setState(
      {
        payoutRange: [],
        tempPayoutRange: [0, 100],
        query: "",
        multilevel: "all",
        shipping: false,
        categories: [],
        locations: [],
        conversionTypes: [],
        times: "",
        currency: "",
        tempCurrency: "USD",
        brands: [],
        keyword: ""
      },
      () => this.callSearchByPage()
    );
  };

  componentDidMount() {
    this.callSearchByPage();
    this.props.getCategoryList({
      keyword: "",
      pageIndex: 1,
      pageSize: 1000,
    });
    this.props.getRatingList();
    this.props.getBrandList();
    // const s = document.createElement('script');
    // s.type = 'text/javascript';
    // s.async = true;
    // s.innerHTML = '    var a = document.getElementsByTagName("a") \n for(var i = 0; i < a.length;i++) \n { if(a[i].href.includes("offers/list")){ \n a[i].classList.add("active")} \n } '; 
    // this.instance.appendChild(s);
  }

  componentWillUnmount() {
    clearTimeout(this.debounceTimer);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { publicOfferList = [] } = nextProps;
    if (prevState.propsReceived) {
      return {};
    } 
    else if (!prevState.propsReceived && publicOfferList.length > 0)
      return {
        propsReceived: true,
        publicOfferList,
      };
    else return {};
  }

  render() {
    const { t, i18n } = this.props;
    let {
      brands,
      categories,
      view,
      page,
      rowsPerPage,
      orderBy,
      query,
      keyword,
      multilevel,
      shipping,
      locations,
      conversionTypes,
      times,
      tempCurrency,
      tempPayoutRange,
    } = this.state;

    const locationList = [
      {
        value: 'Vietnam',
        label: t('Country.vietnam'),
      },
      {
        value: 'USA',
        label: t('Country.usa'),
      },
      {
        value: 'Indonesia',
        label: t('Country.indonesia'),
      },
      {
        value: 'Thailand',
        label: t('Country.thailand'),
      }
    ]

    const conversionTypeList = [
      {
        value: 'CPO',
        label: t('conversion_Type.cpo'),
      },
      {
        value: 'CPL',
        label: t('conversion_Type.cpl'),
      },
      {
        value: 'CPA',
        label: t('conversion_Type.cpa'),
      },

    ]

    const currencyList = [
      {
        value: "USD",
        label: "$",
      },
      {
        value: "VND",
        label: "₫",
      },
      {
        value: "THB",
        label: "Thb",
      },
      {
        value: "IDR",
        label: "Rp",
      },
    ];

    const orderByList = [];

    let { categoryList = [], ratingList = [], brandList = [] } = this.props;

    return (
      <div className="shop m-sm-30">
        <EgretSidenavContainer>
          <EgretSidenav
            width="288px"
            open={this.state.open}
            toggleSidenav={this.toggleSidenav}
          >
            <div ref={el => (this.instance = el)} />
            <OfferSidenav
              query={query}
              categories={categories}
              locations={locations}
              conversionTypes={conversionTypes}
              times={times}
              currency={tempCurrency}
              brands={brands}
              multilevel={multilevel}
              categoryList={categoryList}
              locationList={locationList}
              conversionTypeList={conversionTypeList}
              currencyList={currencyList}
              brandList={brandList}
              ratingList={ratingList}
              shipping={shipping}
              payoutRange={tempPayoutRange}
              toggleSidenav={this.toggleSidenav}
              handleSearch={this.handleSearch}
              handleMultilevelChange={this.handleMultilevelChange}
              handleSliderChange={this.handleSliderChange}
              handleCategoryChange={this.handleCategoryChange}
              handleLocationChange={this.handleLocationChange}
              handleTimeChange={this.handleTimeChange}
              handleConversionTypeChange={this.handleConversionTypeChange}
              handleChangeTimeNewestOrOldest={this.handleChangeTimeNewestOrOldest}
              handleCurrencyChange={this.handleCurrencyChange}
              handlePayoutFilterClick={this.handlePayoutFilterClick}
              handleClearPayoutRangeFilter={this.handleClearPayoutRangeFilter}
              handleBrandChange={this.handleBrandChange}
              handleRatingClick={this.handleRatingClick}
              handleKeyDownEnterSearch={this.handleKeyDownEnterSearch}
              handleChangeKeyword={this.handleChangeKeyword}
              handleFreeShippingClick={this.handleFreeShippingClick}
              handleClearAllFilter={this.handleClearAllFilter}
              t={t}
            ></OfferSidenav>
          </EgretSidenav>
          <EgretSidenavContent>
            <OfferContainer
              orderBy={orderBy}
              view={view}
              offerList={this.props.publicOfferList}
              totalOffer={this.props.totalPublicOffer}
              page={page}
              rowsPerPage={rowsPerPage}
              toggleView={this.toggleView}
              toggleSidenav={this.toggleSidenav}
              handleChange={this.handleChange}
              handleChangePage={this.handleChangePage}
              setRowsPerPage={this.setRowsPerPage}
              t={t}
            ></OfferContainer>
          </EgretSidenavContent>
        </EgretSidenavContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getProductList: PropTypes.func.isRequired,
    getRatingList: PropTypes.func.isRequired,
    getBrandList: PropTypes.func.isRequired,
    categoryList: state.ecommerce.categoryList,
    locationList: state.ecommerce.locationList,
    conversionTypeList: state.ecommerce.conversionTypeList,
    ratingList: state.ecommerce.ratingList,
    brandList: state.ecommerce.brandList,
    totalPublicOffer: state.ecommerce.totalPublicOffer,
    publicOfferList: state.ecommerce.publicOfferList,
  };
};

export default connect(mapStateToProps, {
  getProductList,
  getCategoryList,
  getRatingList,
  getBrandList,
  getOfferList,
})(Offers);
