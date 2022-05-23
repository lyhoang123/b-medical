import { Box, Button, Image, Stack, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import '../styles/CensorPage.css';
import axios from 'axios';

import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import { approveOrRejectProduct, getProductsPending } from 'utils/callContract';
import withRole from 'hocs/withRole';
import { ROLES } from 'configs';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';

function onShowSizeChange(current, pageSize) {
  console.log(current, pageSize);
}

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
        title: 'Sản phẩm đã được xem xét bởi Người kiểm duyệt !!!.',
        description: 'Vui lòng đợi những Người kiểm duyệt khác !!!. ',
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

const SkeletonCustom = () => {
  return (
    <Stack
      flexDirection={'row'}
      marginLeft={'12px'}
      justifyContent={'space-between'}
      padding={'12px'}
      border={'1px solid #ccc'}
    >
      <Stack w={'78%'}>
        <SkeletonTheme color="#202020" highlightColor="#26a0da">
          <Skeleton count={5} height={'30px'} />
        </SkeletonTheme>
      </Stack>

      <Stack w={'22%'} alignItems={'center'} justifyContent={'center'}>
        <SkeletonTheme color="#202020" highlightColor="#26a0da">
          <Skeleton height="100px" width={'180px'} />
        </SkeletonTheme>

        <SkeletonTheme color="#202020" highlightColor="#26a0da">
          <Stack className="skeleton">
            <Skeleton count={2} height="40px" width={'80px'} borderRadius={'20px'} />
          </Stack>
        </SkeletonTheme>
      </Stack>
    </Stack>
  );
};

const limit = 5;

function CensorPage(props) {
  const { library } = useActiveWeb3React();

  const [pendingProducts, setPendingProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  console.log(pendingProducts);

  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState([]);

  const getData = async (e) => {
    await getProductsPending(library).then(setPendingProducts).catch(console.error);
    setIsLoading(false);
  };

  useEffect(() => {
    library && getData();
  }, [library, refresh]);

  useEffect(() => {
    if (pendingProducts.length > 0) {
      const start = Number(limit) * (page - 1);
      const end = start + Number(limit);
      setCurrentPage(pendingProducts.slice(start, end));
    }
  }, [pendingProducts, page]);

  return (
    <Box w="100%">
      <Box className="Censor__list">
        <Box className="Censor__container">
          <Text pt={'6px'}>Thông Tin Sản Phẩm Cần Phê Duyệt</Text>
        </Box>

        {isLoading ? (
          <SkeletonCustom />
        ) : (
          <Box>
            {currentPage.map((e, idx) => {
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
            <Pagination
              color="primary"
              showSizeChanger
              onChange={(e) => setPage(e)}
              total={pendingProducts.length}
              pageSize={limit}
              current={page}
              onShowSizeChange={onShowSizeChange}
              style={{ margin: '12px ', justifyContent: 'center', display: 'flex', paddingBottom: '12px' }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default withRole(CensorPage, [ROLES.CENSOR]);
