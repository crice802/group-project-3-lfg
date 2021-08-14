import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import NavBar from '../../components/NavBar/NavBar'
import Signup from '../Signup/Signup'
import Login from '../Login/Login'
import Landing from '../Landing/Landing'
import ProfileList from '../ProfileList/ProfileList'
import StateLocation from '../../components/StateLocaltion/StateLocation'
import * as authService from '../../services/authService'


class App extends Component {
  state = {
    user: authService.getUser()
  }

  handleLogout = () => {
    authService.logout()
    this.setState({ user: null })
    this.props.history.push('/')
  }

  handleSignupOrLogin = () => {
    this.setState({ user: authService.getUser() })
  }

  render() {
    const { user } = this.state
    return (
      <>
        <NavBar user={user} handleLogout={this.handleLogout} history={this.props.history}/>
        <Route exact path='/'>
          <Landing user={user} 
          render={()=> <StateLocation
          
          />}
          />
        </Route>
        <Route exact path='/signup'>
          <Signup history={this.props.history} handleSignupOrLogin={this.handleSignupOrLogin}/>
        </Route>
        <Route exact path='/login'>
          <Login handleSignupOrLogin={this.handleSignupOrLogin} history={this.props.history}/>
        </Route>
        <Route 
          exact path="/users"
          render={()=> 
            user ? <ProfileList /> : <Redirect to='/login'/>
        }/>

      </>
    )
  }
}

export default App

