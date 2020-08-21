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
        {/* <Route path="/login" component={Login}/> */}

        <Route>
        <Layout>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/:slug" component={Post} />
          </Switch>
        </Layout>
      </Route>

      
      <Route path="/admin/:path?" exact>
        <AdminPage>
          <Switch>
            <Route path='/admin' exact component={CreatePost} />
            {/* <Route path='/admin/postlist' exact component={''} /> */}
          </Switch>
        </AdminPage>
      </Route>

      
       


      </Switch>
    </Router>
  )
}

export default App
