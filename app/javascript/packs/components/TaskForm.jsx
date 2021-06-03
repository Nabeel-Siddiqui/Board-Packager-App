import React, { Component } from 'react';

import PropTypes from 'prop-types'
import axios from 'axios'
import setAxiosHeaders from "./AxiosHeaders";

export default class App extends Component {
  state = {
    titleRef = React.createRef(),
    descriptionRef = React.createRef()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    setAxiosHeaders();
    axios.post('/api/v1/task_items', {
      task_item: { title: titleRef.current.value, description: descriptionRef.current.value, complete: false } })
         .then(response => { 
           const task_item = response.data
           props.createTaskItem(task_item)
          })
         .catch(error => {
           console.log(error) })
           e.target.reset()
  }


  render() {
    return (
      <form onSubmit={handleSubmit} className="my-3">
        <div className="form-row">
          <div className="form-group col-md-8">

          <label>
            Title:
              <input
                type="text"
                name="title"
                ref={titleRef}
                required
                className="form-control"
                id="title"
                placeholder="Write title here..."
              />
          </label>

          <label>
            Description:
            <input
              type="text"
              name="description"
              ref={descriptionRef}
              required
              className="form-control"
              id="description"
              placeholder="Write description here..."
            />
          </label>

          </div>
          <div className="form-group col-md-4">
            <button className="btn btn-outline-success btn-block">
              Add Task
            </button>
          </div>
        </div>
      </form>
    )
  }
}


TaskForm.propTypes = {
  createTaskItem: PropTypes.func.isRequired,
}