import React, { Component } from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

class MyCreatedQuizzes extends Component {

  constructor(props){
    super(props);
    this.state={
        posts:[]
    }
}


componentDidMount() {
  const url = "https://jsonplaceholder.typicode.com/posts";

  fetch(url, {
    method: 'GET',
  }).then(response => response.json()).then(posts => {
   this.setState({posts: posts})
  })
  }

    render() {
      const data = this.state.posts;

       const columns = [
        {
            Header: 'Name',
            accessor: 'userID'
        },

        {
            Header: 'Author',
            accessor: 'id'
        },

        {
            Header: 'Topic',
            accessor: 'title'
        },

        {
            Header: 'Questions',
            accessor: 'body'
        },

        {
            Header: 'Date',
            accessor: 'date'
        },

        {
            Header: 'Rating',
            accessor: 'rating'
        },



        ]
      return (
            <div style={{padding: '50px'}}>
                <ReactTable className='quiztable'
                    data={data}
                    columns={columns}
                    defaultPageSize = {10}
                    filterable
                    pageSizeOptions = {[5,10,20,25]}
                />
            </div>
      )
    }
  }

  export default MyCreatedQuizzes;