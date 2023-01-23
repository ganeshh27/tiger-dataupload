// import { Component } from 'react';
// import { useState, useEffect } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import Products from './components/product/product';
import Navigation from './components/navigation/navigation.component';
import Upload from './components/dataload/dataload.component';
import './App.css';

const App = () => {
  return (
    <>
      <div className='App'>
        <h1 className='app-title'>Tiger Analytics</h1>
        <Routes>
          <Route path='/' element={<Navigation />}>
            <Route path='/products' element={<Products />} />
            <Route path='/upload' element={<Upload />} />
          </Route>
        </Routes>
      </div>
      <h5 className='app-footer'>
        {' '}
        <p>copyright@2023</p>
      </h5>
    </>
  );
};

export default App;
