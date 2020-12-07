import React, { Fragment } from "react";
import {
  Card,
  TextField,
  InputAdornment,
  Icon,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  Slider,
  Checkbox,
  Fab,
  Button,
  IconButton,
  Hidden,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import Rating from "@material-ui/lab/Rating";



const OfferSidenav = ({
  query,
  keyword,
  categories,
  locations,
  conversionTypes,
  times,
  currency,
  brands,
  multilevel,
  categoryList,
  locationList,
  conversionTypeList,
  currencyList,
  brandList,
  ratingList,
  shipping,
  payoutRange,
  toggleSidenav,
  handleSearch,
  handleMultilevelChange,
  handleSliderChange,
  handleCategoryChange,
  handleLocationChange,
  handleConversionTypeChange,
  handleChangeTimeNewestOrOldest,
  handleCurrencyChange,
  handlePayoutFilterClick,
  handleBrandChange,
  handleRatingClick,
  handleFreeShippingClick,
  handleClearPayoutRangeFilter,
  handleClearAllFilter,
  handleChangeKeyword,
  handleKeyDownEnterSearch,
  t,
}) => {
  return (
    <Fragment>
      <div className="pl-16 flex flex-middle mb-16">
        <TextField
          className="bg-paper flex-grow-1 mr-16"
          margin="none"
          name="query"
          variant="outlined"
          placeholder={t("general.enterSearch")}
          value={query}
          onKeyDown={handleKeyDownEnterSearch}
          onChange={(e) => handleChangeKeyword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon fontSize="small">search</Icon>
              </InputAdornment>
            ),
          }}
          inputProps={{
            style: {
              padding: "10px",
            },
          }}
          fullWidth
        ></TextField>
        <Hidden smUp>
          <Icon onClick={toggleSidenav}>clear</Icon>
        </Hidden>
      </div>
      <div className="px-16">
        {/* <Card elevation={3} className="position-relative p-16 mb-16">
          <h5 className="m-0 mb-16">{t('general.orderBy')}</h5>
          {categoryList.map((category) => (
            <div
              key={category.id}
              className="flex flex-middle flex-space-between"
            >
              <FormControlLabel
                className="flex-grow-1"
                name={category.name}
                onChange={handleCategoryChange}
                control={
                  <Checkbox checked={categories.includes(category.name)} />
                }
                label={<span className="capitalize">{category.name}</span>}
              />
            </div>
          ))}
        </Card> */}
        <Card elevation={3} className="position-relative p-16 mb-16">
          <h5 className="m-0 mb-16">{t("Offer.category")}</h5>
          {categoryList.map((category) => (
            <div
              key={category.id}
              className="flex flex-middle flex-space-between"
            >
              <FormControlLabel
                className="flex-grow-1"
                name={category.name}
                onChange={handleCategoryChange}
                control={
                  <Checkbox checked={categories.includes(category.name)} />
                }
                label={<span className="capitalize">{category.name}</span>}
              />
              {/* <small className="badge bg-light-primary text-primary">
                {category.products != null ? category.products.length : 0}
              </small> */}
            </div>
          ))}
        </Card>
        
        <Card elevation={3} className="position-relative p-16 mb-16">
          <h5 className="m-0 mb-16">{t("Time.time")}</h5>
          <FormControl component="fieldset">
          <RadioGroup aria-label="time1" name="time1" value={times} onChange={handleChangeTimeNewestOrOldest}>
         
            <div>
              <FormControlLabel
                className="flex-grow-1"
                value="false"
                control={<Radio />}
                label={<span className="capitalize">{t("Time.newest")}</span>}
              />
              </div>
              <div>
               <FormControlLabel
                className="flex-grow-1"
                value="true"
                control={<Radio   />}
                label={<span className="capitalize">{t("Time.oldest")}</span>}
              />
              </div>
              {/* <small className="badge bg-light-primary text-primary">
                {location.products != null ? location.products.length : 0}
              </small> */}
         
         
          </RadioGroup>
          </FormControl>
        </Card>

        <Button
          className="w-100"
          variant="contained"
          color="primary"
          onClick={handleClearAllFilter}
        >
          {t("general.clear_all_filters")}
        </Button>
      </div>
    </Fragment>
  );
};

export default OfferSidenav;
