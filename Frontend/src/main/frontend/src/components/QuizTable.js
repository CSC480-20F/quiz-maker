  import React, { Component } from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import { Link } from 'react-router-dom';

class QuizTable extends Component {

    render() {
      const getTopics = (topics) => {
        return (topics.join(', '))
      }

      const getDate = (mongoID) => {
        return ((new Date(parseInt(mongoID.substring(0, 8), 16) * 1000)).toDateString())
      }

      const customTopicAccesor = row => getTopics(row.quizTopics)
      const customDateAccesor = row => getDate(row._id.$oid)

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
          accessor: 'quizLength'
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
    ]

      const onRowClick = (state, rowInfo, column, instance) => {
        return {
            onClick: e => {
                // console.log('A Td Element was clicked!')
                // console.log('it produced this event:', e)
                // console.log('It was in this column:', column)
                console.log('It was in this row:', rowInfo.original)
                // console.log('It was in this table instance:', instance)
                // console.log('State', state);
            }
        }
    }

      return (
            <div style={{padding: '50px', textAlign: 'center'}}>
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

  export default QuizTable;