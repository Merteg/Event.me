import React from 'react';
import {Col, Row} from "react-materialize";

const RegistrationInfo = () => {
  return (
    <Row>
      <Col s={9} offset="s2" className="left-align">
        <h5>Please check your email to confirm your account.
        Sometimes this email can take a few minutes to reach in your inbox.
        It also can get redirected to your spam folder.</h5>
      </Col>
    </Row>

  )
}

export default RegistrationInfo;
