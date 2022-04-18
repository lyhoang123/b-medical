import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Link, Text } from '@chakra-ui/react';
import '../styles/NotFound.css';

NotFound.propTypes = {};

function NotFound(props) {
  return (
    <Box className="notfound">
      <Box className="notfound-404">
        <h3>OOPS ! PAGE NOT FOUND !!!</h3>
        <h1>
          <Text>4</Text>
          <Text>0</Text>
          <Text>4</Text>
        </h1>
        <h4>we are sorry, but the page you request was not found</h4>
        <Button className="btn-home">
          <Link to="/">Trang Chủ</Link>
        </Button>
      </Box>
    </Box>
  );
}

export default NotFound;
