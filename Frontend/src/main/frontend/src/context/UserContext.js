// MIT License

// Copyright (c) 2020 SUNY Oswego

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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
              const { data } = await axios.get(`http://localhost:9081/users/is-instructor/${email}`, { headers: {"Authorization" : `Bearer ${token}`}});
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