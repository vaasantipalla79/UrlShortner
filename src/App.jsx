// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UrlShortenerForm from './components/UrlShortenerForm';
import ShortenedUrlList from './components/ShortenedUrlList';
import StatisticsPage from './components/StatisticsPage';
import Redirector from './components/Redirector';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<UrlShortenerForm />} />
      <Route path="/list" element={<ShortenedUrlList />} />
      <Route path="/stats" element={<StatisticsPage />} />
      <Route path="/port/:shortcode" element={<Redirector />} />
    </Routes>
  </Router>
);

export default App;
