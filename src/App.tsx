import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Layout from './layout'
// import MainPage1 from './pages/MainPage1'
import HomePage from './pages/HomePage'
import Post from './components/Post'
import CreatePost from './components/CreatePost'
import AdminPage from './pages/AdminPage'
import MainPage1 from './pages/MainPage1'

function App() {
  return (
    <Router>
      <Switch>

      <AdminPage>
          <Route path="/admin/create" component={CreatePost} />
        </AdminPage>
       
      <Layout>
          <Route exact path="/" component={HomePage} />
          <Route path="/:slug" component={Post} />
        </Layout>

        <Route exact path="/admin" component={AdminPage} />

       

      </Switch>
    </Router>
  )
}

export default App
