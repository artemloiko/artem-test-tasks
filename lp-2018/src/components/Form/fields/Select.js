import React, { Component } from 'react';
import CustomSelect from 'react-select';
import caretDown from '../../../img/icons/caret-down.svg';

//custom select props
const selectStyles = {
  control: (styles, { isFocused, selectProps }) => {
    const isError = selectProps.className.indexOf('hasError') !== -1;
    return {
      ...styles,
      height: '56px',
      backgroundColor: 'white',
      borderColor: isError ? '#f44336' : '#b7b7b7',
      boxShadow: isFocused ? (isError ? 'inset 0 0 0 1px #f44336' : 'inset 0 0 0 1px #b7b7b7') : 'none',
      cursor: 'pointer',
      'padding-left': '5px',
      '&:hover': { borderColor: isError ? '#f44336' : '#b7b7b7' }
    };
  },
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      display: 'flex',
      'align-items': 'center',
      height: '50px',
      backgroundColor: isFocused ? 'rgba(239,108,0,0.2)' : 'white',
      color: isSelected ? '#ef6c00' : 'black',
      cursor: isDisabled ? 'not-allowed' : 'pointer'
    };
  },
  placeholder: styles => ({
    ...styles,
    color: 'black'
  }),
  dropdownIndicator: (styles, state) => ({
    ...styles,
    transition: 'all .2s ease',
    transform: state.selectProps.menuIsOpen ? 'rotate3D(1,0,0,-180deg)' : null,
    background: "url('./images/caret-down.svg') no-repeat center center"
  })
};
const selectTheme = theme => ({
  ...theme,
  borderRadius: 4,
  colors: {
    ...theme.colors,
    primary50: 'rgba(239,108,0,0.2)'
  }
});
export default class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTouched: false,
      optionIsChoosed: false
    };
  }
  handleChange = option => {
    if (option === undefined && !this.state.optionIsChoosed) {
      this.props.handleInputChange({
        name: 'position_id',
        data: {
          value: '',
          isValid: false,
          error: ''
        }
      });
      return;
    }

    this.setState({
      optionIsChoosed: true
    });

    this.props.handleInputChange({
      name: 'position_id',
      data: {
        value: option.value,
        isValid: true,
        error: ''
      }
    });
  };
  handleBlur = () => {
    if (!this.state.isTouched && !this.state.optionIsChoosed) {
      this.setState({
        isTouched: true
      });
    }

    if (this.state.isTouched && !this.state.optionIsChoosed) {
      this.handleChange();
    }
  };
  render() {
    const curValue = this.props.value ? this.props.options[this.props.value - 1] : null;

    return (
      <div className={`input-elem input-elem--secondRow  ${!!this.props.error ? 'hasError' : ''}`}>
        <CustomSelect
          id="select"
          className={`select-container ${!!this.props.error ? 'hasError' : ''}`}
          classNamePrefix="select"
          placeholder="Select your position"
          options={this.props.options}
          value={curValue}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          styles={selectStyles}
          theme={selectTheme}
          isSearchable={false}
          tabIndex={this.props.tabIndex}
        />
        <span className="input-elem__assistText">{this.props.error}</span>
      </div>
    );
  }
}
