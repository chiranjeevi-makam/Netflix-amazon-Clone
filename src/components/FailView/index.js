import './index.css'

import {Link} from 'react-router-dom'

const FailView = props => {
  const {retry} = props

  const handle = () => {
    retry()
  }
  return (
    <div className="failContainer">
      <img
        src="https://res.cloudinary.com/dl0acv1b8/image/upload/v1695825742/alert-triangle_prgfhd.png"
        alt="failure view"
        className="icon"
      />
      <p className="para">Something went wrong. Please try again</p>

      <Link to="/">
        <button className="tryButton" type="button" onClick={handle}>
          Try Again
        </button>
      </Link>
    </div>
  )
}
export default FailView
