import './index.css'

import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const Footer = () => (
  <div className="Fcontainer">
    <ul className="iconsContainer">
      <li>
        <FaGoogle className="icon_margin" />
      </li>
      <li>
        <FaTwitter className="icon_margin" />
      </li>
      <li>
        <FaInstagram className="icon_margin" />
      </li>
      <li>
        <FaYoutube className="icon_margin" />
      </li>
    </ul>
    <p className="paraContact">Contact us</p>
  </div>
)

export default Footer
