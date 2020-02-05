import React, { Component } from 'react'
import './Column.scss';

import Task from '../Task/Task'

export default class Column extends Component {
  render() {
    return (
      <div className="column">
        <h1 className="column__title">{this.props.title}</h1>
        <div className="column__container">
          {this.props.tasks.map((task, index) => {
            return (
              <div key={task.id}>
                <Task task={task} index={index} toggleTask={this.props.toggleTask} editTask={this.props.editTask} deleteTask={this.props.deleteTask} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
