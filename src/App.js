import React from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile')); 
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Container maxWidth="lg">
          <NavBar />
          <Switch>
            <Route path="/" exact component={() =><Redirect to ="/posts" />} />
            <Route  path="/posts" exact component ={Home} />
             <Route  path="/posts/search" exact component ={Home} />
             <Route  path="/posts/:id" component ={PostDetails}/>
            <Route path="/auth" exact component={() => (!user ? <Auth/>: <Redirect to="/posts" />)} />
            <Route path="*" render={() => <div>404 Not Found</div>} />
          </Switch>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;






