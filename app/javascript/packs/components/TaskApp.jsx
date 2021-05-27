import React from "react";
import ReactDOM from 'react-dom'
import axios from "axios";
import TaskItems from "./TaskItems";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";


class TaskApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          taskItems: [],
          hideCompletedTaskItems: false

        };
        this.getTaskItems = this.getTaskItems.bind(this);
        this.createTaskItem = this.createTaskItem.bind(this);
        this.toggleCompletedTaskItems = this.toggleCompletedTaskItems.bind(this);

      }

      createTaskItem(taskItem) {
        const taskItems = [taskItem, ...this.state.taskItems];
        this.setState({ taskItems });
      }

      componentDidMount() {
        this.getTaskItems();
      }
      getTaskItems() {
        axios
          .get("/api/v1/task_items")
          .then(response => {
            const taskItems = response.data;
            this.setState({ taskItems });
          })
          .catch(error => {
            console.log(error);
          });
      }

      toggleCompletedTaskItems() {
        this.setState({
          hideCompletedTaskItems: !this.state.hideCompletedTaskItems
        });
      }

  render() {
    return (
      <>
        <TaskForm createTaskItem={this.createTaskItem} />
        <TaskItems 
          toggleCompletedTaskItems={this.toggleCompletedTaskItems}
          hideCompletedTaskItems={this.state.hideCompletedTaskItems}
        >
          {this.state.taskItems.map(taskItem => (
            <TaskItem key={taskItem.id} taskItem={taskItem} getTaskItems={this.getTaskItems} hideCompletedTaskItems={this.state.hideCompletedTaskItems}/>
          ))}
        </TaskItems>
        </>
      );  }
}

document.addEventListener('turbolinks:load', () => {
  const app = document.getElementById('task-app')
  app && ReactDOM.render(<TaskApp />, app)
})