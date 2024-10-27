import "./App.css";
import NavBar from "./NavBar";
import React, { Component } from "react";
import News from "./News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoadingBar from "react-top-loading-bar";

const App = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
    return (
      <Router>
        <div>
          {/* <LoadingBar color="#f11946" progress={this.state.progress} /> */}
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={
                <News
                  key="home"
                  pageSize={9}
                  category="general"
                  apiKey={apiKey}
                />
              }
            />
            <Route
              path="/general"
              element={
                <News
                  key="general"
                  pageSize={9}
                  category="general"
                  apiKey={apiKey}
                />
              }
            />
            <Route
              path="/business"
              element={
                <News
                  key="business"
                  pageSize={9}
                  category="business"
                  apiKey={apiKey}
                />
              }
            />
            <Route
              path="/entertainment"
              element={
                <News
                  key="entertainment"
                  pageSize={9}
                  category="entertainment"
                  apiKey={apiKey}
                />
              }
            />
            <Route
              path="/sports"
              element={<News key="sports" pageSize={9} category="sports" apiKey={apiKey}/>}
            />
            <Route
              
              path="/health"
              element={
                <News key="health" pageSize={9} category="health" apiKey={apiKey} />
              }
            />
            <Route
              path="/science"
              element={
                <News
                  key="science"
                  pageSize={9}
                  category="science"
                  apiKey={apiKey}
                />
              }
            />
            <Route
              path="/technology"
              element={
                <News
                  key="technology"
                  pageSize={9}
                  category="technology"
                  apiKey={apiKey}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    );
  }
export default App;