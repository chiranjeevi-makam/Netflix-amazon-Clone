import './App.css'
import {Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/HomePage'

import NotFound from './components/NotFound'

import Popular from './components/PopularPage'

import MovieDetails from './components/MovieDetails'

import Account from './components/Account'

import Search from './components/Search'

import ProtectedRoute from './components/ProtextedRoute'

const App = () => (
  <Switch>
    <ProtectedRoute exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={Popular} />
    <ProtectedRoute exact path="/movies/:id" component={MovieDetails} />
    <ProtectedRoute exact path="/account" component={Account} />
    <ProtectedRoute exact path="/search" component={Search} />
    <ProtectedRoute component={NotFound} />
  </Switch>
)

export default App
