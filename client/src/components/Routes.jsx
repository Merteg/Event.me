import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';
import AdminPage from './AdminPage';
import AdminPageUsers from './AdminPageUsers';
import AdminPageEvent from './AdminPageEvent';
import MapLayout from './MapLayout';
import ConfirmEmail from './ConfirmEmail';
import RecoverInfo from './RecoverInfo';
import RegistrationInfo from './RegistrationInfo';
import ChangePasswordConfirm from './ChangePasswordConfirm';
import ChangePassword from './ChangePassword';
import EventForm from './EventForm';
import Profile from './Profile';
import EventPage from './EventPage';
import ProfileEdit from './ProfileEdit';



function Routes() {

  return (
    <React.Fragment>
        <Route path="/map" component={MapLayout} exact />
        <Route path="/" component={HomePage} exact />
        <Route path="/recover" component={HomePage} exact />
      <div className="container">
        <Route path="/admin-page" component={AdminPage} exact />
        <Route path="/admin-page/users" component={AdminPageUsers} exact />
        <Route path="/admin-page/events" component={AdminPageEvent} exact />
        <Route path="/email_confirm/:token" component={ConfirmEmail} />
        <Route path="/recover-info" component={RecoverInfo} />
        <Route path="/change-password/:token" component={ChangePassword} />
        <Route path="/confirm-new-password" component={ChangePasswordConfirm} />
        <Route path="/registration-info" component={RegistrationInfo } />

        <Route path="/add-event" component={EventForm} exact />
        <Route path="/event/:id" component={EventPage} exact />
        <Route path="/event/edit/:id" component={EventForm} exact />

        <Route path="/profile/:profile_id" component={Profile} />
        <Route path="/profile-edit/:profile_id" component={ProfileEdit} />
      </div>
    </React.Fragment>
  )
}

export default Routes;
