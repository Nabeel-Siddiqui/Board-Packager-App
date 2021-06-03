import React, { Component } from 'react';
import PropTypes from 'prop-types'


export default class TaskItems extends Component {

  handleClick = () => {
    this.props.toggleCompleted()
  }

  render() {
    return (
      <>
      <hr />
      <button className="btn btn-outline-primary btn-block mb-3" onClick={this.handleClick} > {this.props.hideCompleted ? `Show Completed Items` : `Hide Completed Items `} </button>
      <div className="table-responsive">
          <table className="table">
              <thead>
                  <tr>
                      <th scope="col">Status</th>
                      <th scope="col">Task</th>
                  </tr>
              </thead>
              <tbody>{this.props.children}</tbody>
          </table>
      </div>
  </>
    )
  }
}

TaskItems.propTypes = {
  toggleCompleted: PropTypes.func.isRequired,
  hideCompleted: PropTypes.bool.isRequired,
}