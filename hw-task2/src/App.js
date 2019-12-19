import React from 'react';

import Header from './components/Header';
import Banner from './components/Banner';
import About from './components/About';
import Requirements from './components/Requirements';
import Users from './components/Users';
import Form from './components/Form';
import Footer from './components/Footer';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderUsers: true,
      collapseUsers: false,
      rootTabIndex: 0,
      testNum: 4,
      pageTransform: 0,
    };
    this.overlayMobileRef = React.createRef();
    this.pageWrapRef = React.createRef();
  }

  handleFormSubmit = () => {
    this.setState({
      collapseUsers: true,
    });
  };
  handleUsersCollapse = () => {
    this.setState({
      collapseUsers: false,
    });
  };

  handleFocusToggle = index => {
    this.setState({
      rootTabIndex: index,
    });
  };
  handleUsersUnmount = () => {
    this.setState({
      renderUsers: false,
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="wrapper">
          <Header
            tabIndex={this.state.rootTabIndex}
            isUsers={this.state.renderUsers}
            overlayRef={this.overlayMobileRef}
            pageWrap={this.pageWrapRef}
          />
          <div className="page__wrapper" ref={this.pageWrapRef}>
            <Banner tabIndex={this.state.rootTabIndex} />
            <About tabIndex={this.state.rootTabIndex} />
            <Requirements tabIndex={this.state.rootTabIndex} />
            {this.state.renderUsers ? (
              <Users
                unMount={this.handleUsersUnmount}
                handleUsersCollapse={this.handleUsersCollapse}
                testNum={this.state.testNum}
                isCollapsed={this.state.collapseUsers}
                tabIndex={this.state.rootTabIndex}
              />
            ) : null}
            <Form
              onSubmit={this.handleFormSubmit}
              tabIndex={this.state.rootTabIndex}
              handleFocusToggle={this.handleFocusToggle}
            />
            <Footer
              tabIndex={this.state.rootTabIndex}
              isUsers={this.state.renderUsers}
            />
          </div>
        </div>
        <div
          id="overlay-mobile"
          className="overlay overlay--mobile"
          ref={this.overlayMobileRef}
        />
      </React.Fragment>
    );
  }
}
