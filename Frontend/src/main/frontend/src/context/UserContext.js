import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const UserContext = createContext();

function UserProvider ({ children }) {
    const [isInstructor, setInstructor] = useState([false]);

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const signIn = signInData()

    useEffect(() => {
        async function fetchData() {
            await delay(1000);
            if (!window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
              setInstructor(false);
            } else {
              const email = await window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail()
              const token = await window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
              console.log('Checking with DB to see if user is an instructor')
              const { data } = await axios.get(`http://localhost:9081/users/is-instructor/${email}`, { headers: {"Authorization" : `Bearer ${this.state.token}`}});
              setInstructor(data);
            }
        }
        fetchData();
      }, [signIn]);

      async function signInData(){
        await delay(1000);
        window.gapi.auth2.getAuthInstance().isSignedIn.get()
      }

      return (
        <UserContext.Provider value={{isInstructor}}>
          {children}
        </UserContext.Provider>
      );
}

export default UserProvider;