import { Box, Button, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineFileSearch } from 'react-icons/ai';
import '../styles/CensorPage.css';
import axios from 'axios';

CensorPage.propTypes = {};

const CensorList = (props) => {
  const handleApprovedClick = async () => {
    let result = await fetch(`http://localhost:8000/product/${props.id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    result = await result.json();
    if (result) {
      console.log(result);
    }
  };

  const handleCancelClick = async () => {
    let result = await fetch('', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    result = await result.json();
    if (result) {
      alert('Delete Successfully ');
      props.getData();
    }
  };

  return (
    <Box id="Censor">
      <Box className="Censor__box">
        <Box className="Censor__info">
          <Box className="Censor__detail">
            <Text className="Censor__text">
              <b>Tên sản phẩm : </b>
            </Text>
            <Text className="Censor__text2">{props.productName}</Text>
          </Box>
          <Box className="Censor__detail">
            <Text className="Censor__text">
              <b>Loại : </b>
            </Text>
            <Text className="Censor__text2">{props.productType}</Text>
          </Box>
          <Box className="Censor__detail">
            <Text className="Censor__text">
              <b>Đơn vị tính : </b>
            </Text>
            <Text className="Censor__text2">{props.unit}</Text>
          </Box>
          <Box className="Censor__detail">
            <Text className="Censor__text">
              <b>Ngày sản xuất : </b>
            </Text>
            {/* <Text className="Censor__text2">{props.dateOfManufacture}</Text> */}
          </Box>
          <Box className="Censor__detail">
            <Text className="Censor__text">
              <b>Ngày hết hạn : </b>
            </Text>
            {/* <Text className="Censor__text2">{props.expirationDate}</Text> */}
          </Box>

          <Box className="Censor__detail">
            <Text className="Censor__text">
              <b>Công ty sản xuất : </b>
            </Text>
            <Text className="Censor__text2">{props.manufacturer}</Text>
          </Box>
          <Box className="Censor__detail">
            <Text className="Censor__text">
              <b>Giá : </b>{' '}
            </Text>
            <Text className="Censor__text2">
              {props.price}
              <sup>VNĐ</sup>
            </Text>
          </Box>
          <Box className="Censor__detail">
            <Text className="Censor__text">
              <b>Nước sản xuất : </b>
            </Text>
            <Text className="Censor__text2">{props.countryOfManufacture}</Text>
          </Box>
          <Box className="Censor__detail">
            <Text className="Censor__text">
              <b>Tên doanh nghiệp : </b>
            </Text>
            <Text className="Censor__text2">{props.NameOfBusinessAnnouncingPrice}</Text>
          </Box>
          <Box className="Censor__detail">
            <Text className="Censor__text">
              <b>Địa chỉ doanh nghiệp : </b>
            </Text>
            <Text className="Censor__text2">{props.businessAddress}</Text>
          </Box>
          <Box className="Censor__detail">
            <Text className="Censor__text">
              <b>Số Điện Thoại : </b>
            </Text>
            <Text className="Censor__text2">{props.contactPhoneNumber}</Text>
          </Box>
          <Box className="Censor__detail">
            <Text className="Censor__text">
              <b>Số lượng : </b>
            </Text>
            <Text className="Censor__text2">{props.quantity}</Text>
          </Box>
        </Box>
        <Box className="Censor__img">
          <Image src={props.productUrl} />
          <Box className="Censor__btn2">
            <Button
              className="Censor__accept"
              leftIcon={<AiFillCheckCircle color="white" fontSize={'20px'} fontWeight="700" />}
              onClick={handleApprovedClick}
            >
              Đồng ý
            </Button>
            <Button
              className="Censor__refuse"
              leftIcon={<AiFillCloseCircle color="white" fontSize={'20px'} fontWeight="700" />}
              onClick={handleCancelClick}
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
  const [data, setData] = useState([
    {
      productType: '',
      productName: '',
      unit: '',
      price: '',
      manufacturer: '',
      countryOfManufacture: '',
      yearOfManufacture: '',
      dateOfManufacture: '',
      expirationDate: '',
      NameOfBusinessAnnouncingPrice: '',
      contactPhoneNumber: '',
      businessAddress: '',
      quantity: '',
      productUrl: '',
      generalInfo: '',
      userManual: '',
    },
  ]);

  const getData = async (e) => {
    let result = await fetch('http://localhost:8000/product/getproduct/getall', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    result = await result.json();
    setData(result.product);
    console.log(result);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Box w="100%">
      <Box className="Censor__list">
        <Box className="Censor__container">
          <h1>Thông tin sản phẩm</h1>
        </Box>
        {data.map((e) => {
          return (
            <CensorList
              id={e._id}
              productType={e.productType}
              productName={e.productName}
              unit={e.unit}
              price={e.price}
              manufacturer={e.manufacturer}
              countryOfManufacture={e.countryOfManufacture}
              yearOfManufacture={e.yearOfManufacture}
              dateOfManufacture={e.dateOfManufacture}
              expirationDate={e.expirationDate}
              NameOfBusinessAnnouncingPrice={e.NameOfBusinessAnnouncingPrice}
              contactPhoneNumber={e.contactPhoneNumber}
              businessAddress={e.businessAddress}
              quantity={e.quantity}
              productUrl={e.productUrl}
              generalInfo={e.generalInfo}
              userManual={e.userManual}
              getData={getData}
            />
          );
        })}
      </Box>
    </Box>
  );
}

export default CensorPage;
