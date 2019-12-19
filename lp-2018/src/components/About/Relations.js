import React from 'react';
import html_img from '../../img/html.svg';
import css_img from '../../img/css.svg';
import js_img from '../../img/javascript.svg';

export default function Relations(props) {
  return (
    <div className="relations container" id="relations">
      <h2 className="relations__head">
        About my relationships
        <br className="mob-br" /> with
        <br className="br" /> web-development
      </h2>
      <div className="relations-content">
        <div className="relations-block">
          <img
            src={html_img}
            alt="Logo of HTML"
            className="relations-block__img"
          />
          <div className="relations-block__info">
            <h3 className="relations-block__head">I'm in love with HTML</h3>
            <p className="relations-block__text">
              Hypertext Markup Language (HTML)
              <br className="mob-br" /> is the standard markup language for
              creating web pages and web applications.
            </p>
          </div>
        </div>
        <div className="relations-block">
          <img
            src={css_img}
            alt="Logo of CSS"
            className="relations-block__img"
          />
          <div className="relations-block__info">
            <h3 className="relations-block__head">CSS is my best friend</h3>
            <p className="relations-block__text">
              Cascading Style Sheets (CSS) is a style sheet language used for
              describing the presentation of a document written in a markup
              language like HTML.
            </p>
          </div>
        </div>
        <div className="relations-block">
          <img
            src={js_img}
            alt="Logo of JavaScript"
            className="relations-block__img"
          />
          <div className="relations-block__info">
            <h3 className="relations-block__head">JavaScript is my passion</h3>
            <p className="relations-block__text">
              JavaScript is a high-level, interpreted programming language.{' '}
              <br className="tablet-br" />
              It is a language which is also characterized as dynamic, weakly
              typed, prototype-based and
              <br className="mob-br" /> multi-paradigm.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
