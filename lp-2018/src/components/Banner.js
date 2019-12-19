import React from 'react'

export default function Banner(props) {
  return (
    <div className="banner__wrapper">
      <div className="banner container">
        <div className="banner-content">
          <h1 className="banner-content__head">
            Test assignment for Frontend Developer position
          </h1>
          <p className="banner-content__text">
            We kindly remind you that your test assignment should be submitted
            as a link to github/bitbucket repository.
            <span className="no-mobile">
              Please be patient, we consider and respond to every application
              that meets minimum requirements. We look forward to your
              submission. Good luck!
            </span>
          </p>
          <a
            href="#signUp"
            className="banner-content__btn btn primary"
            tabIndex={props.tabIndex}
          >
            Sign Up
          </a>
        </div>
      </div>
      <picture style={{ display: 'none' }}>
        <source
          media="(min-width: 1921px)  and (max-width: 2560px)"
          srcSet="../images/banner-2k.jpg"
        />
        <source
          media="(min-width: 1681px)  and (max-width: 1920px)"
          srcSet="../images/banner-1920.jpg"
        />
        <source
          media="(min-width: 1441px)  and (max-width: 1680px)"
          srcSet="../images/banner-1680.jpg"
        />
        <source
          media="(min-width: 1281px)  and (max-width: 1440px)"
          srcSet="../images/banner-1440.jpg"
        />
        <source
          media="(min-width: 1025px)  and (max-width: 1280px)"
          srcSet="../images/banner-1280.jpg"
        />
        <source
          media="(min-width: 769px)  and (max-width: 1024px)"
          srcSet="../images/banner-1024.jpg"
        />
        <source
          media="(min-width: 481px)  and (max-width: 768px) and (-webkit-min-device-pixel-ratio: 2)"
          srcSet="../images/banner-768@2x.jpg"
        />
        <source
          media="(min-width: 481px)  and (max-width: 768px)"
          srcSet="../images/banner-768.jpg"
        />
        <source
          media="(min-width: 321px) and (max-width: 480px)"
          srcSet="../images/banner-480@2x.jpg"
        />
        <img src="../images/banner-320@2x.jpg" alt="Man working at a laptop" />
      </picture>
    </div>
  )
}
