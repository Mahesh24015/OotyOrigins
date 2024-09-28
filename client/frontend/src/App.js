import './App.css';
import Homepage from './components/Homepage/HomePage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <>
            {/* This is the alias of BrowserRouter i.e. Router */}
            <Router>
                <Routes>
                    {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
                    <Route
                        exact
                        path="/"
                        element={<Homepage />}
                    />

                    {/* This route is for about component 
          with exact path "/about", in component 
          props we passes the imported component*/}
                    {/* <Route
                        path="/about"
                        element={<About />}
                    /> */}

                    {/* This route is for contactus component
          with exact path "/contactus", in 
          component props we passes the imported component*/}
                    {/* <Route
                        path="/contactus"
                        element={<ContactUs />}
                    /> */}

                    {/* If any route mismatches the upper 
          route endpoints then, redirect triggers 
          and redirects app to home component with to="/" */}
                    {/* <Redirect to="/" /> */}
                    {/* <Route
                        path="*"
                        element={<Navigate to="/" />}
                    /> */}
                </Routes>
            </Router>
        </>
    </div>
  );
}

export default App;
