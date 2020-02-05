import React, { Component } from 'react'
import DateTimePicker from 'react-datetime-picker'
import './Todo.scss'

export default class Todo extends Component {
  state = {
    taskInfo: {
      content: '',
      description: '',
      date: new Date()
    }
  }

  inputChange = (e) => {
    let newState = {
      ...this.state,
      taskInfo: {
        ...this.state.taskInfo,
        [e.target.name]: e.target.value
      }
    }

    this.setState(newState)
  }

  changeDate = (date) => {
    let newState = {
      ...this.state,
      taskInfo: {
        ...this.state.taskInfo,
        date: date
      }
    }

    this.setState(newState)
  }

  newTask = (e) => {
    e.preventDefault()
  }

  render() {
    return (
      <div className="todo">
        <h1 className="todo__title">NorthOne Todo List</h1>

        <div className="new-task">
          <form className="new-task__form" onSubmit={this.newTask}>
            <label className="new-task__label" htmlFor="newTask">Add a new task!</label>
            <input className="new-task__input" name="content" value={this.state.content} onChange={this.inputChange} placeholder="Name" required />
            <textarea className="new-task__input-area" name="description" value={this.state.description} onChange={this.inputChange} placeholder="Description (optional)" />
            <div className="new-task__date">
              <DateTimePicker
                onChange={this.changeDate}
                value={this.state.taskInfo.date}
                minDate={new Date()}
              />
            </div>
            <button className="new-task__button">Add</button>
          </form>
        </div>

      </div>
    )
  }
}
