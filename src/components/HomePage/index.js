import './index.css'

import Footer from '../Footer'

import Poster from '../Poster'

import TrendingVideos from '../TrendingVideos'

import OriginalVideos from '../OrginalVideos'

import TopRated from '../TopRated'

const Home = () => (
  <div className="backgroundHome">
    <Poster />
    <div className="videos">
      <h1>Trending Now</h1>
      <div>
        <TrendingVideos />
      </div>

      <h1>Originals</h1>
      <div>
        <OriginalVideos />
      </div>
      <h1>Top Rated</h1>
      <div>
        <TopRated />
      </div>
    </div>
    <Footer />
  </div>
)

export default Home
