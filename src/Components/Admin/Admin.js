import React from "react";
import AdminAuth from "./AdminAuth";
import AdminDashboard from "./AdminDashboard";
import firebase from 'firebase';

/** This component is designed to strictly be backend only
 * All API calls and connections to the database should take place in this component
 * This component will also handle authentication and security related contraints
 *
 * Author: Harsha Srikara
 * Date: 3/22/20
 */

var firebaseConfig = {
  apiKey: "AIzaSyC10N5kRDieKncmUESxswqkYQ_359f9Qes",
  authDomain: "trackit-271619.firebaseapp.com",
  databaseURL: "https://trackit-271619.firebaseio.com",
  projectId: "trackit-271619",
  storageBucket: "trackit-271619.appspot.com",
  messagingSenderId: "972365141905",
  appId: "1:972365141905:web:fbda064275f635298cec30",
  measurementId: "G-HRLPFBGB1E"
};
// Initialize Firebase
let app = firebase.initializeApp(firebaseConfig);
let db = app.firestore();

// let setSf = db.collection('Student').doc('sivam').set({
//   Name: 'Sivam Patel', Email: 'spatel@gmail.com',
//   Password: 'Test456'
// });

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false, //once authentication happens this will toggle to true
      username: "", //stores the username of person that logged in (not required)
      password: "", //stores the password of person that logged in (not required)
      id: '',
      isAdmin: null
    };

    this.authenticate = this.authenticate.bind(this);
    this.readFromDatabase = this.readFromDatabase.bind(this);
  }

  /**
   * This function is passed as props to the AdminAuth Component which returns the username and password entered
   * Currrently just changes the loggedIn state to true without any checks
   *
   * @param {*} username is the username of the person logging in
   * @param {*} password is the password of the person logging in
   */
  authenticate(username, password) {
    if(username.charAt('@') === -1 || username.charAt('.') === -1)
      return;
  db.collection("Student").where('Email', '==', username).get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }
    else{
      snapshot.forEach(doc => {
        var data = doc.data();
        if(data.Password === password)
        {
          this.setState({
            loggedIn: true,
            username: data.Email,
            password: data.Password,
            id: data.id,
            isAdmin: data.isAdmin
          })
        }
      });
    }
     }).catch(function(error) {
       console.log("Error getting document:", error);
      })
    }

  readFromDatabase() {
    //read data from database and store it in this.state
    //eventually pass in the data to AdminDashboard as props
  }

  render() {
    return (
      <div>
        {/* If the user is not logged in then it displays the <AdminAuth /> Component, if they are logged in it will display the <AdminDashboard /> Component */}
        {/* <AdminAuth /> Component receives the authenticate function as props, AdminDashboard will eventually receive the data read back from firebase */}
        {this.state.loggedIn ? (
          <AdminDashboard />
        ) : (
          <AdminAuth authenticate={this.authenticate} />
        )}
      </div>
    );
  }
}

export default Admin;
