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

const ProductField = () => {
  const { library, account } = useActiveWeb3React();

  const [dateManufacture, setDateManufacture] = useState(new Date());
  const [dateExpiration, setDateExpiration] = useState(new Date());
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
    productUrl: '',
    generalInfo: '',
    userManual: '',
  });
  const [productImage, setProductImage] = useState(null);

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
    const uploadedImage = await uploadIPFS(productImage, true);
    let result = await enterProduct(library, account, { ...productInfo, image: uploadedImage }, quantity);
    console.log(result);
    if (result) {
      alert('you have successfully register product ');
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
        productUrl: '',
        generalInfo: '',
        userManual: '',
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
                  <Image
                    src={
                      'data:image/png;base64,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'
                    }
                    h={'100%'}
                    alt=""
                    objectFit="fill"
                    p={6}
                  />
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

        <Box pb="4">
          <Button onClick={() => handleOnSubmit()} colorScheme="blue">
            Đăng sản phẩm{' '}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductField;
