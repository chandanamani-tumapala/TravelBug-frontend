import './App.css';
import './FrontendStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Layout from './views/layouts/layout';
import Edit from './views/listings/edit';
import New from './views/listings/new';
import Show from './views/listings/show';
import Index from './views/listings';
import Signup from './views/users/signup';
import SignIn from './views/users/signin';
import Mylisting from './views/listings/mylisting';
import ProtectedRoute from './views/Authentication/ProtectedRoute';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Layout/>}>
        <Route element={<ProtectedRoute/>}>
          <Route path='listings/new' element={<New/>}></Route>
          <Route path='listings/:id/edit' element={<Edit/>}></Route>
          <Route path='listings/:id' element={<Show/>}></Route>
          <Route path='index' element={<Index/>}></Route>
          <Route path='mylisting' element={<Mylisting/>}></Route>
        </Route>
          <Route path='signup' element={<Signup/>}></Route>
          <Route path='/' element={<SignIn/>}></Route>
        </Route>
        
      </Routes>
    </Router>
    
  );
}

export default App;
