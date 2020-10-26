import React, { createContext, Component} from 'react';

export const UserContext = createContext();

class UserProvider extends Component {
    state = {
        isInstructor: true,
    }

    setUser = (isInstructor) => {
        this.setState((prevState) => ({ isInstructor }))
    }

    render () {
        return (
            <UserContext.Provider value = {{...this.state}}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default UserProvider;