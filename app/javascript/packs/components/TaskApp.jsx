import React, { Component } from 'react';

import ReactDOM from 'react-dom'
import axios from "axios";

import TaskItems from "./TaskItems";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import TaskModal from "./TaskModal";

class TaskApp extends React.Component {
    state = { 
      taskItems: [],
      hideCompleted: false
    };


    createTaskItem =(taskItem) => {
      const taskItems = [taskItem, ...this.state.taskItems];
      this.setState({ taskItems });
    }


    componentDidMount() {
      this.getTaskItems();
    }


    getTaskItems = () => {
      axios.get("/api/v1/task_items")
           .then(response => { 
             const taskItems = response.data;
             this.setState({ taskItems });
            })
           .catch(error => {
             console.log(error);
            });
    }


    toggleCompleted = () => {
      this.setState({ hideCompleted: !this.state.hideCompleted });
    }

    showModal = e => {
      this.setState({
        show: !this.state.show
      });
    };


  render() {
    return (
      <>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={e => { this.showModal(e) }}> Add a Task </button>

        <TaskModal onClose={this.showModal} show={this.state.show}></TaskModal>
        <TaskForm createTaskItem={this.createTaskItem} />

        <TaskItems toggleCompleted={this.toggleCompleted} hideCompleted={this.state.hideCompleted} >
        
        {this.state.taskItems.map(taskItem => ( <TaskItem key={taskItem.id} taskItem={taskItem} getTaskItems={this.getTaskItems} hideCompleted={this.state.hideCompleted}/> ))}

        </TaskItems>

        </>
      );
    }
}

document.addEventListener('turbolinks:load', () => {
  const app = document.getElementById('task-app')
  app && ReactDOM.render(<TaskApp />, app)
})