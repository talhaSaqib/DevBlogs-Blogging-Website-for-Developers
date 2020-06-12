import React, {Fragment, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import DashboardActions from './DashboardActions';

const Dashboard = ({ getCurrentProfile , auth:{user}, profile:{profile, loading}}) => {

    // We need profile as soon as the page loads
    useEffect(() => 
    {
        getCurrentProfile();
    }, []);

    return loading && profile === null ? <h2>Loading...</h2> : <Fragment>
        <h1>Dashboard</h1>
        <i className="fas fa-user"/> Welcome {user && user.name}
    
        {profile !== null ? (
            <Fragment>
                <DashboardActions />    
            </Fragment>
        ) : (
            <Fragment>
                <p>You haven't yet setup a profile, please add some info</p>
                <Link to="/create-profile" className="btn btn-primary my-1">
                    Create Profile
                </Link> 
            </Fragment>
        )}
    
    </Fragment>;
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
  });

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);
