import React from 'react'
import man from '../img/man-laptop-v1.svg'
import man_tablet from '../img/man-laptop-v2.svg'

export default function Requirements() {
  return (
    <div className="requirements__wrapper" id="requirements">
      <div className="requirements container">
        <h2 className="requirements__head">
          General requirements
          <br className="tablet-br" /> for the test task
        </h2>
        <div className="requirements-content">
          <picture className="requirements-content__img">
            <source
              media="(min-width: 600px)  and (max-width: 769px)"
              srcSet={man_tablet}
            />
            <img
              src={man}
              alt="Man working at a laptop"
              style={{ width: '100%' }}
            />
          </picture>
          <div className="requirements-content__info">
            <p className="requirements-content__text">
              Users want to find answers to their questions quickly and data
              shows that people really care about how quickly their pages load.
              The Search team announced speed would be a ranking signal for
              desktop searches in 2010 and as of this month (July 2018), page
              speed will be a ranking factor for mobile searches too.
            </p>
            <p className="requirements-content__text">
              If you're a developer working on a site, now is a good time to
              evaluate your performance using our speed tools. Think about how
              performance affects the user experience of your pages and consider
              measuring a variety of real-world
              <span className="nowrap"> user-centric</span> performance metrics.
            </p>
            <p className="requirements-content__text">
              Are you shipping too much JavaScript? Too many images? Images and
              JavaScript are the most significant contributors to the page
              weight that affect page load time based on data from HTTP Archive
              and the Chrome User Experience Report - our public dataset for key
              UX metrics as experienced by Chrome users under{' '}
              <span className="nowrap">real-world</span> conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
