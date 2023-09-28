import './index.css'

import {Link} from 'react-router-dom'

import {Component} from 'react'

import {HiOutlineSearch} from 'react-icons/hi'

import {MdMenuOpen} from 'react-icons/md'

import {ImCross} from 'react-icons/im'

class Header extends Component {
  state = {Show: false}

  changeShow = () => {
    this.setState(prev => ({
      Show: !prev.Show,
    }))
  }

  render() {
    const {Show} = this.state
    return (
      <nav className="headBackground">
        <div className="logoandmenu">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dl0acv1b8/image/upload/v1695185624/Group_7399_1_ixrgvi.png"
              alt="website logo"
              className="logosize"
            />
          </Link>
          <div className="searchAndmenu">
            <Link to="/search">
              <button className="searchIcon" type="button">
                <HiOutlineSearch />
              </button>
            </Link>

            <button
              className="menuIcon"
              type="button"
              onClick={this.changeShow}
            >
              <MdMenuOpen />
            </button>
          </div>
        </div>
        {Show ? (
          <ul className="showInSmall">
            <Link to="/" className="listItemsColor">
              <li>Home</li>
            </Link>
            <Link to="/popular" className="listItemsColor">
              <li>Popular</li>
            </Link>
            <Link to="/account" className="listItemsColor">
              <li>Account</li>
            </Link>
            <li>
              <button type="button" onClick={this.changeShow}>
                <ImCross />
              </button>
            </li>
          </ul>
        ) : null}

        <Link to="/">
          <img
            src="https://res.cloudinary.com/dl0acv1b8/image/upload/v1695185624/Group_7399_1_ixrgvi.png"
            alt="website logo"
            className="weblogo"
          />
        </Link>
        <div className="mediumScreenItems">
          <ul className="unorder">
            <Link to="/" className="home">
              <li>Home</li>
            </Link>
            <Link to="/popular" className="popular">
              <li>Popular</li>
            </Link>
          </ul>
          <ul className="unorder">
            <Link to="/search">
              <li>
                <button
                  className="searchIcon"
                  type="button"
                  testid="searchButton"
                >
                  <HiOutlineSearch />
                </button>
              </li>
            </Link>
            <Link to="/account">
              <li>
                <img
                  src="https://res.cloudinary.com/dl0acv1b8/image/upload/v1695564758/Avatar_eo2lnl.png"
                  alt="profile"
                  className="accountImage"
                />
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header
