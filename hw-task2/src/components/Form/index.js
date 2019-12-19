import React, { Component } from 'react';

import Input from './fields/Input';
import PhoneNumber from './fields/PhoneNumber';
import Select from './fields/Select';
import PhotoUploader from './fields/PhotoUploader';
import Modal from '../Modal';

import API from '../../API';
const api = new API();

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsValid: false,
      formIsSending: false,
      modalIsOpen: false,
      modalInfo: {
        head: '',
        text: '',
      },
      positions: [
        { value: '1', label: 'Lawyer' },
        { value: '2', label: 'Content manager' },
        { value: '3', label: 'Security' },
        { value: '4', label: 'Designer' },
        { value: '5', label: 'The contextual advertising specialist' },
      ],
      fields: {
        name: {
          isValid: false,
          error: '',
          value: '',
        },
        email: {
          isValid: false,
          error: '',
          value: '',
        },
        phone: {
          isValid: false,
          error: '',
          value: '',
        },
        position_id: {
          isValid: false,
          error: '',
          value: '',
        },
        photo: {
          isValid: false,
          error: '',
          value: '',
        },
      },
    };
  }
  componentDidMount() {
    api.getPositions().then(data => {
      const positions = data.positions.map(option => {
        return {
          value: option.id,
          label: option.name,
        };
      });

      this.setState({
        positions: positions,
      });
    });
  }

  handleModalClick = e => {
    if (
      (e.target.classList.contains('modal-overlay') ||
        e.target.classList.contains('modal__btn')) &&
      !e.keyCode
    ) {
      this.setState({
        modalIsOpen: false,
        formIsValid: false,
      });
    } else if (e.keyCode === 13 || e.keyCode === 27) {
      this.setState({
        modalIsOpen: false,
        formIsValid: false,
      });
    }

    this.props.handleFocusToggle(0);
  };

  handleInputChange = ({ name, data }) => {
    if (this.state.fields[name] !== undefined)
      this.setState(
        prevState => ({
          fields: {
            ...prevState.fields,
            [name]: data,
          },
        }),
        this.checkFormValidity
      );
  };

  handleFocus = inputElem => {
    inputElem.classList.add('input-elem--focused');
  };

  handleBlur = inputElem => {
    inputElem.classList.remove('input-elem--focused');
  };

  handleSubmit = e => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('position_id', this.state.fields.position_id.value);
    formData.append('name', this.state.fields.name.value);
    formData.append('email', this.state.fields.email.value);
    formData.append('phone', this.state.fields.phone.value);
    formData.append('photo', this.state.fields.photo.value);

    // show overlay
    this.setState({
      formIsSending: true,
    });
    this.props.handleFocusToggle(-1);
    api
      .getToken()
      .then(token => api.sendForm(token, formData))
      .then(this.handleSubmitSuccess, this.handleSubmitError);
  };
  handleSubmitSuccess = () => {
    const modalInfo = {
      head: 'Congratulations',
      text: 'You have successfully passed <br /> the registration',
    };

    this.setState({
      modalInfo,
      formIsSending: false,
      modalIsOpen: true,
    });

    this.props.onSubmit();
    this.resetForm();
  };

  handleSubmitError = error => {
    const data = error.response.data;
    const modalInfo = {
      head: 'Error',
      text: data.message,
    };

    if (error.response.status === 401) {
      modalInfo.text =
        'Waiting time has expired. Please reload page and try again.';
    }

    this.setState({
      modalInfo,
      formIsSending: false,
      modalIsOpen: true,
    });

    if (error.response.status === 422) {
      const fails = data.fails;
      const fields = { ...this.state.fields };

      for (let name in fails) {
        fields[name] = {
          value: fields[name].value,
          isValid: false,
          error: fails[name][0],
        };
      }
      this.setState(prevState => ({
        fields: {
          ...prevState.fields,
          ...fields,
        },
      }));
    }

    if (error.response.status === 409) {
      this.setState(prevState => ({
        fields: {
          ...prevState.fields,
          phone: {
            ...prevState.fields.phone,
            error: data.message,
            isValid: false,
          },
          email: {
            ...prevState.fields.email,
            error: data.message,
            isValid: false,
          },
        },
      }));
    }
  };

  resetForm() {
    this.setState({
      formIsValid: false,
      fields: {
        name: {
          value: '',
        },
        email: {
          value: '',
        },
        phone: {
          value: '',
        },
        position_id: {
          value: '',
        },
        photo: {
          value: '',
        },
      },
    });
  }

  checkFormValidity() {
    const fields = this.state.fields;
    let formIsValid = true;
    for (let field in fields) {
      if (!fields[field].isValid) formIsValid = false;
    }
    this.setState({ formIsValid });
  }

  render() {
    return (
      <React.Fragment>
        <div className="signUp container" id="signUp">
          <h2 className="signUp__head">Register to get a work</h2>
          <h5 className="signUp__subhead">
            Attention! After successful registration and alert,
            <br className="tablet-br" /> update the list of users
            <br className="mob-br" /> in the block from the top
          </h5>
          <form
            className="signUp-form"
            id="signUp-form"
            onSubmit={this.handleSubmit}
          >
            <Input
              placeholder="Your name"
              label="Name"
              name="name"
              type="text"
              value={this.state.fields.name.value}
              error={this.state.fields.name.error}
              handleInputChange={this.handleInputChange}
              handleFocus={this.handleFocus}
              handleBlur={this.handleBlur}
              tabIndex={this.props.tabIndex}
            />
            <Input
              placeholder="Your email"
              label="Email"
              name="email"
              type="text"
              value={this.state.fields.email.value}
              error={this.state.fields.email.error}
              handleInputChange={this.handleInputChange}
              handleFocus={this.handleFocus}
              handleBlur={this.handleBlur}
              tabIndex={this.props.tabIndex}
            />
            <PhoneNumber
              label="Phone"
              name="phone"
              type="text"
              value={this.state.fields.phone.value}
              error={this.state.fields.phone.error}
              handleInputChange={this.handleInputChange}
              handleFocus={this.handleFocus}
              handleBlur={this.handleBlur}
              tabIndex={this.props.tabIndex}
            />
            <Select
              options={this.state.positions}
              value={
                this.state.fields.position_id.value
                  ? this.state.fields.position_id.value
                  : null
              }
              error={this.state.fields.position_id.error}
              handleInputChange={this.handleInputChange}
              tabIndex={this.props.tabIndex}
            />
            <PhotoUploader
              value={this.state.fields.photo.value}
              error={this.state.fields.photo.error}
              handleInputChange={this.handleInputChange}
              handleFocus={this.handleFocus}
              handleBlur={this.handleBlur}
              tabIndex={this.props.tabIndex}
            />
            <button
              className={`btn primary signUp__btn ${
                this.state.formIsValid ? '' : 'disabled'
              }`}
              disabled={!this.state.formIsValid || this.state.formIsSending}
              tabIndex={this.props.tabIndex}
            >
              Sign Up
            </button>
          </form>
        </div>
        <Modal
          isLoaded={this.state.modalIsOpen}
          isLoading={this.state.formIsSending}
          head={this.state.modalInfo.head}
          text={this.state.modalInfo.text}
          handleModalClick={this.handleModalClick}
        />
      </React.Fragment>
    );
  }
}
