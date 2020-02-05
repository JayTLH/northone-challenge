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
      <div className="task">
        <div className="task__text">
          <p className="task__content">{this.props.task.content}</p>
          <p className="task__description">{this.props.task.description}</p>
        </div>
        <p className="task__date">{this.getDateStr()}</p>
      </div>
    )
  }
}
