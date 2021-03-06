import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import { Route } from 'react-router-dom';
import SignInUpTabs from './SignInUpTabs';
import RecoverPasswordTab from './RecoverPasswordTab';
import OurTeam from './OurTeam';
import HowAddEvent from './HowAddEvent';
import { isLogged } from '../../utils';
import HotEvents from '../HotEvents'


class HomePage extends Component {
  componentDidMount() {
    document.title = "Featured Events | Event.me";
    window.addEventListener('user-log', (e) => this.forceUpdate());
  }

  renderHeaderText() {
    return (
      <div className="header-text center-align">
        <h1>Find out Rivne events with us</h1>
        <p className="flow-text">
          There's so much happening in Rivne all year round – Rivne's events calendar
          is always busy! Have a look at our overview of events in London by week,
          plan your month ahead and make sure you don't miss out. You can also search by
          date or category and find out what's on during your visit.
            </p>
      </div>
    )
  }

  renderHeader() {
    if (!isLogged()) {
      return (
        <Row className="img-container">
          <Col s={6} offset="s1" >
            {this.renderHeaderText()}
          </Col>
          <Col s={3} offset="s1" className="tabs-container">
            <Route path="/" component={SignInUpTabs} exact />
            <Route path="/recover" component={RecoverPasswordTab} exact />
          </Col>
        </Row>
      )
    } else {
      return (
        <Row className="img-container">
          <Col s={10} offset="s1" >
            {this.renderHeaderText()}
          </Col>
        </Row>
      )
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.renderHeader()}
        <Row className="center-align"><h2>Featured Events</h2></Row>
          <Row><HotEvents /></Row>
        <Row className="center-align"><h2>Our Team</h2></Row>
          <OurTeam />
        <Row className="center-align"><h2>How to add an event?</h2></Row>
          <HowAddEvent />
      </React.Fragment>
    );
  }
}

export default HomePage;
