import React from 'react';
import ChromeDinoGame from 'react-chrome-dino';

const NotFound = () => {
  return (
    <div className='text-center' style={{ marginTop: '50px' }}>
      <a href={'/'} className='btn btn-light' style={{ fontSize: '1rem' }}>
        Whoops! Seem like the page you are searching for doesn't exist.
        <br></br>
        Go to Home page?
      </a>
      <ChromeDinoGame />
      <h6 className='my-5'>... or press space to play a game :) </h6>
    </div>
  );
};

export default NotFound;
