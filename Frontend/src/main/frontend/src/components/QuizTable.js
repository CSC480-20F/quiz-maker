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