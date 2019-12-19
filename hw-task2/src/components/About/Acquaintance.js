import React from 'react';
import manMobile from '../../img/man-mobile.svg';
export default function Acquaintance(props) {
  return (
    <div className="about container" id="about">
      <h2 className="about__head">Let's get acquainted</h2>
      <div className="about-content">
        <img
          src={manMobile}
          alt="Frontend man"
          className="about-content__img"
          onLoad={function(e) {
            e.target.style.paddingTop = '0';
          }}
        />
        <div className="about-content__info">
          <h3 className="about-content__head">
            I am cool frontend
            <br className="mob-br" /> developer
          </h3>
          <p className="about-content__text">
            When real users have a slow experience on mobile, they're much less likely to find what they are looking for
            or purchase from you in the future. For many sites this equates to a huge missed opportunity, especially
            when more than half of visits are abandoned if a mobile page takes over 3 seconds to load.
          </p>
          <p className="about-content__text">
            Last week, Google Search and Ads teams announced two new speed initiatives to help improve user-experience
            on the web.{' '}
          </p>
          <a href="#signUp" className="about-content__btn btn plain" tabIndex={props.tabIndex}>
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
