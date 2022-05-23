import { CloseIcon, EmailIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React, { useEffect, useState } from 'react';
import { BsFillMenuButtonWideFill } from 'react-icons/bs';
import { FaInfoCircle } from 'react-icons/fa';
import { GiMedicalPack, GiMedicines, GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { getProductsSoldMarketplace } from 'utils/callContract';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';

// import { getOrdering, getOwners, mintNFT } from "utils/callContract";
import '../styles/Home.css';

function onShowSizeChange(current, pageSize) {
  console.log(current, pageSize);
}

var nf = new Intl.NumberFormat();

const NFTList = ({ product }) => {
  return (
    <Link to={`/nft/${product.id.toString()}`}>
      <GridItem
        w="100%"
        h="490px"
        bg="transparent"
        border="1px"
        borderRadius={'6px'}
        borderColor={'gray.400'}
        p={'14px'}
      >
        <VStack>
          <Center>
            <Box mh={'200px'}>
              <Image h={'180px'} src={product.image} alt="image" />
            </Box>
          </Center>
          <Box>
            <Text color={'#1890ff'} mb={'8px'} h={'40px'} fontSize={'16px'}>
              <b>
                {product.productType} : {product.productName}
              </b>
            </Text>
            <Box height={'105px'}>
              <Text color={'gray.500'} fontSize={'14px'}>
                <b>Số Lượng</b>: {product.quantity?.toString()}
              </Text>
              <Text color={'gray.500'} fontSize={'14px'}>
                <b>HSX</b>: {product.manufacturer}
              </Text>
              <Text color={'gray.500'} fontSize={'14px'}>
                <b>Công ty</b>: {product.NameOfBusinessAnnouncingPrice}
              </Text>
            </Box>
            <Text color={'red.500'} fontSize={'24px'}>
              <b>
                Giá:{product.price}
                <span></span>
                <sup>VNĐ</sup>
              </b>
            </Text>
            <Text color={'black'} fontSize={'14px'}>
              (Giá đã bao gồm VAT)
            </Text>
            <Button
              border="1px"
              borderColor={'9dc2ff'}
              colorScheme="teal"
              leftIcon={<FaInfoCircle />}
              variant="solid"
              fontSize={'14px'}
              display={'block'}
              mt="8px"
            >
              Thông tin chi tiết
            </Button>
          </Box>
        </VStack>
      </GridItem>
    </Link>
  );
};

const limit = 8;

const Home = () => {
  const { library, account } = useActiveWeb3React();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const [currentPage, setCurrentPage] = useState([]);

  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    library &&
      getProductsSoldMarketplace(library)
        .then((value) => {
          if (filterType !== 'all') {
            const newArr = value.filter((element) => element.productType === filterType);
            setProducts(newArr);
          } else setProducts(value);
        })
        .catch(console.error);
  }, [library, filterType]);

  useEffect(() => {
    if (products.length > 0) {
      const start = Number(limit) * (page - 1);
      const end = start + Number(limit);
      setCurrentPage(products.slice(start, end));
    }
  }, [products, page]);
  // console.log('currentPage', currentPage);
  console.log(products);

  return (
    <Box>
      {/* HEADER */}
      <HStack mb={'34px'} w={'100%'}>
        <Box className="box__header">
          <Center>
            <Link to="/" cursor={'pointer'}>
              <p className="header__link">Trang chủ</p>
            </Link>

            <span className="header__space">/</span>
            <Link to="/register" cursor={'pointer'}>
              <p className="header__link">Đăng ký thành viên</p>
            </Link>

            <span className="header__space">/</span>
            <Link to="/product-field" cursor={'pointer'}>
              <p className="header__link">Cung cấp thông tin sản phẩm</p>
            </Link>

            <span className="header__space">/</span>
            <Link to={`/${account}`} cursor={'pointer'}>
              <p className="header__link">Sản phẩm đã mua</p>
            </Link>
          </Center>

          <Center bgColor={'white'} borderRadius={'5px'}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
              <Input
                type="tel"
                color={'black'}
                height={'40px'}
                _placeholder={{ color: 'gray.200' }}
                placeholder="Tìm kiếm"
              />
              <InputRightElement children={<CloseIcon color="gray.300" />} />
            </InputGroup>
          </Center>
          <Box>
            <Button className="header__looking" colorScheme="teal" variant="solid">
              Tìm kiếm nâng cao
            </Button>
          </Box>
        </Box>
      </HStack>
      {/* BOX CHUNG */}
      <Box className="box__container-1">
        <Box className="box__container-header">
          <Box className="box__container-left">
            <BsFillMenuButtonWideFill className="box__icon" />
            <Text className="box__title">Các trang thiết bị y tế, thuốc hiện có</Text>
          </Box>
          <Box className="box__container-right">
            <Button className="box__button" leftIcon={<GiMedicalPack />} onClick={() => setFilterType('Thiết bị y tế')}>
              Thiết bị y tế
            </Button>

            <Button className="box__button" leftIcon={<GiMedicines />} onClick={() => setFilterType('Thuốc')}>
              Thuốc
            </Button>

            <Button className="box__button" leftIcon={<GiMedicines />} onClick={() => setFilterType('all')}>
              Tất cả
            </Button>
          </Box>
        </Box>

        {/* <Grid bg="white" templateColumns="repeat(4, 1fr)" gap={6}>
          {products.map((p, idx) => (
            <NFTList key={idx} product={p} />
          ))}
        </Grid> */}

        <Grid bg="white" templateColumns="repeat(4, 1fr)" gap={6}>
          {currentPage.map((p, idx) => (
            <NFTList key={idx} product={p} />
          ))}
        </Grid>
        <Pagination
          color="primary"
          showSizeChanger
          onChange={(e) => setPage(e)}
          total={products.length}
          pageSize={limit}
          current={page}
          onShowSizeChange={onShowSizeChange}
          style={{ margin: '12px ', justifyContent: 'center', display: 'flex' }}
        />
      </Box>
    </Box>
  );
};

export default Home;
