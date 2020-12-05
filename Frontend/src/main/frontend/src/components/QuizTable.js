import React, { Component } from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import { withRouter } from 'react-router-dom';

class QuizTable extends Component {

  addFilterPlaceholder = () => {
    const filters = document.querySelectorAll("div.rt-th > input");
    let index = 0;
    const placeHolders = ["Quiz Name...", "Author's email...", "Topic(s)...", "Number of questions...", "Date created...","Quiz Rating..."]
    for (let filter of filters) {
      filter.placeholder = placeHolders[index];
      index++;
      if (index >= placeHolders.length) {
        index = 0;
      }
    }
  }

  componentDidMount() {
    this.addFilterPlaceholder();
  }

    render() {
      const getTopics = (topics) => {
        if (topics.length > 0) {
          return (topics.join(', '))
        }
        return (topics)
      }

      const getDate = (mongoID) => {
        return ((new Date(parseInt(mongoID.substring(0, 8), 16) * 1000)))
      }

      const getDateView = (mongoID) => {
        return ((new Date(parseInt(mongoID.substring(0, 8), 16) * 1000)).toDateString())
      }

      const customTopicAccesor = row => getTopics(row.quizTopics)
      const customDateAccesor = row => getDate(row._id.$oid)
      const customDateCell = row => getDateView(row.original._id.$oid)

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
          accessor: customDateAccesor,
          Cell: customDateCell
        },

        {
          Header: 'Rating',
          accessor: 'rating'
        }
    ]

    function filterCaseInsensitive(filter, row) {
      const id = filter.pivotId || filter.id;
      return (
          row[id] !== undefined ?
              String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
          :
              true
      );
    }


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
                    defaultFilterMethod={(filter, row) => filterCaseInsensitive(filter, row) }
                    pageSizeOptions = {[5,10,20,25]}
                />
            </div>
      )
    }
  }

  export default withRouter(QuizTable);