// racf - shortcut
import React, {Fragment} from 'react'
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({logout, auth:{loading, isAuthenticated}}) => 
{   
  // const authLinks = 
  // {
  //   <ul>
  //         <li>
  //           <Link onClick={logout} to="#!">
  //             Logout
  //           </Link>
  //         </li>
  //   </ul>
  // }

  // const guestLinks = 
  // {
  //   <ul>
  //         <li><Link to="#!">Developers</Link></li>
  //         <li><Link to="/register">Register</Link></li>
  //         <li><Link to="/login">Login</Link></li>
  //   </ul>
  // };
  
  return (
        <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevBlogs</Link>
      </h1>
      
      {/* To fix */}
      {/* <ul>
           <li><Link to="#!">Developers</Link></li>
           <li><Link to="/dashboard">Dashboard</Link></li>
           <li><Link to="/register">Register</Link></li>
           <li><Link to="/login">Login</Link></li>
     </ul> */}


    { !loading && <Fragment> 
      { isAuthenticated ? 
        <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li>
              <Link onClick={logout} to="/login">
                Logout
              </Link>
            </li>
        </ul> 
        :
        <ul>
          <li><Link to="#!">Developers</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul> 
      } 
      </Fragment>
    }

    </nav>
    )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => (
  {
    auth: state.auth
  });


export default connect(mapStateToProps, {logout})(Navbar);