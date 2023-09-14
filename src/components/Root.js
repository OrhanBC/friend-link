import React from 'react'
import { LOGIN } from '../lib/routes';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Root = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Conditionally navigate to LOGIN route here, if needed
    navigate(LOGIN);
  }); // The empty dependency array ensures this effect runs once
  return (
    <div>
      Public Root
    </div>
  )
}

export default Root
