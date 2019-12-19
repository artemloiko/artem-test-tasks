import React, { Component } from 'react';

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTouched: false
    };
    this.inputParent = React.createRef();
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    if (this.state.isTouched) this.checkValidity(name, value);
    else {
      this.props.handleInputChange({
        name: name,
        data: {
          value: value
        }
      });
    }
  };
  handleBlur = e => {
    const name = e.target.name;
    const value = e.target.value;
    if (!this.state.isTouched && value) {
      this.setState({
        isTouched: true
      });
      this.checkValidity(name, value);
    }
    if (this.state.isTouched) this.checkValidity(name, value);
    this.props.handleBlur(this.inputParent.current);
  };
  checkValidity(name, value) {
    let isValid = false;
    let error = '';
    if (!value) {
      this.props.handleInputChange({
        name: name,
        data: {
          value: value,
          isValid: isValid,
          error: error
        }
      });
      return;
    }
    switch (name) {
      case 'email':
        isValid = !!value.match(
          /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i
        );
        error = !isValid
          ? value.length > 100
            ? 'Email length should be 2-100 characters'
            : 'Please enter a valid email'
          : '';
        break;
      case 'name':
        isValid = value.length >= 2 && value.length <= 60;
        error = !isValid ? 'Username length 2-60 characters string' : '';
        break;
      default:
        break;
    }

    this.props.handleInputChange({
      name: name,
      data: {
        value: value,
        isValid: isValid,
        error: error
      }
    });
  }
  render() {
    return (
      <div className={`input-elem input-elem--firstRow ${!!this.props.error ? 'hasError' : ''}`} ref={this.inputParent}>
        <label className="input-elem__label" htmlFor={this.props.name}>
          {this.props.label}
        </label>
        <div className="input-elem__wrap">
          <fieldset className="input-elem__fieldset">
            <legend className="input-elem__legend">{this.props.label}</legend>
            <input
              placeholder={this.props.placeholder}
              id={this.props.name}
              name={this.props.name}
              type={this.props.type}
              className="input-elem__name input-elem__input"
              value={this.props.value}
              onChange={this.handleChange}
              onFocus={() => this.props.handleFocus(this.inputParent.current)}
              onBlur={this.handleBlur}
              tabIndex={this.props.tabIndex}
            />
          </fieldset>
        </div>
        <span className="input-elem__assistText">{this.props.error}</span>
      </div>
    );
  }
}
