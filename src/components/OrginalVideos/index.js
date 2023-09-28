import {Component} from 'react'

import Cookies from 'js-cookie'
import Loading from '../Loading'

import ReactSilk from '../ReactSilk'

import FailView from '../FailView'

const initial = {
  loading: 'Loading',
  success: 'Success',
  fail: 'Fail',
}

class OriginalVideos extends Component {
  state = {status: initial.loading, movies: []}

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    const url = 'https://apis.ccbp.in/movies-app/trending-movies'

    const jwtToken = Cookies.get('jwt_token')

    const Position = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, Position)

    const data = await response.json()

    if (response.ok) {
      const {results} = data

      const updateMovies = results.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))

      this.setState({status: initial.success})
      this.setState({movies: updateMovies})
    } else {
      this.setState({status: initial.fail})
    }
  }

  retry = () => this.getTrendingVideos()

  renderView = () => {
    const {status, movies} = this.state
    switch (status) {
      case 'Loading':
        return (
          <div className="loadingContainer">
            <Loading />
          </div>
        )
      case 'Success':
        return <ReactSilk moviesList={movies} />
      case 'Fail':
        return <FailView retry={this.getTrendingVideos()} />

      default:
        return null
    }
  }

  render() {
    return <>{this.renderView()}</>
  }
}

export default OriginalVideos
