import React from 'react'
import { Card, Button, Icon } from '@material-ui/core'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addProductToCart } from 'app/redux/actions/EcommerceActions'
import ConstantList from '../../appConfig'
const GridOfferCard = ({ product, addProductToCart, user }) => {
  return (
    <Card
      elevation={3}
      className="ecommerce__product-card text-center position-relative h-100"
    >
      <div className="product__image-box flex flex-center flex-middle position-relative">
        <span className="product__price m-0">
          Payout: {product.currentPayout}
        </span>
        <img
          src={ConstantList.ROOT_PATH + 'assets/images/logos/natureorigin.jpg'}
          alt={'Offer'}
        />
        <div className="image-box__overlay">
          <Button
            variant="outlined"
            className="bg-default"
            onClick={() => addProductToCart(user.userId, product.id)}
          >
            <Icon className="mr-8">pageview</Icon>
            <span>Detail</span>
          </Button>
        </div>
      </div>
      <div className="p-24">
        <h5 className="m-0">{'Offer'}</h5>
      </div>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  addProductToCart: PropTypes.func.isRequired,
  user: state.user,
})

export default connect(mapStateToProps, { addProductToCart })(GridOfferCard)
