import { Box, Grid, Image, VStack, Text, Button, Center, GridItem } from '@chakra-ui/react';
import { BsCartCheck } from 'react-icons/bs';
import { AiOutlineCheck } from 'react-icons/ai';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import Owner from '../styles/Owner.css';
// import { getOwners } from "utils/callContract";
import '../styles/Home.css';

const NFTList = () => {
  return (
    <Box w="100%" mt={'12px'} bg="transparent" border="1px" borderRadius={'4px'} borderColor={'gray.400'} p={'14px'}>
      <Link to="/nft/1">
        <Box className="header__purchased">
          <Box className="company__purchased">
            <Text fontWeight={'600'}>Đơn vị bán</Text>
            <span>:</span>
            <Text>Công ty trách nhiệm hữu hạn A</Text>
          </Box>
          <Text className="product__status">
            <AiOutlineCheck />
            Đã mua
          </Text>
        </Box>
        <Box className="product__purchased">
          <Box boxSize={'148px'}>
            <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov"></Image>
          </Box>
          <Box marginLeft={'8px'} className="product__content">
            <Text className="product__name">Kit test nhanh Covid-19 qua mũi Humasis (1 cái)</Text>
            <Box className="product__type">
              <Text>Phân loại hàng</Text>
              <span>:</span>
              <Text>Thiết bị y tế</Text>
            </Box>
            <Box className="product__quantity">
              <Text>Số Lượng </Text>
              <span>:</span>
              <Text>2</Text>
            </Box>
          </Box>
          <Box className="product__price">
            <Text>150.000</Text>
          </Box>
        </Box>
        <Box className="product__footer">
          <Button>Mua lại</Button>
          <Button>
            <Link to="/nft/1">Chi tiết đơn hàng</Link>
          </Button>
        </Box>
      </Link>
    </Box>
  );
};

const property = [
  {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    imageAlt: 'Rear view of modern home with pool',
  },
  {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    imageAlt: 'Rear view of modern home with pool',
  },
  {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    imageAlt: 'Rear view of modern home with pool',
  },
  {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    imageAlt: 'Rear view of modern home with pool',
  },
  {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    imageAlt: 'Rear view of modern home with pool',
  },
  {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    imageAlt: 'Rear view of modern home with pool',
  },
];

const OwnerPage = () => {
  const { account } = useParams();
  const { library } = useActiveWeb3React();

  const [owners, setOwners] = useState([]);

  // useEffect(() => {
  //   (() => {
  //     if (!account || !library) return;
  //     getOwners(library, account).then(setOwners).catch(console.error);
  //   })();
  // }, [account, library]);

  return (
    <Box className="box__container" mt={'24px'}>
      <Box className="owner__content">
        <Box className="content-left">
          <Box className="content-left__icon">
            <BsCartCheck />
            <Text>Đơn Mua Đã Mua</Text>
          </Box>
        </Box>
        <Box className="content-right" bg="white">
          <Text>Danh Sách Những Đơn Hàng đã mua</Text>
          <NFTList />
          <NFTList />
          <NFTList />
          <NFTList />
          <NFTList />
          <NFTList />
          <NFTList />
          <NFTList />
        </Box>
      </Box>
    </Box>
  );
};

export default OwnerPage;
