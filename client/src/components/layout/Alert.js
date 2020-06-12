import React from 'react'
import PropTypes from 'prop-types'
// Required for a component to connect with redux
import {connect} from 'react-redux';

// Equal to 'props.alerts'
// If the two conditions are true, run the third condiition which is 'map'
const Alert = ({alerts}) => 
alerts !== null && alerts.length > 0 && alerts.map(alert => 
        (
            <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                {alert.msg}
            </div>
        )
    );

Alert.propTypes = 
{
    alerts: PropTypes.array.isRequired
}

// This state is returned from Reducer/index
const mapStateToProps = state => (
    {
        alerts: state.alert
    }
)

export default connect(mapStateToProps)(Alert);
