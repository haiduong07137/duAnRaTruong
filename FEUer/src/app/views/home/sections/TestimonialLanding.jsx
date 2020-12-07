import React, { Component } from "react";
import ConstantList from '../../../appConfig';
import { Card, CardContent } from "@material-ui/core";
import Carousel from "../common/Carousel";

class TestimonialLanding extends Component {
  state = {};

  testimonialList = [
    {
      companyLogoUrl: "./assets/images/mock-logo-1.png",
      comment: `"My current role involves a lot of admin tasks, supporting a variety of accounts within my team. I primarily work on fashion, beauty and travel accounts within Key Account Management. On a day to day basis I am always on the look for the arranged exposure and making sure that it is live and documented for the client’s needs, publisher approvals (accepting or rejecting publishers into the programmes), and creating weekly communications for various sales which are going live for all clients."`,
      user: {
        imageUrl: ConstantList.ROOT_PATH+"./assets/images/face-1.jpg",
        name: "John Doe",
        designation: ""
      }
    },
    {
      companyLogoUrl: "./assets/images/mock-logo-2.png",
      comment: `"Working as a campaign assistant I have developed my skills in time management in order to prioritise tasks for each account. The ability to be flexible and communicate continuously are the key skills a campaign assistant needs in order to help everything run smoothly. Before starting this role I wasn’t aware of how much I would rely on Excel on a day to day basis - especially when it comes to weekly reporting! This is a skill that has developed massively since I started and I can see my Excel skills/knowledge growing each week."`,
      user: {
        imageUrl: ConstantList.ROOT_PATH+"./assets/images/face-2.jpg",
        name: "Adam Smith",
        designation: ""
      }
    },
    {
      companyLogoUrl: "./assets/images/mock-logo-3.png",
      comment: `"Over the years I have found Offer Pro to be a great place to grow, as you are given ample opportunity to gain experience in a variety of areas that include project and business management, as well as developing recruitment and people management/leadership skills. Areas which have allowed me to progress quickly and skills I may not have had the opportunity to gain in a more restricted other businesses.  "`,
      user: {
        imageUrl: ConstantList.ROOT_PATH+"./assets/images/face-3.jpg",
        name: "John White",
        designation: ""
      }
    },
    {
      companyLogoUrl: "./assets/images/mock-logo-4.png",
      comment: `"I joined Offer Pro at the very beginning of 2020 and started my career here in the Account Development team looking after some small and medium sized accounts. I had come from a background in IT sales and marketing and this was (and still is)
      my first foray in to the world of affiliate marketing. I quickly moved in to our Product team as a Product Manager and stayed there for the next 6 years and have now transitioned to a role focusing on Product Marketing. "`,
      user: {
        imageUrl: ConstantList.ROOT_PATH+"./assets/images/face-4.jpg",
        name: "Jessica Hiche",
        designation: ""
      }
    }
  ];

  render() {
    return (
      <div className="section section-testimonial1" id="testimonial1">
        <div className="container">
          <div className="section__header">
            <h2>What our customers says</h2>
            <p>
            Below are our customers' comments about the experience of using the product.
            </p>
          </div>

          <Carousel>
            {this.testimonialList.map((testimonial, index) => (
              <Card className="h-100 px-24 card" key={index}>
                <CardContent className="testimonial1__card-content">
                  <div className="pb-16">
                    <img
                      className="p-0 m-0 pb-24 pt-16"
                      src={ConstantList.ROOT_PATH+testimonial.companyLogoUrl}
                      alt="logo"
                    />
                    <p className="m-0">{testimonial.comment}</p>
                  </div>

                  <div className="card__user">
                    <img
                      className="p-0 m-0"
                      src={testimonial.user.imageUrl}
                      alt="user"
                    />
                    <div className="pl-16">
                      <p className="m-0">
                        <strong>{testimonial.user.name}</strong>
                      </p>
                      <p className="m-0">{testimonial.user.designation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </Carousel>
        </div>
      </div>
    );
  }
}

export default TestimonialLanding;
