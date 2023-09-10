import React from 'react';
import { SocialIcon } from 'react-social-icons';
import { Row, Col, Navbar } from 'react-bootstrap';

const Footer = () => {
  return (
    <Navbar
      style={{ background: 'RGB(171, 70, 70)' }}
      variant='dark'
      /*  bg='dark' variant='dark' */ expand='lg'
      collapseOnSelect
    >
      <footer style={{ margin: 'auto', height: '80px' }}>
        <Row>
          <SocialIcon
            bgColor='white'
            style={{ marginLeft: '1.5rem', marginRight: '1rem' }}
            url='https://twitter.com'
          />
          <SocialIcon
            bgColor='white'
            style={{ marginRight: '1rem' }}
            url='https://facebook.com'
          />
          <SocialIcon
            bgColor='white'
            style={{ marginRight: '1rem' }}
            url='https://instagram.com'
          />
          <SocialIcon
            bgColor='white'
            style={{ marginRight: '1rem' }}
            url='https://gmail.com'
          />
        </Row>
        <Row style={{ color: 'white' }}>
          <Col className='text-center py-3'>Copyright &copy; All Booked Up 2021</Col>
        </Row>
      </footer>
    </Navbar>
  );
};

export default Footer;
