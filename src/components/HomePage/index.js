import './index.css'

import Footer from '../Footer'

import Poster from '../Poster'

import Header from '../Header'

import TrendingVideos from '../TrendingVideos'

import OriginalVideos from '../OrginalVideos'

import TopRated from '../TopRated'

const Home = () => (
  <div className="backgroundHome">
    <Header />
    <Poster />
    <div className="videos">
      <h1>Trending Now</h1>
      <TrendingVideos />
      <h1>Orginals</h1>
      <OriginalVideos />
      <h1>Top Rated</h1>
      <TopRated />
    </div>
    <Footer />
  </div>
)

export default Home
