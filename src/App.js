import React from "react";
import './App.scss';
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Grid} from "react-flexbox-grid";


export default function App() {
  return (
      <div className="app-layout">
          <Header />
          <Grid className="app-content">
          </Grid>
          <Footer />
      </div>
  );
}
