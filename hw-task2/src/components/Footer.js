import React from 'react';
import Nav from './Nav';
import logo from '../img/logo_footer.svg';
import Facebook from '../img/icons/facebook_.svg';
import LinkedIn from '../img/icons/linkedin_.svg';
import Instagram from '../img/icons/instagram_.svg';
import Twitter from '../img/icons/twitter_.svg';
import Pinterest from '../img/icons/pinterest_.svg';

export default function Footer(props) {
  return (
    <div className="footer__wrapper">
      <footer className="footer container">
        <nav className="footer__nav">
          <a href="#" tabIndex={props.tabIndex} aria-label="Link to main page">
            <img src={logo} className="logo" alt="Logo of ABZ agency" />
          </a>
          <Nav tabIndex={props.tabIndex} isUsers={props.isUsers} />
        </nav>
        <div className="footer-links">
          <ul className="footer-links__row footer-links--contacts">
            <li>
              <a
                href="mailto:work.of.future@gmail.com"
                className="footer__link--contact email"
              >
                work.of.future@gmail.com
              </a>
            </li>
            <li>
              <a
                href="tel:+380507892498"
                className="footer__link--contact phone"
              >
                +38 (050) 789 24 98
              </a>
            </li>
            <li>
              <a
                href="tel:+380955560845"
                className="footer__link--contact cellphone"
              >
                +38 (095) 556 08 45
              </a>
            </li>
          </ul>
          <div className="footer-links__row">
            <a tabIndex={props.tabIndex} href="#" className="footer__link">
              News
            </a>
            <a tabIndex={props.tabIndex} href="#" className="footer__link">
              Blog
            </a>
            <a tabIndex={props.tabIndex} href="#" className="footer__link">
              Partners
            </a>
            <a tabIndex={props.tabIndex} href="#" className="footer__link">
              Shop
            </a>
          </div>
          <div className="footer-links__row">
            <a tabIndex={props.tabIndex} href="#" className="footer__link">
              Overview
            </a>
            <a tabIndex={props.tabIndex} href="#" className="footer__link">
              Design
            </a>
            <a tabIndex={props.tabIndex} href="#" className="footer__link">
              Code
            </a>
            <a tabIndex={props.tabIndex} href="#" className="footer__link">
              Collaborate
            </a>
          </div>
          <div className="footer-links__row">
            <a tabIndex={props.tabIndex} href="#" className="footer__link">
              Tutorials
            </a>
            <a tabIndex={props.tabIndex} href="#" className="footer__link">
              Resources
            </a>
            <a tabIndex={props.tabIndex} href="#" className="footer__link">
              Guides
            </a>
            <a tabIndex={props.tabIndex} href="#" className="footer__link">
              Examples
            </a>
          </div>
          <div className="footer-links__row">
            <a tabIndex={props.tabIndex} href="#" className="footer__link">
              FAQ
            </a>
            <a tabIndex={props.tabIndex} href="#" className="footer__link">
              Terms
            </a>
            <a tabIndex={props.tabIndex} href="#" className="footer__link">
              Conditions
            </a>
            <a tabIndex={props.tabIndex} href="#" className="footer__link">
              Help
            </a>
          </div>
        </div>
        <div className="footer-links--bottom">
          <span className="copyright">
            &copy; abz.agency specially for the test task
          </span>
          <div className="footer-links--social">
            <a
              tabIndex={props.tabIndex}
              href="#"
              className="footer-link--social"
              aria-label="Facebook"
              target="blank"
            >
              <Facebook />
            </a>
            <a
              tabIndex={props.tabIndex}
              href="#"
              className="footer-link--social linkedin"
              aria-label="LinkedIn"
              target="blank"
            >
              <LinkedIn />
            </a>
            <a
              tabIndex={props.tabIndex}
              href="#"
              className="footer-link--social inst"
              aria-label="Instagram"
              target="blank"
            >
              <Instagram />
            </a>
            <a
              tabIndex={props.tabIndex}
              href="#"
              className="footer-link--social twitter"
              aria-label="Twitter"
              target="blank"
            >
              <Twitter />
            </a>
            <a
              tabIndex={props.tabIndex}
              href="#"
              className="footer-link--social pint"
              aria-label="Pinterest"
              target="blank"
            >
              <Pinterest />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
