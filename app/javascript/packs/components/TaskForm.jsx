// app/javascript/packs/components/TodoForm.jsx
import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import setAxiosHeaders from "./AxiosHeaders";

class TaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.titleRef = React.createRef()
    this.descriptionRef = React.createRef()
  }

  handleSubmit(e) {
    e.preventDefault()
    setAxiosHeaders();
    axios
      .post('/api/v1/task_items', {
        task_item: {
          title: this.titleRef.current.value,
          description: this.descriptionRef.current.value,
          complete: false,
        },
      })
      .then(response => {
        const task_item = response.data
        this.props.createTaskItem(task_item)
      })
      .catch(error => {
        console.log(error)
      })
    e.target.reset()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="my-3">
        <div className="form-row">
          <div className="form-group col-md-8">

          <label>
            Title:
              <input
                type="text"
                name="title"
                ref={this.titleRef}
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
              ref={this.descriptionRef}
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

export default TaskForm

TaskForm.propTypes = {
  createTaskItem: PropTypes.func.isRequired,
}