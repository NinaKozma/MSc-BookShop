import React from 'react';
import { Helmet } from 'react-helmet'; //custom title for every page; kljucne reci; opis

export const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome To All Booked Up!',
  description: 'We offer best books for best prices!',
  keywords: 'books, buy books, best prices',
};

export default Meta;
