import React , {Fragment, useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import {setAlert} from '../../actions/alert'
import {register} from '../../actions/auth'
import PropTypes from 'prop-types'


// Equal to 'props.setAlert'
const Register = ({setAlert, register, isAuthenticated}) => {
    
    // similar to 'state = {formData: {}}' and 'this.setState'
    const [formData, setFormData] = useState(
        {
            name: '',
            email: '',
            password: '',
            password2: ''
        });

     // EXAMPLE - Declare multiple state variables!
        // const [age, setAge] = useState(42);
        // const [fruit, setFruit] = useState('banana');
        // const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);   

    const {name, email, password, password2 } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => 
    {
        e.preventDefault();
        
        if(password !== password2) setAlert('Passwords do not match', 'danger');
        else register({name, email, password});
    }    

    // Redirect if logged in
    if (isAuthenticated) 
    {
      return <Redirect to="/dashboard" />;
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          
          <input type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
            required
             />

        </div>
        <div className="form-group">
          
          <input type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
             />

          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
        </Fragment>
    );
}


// For props typechecking
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });

// Connect takes a 'const' and 'array of actions' - that it has to use
export default connect(mapStateToProps, {setAlert, register})(Register);
