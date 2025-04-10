// Importing necessary components from React
import React from 'react';

// Importing styles
import './Home.css';

// Importing CMSForm component
import CMSForm from '../../components/CMSForm/CMSForm.jsx';

// Define a functional component named Home
const Home = () => {

   // JSX for the component
  return (
    <div className="home-container">
      <h1 className="home-title">📦 Content Stack CMS ✏️</h1>
      <p className='home-subtitle'>Effortlessly manage your content - Add, update, and deploy in seconds. 🚀</p>
      <CMSForm />
      <footer className="home-footer">⚙️ Managed with 💻 DevOps and powered by 🌟 React & Node.js</footer>
    </div>
  );
};

// Export the Home component
export default Home;