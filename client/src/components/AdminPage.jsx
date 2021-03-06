import React from 'react';
import { Link } from 'react-router-dom';


const AdminPage = () => {
  return (
    <React.Fragment>
      <Link to="/admin-page/users" className="btn waves-effect waves-light btn-flat">Users</Link>
      <Link to="/admin-page/events" className="btn waves-effect waves-light btn-flat">Events</Link>
    </React.Fragment>
    );
}

export default AdminPage;
