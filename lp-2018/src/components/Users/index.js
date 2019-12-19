import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UsersPlaceholder from './UsersPlaceholder';
import UsersFetched from './UsersFetched';

import API from '../../API';
const api = new API();

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUsersLoading: true,
      isEndOfList: false,

      users: [],
      isDesk: true,
      countToFetch: 3,
      mobPage: 1,
      deskPage: 1,
      SM_isVisible: true,
      SM_isPressed: false,
      SM_isLoading: false
    };
  }

  componentDidMount() {
    this.initUsers();

    let isFetchingOnResize = false;

    window.addEventListener('resize', () => {
      const isDesk = window.matchMedia('(min-width: 690px)').matches;
      if (isDesk === this.state.isDesk) return;
      if (this.state.isEndOfList) return;

      if (this.state.mobPage % 2 != 0 && !isFetchingOnResize) {
        isFetchingOnResize = true;

        api.getNextPage(this.state.mobPage + 1, this.state.countToFetch).then(
          data => {
            this.setState({
              SM_isVisible: !!data.links.next_url,
              users: this.state.users.concat(data.users),
              mobPage: this.state.mobPage + 1,
              isDesk: isDesk,
              countToFetch: isDesk ? 6 : 3
            });

            isFetchingOnResize = false;
          },
          error => {
            this.setState({
              SM_isVisible: false,
              isEndOfList: true
            });
          }
        );
      } else {
        this.setState({
          isDesk: isDesk,
          countToFetch: isDesk ? 6 : 3
        });
      }
    });

    this.checkOverflows(true);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isCollapsed) {
      this.initUsers();
      this.props.handleUsersCollapse();
    }
  }

  initUsers() {
    const isDesk = window.matchMedia('(min-width: 690px)').matches;
    const countToFetch = isDesk ? 6 : 3;
    api.getNextPage(1, countToFetch).then(
      data => {
        this.setState({
          isUsersLoading: false,
          isEndOfList: false,
          SM_isVisible: !!data.links.next_url,
          users: data.users,
          isDesk: isDesk,
          countToFetch: countToFetch,
          mobPage: isDesk ? 2 : 1,
          deskPage: 1,
          count: data.users.length
        });
        this.checkOverflows();
      },
      error => {
        this.props.unMount();
      }
    );
  }

  handleShowMoreClick() {
    let isFetching = false;

    return e => {
      if ((e.keyCode !== 13 || e.keyCode !== 32) && e.keyCode) return;
      if (isFetching) return;

      isFetching = true;
      this.setState({
        SM_isVisible: true,
        SM_isPressed: true,
        SM_isLoading: false
      });

      //if network is slow we are showing preloader
      let loadingTimer = setTimeout(() => {
        this.setState({
          SM_isVisible: true,
          SM_isPressed: false,
          SM_isLoading: true
        });
      }, 400);

      const nextPage = this.state.isDesk ? this.state.deskPage + 1 : this.state.mobPage + 1;
      api.getNextPage(nextPage, this.state.countToFetch).then(
        data => {
          const st = this.state;
          const isDesk = st.isDesk;

          this.setState(
            {
              users: st.users.concat(data.users),
              mobPage: isDesk ? st.mobPage + 2 : st.mobPage + 1,
              deskPage: isDesk ? st.deskPage + 1 : st.mobPage % 2 ? st.deskPage : st.deskPage + 1,
              count: st.count + data.users.length,
              countToFetch: isDesk ? 6 : 3,
              SM_isVisible: !!data.links.next_url,
              SM_isPressed: false,
              SM_isLoading: false,
              isEndOfList: !data.links.next_url
            },
            this.checkOverflows
          );
          isFetching = false;
          clearTimeout(loadingTimer);
        },
        error => {
          this.setState({
            isEndOfList: true,
            SM_isVisible: true
          });
        }
      );
    };
  }

  /**
   * @param {boolean} checkEvery - should it check every user (used with resize)
   */
  checkOverflows(checkEvery = false) {
    if (this.state.isUsersLoading) return;

    const userNames = document.querySelectorAll('.user__name');
    const userEmails = document.querySelectorAll('.user__email');

    userNames.forEach(userName => {
      if (userName.dataset.tooltip && !checkEvery) return;

      setTimeout(function() {
        if (userName.offsetWidth < userName.scrollWidth) {
          userName.dataset.tooltip = userName.innerHTML;
          userName.classList.add('tooltip');
          userName.classList.add('user__name--tooltip');
        } else {
          userName.classList.remove('tooltip');
          userName.dataset.tooltip = 'none';
        }
      }, 4);
    });

    userEmails.forEach(userEmail => {
      if (userEmail.dataset.tooltip && !checkEvery) return;

      setTimeout(function() {
        if (userEmail.offsetWidth < userEmail.scrollWidth) {
          userEmail.dataset.tooltip = userEmail.innerHTML;
          userEmail.classList.add('tooltip');
          userEmail.classList.add('user__email--tooltip');
        } else {
          userEmail.classList.remove('tooltip');
          userEmail.dataset.tooltip = 'none';
        }
      }, 4);
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isUsersLoading ? (
          <UsersPlaceholder />
        ) : (
          <UsersFetched
            users={this.state.users}
            handleShowMoreClick={this.handleShowMoreClick()}
            SM_isVisible={this.state.SM_isVisible}
            SM_isPressed={this.state.SM_isPressed}
            SM_isLoading={this.state.SM_isLoading}
            tabIndex={this.props.tabIndex}
          />
        )}
      </React.Fragment>
    );
  }
}
