import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {format} from 'date-fns'
import Header from '../Header'

import Footer from '../Footer'

import Loading from '../Loading'

import FailView from '../FailView'

const initial = {
  loading: 'Loading',
  success: 'Success',
  fail: 'Fail',
}

class MovieDetails extends Component {
  state = {
    status: initial.loading,
    movieDetails: [],
    genres: [],
    spokenLanguages: [],
    similarMovies: [],
  }

  componentDidMount() {
    this.getDeatilsOfMovie()
  }

  getDeatilsOfMovie = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(
      `https://apis.ccbp.in/movies-app/movies/${id}`,
      options,
    )

    if (response.ok) {
      const data = await response.json()
      const updatedData = [data.movie_details].map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        budget: each.budget,
        title: each.title,
        overview: each.overview,
        originalLanguage: each.original_language,
        releaseDate: each.release_date,
        count: each.vote_count,
        rating: each.vote_average,
        runtime: each.runtime,
        posterPath: each.poster_path,
      }))
      console.log(updatedData)
      const genresData = data.movie_details.genres.map(each => ({
        id: each.id,
        name: each.name,
      }))
      console.log(genresData)
      const updatedSimilarData = data.movie_details.similar_movies.map(
        each => ({
          id: each.id,
          posterPath: each.poster_path,
          title: each.title,
        }),
      )
      console.log(updatedSimilarData)
      const updatedLanguagesData = data.movie_details.spoken_languages.map(
        each => ({
          id: each.id,
          language: each.english_name,
        }),
      )
      this.setState(
        {
          movieDetails: updatedData,
          genres: genresData,
          spokenLanguages: updatedLanguagesData,
          similarMovies: updatedSimilarData.slice(0, 6),
          status: initial.success,
        },
        this.succcessDetailsView,
      )
    } else {
      this.setState({status: initial.fail})
    }
  }

  succcessDetailsView = () => {
    const {movieDetails, genres, spokenLanguages, similarMovies} = this.state
    console.log(movieDetails)
    const newData = {...movieDetails[0]}
    console.log(newData.backdropPath)
    return (
      <div className="moviesDetailsContainer">
        <div
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url(${newData.backdropPath})`,
            height: '60vh',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
          }}
          className="moviesPoster"
        >
          <Header />
          <div className="moviePosterDetailsArrange">
            <div className="movieTitle">{newData.title}</div>
            <div className="dateAndTime">
              <div>
                {`${Math.floor(newData.runtime / 60)}h ${
                  newData.runtime % 60
                }m `}
              </div>
              <div className="UA">{newData.adult ? 'A' : 'U/A'}</div>
            </div>
            <div className="movie_overview">{newData.overview}</div>
            <br />
            <div className="movieplayButton">
              <button type="button">Play</button>
            </div>
          </div>
        </div>

        <div className="detailsMiddleCard">
          <ul className="describeItemsListUnorder">
            <h1 className="describeHeading">Genres</h1>
            {genres.map(each => (
              <p className="describePara" key={each.id}>
                {each.name}
              </p>
            ))}
          </ul>

          <ul>
            <h1 className="describeHeading">Audio Available</h1>
            {spokenLanguages.map(each => (
              <p className="describePara" key={each.id}>
                {each.language}
              </p>
            ))}
          </ul>

          <ul className="describeItemsListUnorder">
            <h1 className="describeHeading">Rating Count</h1>
            <p className="describePara">{newData.count}</p>
            <h1 className="describeHeading">Rating Average</h1>
            <p className="describePara">{newData.rating}</p>
          </ul>

          <ul>
            <h1 className="describeHeading">Budget</h1>
            <p className="describePara">{newData.budget}</p>
            <h1 className="describeHeading">Release Date</h1>
            <p className="describePara">
              {newData.releaseDate
                ? format(new Date(newData.releaseDate), 'dd MMMM yyyy')
                : 'N/A'}
            </p>
          </ul>
        </div>

        <div className="movieDetailsFinalCard ">
          <h1 className="moreViesHead">More like this </h1>
          <ul className="similarItemsArrangement">
            {similarMovies.map(each => (
              <li key={each.id}>
                <img
                  className="similar_poster"
                  src={each.posterPath}
                  alt={each.title}
                />
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    )
  }

  detailsLoading = () => (
    <div className="movieDetailsLoading">
      <Loading />
    </div>
  )

  retry = () => this.getDeatilsOfMovie()

  moviesDetailsRenderView = () => {
    const {status} = this.state
    switch (status) {
      case 'Loading':
        return this.detailsLoading()
      case 'Success':
        return this.succcessDetailsView()
      case 'Fail':
        return <FailView retry={this.retry} />
      default:
        return null
    }
  }

  render() {
    return <div>{this.moviesDetailsRenderView()}</div>
  }
}

export default MovieDetails
