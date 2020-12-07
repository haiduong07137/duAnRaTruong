import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import { Button, Icon } from '@material-ui/core'

class LandingService extends Component {
  state = {}

  serviceList = [
    {
      icon: 'dashboard',
      title: 'Affiliate Marketing',
      text:
        'Access to a dedicated team of analysts and our integrated marketing insights and attribution platform.',
    },
    {
      icon: 'payments',
      title: 'Multi-Touch Commissioning',
      text:
        'Earn commissions for sales you influence at the start, end or at both points of the affiliate journey.',
    },
    {
      icon: 'settings',
      title: 'Automate',
      text:
        'Auto-convert all standard advertiser links into commissionable tracking links.',
    },
    {
      icon: 'stay_primary_portrait',
      title: 'Mobile App Tracking',
      text:
        'Deep-linking capabilities create a smooth conversion experience and the ability to track app installs, leads and conversions.',
    },
  ]

  render() {
    return (
      <section className="section section-service1 light-gray" id="service1">
        <div className="container">
          <div className="section__header">
            <h2>Profitable Relationships</h2>
            <p>Gain access to all of our best features just by signing up.</p>
          </div>

          <Grid container spacing={3} alignContent="stretch">
            {this.serviceList.map((service) => (
              <Grid item md={3} sm={6} key={service.title}>
                <Card className="service1__card service__card card">
                  <CardContent className="service1__card__content">
                    <div>
                      <div className="text-center mb-16">
                        <Icon className="card__icon-64">{service.icon}</Icon>
                      </div>
                      <h3 className="font-light">{service.title}</h3>
                      <p>{service.text}</p>
                    </div>
                    {/* <div className="pt-16">
                      <Button>READ MORE</Button>
                    </div> */}
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

export default LandingService
