import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Link,
  Select,
  Text,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/Register.css';
import '../styles/react-date.css';
import { AiOutlineLogin } from 'react-icons/ai';
import axios from 'axios';
import { uploadIPFS } from 'services/upload-ipfs';
import { enterProduct } from 'utils/callContract';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';

const ProductField = (props) => {
  const { library, account } = useActiveWeb3React();

  const [dateManufacture, setDateManufacture] = useState(new Date());
  const [dateExpiration, setDateExpiration] = useState(new Date());

  const toast = useToast();
  const [productInfo, setProductInfo] = useState({
    productType: '',
    productName: '',
    unit: '',
    price: '',
    manufacturer: '',
    countryOfManufacture: '',
    dateOfManufacture: '',
    expirationDate: '',
    NameOfBusinessAnnouncingPrice: '',
    contactPhoneNumber: '',
    businessAddress: '',
    quantity: '',
    image: '',
    generalInfo: '',
    userManual: '',
  });
  const [productImage, setProductImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleOnChangeDateManufacture = (date) => {
    setDateManufacture(date);
    setProductInfo({
      ...productInfo,
      dateOfManufacture: date,
    });
  };

  const handleOnChangedateExpiration = (date) => {
    setDateExpiration(date);
    setProductInfo({
      ...productInfo,
      expirationDate: date,
    });
  };

  const handleImage = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleOnSubmit = async (e) => {
    if (!productImage) {
      window.alert('Please choose file again');
      return;
    }
    const { quantity } = productInfo;
    if (!quantity) return alert('product quantity is required');
    try {
      setSubmitting(true);
      const uploadedImage = await uploadIPFS(productImage, true);
      let result = await enterProduct(library, account, { ...productInfo, image: uploadedImage }, quantity);
      setSubmitting(false);
      console.log(result);
      if (result) {
        toast({
          position: 'top-right',
          title: 'Post Product Successfully !!!.',
          description: 'Information of the product will be sent to Censor ',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setProductInfo({
          productType: '',
          productName: '',
          unit: '',
          price: '',
          manufacturer: '',
          countryOfManufacture: '',
          dateOfManufacture: '',
          expirationDate: '',
          NameOfBusinessAnnouncingPrice: '',
          contactPhoneNumber: '',
          businessAddress: '',
          quantity: '',
          image: '',
          generalInfo: '',
          userManual: '',
        });
      }
    } catch (error) {
      setSubmitting(false);
      toast({
        position: 'top-right',
        title: error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Container maxW="1200px" bg={'white'} centerContent>
      <Box w={'96%'}>
        <Link to="/" display={'flex'} alignItems="center" mt={'8px'}>
          <AiOutlineLogin />
          <Text marginLeft={'4px'}>Quay lại Trang chủ</Text>
        </Link>
        <Text color={'#003265'}>
          <b>Nhập thông tin sản phẩm</b>
        </Text>

        {/* BOX CHO THONG TIN TAI KHOAN   */}
        <Box w="100%">
          <fieldset className="fieldset__box">
            <legend className="fieldset__title">
              <b>Thông tin Chính</b>
            </legend>
            <VStack w="100%" mb={'10px'} justifyContent={'space-between'}>
              <HStack w="100%" mb="10px">
                <HStack w="100%">
                  <FormControl w="50%">
                    <Box className="box__field">
                      <Box>
                        <FormLabel htmlFor="ltb">
                          <b className="input__title">Loại sản phẩm</b> <span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <Select
                          id="type"
                          className="input__field"
                          size="sm"
                          placeholder="-- Chọn Thuốc / Thiết bị y tế --"
                          value={productInfo.productType}
                          onChange={(e) =>
                            setProductInfo({
                              ...productInfo,
                              productType: e.target.value,
                            })
                          }
                        >
                          <option value="Thuốc">Thuốc</option>
                          <option value="Thiết bị y tế">Thiết bị y tế</option>
                        </Select>
                      </Box>
                    </Box>
                  </FormControl>
                  <FormControl width="50%">
                    <Box className="box__field">
                      <Box>
                        <FormLabel htmlFor="ttb">
                          <b className="input__title">Tên sản phẩm</b> <span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <Input
                          className="input__field"
                          size="sm"
                          id="ttb"
                          type="ttb"
                          placeholder="Nhập tên sản phẩm"
                          _placeholder={{ color: '#ccc' }}
                          value={productInfo.productName}
                          onChange={(e) => {
                            setProductInfo({
                              ...productInfo,
                              productName: e.target.value,
                            });
                          }}
                        />
                      </Box>
                    </Box>
                  </FormControl>
                </HStack>
              </HStack>
              <HStack w="100%" mb="10px">
                <HStack w="100%">
                  <FormControl width="50%">
                    <Box className="box__field">
                      <Box>
                        <FormLabel htmlFor="dvt">
                          <b className="input__title">Đơn vị tính</b> <span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <Input
                          className="input__field"
                          size="sm"
                          id="dvt"
                          type="dvt"
                          placeholder="Nhập đơn vị tính"
                          _placeholder={{ color: '#ccc' }}
                          value={productInfo.unit}
                          onChange={(e) => {
                            setProductInfo({
                              ...productInfo,
                              unit: e.target.value,
                            });
                          }}
                        />
                      </Box>
                    </Box>
                  </FormControl>
                  <FormControl width="50%">
                    <Box className="box__field">
                      <Box>
                        <FormLabel htmlFor="gia">
                          <b className="input__title">Giá (chưa bao gồm VAT)</b> <span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <Input
                          className="input__field"
                          size="sm"
                          id="gia"
                          type="gia"
                          placeholder="Nhập giá sản phẩm"
                          _placeholder={{ color: '#ccc' }}
                          value={productInfo.price}
                          onChange={(e) => {
                            setProductInfo({
                              ...productInfo,
                              price: e.target.value,
                            });
                          }}
                        />
                      </Box>
                    </Box>
                  </FormControl>
                </HStack>
              </HStack>
              <HStack w="100%" mb="10px">
                <HStack w="100%">
                  <FormControl width="50%">
                    <Box className="box__field">
                      <Box>
                        <FormLabel htmlFor="hsx">
                          <b className="input__title">Hãng sản xuất</b> <span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <Input
                          className="input__field"
                          size="sm"
                          id="hsx"
                          type="hsx"
                          placeholder="Nhập hãng sản xuất"
                          _placeholder={{ color: '#ccc' }}
                          value={productInfo.manufacturer}
                          onChange={(e) => {
                            setProductInfo({
                              ...productInfo,
                              manufacturer: e.target.value,
                            });
                          }}
                        />
                      </Box>
                    </Box>
                  </FormControl>
                  <FormControl width="50%">
                    <Box className="box__field">
                      <Box>
                        <FormLabel htmlFor="nsx">
                          <b className="input__title">Nước sản xuất</b> <span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <Input
                          className="input__field"
                          size="sm"
                          id="nsx"
                          type="nsx"
                          placeholder="Nhập nước sản xuất"
                          _placeholder={{ color: '#ccc' }}
                          value={productInfo.countryOfManufacture}
                          onChange={(e) => {
                            setProductInfo({
                              ...productInfo,
                              countryOfManufacture: e.target.value,
                            });
                          }}
                        />
                      </Box>
                    </Box>
                  </FormControl>
                </HStack>
              </HStack>
              <HStack w="100%" mb="10px">
                <HStack w="100%">
                  <FormControl>
                    <Box className="box__field">
                      <Box>
                        <FormLabel htmlFor="date">
                          <b className="input__title">Ngày sản xuất</b> <span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <DatePicker
                          className="input__field"
                          selected={dateManufacture}
                          onChange={handleOnChangeDateManufacture}
                          id="date-start"
                        />
                      </Box>
                    </Box>
                  </FormControl>
                  <FormControl>
                    <Box className="box__field">
                      <Box>
                        <FormLabel htmlFor="date">
                          <b className="input__title">Ngày hết hạn</b> <span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <DatePicker
                          className="input__field"
                          selected={dateExpiration}
                          onChange={handleOnChangedateExpiration}
                          id="date-end"
                        />
                      </Box>
                    </Box>
                  </FormControl>
                </HStack>
              </HStack>
              <HStack w="100%" mb="10px">
                <HStack w="100%">
                  <FormControl w="50%">
                    <Box className="box__field">
                      <Box>
                        <FormLabel htmlFor="tdn">
                          <b className="input__title">Tên doanh nghiệp công bố giá </b>
                          <span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <Input
                          className="input__field"
                          id="tdn"
                          type="tdn"
                          size="sm"
                          placeholder="Nhập tên doanh nghiệp công bố giá"
                          _placeholder={{ color: '#ccc' }}
                          value={productInfo.NameOfBusinessAnnouncingPrice}
                          onChange={(e) => {
                            setProductInfo({
                              ...productInfo,
                              NameOfBusinessAnnouncingPrice: e.target.value,
                            });
                          }}
                        />
                      </Box>
                    </Box>
                  </FormControl>
                  <FormControl width="50%">
                    <Box className="box__field">
                      <Box>
                        <FormLabel htmlFor="sdtlh">
                          <b className="input__title">Số điện thoại liên hệ</b> <span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <Input
                          className="input__field"
                          size="sm"
                          id="sdtlh"
                          type="sdtlh"
                          placeholder="Nhập số điện thoại liên hệ"
                          _placeholder={{ color: '#ccc' }}
                          value={productInfo.contactPhoneNumber}
                          onChange={(e) => {
                            setProductInfo({
                              ...productInfo,
                              contactPhoneNumber: e.target.value,
                            });
                          }}
                        />
                      </Box>
                    </Box>
                  </FormControl>
                  <FormControl width="50%">
                    <Box className="box__field">
                      <Box>
                        <FormLabel htmlFor="dcdn">
                          <b className="input__title">Địa chỉ doanh nghiệp </b> <span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <Input
                          className="input__field"
                          size="sm"
                          id="dcdn"
                          type="dcdn"
                          placeholder="Nhập địa chỉ doanh nghiệp"
                          _placeholder={{ color: '#ccc' }}
                          value={productInfo.businessAddress}
                          onChange={(e) => {
                            setProductInfo({
                              ...productInfo,
                              businessAddress: e.target.value,
                            });
                          }}
                        />
                      </Box>
                    </Box>
                  </FormControl>
                </HStack>
              </HStack>
              <HStack w="100%" mb="10px" margin={'12px 0'} justifyContent="center">
                <Box w={'390px'} h={'265px'} border="1px solid #26a9e0" borderRadius={'10px'} marginRight="12px">
                  <Image src={props.image} h={'100%'} alt="" objectFit="fill" p={6} />
                </Box>
                <Input
                  colorScheme={'gray.200'}
                  h="30px"
                  p="0 15px"
                  color="black !important"
                  type={'file'}
                  w="120px"
                  onChange={handleImage}
                ></Input>
                <FormControl width="30%">
                  <Box className="box__field">
                    <Box>
                      <FormLabel htmlFor="soluong">
                        <b className="input__title">Số Lượng </b> <span style={{ color: 'red' }}>*</span>
                      </FormLabel>
                      <Input
                        className="input__field"
                        size="sm"
                        id="soluong"
                        type="soluong"
                        placeholder="Nhập số lượng sản phẩm"
                        mb={'12px'}
                        _placeholder={{ color: '#ccc' }}
                        value={productInfo.quantity}
                        onChange={(e) => {
                          setProductInfo({
                            ...productInfo,
                            quantity: e.target.value,
                          });
                        }}
                      />
                    </Box>
                  </Box>
                </FormControl>
              </HStack>
            </VStack>
          </fieldset>
        </Box>

        {/* BOX xác yếu tố khac */}
        <Box w="100%" mt={'12px'} mb={'34px'}>
          <fieldset className="fieldset__box">
            <legend className="fieldset__title">
              <b>Các yếu tố khác</b>
            </legend>
            <VStack w="100%" mb={'10px'} justifyContent={'space-between'}>
              <FormControl width="100%">
                <Box className="box__field">
                  <Box>
                    <FormLabel htmlFor="ttm">
                      <b className="input__title">Thông tin chung về thiết bị</b>{' '}
                      <span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <Textarea
                      placeholder="Thông tin chung về thiết bị"
                      value={productInfo.generalInfo}
                      onChange={(e) =>
                        setProductInfo({
                          ...productInfo,
                          generalInfo: e.target.value,
                        })
                      }
                    />
                  </Box>
                </Box>
              </FormControl>

              <FormControl width="100%">
                <Box className="box__field">
                  <Box>
                    <FormLabel htmlFor="ttm">
                      <b className="input__title">Hướng dẫn sử dụng</b> <span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <Textarea
                      placeholder=" Hướng dẫn sử dụng"
                      value={productInfo.userManual}
                      onChange={(e) =>
                        setProductInfo({
                          ...productInfo,
                          userManual: e.target.value,
                        })
                      }
                    />
                  </Box>
                </Box>
              </FormControl>
            </VStack>
          </fieldset>
        </Box>

        <Box pb="4" display={'flex'}>
          <Button onClick={() => handleOnSubmit()} colorScheme="blue" isLoading={submitting} margin={' 0 auto'}>
            Đăng sản phẩm{' '}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductField;
