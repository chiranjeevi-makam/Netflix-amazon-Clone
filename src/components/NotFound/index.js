import './index.css'

import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="NotFoundBackground">
    <h1 className="notFoundHeading">Lost Your Way ?</h1>
    <p className="notFoundPara">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button className="goHomeButton" type="button">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound
