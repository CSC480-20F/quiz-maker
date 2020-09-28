import React from 'react';

class Searchbar extends React.Component {


    state = {
        quiztitles: [
            'Calculus I',

            'Piano 101',

            'Programming Languages',

            'Biology',

            'Intro to Criminal Justice',

        ],
        searchTerm: ''

        
    }

    editSearchTerm = (e) => {
        this.setState({searchTerm: e.target.value})
    }




    render(){
        return (

            <div>
        <input type= 'text' value = {this.state.searchTerm} onChange = {this.editSearchTerm} placeholder = 'Search for a quiz'/>

            </div>

        );
    }
}

export default Searchbar;

