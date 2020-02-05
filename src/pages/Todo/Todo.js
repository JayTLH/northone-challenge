import React, { Component } from 'react'
import DateTimePicker from 'react-datetime-picker'
import nanoid from 'nanoid'
import './Todo.scss'

import Column from '../../components/Column/Column'

export default class Todo extends Component {
  state = {
    taskInfo: {
      content: '',
      description: '',
      date: new Date(),
    },
    data: {
      tasks: {},
      columns: {
        todo: {
          id: '1',
          title: 'Todo',
          taskIds: []
        },
        done: {
          id: '2',
          title: 'Done',
          taskIds: []
        }
      },
      columnOrder: ['todo', 'done']
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
    let newId = nanoid()
    let newState = {
      ...this.state,
      taskInfo: {
        content: '',
        description: '',
        date: new Date(),
        done: false
      },
      data: {
        ...this.state.data,
        tasks: {
          ...this.state.data.tasks,
          [newId]: {
            id: newId,
            content: this.state.taskInfo.content,
            description: this.state.taskInfo.description,
            date: this.state.taskInfo.date,
            done: false
          }
        },
        columns: {
          ...this.state.data.columns,
          todo: {
            ...this.state.data.columns.todo,
            taskIds: [
              ...this.state.data.columns.todo.taskIds,
              newId
            ]
          }
        }
      }
    }

    e.target.reset()
    this.setState(newState)
  }

  // moves tasks between lists
  toggleTask = (e) => {
    let todoCopy = this.state.data.columns.todo.taskIds.slice()
    let doneCopy = this.state.data.columns.done.taskIds.slice()

    if (!this.state.data.tasks[e.target.value].done) {
      let taskIndex = this.state.data.columns.todo.taskIds.findIndex(id => id === e.target.value)
      todoCopy.splice(taskIndex, 1)
      doneCopy.push(e.target.value)
    } else {
      let taskIndex = this.state.data.columns.done.taskIds.findIndex(id => id === e.target.value)
      doneCopy.splice(taskIndex, 1)
      todoCopy.push(e.target.value)
    }

    let newState = {
      ...this.state,
      data: {
        ...this.state.data,
        tasks: {
          ...this.state.data.tasks,
          [e.target.value]: {
            ...this.state.data.tasks[e.target.value],
            done: !this.state.data.tasks[e.target.value].done
          }
        },
        columns: {
          ...this.state.data.columns,
          todo: {
            ...this.state.data.columns.todo,
            taskIds: todoCopy
          },
          done: {
            ...this.state.data.columns.done,
            taskIds: doneCopy
          }
        }
      }
    }

    this.setState(newState)
  }

  editTask = (e) => {
    e.preventDefault()

    let newState = {
      ...this.state,
      data: {
        ...this.state.data,
        tasks: {
          ...this.state.data.tasks,
          [e.target.taskId.value]: {
            ...this.state.data.tasks[e.target.taskId.value],
            content: e.target.content.value,
            description: e.target.description.value,
            date: new Date(e.target.dateTime.value)
          }
        }
      }
    }

    this.setState(newState)
  }

  deleteTask = (e) => {
    let todoCopy = this.state.data.columns.todo.taskIds.slice()
    let doneCopy = this.state.data.columns.done.taskIds.slice()

    if (!this.state.data.tasks[e.target.value].done) {
      let taskIndex = this.state.data.columns.todo.taskIds.findIndex(id => id === e.target.value)
      todoCopy.splice(taskIndex, 1)
    } else {
      let taskIndex = this.state.data.columns.done.taskIds.findIndex(id => id === e.target.value)
      doneCopy.splice(taskIndex, 1)
    }

    delete this.state.data.tasks[e.target.value]

    let newState = {
      ...this.state,
      data: {
        ...this.state.data,
        columns: {
          ...this.state.data.columns,
          todo: {
            ...this.state.data.columns.todo,
            taskIds: todoCopy
          },
          done: {
            ...this.state.data.columns.done,
            taskIds: doneCopy
          }
        }
      }
    }

    this.setState(newState)
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
              />
            </div>
            <button className="new-task__button">Add</button>
          </form>
        </div>

        {this.state.data.columnOrder.map(columnTitle => {
          let column = this.state.data.columns[columnTitle];
          let tasks = column.taskIds.map(taskId => this.state.data.tasks[taskId])
          return (
            <div key={column.id}>
              <Column title={column.title} tasks={tasks} toggleTask={this.toggleTask} editTask={this.editTask} deleteTask={this.deleteTask} />
            </div>
          )
        })}
      </div>
    )
  }
}
