import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.props.handleModalClick);
  }
  render() {
    if (!this.props.isLoading && !this.props.isLoaded) {
      document.body.classList.remove('modal-open');
      return null;
    }
    if (this.props.isLoading) {
      document.body.classList.add('modal-open');
    }

    return ReactDOM.createPortal(
      <Fragment>
        <div
          className="modal-overlay"
          onClick={this.props.handleModalClick}
          onKeyDown={this.props.handleModalClick}
        >
          <svg
            className={`spinner ${this.props.isLoading ? 'loading' : ''}`}
            width="65px"
            height="65px"
            viewBox="0 0 66 66"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="circle"
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              cx="33"
              cy="33"
              r="30"
            />
          </svg>
        </div>
        <div
          className={`modal ${this.props.isLoaded ? 'loaded' : ''}`}
          onClick={this.props.handleModalClick}
          tabIndex="0"
          id="modal"
        >
          <h5 className="modal__head">{this.props.head}</h5>
          <p
            className="modal__text"
            dangerouslySetInnerHTML={{ __html: this.props.text }}
          />
          <button className="modal__btn btn plain">OK</button>
        </div>
      </Fragment>,
      document.getElementById('modal-root')
    );
  }
}

export default Modal;
