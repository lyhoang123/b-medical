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
// import { getOrdering, getOwners, mintNFT } from "utils/callContract";
import '../styles/Home.css';

const NFTList = ({ product }) => {
  console.log(product);
  return (
    <Link to={`/nft/${product.id.toString()}`}>
      <GridItem w="100%" bg="transparent" border="1px" borderRadius={'6px'} borderColor={'gray.400'} p={'14px'}>
        <VStack>
          <Center>
            <Box boxSize={'180px'}>
              <Image src={product.image} alt="image" />
            </Box>
          </Center>
          <Box>
            <Text color={'#1890ff'} mb={'8px'}>
              <b>{product.productName}</b>
            </Text>
            <Text color={'gray.500'} fontSize={'14px'}>
              <b>Model</b>: BS-360E
            </Text>
            <Text color={'gray.500'} fontSize={'14px'}>
              <b>HSX</b>: {product.manufacturer}
            </Text>
            <Text color={'gray.500'} fontSize={'14px'}>
              <b>Công ty</b>: {product.NameOfBusinessAnnouncingPrice}
            </Text>
            <Text color={'red.500'} fontSize={'24px'}>
              <b>Giá: {product.price}</b>
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

const Home = () => {
  const { library } = useActiveWeb3React();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    library && getProductsSoldMarketplace(library).then(setProducts).catch(console.error);
  }, [library]);

  return (
    <Box>
      {/* HEADER */}
      <HStack mb={'34px'}>
        <Box className="box__header">
          <Center>
            <Link to="/" cursor={'pointer'} onClick={() => console.log('Click')}>
              <p className="header__link">Trang chủ</p>
            </Link>

            <span className="header__space">/</span>
            <Link to="/register" cursor={'pointer'}>
              <p className="header__link">Đăng ký thành viên</p>
            </Link>

            <span className="header__space">/</span>
            <Link to="/product-field" cursor={'pointer'} onClick={() => console.log('Click')}>
              <p className="header__link">Cung cấp thông tin sản phẩm</p>
            </Link>

            <span className="header__space">/</span>
            <Link to="/:account" cursor={'pointer'} onClick={() => console.log('Click')}>
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
      <Box className="box__container">
        <Box className="box__container-header">
          <Box className="box__container-left">
            <BsFillMenuButtonWideFill className="box__icon" />
            <Text className="box__title">Các trang thiết bị y tế, thuốc hiện có</Text>
          </Box>
          <Box className="box__container-right">
            <Button className="box__button" leftIcon={<GiMedicalPack />}>
              Thiết bị y tế
            </Button>

            <Button className="box__button" leftIcon={<GiMedicines />}>
              Thuốc
            </Button>
            <Select
              id="province"
              className="input__field"
              size="sm"
              placeholder="Lọc Theo ..."
              width={'30%'}
              height="40px"
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Box>
        </Box>

        {/* {data.map((e) => {
          return (
            <NFTList
              productType={e.productType}
              productName={e.productName}
              price={e.price}
              manufacturer={e.manufacturer}
              NameOfBusinessAnnouncingPrice={e.NameOfBusinessAnnouncingPrice}
              quantity={e.quantity}
              productUrl={e.productUrl}
              getData={getData}
            />
          );
        })} */}

        <Grid bg="white" templateColumns="repeat(4, 1fr)" gap={6}>
          {products.map((p, idx) => (
            <NFTList key={idx} product={p} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
