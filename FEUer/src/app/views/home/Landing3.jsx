import React, { Component } from 'react'
import { scrollTo } from 'utils'
import IntroLanding from './sections/IntroLanding'
import LandingService from './sections/LandingServices'
import CategoryLanding from './sections/CategoryLanding'
import TestimonialLanding from './sections/TestimonialLanding'
import LandingCallToAction from './sections/LandingCallToAction'
import Pricing1 from './sections/Pricing1'
import Contact1 from './sections/Contact1'
import TopBar3 from './sections/TopBar3'
import LandingFooter from './sections/LandingFooter'

class Landing3 extends Component {
  state = {}
  componentWillUnmount() {
    scrollTo('root')
  }

  render() {
    const { t, i18n } = this.props
    return (
      <div className="landing">
        <TopBar3 t={t} i18n={i18n} />
        <IntroLanding />
        <CategoryLanding />
        <LandingService />
        <TestimonialLanding /> 
        {/* <Pricing1 />
        <Contact1 /> */}
        <LandingFooter t={t} i18n={i18n} />
      </div>
    )
  }
}

export default Landing3
