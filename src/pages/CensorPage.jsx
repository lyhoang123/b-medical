import { Box, Button, Image, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineFileSearch } from 'react-icons/ai';
import '../styles/CensorPage.css';
import axios from 'axios';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import { approveOrRejectProduct, getProductsPending } from 'utils/callContract';

CensorPage.propTypes = {};

const CensorList = (props) => {
  const { account, library } = useActiveWeb3React();
  const toast = useToast();

  const [reviewing, setReviewing] = useState(false);

  const handleApproveOrRejectProduct = async (approve = true) => {
    try {
      setReviewing(true);
      await approveOrRejectProduct(library, account, props.id, approve);
      props.setRefresh((pre) => !pre);
      setReviewing(false);
      toast({
        position: 'top-right',
        title: 'Review Product Successfully !!!.',
        description: 'Product will be approved/rejected. ',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      setReviewing(false);

      if (error.data?.message) {
        const errMessage = error.data?.message?.toString().replace('execution reverted: ', '');
        errMessage &&
          toast({
            position: 'top-right',
            title: errMessage,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
      }
    }
  };

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date) {
    return [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('/');
  }

  return (
    <Box id="Censor">
      <Box className="Censor__box">
        <Box className="Censor__info">
          <Box className="Censor__row" w={'25%'} m={'0px 12px'}>
            <Box className="Censor__detail">
              <Text className="Censor__text">
                <b>Tên sản phẩm: </b>
              </Text>
              <Text className="Censor__text2">{props.productName}</Text>
            </Box>
            <Box className="Censor__detail">
              <Text className="Censor__text">
                <b>Ngày sản xuất: </b>
              </Text>
              <Text className="Censor__text2">{formatDate(new Date(props.dateOfManufacture))}</Text>
            </Box>
            <Box className="Censor__detail">
              <Text className="Censor__text">
                <b>Ngày hết hạn: </b>
              </Text>
              <Text className="Censor__text2">{formatDate(new Date(props.expirationDate))}</Text>
            </Box>
            <Box className="Censor__detail">
              <Text className="Censor__text">
                <b>Đơn vị tính: </b>
              </Text>
              <Text className="Censor__text2">{props.unit}</Text>
            </Box>
          </Box>

          <Box className="Censor__row" w={'20%'} m={'0px 12px'}>
            <Box className="Censor__detail">
              <Text className="Censor__text">
                <b>Loại: </b>
              </Text>
              <Text className="Censor__text2">{props.productType}</Text>
            </Box>
            <Box className="Censor__detail">
              <Text className="Censor__text">
                <b>Giá: </b>{' '}
              </Text>
              <Text className="Censor__text2">
                {props.price}
                <sup>VNĐ</sup>
              </Text>
            </Box>
            <Box className="Censor__detail">
              <Text className="Censor__text">
                <b>Số lượng: </b>
              </Text>
              <Text className="Censor__text2">{props.quantity}</Text>
            </Box>
            <Box className="Censor__detail">
              <Text className="Censor__text">
                <b>Nước sản xuất: </b>
              </Text>
              <Text className="Censor__text2">{props.countryOfManufacture}</Text>
            </Box>
          </Box>

          <Box className="Censor__row" w={'55%'}>
            <Box className="Censor__detail">
              <Text className="Censor__text">
                <b>Công ty sản xuất: </b>
              </Text>
              <Text className="Censor__text2">{props.manufacturer}</Text>
            </Box>
            <Box className="Censor__detail">
              <Text className="Censor__text">
                <b>Tên doanh nghiệp: </b>
              </Text>
              <Text className="Censor__text2">{props.NameOfBusinessAnnouncingPrice}</Text>
            </Box>
            <Box className="Censor__detail">
              <Text className="Censor__text">
                <b>Số Điện Thoại: </b>
              </Text>
              <Text className="Censor__text2">{props.contactPhoneNumber}</Text>
            </Box>
            <Box className="Censor__detail">
              <Text className="Censor__text">
                <b>Địa chỉ doanh nghiệp: </b>
              </Text>
              <Text className="Censor__text2">{props.businessAddress}</Text>
            </Box>
          </Box>
        </Box>
        <Box className="Censor__img">
          <Image src={props.image} />
          <Box className="Censor__btn2">
            <Button
              className="Censor__accept"
              leftIcon={<AiFillCheckCircle color="white" fontSize={'20px'} fontWeight="700" />}
              onClick={() => handleApproveOrRejectProduct(true)}
              isLoading={reviewing}
            >
              Đồng ý
            </Button>
            <Button
              className="Censor__refuse"
              leftIcon={<AiFillCloseCircle color="white" fontSize={'20px'} fontWeight="700" />}
              onClick={() => handleApproveOrRejectProduct(false)}
              isLoading={reviewing}
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
  const { library } = useActiveWeb3React();

  const [pendingProducts, setPendingProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  console.log(pendingProducts);

  useEffect(() => {
    library && getProductsPending(library).then(setPendingProducts).catch(console.error);
  }, [library, refresh]);

  return (
    <Box w="100%">
      <Box className="Censor__list">
        <Box className="Censor__container">
          <h1>Thông tin sản phẩm</h1>
        </Box>
        {pendingProducts.map((e, idx) => {
          return (
            <CensorList
              key={idx}
              setRefresh={setRefresh}
              id={e.id}
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
              image={e.image}
              generalInfo={e.generalInfo}
              userManual={e.userManual}
              // getData={getData}
            />
          );
        })}
      </Box>
    </Box>
  );
}

export default CensorPage;
