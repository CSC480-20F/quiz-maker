import React, { Component } from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import { withRouter } from 'react-router-dom';

class InstructorQuizTable extends Component {

    render() {
      const getTopics = (topics) => {
        if (topics.length > 0) {
          return (topics.join(', '))
        }
        return (topics)
      }

      const getDate = (mongoID) => {
        return ((new Date(parseInt(mongoID.substring(0, 8), 16) * 1000)).toDateString())
      }

      const customTopicAccesor = row => getTopics(row.quizTopics)
      const customDateAccesor = row => getDate(row._id.$oid)
      const customStarredAccessor = row => (row.starred.toString())

      const data = this.props.data;

      const columns = [
        {
          Header: 'Name',
          accessor: 'quizName'
        },

        {
          Header: 'Author',
          accessor: 'creator'
        },

        {
          id: 'topics',
          Header: 'Topic',
          accessor: customTopicAccesor
        },

        {
          Header: 'Questions',
          accessor: 'quiz-length'
        },

        {
          id: 'date',
          Header: 'Date',
          accessor: customDateAccesor
        },

        {
          Header: 'Rating',
          accessor: 'rating'
        },

        {
          id: 'favorite',
          Header:'Favorite',
          accessor:customStarredAccessor
        }
    ]
    

      return (
            <div style={{padding: '50px', textAlign: 'center'}}>
                <ReactTable className='quiztable'
                    data={data}
                    columns={columns}
                    getTdProps={(state, rowInfo, column, instance) => {
                      return {
                        onClick: (e, handleOriginal) => {
                          this.props.history.push(this.props.location.pathname + "/" + rowInfo.original._id.$oid)
                        }
                      }
                    }}
                    defaultPageSize = {10}
                    filterable
                    pageSizeOptions = {[5,10,20,25]}
                />
            </div>
      )
    }
  }

  export default withRouter(InstructorQuizTable);