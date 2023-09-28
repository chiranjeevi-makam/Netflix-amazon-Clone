import './index.css'

import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const Footer = () => (
  <div className="Fcontainer">
    <div className="iconsContainer">
      <FaGoogle className="icon_margin" />
      <FaTwitter className="icon_margin" />
      <FaInstagram className="icon_margin" />
      <FaYoutube className="icon_margin" />
    </div>
    <p>Contact us</p>
  </div>
)

export default Footer
