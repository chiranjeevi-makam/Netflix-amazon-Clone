import './index.css'

import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {ImCross} from 'react-icons/im'

import FailView from '../FailView'
import Loading from '../Loading'

const initial = {
  loading: 'Loading',
  success: 'Success',
  fail: 'Fail',
}

class Search extends Component {
  state = {
    menuSearchList: false,
    searchInput: '',
    status: '',
    moviesSearch: [],
  }

  getSearchMoviesDetails = async () => {
    const {status, searchInput} = this.state

    this.setState({status: initial.loading})

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.results.map(each => ({
        posterPath: each.poster_path,
        title: each.title,
        id: each.id,
        backdropPath: each.backdrop_path,
      }))

      this.setState({
        moviesSearch: updatedData,
        status: initial.success,
      })
    } else {
      this.setState({
        status: initial.fail,
      })
    }
  }

  retry = () => this.getSearchMoviesDetails()

  searchSuccess = () => {
    const {moviesSearch, searchInput} = this.state
    if (searchInput === '') {
      return <p className="nodataText">Please enter a search query.</p>
    }

    if (moviesSearch.length > 0) {
      return (
        <ul className="searchPosterList">
          {moviesSearch.map(each => (
            <Link to={`/movies/${each.id}`} key={each.id}>
              <li key={each.id}>
                <img
                  src={each.posterPath}
                  alt={each.title}
                  className="posterImageSearch"
                  key={each.id}
                />
              </li>
            </Link>
          ))}
        </ul>
      )
    }

    return (
      <div className="nodataSearch">
        <img
          src="https://res.cloudinary.com/djedlaeqd/image/upload/v1675876061/Group_7394_n2jit7.png"
          alt="no movies"
        />
        <p className="nodataText">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  serachLoading = () => (
    <div className="loadingContainerSearch">
      <Loading />
    </div>
  )

  menuShowAndHideSearch = () => {
    this.setState(prev => ({menuSearchList: !prev.menuSearchList}))
  }

  searchChange = event => {
    this.setState({searchInput: event.target.value}, () => {
      // Call getSearchMoviesDetails when the input value changes
      this.getSearchMoviesDetails()
    })
  }

  successRenderSearch = () => {
    const {status} = this.state
    switch (status) {
      case 'Loading':
        return this.serachLoading()
      case 'Success':
        return this.searchSuccess()
      case 'Fail':
        return <FailView retry={this.retry} />
      default:
        return null
    }
  }

  render() {
    const {menuSearchList} = this.state
    return (
      <div className="search_background">
        <div className="both_options_nav">
          <nav className="searc_head_container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dl0acv1b8/image/upload/v1695185624/Group_7399_1_ixrgvi.png"
                alt="login website logo"
                className="search_app_logo"
              />
            </Link>
            <div className="input_and_menu">
              <div className="input_and_icon">
                <input
                  type="text"
                  className="inputElement"
                  onChange={this.searchChange}
                />
                <HiOutlineSearch style={{color: 'white'}} />
              </div>
              <button
                type="button"
                className="search_menu_button"
                onClick={this.menuShowAndHideSearch}
              >
                <MdMenuOpen />
              </button>
            </div>
          </nav>

          <nav className="medium_screen_head_search_container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dl0acv1b8/image/upload/v1695185624/Group_7399_1_ixrgvi.png"
                alt="login website logo"
                className="search_app_logo"
              />
            </Link>

            <div className="details_of_medium">
              <ul className="order_md">
                <Link to="/" className="Option_name">
                  <li>Home</li>
                </Link>
                <Link to="/popular" className="Option_name">
                  <li>Popular</li>
                </Link>
              </ul>
              <ul className="input_md_screen">
                <li className="input_structure">
                  <input
                    type="text"
                    className="input_width_md"
                    onChange={this.searchChange}
                  />
                  <HiOutlineSearch
                    style={{color: 'white', paddingTop: '5px'}}
                  />
                </li>
                <Link to="/account">
                  <li>
                    <img
                      src="https://res.cloudinary.com/dl0acv1b8/image/upload/v1695564758/Avatar_eo2lnl.png"
                      alt="profile"
                      className="accountImagesearch"
                    />
                  </li>
                </Link>
              </ul>
            </div>
          </nav>

          {menuSearchList ? (
            <ul className="search_menu_options">
              <Link to="/" className="text_Menu_optins">
                <li>Home</li>
              </Link>
              <Link to="popular" className="text_Menu_optins">
                <li>Popular</li>
              </Link>
              <Link to="account" className="text_Menu_optins">
                <li>Account</li>
              </Link>
              <li>
                <button type="button" onClick={this.menuShowAndHideSearch}>
                  <ImCross />
                </button>
              </li>
            </ul>
          ) : null}
        </div>
        {this.successRenderSearch()}
      </div>
    )
  }
}

export default Search
