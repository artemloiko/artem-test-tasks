import React, { Component } from 'react';
import InputMask from 'react-input-mask';

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTouched: false,
    };
    this.inputParent = React.createRef();
  }

  handleChange = e => {
    const value = e.target.value.replace(/\s|\(|\)|_/g, '');
    const name = 'phone';

    if (!!value.match(/^\+38$/) || !value) {
      this.props.handleInputChange({
        name: 'phone',
        data: {
          value: '',
        },
      });
      return;
    }
    if (this.state.isTouched) {
      this.checkValidity(name, value);
    } else {
      this.props.handleInputChange({
        name: 'phone',
        data: {
          value: value,
        },
      });
    }
  };
  handleBlur = e => {
    const name = 'phone';
    const value = e.target.value.replace(/\s|\(|\)|_/g, '');

    if (!this.state.isTouched && value) {
      this.setState({
        isTouched: true,
      });
      this.checkValidity(name, value);
    }

    if (this.state.isTouched) this.checkValidity(name, value);

    this.props.handleBlur(this.inputParent.current);
  };
  checkValidity(name, value) {
    if (!value) return;
    let isValid = !!value.match(/[\+]{0,1}380([0-9]{9})$/);
    let error = isValid
      ? ''
      : value.length === 13
        ? 'Number should start with code of Ukraine +380'
        : 'Please enter phone number';

    this.props.handleInputChange({
      name: name,
      data: {
        value: value,
        isValid: isValid,
        error: error,
      },
    });
  }
  render() {
    return (
      <div
        className={`input-elem input-elem--firstRow ${
          !!this.props.error ? 'hasError' : ''
        }`}
        ref={this.inputParent}
      >
        <label className="input-elem__label" htmlFor="phone">
          {this.props.label}
        </label>
        <div className="input-elem__wrap">
          <fieldset className="input-elem__fieldset">
            <legend className="input-elem__legend">{this.props.label}</legend>
            <InputMask
              placeholder="+38 (___) ___ __ __"
              mask="+38 (999) 999 99 99"
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
