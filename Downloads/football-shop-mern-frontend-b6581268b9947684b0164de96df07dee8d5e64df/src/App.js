import React, {useEffect} from 'react';
import { Route } from 'react-router-dom';

import Footer from './components/Footer';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Cart from './pages/CartPartTwo';
import SignIn from './pages/SignIn';
import CheckOut from './pages/CheckOut';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import DescriptionPartTwo from './pages/DescriptionPartTwo';
import JerseysPartTwo from './pages/JerseysPartTwo';
import BootsPartTwo from './pages/BootsPartTwo';
import AccessoriesPartTwo from './pages/AccessoriesPartTwo';
import Purchases from './pages/Purchases';
import { api } from './api/api';

function App() {
  useEffect( () => {
    let controller = new AbortController();
    async function fetchData() {
        try {
          const response = await api('GET', "", {
            mode: 'cors',
          })

        } catch (error) {
            console.log({ failed: error })
        }
    }

    fetchData()
    fetchData()

    return () => {
        return () => controller?.abort();

    }
}, [])

  return (
    // DESCRIPTION ROUTE IS IN THE PROFILE PAGE. IT'S AN EMBEDDED ROUTE
    <div>
      <Navbar />
      <Route exact path="/">
        <Home />
      </Route>
     
      {/* <Route path="/jerseys">
        <Jerseys />
      </Route> */}
    
      <Route path="/cart">
        <Cart />
      </Route>
      <Route path="/purchases">
        <Purchases />
      </Route>
      <Route path="/checkOut">
        <CheckOut />
      </Route>
      <Route path="/signIn">
        <SignIn />
      </Route>
      <Route path="/signUp">
        <SignUp />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      
      <Route exact path="/jerseys">
        <JerseysPartTwo />
      </Route>
      <Route path="/jerseys/:userPath">
        <DescriptionPartTwo />
      </Route>
      <Route exact path="/boots">
        <BootsPartTwo />
      </Route>
      <Route path="/boots/:userPath">
        <DescriptionPartTwo />
      </Route>
      <Route exact path="/accessories">
        <AccessoriesPartTwo />
      </Route>
      <Route path="/accessories/:userPath">
        <DescriptionPartTwo />
      </Route>

      <Footer />
    </div>
  )
}

export default App
