// Importing necessary components and libraries from React and react-router-dom
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Importing the Loading component for displaying loading state
import Loading from '../components/Loading/Loading.jsx';

// Lazy loading the pages for different routes
const Home = lazy(() => import('../pages/Home/Home.jsx'));
const PageNotFound = lazy(() => import('../pages/PageNotFound/PageNotFound.jsx'));

// PageRouter component responsible for routing within the application
const PageRouter = () => {
  // Defining routes using Routes, and Route components
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Route for the Home page */}
        <Route path='/' element={<Home />} />
        {/* Route for handling undefined routes */}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

// Exporting the PageRouter component
export default PageRouter;
