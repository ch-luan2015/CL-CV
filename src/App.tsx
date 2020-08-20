import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Layout from './layout'
// import MainPage1 from './pages/MainPage1'
import HomePage from './pages/HomePage'
import Post from './components/Post'
import CreatePost from './components/CreatePost'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <Router>
      <Switch>

        <Route exact path="/" component={AdminPage} />
        <Layout>
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/create" component={CreatePost} />

          <Route path="/:slug" component={Post} />

          {/* <MainPage1 /> */}
        </Layout>
      </Switch>
    </Router>
  )
}

export default App
