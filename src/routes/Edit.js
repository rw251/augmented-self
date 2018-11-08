import React, { useState, useEffect } from 'react';
import './Edit.css';
import FireBaseAuth from 'react-firebaseui/FirebaseAuth';
import {firebase, db} from '../helpers/firebase.js';

let persistedState = {
  userId: null, // Local signed-in state.
  tracks: [],
}

const loadDocs = (userId) => {
  const docRef = db.collection("users").doc(userId);
  return docRef.get().then((doc) => {
    if (doc.exists) {
      persistedState.tracks = doc.data().tracks
      return persistedState.tracks;
    }
  }).catch((error) => {
      console.log("Error getting document:", error);
      return [];
  });
}

// Configure FirebaseUI
const uiConfig = {
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

const globalAuthUnregister = firebase.auth().onAuthStateChanged(
  (user) => {
    persistedState.userId = user && user.uid;
  }
);

function signOut() {
  firebase.auth().signOut()
}

function Edit() {

  const [tracks, setTracks] = useState(persistedState.tracks)
  const [userId, setUserId] = useState(persistedState.userId)

  useEffect(() => {
    if(globalAuthUnregister) globalAuthUnregister();
    console.log(`Effect: REGISTER - called ${new Date().toISOString()}`)
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => {
        persistedState.userId = user && user.uid;
        setUserId(persistedState.userId)
      }
    );
    return () => {
      console.log(`Effect: UNREGIST - called ${new Date().toISOString()}`)
      unregisterAuthObserver();
    }
  }, [])
  
  useEffect(() => {
    console.log(`Effect: GET_DATA - called ${new Date().toISOString()}`)
    setUserId(persistedState.userId)
    if(userId) {
      loadDocs(userId).then((latestTracks)=>{
        setTracks(latestTracks)
      });
    }
  }, [userId, tracks.length])

  const removeTrack = (track) => {
    setTracks(tracks.filter(t => t.name !== track.name))

    const docRef = db.collection("users").doc(userId);
    docRef
      .update({
        tracks: firebase.firestore.FieldValue.arrayRemove(track)
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTrack = {
      name: document.getElementsByName('name')[0].value, 
      description: document.getElementsByName('description')[0].value,
      field: document.getElementsByName('field')[0].value, 
    };

    setTracks([...tracks, newTrack])

    const docRef = db.collection("users").doc(userId);
    docRef
      .update({
        tracks: firebase.firestore.FieldValue.arrayUnion(newTrack)
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      })
  }
  
  return (
    <div className='Edit'>
      <h1>Augmented Self(ish)</h1>
      {
        userId
        ?
        <div>
          <p>
            Hello {firebase.auth().currentUser.displayName}.
            <button onClick={signOut}>Sign out</button>
          </p>
          { tracks.map(track => 
            <div key={track.name} className='item'>
              <div>Name: {track.name}</div>
              <div>Description: {track.description}</div>
              <div>Field: {track.field}</div>
              <button onClick={e => removeTrack(track)}>Remove</button>
            </div>
            )
          }
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" name="name"></input>
            <input type="text" placeholder="Description" name="description"></input>
            <select name="field">
              <option>text</option>
              <option>checkbox</option>
            </select>
            <button type="submit">Add</button>
          </form>
        </div>
        : <FireBaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      }
    </div>
  )
}

export default Edit;