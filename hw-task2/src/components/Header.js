import React from 'react';
import Nav from './Nav';
import logo from '../img/logo.svg';

import API from '../API';
const api = new API();

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      isUserLoaded: false,
      curUser: {},
      scroll: 200,
    };
    this.nameRef = React.createRef();
    this.emailRef = React.createRef();
  }
  componentDidMount() {
    document.getElementById('overlay-mobile').addEventListener('click', () => {
      this.toggleMobileMenu();
    });

    api.getUser(1).then(data => {
      this.setState(
        {
          isUserLoaded: true,
          curUser: {
            name: data.user.name,
            email: data.user.email,
            photo: data.user.photo,
          },
        },
        this.checkTextOverflow
      );
    });
  }

  checkTextOverflow() {
    const username = this.nameRef.current;
    const userEmail = this.emailRef.current;

    setTimeout(() => {
      if (username.offsetWidth < username.scrollWidth) {
        username.dataset.tooltip = username.innerHTML;
        username.classList.add('tooltip');
      }

      if (userEmail.offsetWidth < userEmail.scrollWidth) {
        userEmail.dataset.tooltip = userEmail.innerHTML;
        userEmail.classList.add('tooltip');
      }
    }, 16);
  }

  toggleMobileMenu = () => {
    if (window.innerWidth > 1000) return;

    const overlay = this.props.overlayRef.current;
    const pageWrap = this.props.pageWrap.current;

    if (!this.state.isOpened) {
      window.requestAnimationFrame(() => {
        const scroll = window.pageYOffset;
        window.requestAnimationFrame(() => {
          document.body.classList.add('body-block');
          pageWrap.style.transform = `translateY(${-this.state.scroll}px)`;
          overlay.classList.add('opened');
        });
        this.setState({
          isOpened: true,
          scroll,
        });
      });
    } else {
      window.requestAnimationFrame(() => {
        pageWrap.style.transform = '';
        document.body.classList.remove('body-block');

        window.scrollTo(0, this.state.scroll);
        overlay.classList.remove('opened');
      });
      this.setState({
        isOpened: false,
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="header__wrapper">
          <div className={`scroll ${this.state.isOpened ? 'opened' : ''}`}>
            <header
              className={`header container ${
                this.state.isOpened ? 'opened' : ''
              }`}
            >
              <a
                href="#"
                tabIndex={this.props.tabIndex}
                aria-label="Link to main page"
                className="logo--wrap"
              >
                <img src={logo} className="logo" alt="Logo of ABZ agency" />
              </a>

              <nav className="header__nav">
                <Nav
                  tabIndex={this.props.tabIndex}
                  isUsers={this.props.isUsers}
                  handleClick={this.toggleMobileMenu}
                />
              </nav>

              <div
                className={`account ${
                  this.state.isUserLoaded ? '' : 'account--placeholder'
                }`}
              >
                <div className="account-info">
                  <div className="account__name" ref={this.nameRef}>
                    {this.state.isUserLoaded
                      ? this.state.curUser.name
                      : 'Username'}
                  </div>
                  <div className="account__email" ref={this.emailRef}>
                    {this.state.isUserLoaded
                      ? this.state.curUser.email
                      : 'userEmail@gmail.com'}
                  </div>
                </div>
                <div className="account__img--wrap">
                  <img
                    src={
                      this.state.isUserLoaded ? this.state.curUser.photo : ''
                    }
                    alt="Image of account owner"
                    className="account__img"
                    style={{ opacity: this.state.isUserLoaded ? 1 : 0 }}
                  />
                </div>
                <a
                  tabIndex={this.props.tabIndex}
                  href="#"
                  className="account__logOut"
                  aria-label="Log out from this account"
                />
              </div>
            </header>
          </div>
        </div>
        <div className="header-mobile container">
          <a tabIndex={this.props.tabIndex} href="#">
            <img src={logo} className="logo" alt="Logo of ABZ agency" />
          </a>
          <div className="toggle-menu" onClick={this.toggleMobileMenu}>
            <span className="toggle-menu__line" />
            <span className="toggle-menu__line" />
            <span className="toggle-menu__line" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
