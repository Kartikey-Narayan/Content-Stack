// Importing necessary components and hooks from React
import React from 'react';

// Importing styles
import './Home.css';

// Importing ContentList component
import ContentList from '../../components/ContentList/ContentList.jsx';

// Define a functional component named Home
const Home = () => {

   // JSX for the component
  return (
    <div className="home-container">
      <h1 className="home-title">🚀 Content Stack 📦</h1>
      <p className='home-subtitle'>Effortless content management and dynamic delivery from creation to deployment 🌐📈</p>
      <ContentList />
      <footer className="home-footer">⚙️ Managed with 💻 DevOps and powered by 🌟 React & Node.js</footer>
    </div>
  );
};

// Export the Home component
export default Home;