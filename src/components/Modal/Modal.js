import React, { Component } from 'react'
import ReactModal from 'react-modal'
import DateTimePicker from 'react-datetime-picker'
import './Modal.scss'

export default class Modal extends Component {
  state = {
    displayModal: false,
    task: this.props.task
  }

  openModal = () => {
    this.setState({
      displayModal: true
    })
  }

  closeModal = () => {
    this.setState({
      displayModal: false
    })
  }

  editTaskInput = (e) => {
    let newState = {
      ...this.state,
      task: {
        ...this.state.task,
        [e.target.name]: e.target.value
      }
    }

    this.setState(newState)
  }

  changeDate = (date) => {
    let newState = {
      ...this.state,
      task: {
        ...this.state.taskInfo,
        date: date
      }
    }

    this.setState(newState)
  }

  render() {
    return (
      <div className="modal">
        <button className="task__button task__button--edit" value={this.props.task.id} onClick={this.openModal}></button>
        <ReactModal ariaHideApp={false} isOpen={this.state.displayModal} onRequestClose={this.closeModal} className="modal__body" overlayClassName="modal__overlay">
          <h1 className="modal__title">Edit</h1>
          <form className="modal__form" onSubmit={this.props.editTask}>
            <input className="modal__input" name="content" value={this.state.task.content} placeholder="Name" onChange={this.editTaskInput} required />
            <textarea className="modal__input-area" name="description" value={this.state.task.description} placeholder="Description (optional)" onChange={this.editTaskInput} />
            <div className="modal__date">
              <DateTimePicker
                onChange={this.changeDate}
                value={this.state.task.date}
                minDate={new Date()}
                name="dateTime"
              />
            </div>
            <button className="modal__button">Save</button>
            <input className="modal__id-hidden" name="taskId" value={this.state.task.id} onChange={this.editTaskInput}/>
          </form>
        </ReactModal>
      </div>
    )
  }
}
