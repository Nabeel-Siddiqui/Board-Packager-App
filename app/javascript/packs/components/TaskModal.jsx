import React, { Component } from 'react';

export default class TaskModal extends Component {

    onClose = e => {
      this.props.onClose && this.props.onClose(e);
    };

    render() {
      if (!this.props.show) {
        return null;
      }
      return (
        <div >
          <div >{this.props.children}</div>
          <div>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={this.onClose}> Close </button>
          </div>
        </div>
      );
    }
  }
