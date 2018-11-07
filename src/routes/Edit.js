import React, { Component } from 'react';
import './Edit.css';
import FireBaseAuth from 'react-firebaseui/FirebaseAuth';
import {firebase, db} from '../helpers/firebase.js';

class Edit extends Component {
  
  state = {
    isSignedIn: false, // Local signed-in state.
    isPlaying: false,
    displayName: '',
    userEmail: '',
    online: [],
    tracks: [],
  }

  // Configure FirebaseUI
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    //signInSuccessUrl: '/signedIn',
    callbacks: {
       // Avoid redirects after sign-in.
       signInSuccessWithAuthResult: () => false
    },
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
  };

  signOut() {
    firebase.auth().signOut()
  }

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => {
        this.setState({isSignedIn: !!user})
        if(user) {
          const docRef = db.collection("users").doc(user.uid);
          docRef.get().then((doc) => {
            if (doc.exists) {
              this.setState({
                tracks: doc.data().tracks,
              })
            }
          }).catch((error) => {
              console.log("Error getting document:", error);
          });
        }
      }
    );
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    return (
      <div className='Edit'>
        <h1>Augmented Self(ish)</h1>
        {
          this.state.isSignedIn
          ?
          <div>
            <p>
              Hello {firebase.auth().currentUser.displayName}.
              <button onClick={this.signOut}>Sign out</button>
            </p>
            <ul>
              {this.state.tracks.map(track => <li key={track.name}>{track.name}</li>)}
            </ul>
          </div>
          : <FireBaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
        }
      </div>
    )
  }
}

export default Edit;