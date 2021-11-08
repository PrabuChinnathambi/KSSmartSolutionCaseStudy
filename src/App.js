import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'aos/dist/aos.css';
import Login from './components/LoginPage/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import AdminDashboard from './components/AdminDashoard/AdminDashboard';
import Users from './components/Users/Users';
import AdminAddUser from './components/AdminAddUser/AdminAddUser';
import VendorDashboard from './components/VendorDashboard/VendorDashboard';
import AdminPendingProducts from './components/AdminPendingProducts/AdminPendingProducts';
import AdminAcceptedProducts from './components/AdminAcceptedProducts/AdminAcceptedProducts';
import PublicPage from './components/PublicPage/PublicPage';

const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={PublicPage} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/adminDashboard" component={AdminDashboard} />
                    <Route exact path="/users" component={Users} />
                    <Route exact path="/addUser" component={AdminAddUser} />
                    <Route exact path="/vendorDashboard" component={VendorDashboard} />
                    <Route exact path="/pendingProducts" component={AdminPendingProducts} />
                    <Route exact path="/acceptedProducts" component={AdminAcceptedProducts} />
                </Switch>
            </Router>
        </div>
    )
}

export default App;