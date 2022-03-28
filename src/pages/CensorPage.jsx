import { Box, Button, Text } from '@chakra-ui/react';
import React from 'react';
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineFileSearch,
} from 'react-icons/ai';
import '../styles/CensorPage.css';

CensorPage.propTypes = {};
const CensorList = () => {
  return (
    <Box id='Censor'>
      <Box className='Censor__box'>
        <Box className='Censor__info'>
          <Box className='Censor__detail'>
            <Text className='Censor__text'>
              <b>Tên thiết bị </b>
            </Text>
            <Text className='Censor__text2'>
              <span>:</span> Hệ thống số hóa X quang
            </Text>
          </Box>
          <Box className='Censor__detail'>
            <Text className='Censor__text'>
              <b>Model </b>
            </Text>
            <Text className='Censor__text2'>
              {' '}
              <p>
                {' '}
                <span>:</span> Classic CR System
              </p>
            </Text>
          </Box>
          <Box className='Censor__detail'>
            <Text className='Censor__text'>
              <b>Nhóm TTB </b>
            </Text>
            <Text className='Censor__text2'>
              {' '}
              <p>
                <span>:</span> Nhóm 6
              </p>
            </Text>
          </Box>
          <Box className='Censor__detail'>
            <Text className='Censor__text'>
              <b>Ngày sản xuất </b>
            </Text>
            <Text className='Censor__text2'>
              {' '}
              <p>
                <span>:</span> 12/1/2021
              </p>
            </Text>
          </Box>
          <Box className='Censor__detail'>
            <Text className='Censor__text'>
              <b>Ngày hết hạn </b>
            </Text>
            <Text className='Censor__text2'>
              {' '}
              <p>
                <span>:</span> 12/1/2023
              </p>
            </Text>
          </Box>

          <Box className='Censor__detail'>
            <Text className='Censor__text'>
              <b>Công ty</b>
            </Text>
            <Text className='Censor__text2'>
              <p>
                <span>:</span> Công ty TNHH sông Mê Kong
              </p>
            </Text>
          </Box>
          <Box className='Censor__detail'>
            <Text className='Censor__text'>
              <b>Giá sản phẩm </b>{' '}
            </Text>
            <Text className='Censor__text2'>
              <p>
                <span>:</span>
                1.200.000.000 <sup>VNĐ</sup>
              </p>
            </Text>
          </Box>
          <Box className='Censor__detail'>
            <Text className='Censor__text'>
              <b>Địa điểm </b>
            </Text>
            <Text className='Censor__text2'>
              <p>
                {' '}
                <span>:</span>
                Đà Nẵng
              </p>
            </Text>
          </Box>
          <Button
            className='Censor__btn'
            leftIcon={<AiOutlineFileSearch fontSize={'24px'} color='white' />}
          >
            Xem chi tiết
          </Button>
        </Box>
        <Box className='Censor__img'>
          <img src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
          <Box className='Censor__btn2'>
            <Button
              className='Censor__accept'
              leftIcon={
                <AiFillCheckCircle
                  color='white'
                  fontSize={'20px'}
                  fontWeight='700'
                  onClick={'console.log()'}
                />
              }
            >
              Đồng ý
            </Button>
            <Button
              className='Censor__refuse'
              leftIcon={
                <AiFillCloseCircle
                  color='white'
                  fontSize={'20px'}
                  fontWeight='700'
                />
              }
            >
              Từ chối
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

function CensorPage(props) {
  return (
    <Box bg={'#ccc'} w='100%' height='1400px'>
      <Box className='Censor__list'>
        <Box className='Censor__container'>
          <h1>Thông tin sản phẩm</h1>
        </Box>
        <CensorList />
        <CensorList />
        <CensorList />
        <CensorList />
      </Box>
    </Box>
  );
}

export default CensorPage;
