import React, { Component } from 'react';

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTouched: false
    };
    this.inputFile = React.createRef();
  }
  handleChange = () => {
    const imgFile = this.inputFile.current.files[0];
    this.checkValidity(imgFile);
  };
  handleBlur = e => {
    if (!this.state.isTouched && this.inputFile.current.files[0]) {
      this.setState({
        isTouched: true
      });
      this.handleChange();
    }
    if (this.state.isTouched) {
      this.handleChange();
    }
  };
  changeState(value, isValid, error) {
    this.props.handleInputChange({
      name: 'photo',
      data: {
        value,
        isValid,
        error
      }
    });
  }
  checkValidity(f) {
    let isValid = true;
    let error = '';
    if (!f) {
      isValid = false;
      this.changeState('', isValid, error);
      return;
    }

    if (!f.type.match(/image\/jpe?g/)) {
      error = 'File format jpg/jpeg only';
      isValid = false;
      this.changeState(f, isValid, error);
      return;
    }

    if (f.size > 5 * 1024 * 1024) {
      error = 'Image should not exceed 5MB';
      isValid = false;
      this.changeState(f, isValid, error);
      return;
    }

    //check dimensions
    const image = document.createElement('img');
    image.src = window.URL.createObjectURL(f);
    image.style.position = 'fixed';
    image.style.visibility = 'hidden';
    image.style.pointerEvents = 'none';
    image.onerror = () => {
      error = 'Please choose not broken image';
      this.changeState(f, false, error);
      image.parentElement.removeChild(image);
    };
    image.onload = () => {
      const width = image.offsetWidth;
      const height = image.offsetHeight;
      if (width < 70 || height < 70) {
        error = 'The minimum size of image is 70x70';
        isValid = false;
      }
      this.changeState(f, isValid, error);
      image.parentElement.removeChild(image);
    };
    document.forms[0].appendChild(image);
  }
  render() {
    return (
      <div className={`input-elem input-elem--secondRow ${!!this.props.error ? 'hasError' : ''}`}>
        <div className="input-file">
          <div className="input-file__placeholder" hidden={!!this.props.value}>
            Upload your photo
          </div>
          <div className="input-file__value" hidden={!this.props.value}>
            {this.props.value ? this.props.value.name : ''}
          </div>
          <label
            className="input-file__btn"
            htmlFor="photo"
            tabIndex={this.props.tabIndex}
            onKeyDown={e => {
              if (e.keyCode === 13 || e.keyCode === 32) document.getElementById('photo').click();
            }}
            onBlur={this.handleBlur}
          >
            Upload
            <input
              placeholder="Upload your photo"
              id="photo"
              name="photo"
              type="file"
              defaultValue={this.props.value ? this.inputFile.current.value : ''}
              className="input-file__input"
              onFocus={this.props.handleFocus}
              onChange={this.handleChange}
              ref={this.inputFile}
            />
          </label>
        </div>
        <span className="input-elem__assistText input-elem__assistText--file">
          {!this.props.error ? 'File format jpg up to 5 MB, the minimum size of 70x70px' : this.props.error}
        </span>
      </div>
    );
  }
}
