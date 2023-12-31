import './index.css'

import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

const Account = props => {
  const Logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const name = Cookies.get('name')
  return (
    <div className="accountBackground">
      <Header />
      <div className="accountDetailsContainer">
        <h1 className="accountHeading">Account</h1>
        <hr className="lineBrake" />
        <div className="membership_pass_container">
          <p className="memberShip">Member ship </p>
          <div className="nameAndPass ">
            <p className="gmail">{name}@gmail.com</p>
            <p className="pass">Password : *******</p>
          </div>
        </div>
        <hr className="lineBrake" />
        <div className="membership_pass_container">
          <p className="memberShip">Plan details</p>
          <p className="gmail">Premium </p>
          <p className="ultra">Ultra HD</p>
        </div>
        <hr className="lineBrake" />
        <div className="buttonContainer">
          <button type="button" className="logoutButton" onClick={Logout}>
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Account
