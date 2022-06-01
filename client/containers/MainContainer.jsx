import React, { Component } from 'react';
import { connect } from 'react-redux';
// import from child components...
import Search from '../components/Search.jsx';
import DisplayContainer from './DisplayContainer.jsx';
import Filter from '../components/Filter.jsx';
import * as actions from '../actions/types.jsx';
import { getUserLocation} from '../actions/userActionCreators.jsx';
import { getRestaurants } from '../actions/restaurantActionCreator.jsx';
import { Link, Outlet } from 'react-router-dom';


class MainContainer extends Component {

  componentDidMount() {
    let userLat, userLong;
    const coordPromise = new Promise(function(resolve, reject) {

      window.navigator.geolocation.getCurrentPosition( function (position) {
        userLat = position.coords.latitude;
        userLong = position.coords.longitude;
        resolve({userLat, userLong});
      });

    });

    coordPromise.then( coords => {
      this.props.getUserLocation(coords.userLat, coords.userLong);
      // this.props.getRestaurants( { location: 10013 });
      this.props.getRestaurants({ latitude: coords.userLat, longitude: coords.userLong});
    });

  }
  

  render() {
    const filters = [];
    const categories = this.props.restaurants.categories;

    for (const [key, value] of Object.entries(categories)) {
      filters.push(
        <Filter key={key} category={key} checked={value} />
      );
    }

    const isLoggedIn = false;

    return (
      <div className = "MainContainer"> 
        {/* <Link id="login" to="/api/login"> Login </Link> */}
        {/* <button id='loginButton' onClick={() => }></button> */}
        { isLoggedIn ? <div>Welcome back, user </div> : <Link id="login" to="/api/login"> Login </Link> }
        <br></br>
        { isLoggedIn ? <div>Welcome back, user </div> : <Link id="sign up" to="/api/signup"> Sign Up </Link> }
        <br></br>
        Longitude: {this.props.users.longitude} 
        <div></div>
        Latitude: {this.props.users.latitude}
        <Search />
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          { filters }
        </ul>
        <DisplayContainer />
        <Outlet/>
      </div>
    ); 
  }
}

function mapStateToProps(state){
  return state;
}
export default connect(mapStateToProps, { getRestaurants, getUserLocation })(MainContainer);