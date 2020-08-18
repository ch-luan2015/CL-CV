import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import Layout from './layout'
import MainPage1 from './pages/MainPage1'
import HomePage from './pages/HomePage'
import Post from './components/Post'
import NoMatch from './components/NoMatch'

function App() {
  return (
    <Layout>
      <Router>
        <nav>
          <Link to="/">
            <h2>My React + Firebase Blog</h2>
          </Link>
        </nav>
        <main>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/404" component={NoMatch} />
            <Route path="/:slug" component={Post} />
          </Switch>
        </main>
      </Router>
      {/* <MainPage1 /> */}
    </Layout>
  )
}

export default App
