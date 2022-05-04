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
import { getHistories } from 'utils/callContract';

const NFTList = ({ owner }) => {
  const { account } = useActiveWeb3React();

  return (
    <Box w="100%" mt={'12px'} bg="transparent" border="1px" borderRadius={'4px'} borderColor={'gray.400'} p={'14px'}>
      <Link to={`/nft/${owner.product.id.toString()}`}>
        <Box className="header__purchased">
          <Box className="company__purchased">
            <Text fontWeight={'600'}>Đơn vị bán</Text>
            <span>:</span>
            <Text>{owner.product?.NameOfBusinessAnnouncingPrice}</Text>
          </Box>
          <Text className="product__status">
            <AiOutlineCheck />
            {owner.oldOwner === '0x0000000000000000000000000000000000000000'
              ? 'Đã list'
              : owner.newOwner?.toString() === account.toString()
              ? 'Đã mua'
              : 'N/A'}
          </Text>
        </Box>
        <Box className="product__purchased">
          <Box boxSize={'148px'}>
            <Image src={owner.product?.image} alt="Dan Abramov"></Image>
          </Box>
          <Box marginLeft={'8px'} className="product__content">
            <Text className="product__name">{owner.product.productName}</Text>
            <Box className="product__type">
              <Text>Phân loại hàng</Text>
              <span>:</span>
              <Text>{owner.product?.productType}</Text>
            </Box>
            <Box className="product__quantity">
              <Text>Số Lượng </Text>
              <span>:</span>
              <Text>{owner.quantity}</Text>
            </Box>
            <Box className="product__quantity">
              <Text width={'60px'}>Thông Tin Chung </Text>
              <span>:</span>
              <Text>{owner.product.generalInfo}</Text>
            </Box>
          </Box>

          <Box className="product__price">
            <Text>{`owner.product.price * owner.quantity`}</Text>
          </Box>
        </Box>

        <Box className="product__footer">
          <Button>Mua lại</Button>
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

  console.log(owners);

  useEffect(() => {
    (() => {
      if (!account || !library) return;
      getHistories(library, account).then(setOwners).catch(console.error);
    })();
  }, [account, library]);

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
          {owners.map((owner, idx) => (
            <NFTList key={idx} owner={owner} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default OwnerPage;
