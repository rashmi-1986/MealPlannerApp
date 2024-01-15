import React, { useState } from 'react';
import api from '../../services/api';


const VerificationForm = () => {
  const [authToken, setAuthToken] = useState('');


  const handleVerify = async () => {
    try {
      const response = await api.post('/auth/verify-registration', { authToken });
      console.log(response.data);
      // Handle success (e.g., show a success message, redirect to login page)
    } catch (error) {
      console.error(error.response.data);
      // Handle error (e.g., show an error message)
    }
  };


  // Your verification form JSX
};


export default VerificationForm;