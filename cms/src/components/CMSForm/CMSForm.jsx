// Importing necessary components and hooks from React
import React, { useState } from 'react';
// Importing axios for HTTP requests
import axios from 'axios'; 

// Importing styles
import './CMSForm.css';

// Define a functional component named CMSForm
const CMSForm = () => {

  // State to hold the content entered by the user
  const [content, setContent] = useState('');
  // State to manage loading state during API calls
  const [loading, setLoading] = useState(false); 
  // State for any potential error
  const [error, setError] = useState(''); 

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true); 
    setError('');
    try {
      await axios.post('https://backend-cs.kartikeynarayan.in/api/content', {
        content: content,
      });
      setContent('');
      alert('✅ Content added successfully!');
    } catch (error) {
      console.error('⚠️ Error adding content: ', error);
      setError('❌ Something went wrong, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // JSX for the component
  return (
    <div className='cms-form-container'>      
      {/* Display error message if there is an issue */}
      {error && <p className='cms-form-error'>{error}</p>}

      <form className='cms-form' onSubmit={handleSubmit}>
        {/* Input field for content */}
        <input
          type='text'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Enter content... 📄'
          required
          disabled={loading} // Disable input during loading
        />
        
        {/* Submit button */}
        <button type='submit' disabled={loading || !content}>
          {loading ? '⏳ Adding...' : 'Add Content ➕'}
        </button>
      </form>
    </div>
  );
};

// Export the CMSForm component
export default CMSForm;