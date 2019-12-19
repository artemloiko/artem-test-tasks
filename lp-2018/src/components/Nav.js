import React from 'react';

export default function Nav(props) {
    return (
        <ul className="nav" onClick={props.handleClick}>
            <li className="nav__item">
                <a tabIndex={props.tabIndex} href="#about" className="nav__link">
                    About me
                </a>
            </li>
            <li className="nav__item">
                <a tabIndex={props.tabIndex} href="#relations" className="nav__link">
                    Relationships
                </a>
            </li>
            <li className="nav__item">
                <a tabIndex={props.tabIndex} href="#requirements" className="nav__link">
                    Requirements
                </a>
            </li>
            <li className="nav__item" style={{ display: props.isUsers ? '' : 'none' }}>
                <a tabIndex={props.tabIndex} href="#users" className="nav__link">
                    Users
                </a>
            </li>
            <li className="nav__item">
                <a tabIndex={props.tabIndex} href="#signUp" className="nav__link">
                    Sign Up
                </a>
            </li>
            <li className="nav__item">
                <a tabIndex={props.tabIndex} href="#" className="nav__link signOut">
                    Sign Out
                </a>
            </li>
        </ul>
    );
}
