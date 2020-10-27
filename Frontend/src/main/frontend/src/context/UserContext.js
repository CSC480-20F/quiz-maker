import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const UserContext = createContext();

function UserProvider ({ children }) {
    const [isInstructor, setInstructor] = useState([false]);

    const delay = ms => new Promise(res => setTimeout(res, ms));

    useEffect(() => {
        async function fetchData() {
            await delay(800);
            if (!window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
              console.log('NO GOOGLE USER')
              setInstructor(false);
            } else {
              const email = await window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail()
              console.log('GETTING DATA FROM DB');
              const { data } = await axios.get(
              `http://localhost:9081/users/is-instructor/${email}`
              );
              setInstructor(data);
            }
        }
        fetchData();
      }, [signInData()]);

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