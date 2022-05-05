import { Box, Grid, Image, VStack, Text, Button, Center, GridItem, Stack } from '@chakra-ui/react';
import { BsCartCheck, BsFillCartPlusFill } from 'react-icons/bs';
import { AiOutlineCheck } from 'react-icons/ai';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

// import { getOwners } from "utils/callContract";

import '../styles/Owner.css';
import { getHistories } from 'utils/callContract';
import CartEmpty from '../assets/images/cart-empty.png';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';

function onShowSizeChange(current, pageSize) {
  console.log(current, pageSize);
}

const NFTList = ({ owner }) => {
  const { account } = useActiveWeb3React();

  var nf = new Intl.NumberFormat();

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
            <Text color={'red.500'} fontSize={'18px'}>
              Giá : {nf.format(Number(owner.product.price) * Number(owner.quantity))}
              <sup>VNĐ</sup>
            </Text>
          </Box>
        </Box>

        <Box className="product__footer">
          <Button leftIcon={<BsFillCartPlusFill />} className="btnRe-Buy">
            Mua lại
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

const EmptyCart = () => {
  return (
    <Box margin={'0 auto'} display="grid" justifyItems={'center'}>
      <Image src={CartEmpty} alt="image" padding={'36px 24px 0 24px'} w="360px" />
      <Text fontSize={'28px'} fontWeight={600}>
        Giỏ Rỗng
      </Text>
      <Text fontSize={'16px'} fontWeight={600} marginBottom="24px">
        Bạn Chưa Có Đơn Hàng Nào Từng Mua ở Địa Chỉ Ví Này
      </Text>
    </Box>
  );
};

const limit = 3;

const OwnerPage = () => {
  const { account } = useParams();
  const { library } = useActiveWeb3React();

  const [owners, setOwners] = useState([]);

  const [page, setPage] = useState(1);

  const [currentPage, setCurrentPage] = useState([]);

  useEffect(() => {
    (() => {
      if (!account || !library) return;
      getHistories(library, account).then(setOwners).catch(console.error);
    })();
  }, [account, library]);

  useEffect(() => {
    if (owners.length > 0) {
      const start = Number(limit) * (page - 1);
      const end = start + Number(limit);
      setCurrentPage(owners.slice(start, end));
    }
  }, [owners, page]);

  return (
    <Box className="box__container" mt={'24px'}>
      <Box className="owner__content">
        <Box className="content-left">
          <Box className="content-left__icon">
            <BsCartCheck />
            <Text>Đơn Hàng Đã Mua</Text>
          </Box>
        </Box>
        <Box className="content-right" bg="white" pt={'12px'}>
          <Text paddingBottom={'12px'} fontWeight={600} borderBottom={'1px solid #ccc'}>
            Danh Sách Những Đơn Hàng Đã Mua
          </Text>
          {/* <Box>
            {owners.map((owner, idx) => (
              <NFTList key={idx} owner={owner} />
            ))}
          </Box> */}

          {owners.length !== 0 ? (
            <Box>
              {currentPage.map((owner, idx) => (
                <NFTList key={idx} owner={owner} />
              ))}
              <Pagination
                color="primary"
                showSizeChanger
                onChange={(e) => setPage(e)}
                total={owners.length}
                pageSize={limit}
                current={page}
                onShowSizeChange={onShowSizeChange}
                style={{ margin: '12px ', justifyContent: 'center', display: 'flex' }}
              />
            </Box>
          ) : (
            <EmptyCart />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default OwnerPage;
