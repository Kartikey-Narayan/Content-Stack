// Importing necessary components and hooks from React
import React, { useState, useEffect } from 'react';
// Importing axios for HTTP requests
import axios from 'axios'; 

// Importing styles
import './ContentList.css';

// API endpoint constant for better maintainability
const API_URL = 'https://backend-cs.kartikeynarayan.in/api/content';

// Define a functional component named ContentList
const ContentList = () => {

  // State to hold the fetched content data and any errors
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = response.data;
        if (data) {
          setContent(data);
        } else {
          throw new Error('⚠️ Unexpected response from the server.');
        }
      } catch (error) {
        console.error('⚠️ Error fetching content: ', error);
        setError('❌ Something went wrong, Please try again later.');
      }
    };

    fetchContent(); 
  }, []);

  // JSX for the component
  return (
    <div className='content-list-container'>
      <h2 className='content-list-title'>📄 Content List</h2>
      {
        error 
        ? 
        (
          <p className='content-list-error'>{error}</p>
        ) 
        : 
        (
          <ul className='content-list'>
            {
              content.length === 0 
              ? 
              (
              <li className='content-list-error'>🔄 No content available, Please try again later.</li>
              ) 
              : 
              (
                content.map((item) => (
                  <li key={item.id} className='content-item'>
                    <strong className='content-item-strong'>📝 {item.content}</strong>
                  </li>
                ))
              )
            }
          </ul>
        )
      }
    </div>
  );
};

// Export the ContentList component
export default ContentList;