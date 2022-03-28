import { Box, Button, Text } from '@chakra-ui/react';
import React from 'react';
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineFileSearch,
} from 'react-icons/ai';
import '../styles/SensorPage.css';

SensorPage.propTypes = {};
const SensorList = () => {
  return (
    <Box id='sensor'>
      <Box className='sensor__box'>
        <Box className='sensor__info'>
          <Box className='sensor__detail'>
            <Text className='sensor__text'>
              <b>Tên thiết bị </b>
            </Text>
            <Text className='sensor__text2'>
              {' '}
              <span>:</span> Hệ thống số hóa X quang
            </Text>
          </Box>
          <Box className='sensor__detail'>
            <Text className='sensor__text'>
              <b>Model </b>
            </Text>
            <Text className='sensor__text2'>
              {' '}
              <p>
                {' '}
                <span>:</span> Classic CR System
              </p>
            </Text>
          </Box>
          <Box className='sensor__detail'>
            <Text className='sensor__text'>
              <b>Nhóm TTB </b>
            </Text>
            <Text className='sensor__text2'>
              {' '}
              <p>
                <span>:</span> Nhóm 6
              </p>
            </Text>
          </Box>
          <Box className='sensor__detail'>
            <Text className='sensor__text'>
              <b>Ngày sản xuất </b>
            </Text>
            <Text className='sensor__text2'>
              {' '}
              <p>
                <span>:</span> 12/1/2021
              </p>
            </Text>
          </Box>
          <Box className='sensor__detail'>
            <Text className='sensor__text'>
              <b>Ngày hết hạn </b>
            </Text>
            <Text className='sensor__text2'>
              {' '}
              <p>
                <span>:</span> 12/1/2023
              </p>
            </Text>
          </Box>

          <Box className='sensor__detail'>
            <Text className='sensor__text'>
              <b>Công ty</b>
            </Text>
            <Text className='sensor__text2'>
              <p>
                <span>:</span> Công ty TNHH sông Mê Kong
              </p>
            </Text>
          </Box>
          <Box className='sensor__detail'>
            <Text className='sensor__text'>
              <b>Giá sản phẩm </b>{' '}
            </Text>
            <Text className='sensor__text2'>
              <p>
                <span>:</span>
                1.200.000.000 <sup>VNĐ</sup>
              </p>
            </Text>
          </Box>
          <Box className='sensor__detail'>
            <Text className='sensor__text'>
              <b>Địa điểm </b>
            </Text>
            <Text className='sensor__text2'>
              <p>
                {' '}
                <span>:</span>
                Đà Nẵng
              </p>
            </Text>
          </Box>
          <Button
            className='sensor__btn'
            leftIcon={<AiOutlineFileSearch fontSize={'24px'} color='white' />}
          >
            Xem chi tiết
          </Button>
        </Box>
        <Box className='sensor__img'>
          <img src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
          <Box className='sensor__btn2'>
            <Button
              className='sensor__accept'
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
              className='sensor__refuse'
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

function SensorPage(props) {
  return (
    <Box bg={'#ccc'} w='100%' height='1400px'>
      <Box className='sensor__list'>
        <Box className='sensor__container'>
          <h1>Thông tin sản phẩm</h1>
        </Box>
        <SensorList />
        <SensorList />
        <SensorList />
        <SensorList />
      </Box>
    </Box>
  );
}

export default SensorPage;
