import React, { Component } from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import { Link } from 'react-router-dom';

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

      // {
      //   userId: 1, 
      //   id: 2, 
      //   title: "qui est esse", 
      //   body: "est rerum tempore vitae↵sequi sint nihil reprehend…aperiam non debitis possimus qui neque nisi nulla"
      // }

       const columns = [
        {
          Header: 'Name',
          accessor: 'userID'
          // render: (text, record) => <Link to={'Quizzes/' + record.name}>{text}</Link>
        },

        {
          Header: 'Author',
          accessor: 'id'
        },

        {
          Header: 'Topic',
          accessor: 'title',
          render: (text, record) => <Link to={'Quizzes/' + record.name}>{text}</Link>
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

      const onRowClick = (state, rowInfo, column, instance) => {
        return {
            onClick: e => {
                // console.log('A Td Element was clicked!')
                // console.log('it produced this event:', e)
                // console.log('It was in this column:', column)
                console.log('It was in this row:', rowInfo.original.id)
                // console.log('It was in this table instance:', instance)
                // console.log('State', state);
            }
        }
    }

      return (
            <div style={{padding: '50px'}}>
                <ReactTable className='quiztable'
                    data={data}
                    columns={columns}
                    getTrProps={onRowClick}
                    defaultPageSize = {10}
                    filterable
                    pageSizeOptions = {[5,10,20,25]}
                />
            </div>
      )
    }
  }

  export default MyCreatedQuizzes;