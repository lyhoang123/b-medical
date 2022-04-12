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
// import { getOrdering, getOwners, mintNFT } from "utils/callContract";
import '../styles/Home.css';

const Home = () => {
  const { account, library } = useActiveWeb3React();

  const [nft, setNFT] = useState();
  const [minting, setMinting] = useState(false);
  const [nftOrdering, setNftOrdering] = useState([]);
  const [owners, setOwners] = useState([]);

  // useEffect(() => {
  //   (() => {
  //     if (!account || !library) return;
  //     getOwners(library, account).then(setOwners).catch(console.error);
  //   })();
  // }, [account, library]);
  // useEffect(() => {
  //   if (!library) return;
  //   getOrdering(library)
  //     .then((res) => res && setNftOrdering(res))
  //     .catch(console.error);
  //   console.log(nftOrdering);
  // }, [library]);

  // const handleMintNFT = async () => {
  //   if (!account || !library) return alert("please connect wallet");
  //   //connect the wallet is require
  //   if (!nft) return alert("please choose a nft image");
  //   try {
  //     setMinting(true);
  //     await mintNFT(library, account, nft);
  //     alert("mint success");
  //     setMinting(false);
  //   } catch (error) {
  //     console.log(error);
  //     setMinting(false);
  //     if (error.data?.message) {
  //       alert(error.data.message);
  //     }
  //   }
  // };

  const NFTList = () => {
    return (
      <Link to="/nft/1">
        <GridItem w="100%" bg="transparent" border="1px" borderRadius={'6px'} borderColor={'gray.400'} p={'14px'}>
          <VStack>
            <Center>
              <Box boxSize={'180px'}>
                <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
              </Box>
            </Center>
            <Box>
              <Text color={'#1890ff'} mb={'8px'}>
                <b>Máy xét nghiệm sinh hóa tự động - BS-360E</b>
              </Text>
              <Text color={'gray.500'} fontSize={'14px'}>
                <b>Model</b>: BS-360E
              </Text>
              <Text color={'gray.500'} fontSize={'14px'}>
                <b>HSX</b>: Shenzhen Mindray Bio-Medical Electronics Co., Ltd.
              </Text>
              <Text color={'gray.500'} fontSize={'14px'}>
                <b>Công ty</b>: Công ty TNHH Vạn Niên
              </Text>
              <Text color={'red.500'} fontSize={'24px'}>
                <b>
                  530.000.000<sup>VND</sup>
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

  const MedicinePopular = () => {
    return (
      <Link to="/nft/1">
        <GridItem w="100%" bg="transparent" border="1px" borderRadius={'6px'} borderColor={'gray.400'} p={'14px'}>
          <VStack>
            <Center>
              <Box>
                <Image
                  src="https://nhathuocngocanh.com/wp-content/uploads/2018/04/paracetamol-e1523184921509.jpg"
                  alt="Paracetamol"
                />
              </Box>
            </Center>
            <Box>
              <Text color={'#1890ff'} mb={'8px'}>
                <b>Thuốc Paracetamol</b>
              </Text>
            </Box>
          </VStack>
        </GridItem>
      </Link>
    );
  };

  const EquipmentPopular = () => {
    return (
      <Link to="/nft/1">
        <GridItem w="100%" bg="transparent" border="1px" borderRadius={'6px'} borderColor={'gray.400'} p={'14px'}>
          <VStack>
            <Center>
              <Box>
                <Image
                  src="https://vuhoangtelecom.vn/wp-content/uploads/2021/12/kit-test-nhanh-covid-19-qua-mui-humasis-5.jpg"
                  alt="Que Test Nhanh"
                />
              </Box>
            </Center>
            <Box>
              <Text color={'#1890ff'} mb={'8px'}>
                <b>Kit test nhanh Covid-19 qua mũi Humasis (1 cái)</b>
              </Text>
            </Box>
          </VStack>
        </GridItem>
      </Link>
    );
  };
  // HOME- content

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

      {/* THUOC  */}
      <Box mb={'34px'}>
        <Box className="box__medicine">
          <Box className="box__medicine-header">
            <Box className="box__medicine-left">
              <GiHamburgerMenu color="#382e87" fontSize={'26px'} />
              <Text>Thuốc ( Có thể bạn đang tìm ) </Text>
            </Box>
            <Box className="box__medicine-right">
              <Link>Xem tất cả</Link>
            </Box>
          </Box>
          <Box className="box__medicine-content">
            <MedicinePopular />
            <MedicinePopular />
            <MedicinePopular />
            <MedicinePopular />
            <MedicinePopular />
          </Box>
        </Box>
      </Box>

      {/* BOX THIET BI */}
      <Box mb={'34px'}>
        <Box className="box__medicine">
          <Box className="box__medicine-header">
            <Box className="box__medicine-left">
              <GiHamburgerMenu color="#382e87" fontSize={'26px'} />
              <Text>Thiết bị y tế ( Có thể bạn đang tìm ) </Text>
            </Box>
            <Box className="box__medicine-right">
              <Link>Xem tất cả</Link>
            </Box>
          </Box>
          <Box className="box__medicine-content">
            <EquipmentPopular />
            <EquipmentPopular />
            <EquipmentPopular />
            <EquipmentPopular />
            <EquipmentPopular />
          </Box>
        </Box>
      </Box>

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
        <Grid bg="white" templateColumns="repeat(4, 1fr)" gap={6}>
          <NFTList />
          <NFTList />
          <NFTList />
          <NFTList />
          <NFTList />
          <NFTList />
          <NFTList />
          <NFTList />
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
