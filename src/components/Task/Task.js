import React, { Component } from 'react'
import "./Task.scss";

export default class Task extends Component {
  getDateStr = () => {
    let date = this.props.task.date
    let hours = date.getHours()
    let twhour = 'AM'
    let minutes = date.getMinutes()
    if (date.getHours() > 12) {
      hours -= 12
      twhour = "PM"
    }
    if (date.getMinutes() < 10) {
      minutes = '0' + date.getMinutes()
    }
    let dateStr = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${hours}:${minutes} ${twhour}`
    return dateStr
  }

  render() {
    return (
      <div className={`task ${this.props.task.done ? "incomplete" : null}`}>
        <div className="task__text">
          <p className="task__content">{this.props.task.content}</p>
          <p className="task__description">{this.props.task.description}</p>
        </div>
        <p className="task__date">{this.getDateStr()}</p>
        <div className="task__container">
          {!this.props.task.done ?
            <button className="task__button task__button--done" value={this.props.task.id} onClick={this.props.toggleTask}></button>
            : <button className="task__button task__button--redo" value={this.props.task.id} onClick={this.props.toggleTask}></button>
          }
          <button className="task__button task__button--edit" value={this.props.task.id} onClick={this.props.editTask}></button>
          <button className="task__button task__button--delete" value={this.props.task.id} onClick={this.props.deleteTask}></button>
        </div>
      </div>
    )
  }
}
