import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Layout from './layout'
import CreatePost from './components/CreatePost'
import PostPage from './pages/PostPage'
import AdminPage from './pages/AdminPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Router>
      <Switch>
        {/* <Route path="/login" component={Login}/> */}


        <Route path="/admin/:path?" exact>
        <AdminPage>
          <Switch>
            <Route path='/admin/post' exact component={CreatePost} />
            {/* <Route path='/admin/postlist' exact component={''} /> */}
          </Switch>
        </AdminPage>
      </Route>

      <Route>
        <Layout>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/:title" component={PostPage} />
          </Switch>
        </Layout>
      </Route>

      
     
      
       


      </Switch>
    </Router>
  )
}

export default App
