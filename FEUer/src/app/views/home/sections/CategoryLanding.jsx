import React, { Component } from 'react'
import Card from '@material-ui/core/Card' 
import ConstantList from '../../../appConfig';
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { Button, Icon } from '@material-ui/core'

class CategoryLanding extends Component {
  state = {}

  portfoioList = [
    {
      imageUrl: 'assets/images/landing/OGMT9J0.jpg',
      name: 'Professional',
      description: `OfferPro is a leading global retailer with its own affiliate marketplace. We enable you to grow with unlimited scale. `,
    },
    {
      imageUrl: 'assets/images/landing/93189.jpg',
      name: 'Versatile',
      description: `Tens of thousands of affiliates choose OfferPro to promote top-performing products and to get paid on time, every time.`,
    },
    {
      imageUrl: 'assets/images/landing/21404.jpg',
      name: 'Leadership',
      description: `We dare to think big and drive bigger results. We are the most trusted and established name in affiliate marketing.`,
    },
  ]
  render() {
    return (
      <section className="section section-portfolio1" id="portfolio1">
        <div className="container">
          <div className="section__header">
            <h2>FOCUS ON WHAT MATTERS</h2>
            <p>
              With a platform like this, you can concentrate on things you are
              good at — attracting new clients.
            </p>
          </div>
          <Grid container spacing={3}>
            {this.portfoioList.map((portfolio, index) => (
              <Grid item md={4} sm={4} key={index}>
                <Card className="portfolio1__card card">
                  <img src={ConstantList.ROOT_PATH+portfolio.imageUrl} alt="portfolio" />
                  <CardContent className="portfolio1__card__content">
                    <div>
                      <h5>{portfolio.name}</h5>
                      <p>{portfolio.description}</p>
                      <Divider />
                    </div>
                    <div className="pt-16">
                      <IconButton>
                        <Icon>link</Icon>
                      </IconButton>
                      <IconButton>
                        <Icon>share</Icon>
                      </IconButton>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </section>
    )
  }
}

export default CategoryLanding
