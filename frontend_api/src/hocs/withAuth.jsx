import React, { Component } from 'react';
import {connect} from 'react-redux';

 const withAuth = ComponentToBeRendered => {
    class Authenticate extends Component {
        
        componentWillMount() {
            if(!this.props.isAuth) {
                this.props.history.push('/signin');
            }
        }

        componentWillUpdate(nextProps) {
            if(!nextProps.isAuth) {
                this.props.history.push('/signin');
            }
        }

        render() {
            return <ComponentToBeRendered {...this.props} />
        }
    }
    
    const mapStateToProps = state => {
        return {
            isAuth : state.currentUser.isAuthenticated
        }
    }
    return connect(mapStateToProps)(Authenticate);
}

export default withAuth;

