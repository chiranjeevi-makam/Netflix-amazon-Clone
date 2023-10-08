import './index.css'

import {Component} from 'react'

import Cookies from 'js-cookie'

import Loading from '../Loading'

import FailView from '../FailView'

import Header from '../Header'

const initial = {
  success: 'Success',
  loading: 'Loading',
  fail: 'Fail',
}

class Poster extends Component {
  state = {status: initial.loading, object: ''}

  componentDidMount() {
    this.getPosterObject()
  }

  getPosterObject = async () => {
    const url = 'https://apis.ccbp.in/movies-app/originals'

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
      const randomObject =
        data.results[Math.floor(Math.random() * (data.results.length - 1))]

      const updateObject = {
        id: randomObject.id,
        backdropPath: randomObject.backdrop_path,
        title: randomObject.title,
        overview: randomObject.overview,
      }

      this.setState({status: initial.success, object: updateObject})
    } else {
      this.setState({status: initial.fail})
    }
  }

  successView = () => {
    const {object} = this.state
    const {id, backdropPath, title, overview} = object
    console.log(id)

    return (
      <div
        className="posterBackground"
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url(${backdropPath})`,

          width: '99vw',
        }}
      >
        <Header />
        <h1 className="headinghome">{title}</h1>
        <p className="parahome">{overview}</p>
        <div>
          <button type="button" className="playbutton">
            Play
          </button>
        </div>
      </div>
    )
  }

  loadingView = () => (
    <div className="loadContainer">
      <Loading />
    </div>
  )

  retry = () => this.getPosterObject

  FailureView = () => <FailView retry={this.retry} />

  getViewOfPoster = () => {
    const {status} = this.state
    switch (status) {
      case 'Success':
        return this.successView()
      case 'Loading':
        return this.loadingView()
      case 'Fail':
        return this.FailureView()

      default:
        return null
    }
  }

  render() {
    const {object} = this.state
    console.log(object)
    return <div>{this.getViewOfPoster()}</div>
  }
}

export default Poster
