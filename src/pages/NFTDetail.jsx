import { EmailIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  HStack,
  Image,
  Link,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaInfoCircle, FaMoneyBillAlt } from 'react-icons/fa';
import { BsCartPlusFill, BsCalendarPlusFill } from 'react-icons/bs';
import '../styles/Home.css';
import { getProductDetail } from 'utils/callContract';

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

const NFTDetail = () => {
  const { nftId } = useParams();
  const { account, library } = useActiveWeb3React();

  const [product, setProduct] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [price, setPrice] = useState('');

  useEffect(() => {
    (() => {
      library &&
        getProductDetail(library, nftId)
          .then((res) => res && setProduct(res))
          .catch(console.log);
    })();
  }, [library, nftId]);

  // const handleOrderNFT = async () => {
  //   if (!library || !account) return alert("please connect wallet");
  //   if (!price || isNaN(price)) return alert("enter sell price");
  //   try {
  //     setSubmitting(true);
  //     await orderNFT(library, account, nftId, price);
  //     alert("order success");
  //     setSubmitting(false);
  //   } catch (error) {
  //     console.error(error);
  //     if (error.data?.message) {
  //       alert(error.data.message);
  //     }
  //     setSubmitting(false);
  //   }
  // };

  // const handleCancelOrderNFT = async () => {
  //   if (!library || !account) return alert("please connect wallet");
  //   try {
  //     setSubmitting(true);
  //     await cancelOrderNFT(library, account, nftId);
  //     alert("cancel order success");
  //     setSubmitting(false);
  //   } catch (error) {
  //     console.error(error);
  //     if (error.data?.message) {
  //       alert(error.data.message);
  //     }
  //     setSubmitting(false);
  //   }
  // };

  // const handleBuyOrderNFT = async (price) => {
  //   if (!library || !account) return alert("please connect wallet");
  //   if (!price) return;
  //   try {
  //     setSubmitting(true);
  //     await buyOrderNFT(library, account, nftId, price);
  //     alert("buy success");
  //     setSubmitting(false);
  //   } catch (error) {
  //     console.error(error);
  //     if (error.data?.message) {
  //       alert(error.data.message);
  //     }
  //     setSubmitting(false);
  //   }
  // };

  return (
    <Box>
      {product && (
        <Box className="box__container" gap={2}>
          <Grid borderRadius={'10px'} templateColumns={'repeat(5,3fr)'} gap={2} p={'15px'}>
            <Box w={'390px'} h={'265px'} border="1px solid #26a9e0" borderRadius={'10px'} marginRight="12px">
              <Image src={product.image} alt="" w={'410px'} h={'265px'} objectFit="fill" p={6} />
            </Box>
            <GridItem colSpan={4}>
              <Box fontSize={'38px'} fontWeight={400} color={'black'}>
                <Text>{product.productName}</Text>
              </Box>
              <Box
                border="1px"
                borderRadius={'10px'}
                borderColor={'gray.500'}
                h="51px"
                w="256px"
                display={'flex'}
                justifyContent={'center'}
                color={'black'}
                fontSize={'24px'}
                fontWeight={700}
                p={8}
                mb={'10px'}
              >
                <Center>
                  <Text color={'red'}>
                    <b>
                      {product.price}
                      <sup>VNĐ</sup>
                    </b>
                  </Text>
                </Center>
              </Box>
              <HStack borderBottom={'1px solid gray'} pb={4} mb={'15px'}>
                <Button leftIcon={<FaMoneyBillAlt />} colorScheme="teal" variant="solid">
                  Mua ngay
                </Button>
              </HStack>

              <Box color={'black'}>
                <Table className="box__table" variant="simple">
                  <Thead className="box__thead">
                    <Tr>
                      <Th color={'white'} fontSize="16px">
                        Thông tin chính
                      </Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody className="box__body">
                    <Tr className="box__table-row-even">
                      <Td className="box__row-left">Loại sản phẩm</Td>
                      <Td className="box__row-right">{product.productType}</Td>
                    </Tr>
                    <Tr className="box__table-row-odd">
                      <Td className="box__row-left">Tên sản phẩm</Td>
                      <Td className="box__row-right">{product.productName}</Td>
                    </Tr>

                    <Tr className="box__table-row-odd">
                      <Td className="box__row-left">Đơn vị tính</Td>
                      <Td className="box__row-right">{product.unit}</Td>
                    </Tr>
                    <Tr className="box__table-row-even">
                      <Td className="box__row-left">Giá (đã bao gồm VAT)</Td>
                      <Td className="box__row-right">{product.price}</Td>
                    </Tr>
                    <Tr className="box__table-row-even">
                      <Td className="box__row-left">Hãng sản xuất</Td>
                      <Td className="box__row-right">{product.manufacturer}</Td>
                    </Tr>
                    <Tr className="box__table-row-odd">
                      <Td className="box__row-left">Nước sản xuất</Td>
                      <Td className="box__row-right">{product.countryOfManufacture}</Td>
                    </Tr>
                    {/* <Tr className="box__table-row-even">
                      <Td className="box__row-left">Nước sở hữu</Td>
                      <Td className="box__row-right">{product}</Td>
                    </Tr> */}

                    <Tr className="box__table-row-even">
                      <Td className="box__row-left">Số Lượng</Td>
                      <Td className="box__row-right">{product.quantity}</Td>
                    </Tr>
                    <Tr className="box__table-row-even">
                      <Td className="box__row-left">Ngày sản xuất</Td>
                      <Td className="box__row-right">{product.dateOfManufacture}</Td>
                    </Tr>
                    <Tr className="box__table-row-odd">
                      <Td className="box__row-left">Ngày hết hạn sử dụng</Td>
                      <Td className="box__row-right">{product.expirationDate}</Td>
                    </Tr>
                    <Tr className="box__table-row-even">
                      <Td className="box__row-left">Tên doanh nghiệp công bố giá</Td>
                      <Td className="box__row-right">{product.NameOfBusinessAnnouncingPrice}</Td>
                    </Tr>
                    <Tr className="box__table-row-odd">
                      <Td className="box__row-left">Số điện thoại liên hệ</Td>
                      <Td className="box__row-right">{product.contactPhoneNumber}</Td>
                    </Tr>
                    <Tr className="box__table-row-even">
                      <Td className="box__row-left">Địa chỉ doanh nghiệp</Td>
                      <Td className="box__row-right">{product.businessAddress}</Td>
                    </Tr>
                  </Tbody>
                  <Thead className="box__thead">
                    <Tr>
                      <Th color={'white'} fontSize="16px">
                        Các yếu tố khác
                      </Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody className="box__body">
                    <Tr className="box__table-row-even">
                      <Td className="box__row-left">Thông tin chung về thiết bị</Td>
                      <Td className="box__row-right">{product.generalInfo}</Td>
                    </Tr>

                    <Tr className="box__table-row-odd">
                      <Td className="box__row-left">Hướng dẫn sử dụng</Td>
                      <Td className="box__row-right">{product.userManual}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default NFTDetail;
