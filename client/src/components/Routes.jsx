import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Registration from './Nav/Registration';
import ConfirmEmail from './ConfirmEmail';
import AddEvent from './AddEvent'


function Routes() {
  return (
    <div className="content">
      <Route path="/" component={Home} exact />
      <Route path="/registration" component={Registration} exact />
      <Route path="/email_confirm/:token" component={ConfirmEmail} />
      <Route path="/add-event" component={AddEvent} />
    </div>
  )
}

export default Routes;
