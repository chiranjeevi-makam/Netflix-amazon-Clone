import './index.css'

import {Component} from 'react'

import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import Header from '../Header'

import Loading from '../Loading'

import FailView from '../FailView'

import Footer from '../Footer'

const initial = {
  loading: 'Loading',
  success: 'Success',
  fail: 'Fail',
}
class Popular extends Component {
  state = {status: initial.loading, moviesList: []}

  componentDidMount = () => {
    this.PopularMoviesData()
  }

  PopularMoviesData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.results.map(each => ({
        title: each.title,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        id: each.id,
        posterUrl: each.poster_path,
      }))
      this.setState({
        status: initial.success,
        moviesList: updatedData,
      })
    } else {
      this.setState({status: initial.fail})
    }
  }

  retry = () => this.PopularMoviesData()

  successView = () => {
    const {moviesList} = this.state
    return (
      <ul className="unOrderListPopular">
        {moviesList.map(each => (
          <Link to={`/movies/${each.id}`} key={each.id} target="blank">
            <li key={each.id}>
              <img
                src={each.posterUrl}
                className="popular_movies_poster"
                alt={each.title}
                key={each.id}
              />
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  popularLoadView = () => (
    <div className="popularLoadingContainer">
      <Loading />
    </div>
  )

  popularFailView = () => <FailView retry={this.retry} />

  popularRenderView = () => {
    const {status} = this.state
    switch (status) {
      case 'Loading':
        return this.popularLoadView()
      case 'Success':
        return this.successView()
      case 'Fail':
        return this.popularFailView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popularPage">
        <Header />
        {this.popularRenderView()}
        <Footer />
      </div>
    )
  }
}

export default Popular
