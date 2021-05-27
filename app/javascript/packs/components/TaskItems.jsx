import React from 'react'
import PropTypes from 'prop-types'


export default class TaskItems extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.toggleCompletedTaskItems()
  }

  render() {
    return (
      <>
      <hr />
      <button
          className="btn btn-outline-primary btn-block mb-3"
          onClick={this.handleClick}
      >
          {this.props.hideCompletedTaskItems
              ? `Show Completed Items`
              : `Hide Completed Items `}
      </button>
      <div className="table-responsive">
          <table className="table">
              <thead>
                  <tr>
                      <th scope="col">Status</th>
                      <th scope="col">Item</th>
                      <th scope="col" className="text-right">
                          Actions
                      </th>
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
  toggleCompletedTaskItems: PropTypes.func.isRequired,
  hideCompletedTaskItems: PropTypes.bool.isRequired,
}