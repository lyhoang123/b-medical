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
  Progress,
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
import { FiUploadCloud } from 'react-icons/fi';
import { GiCancel } from 'react-icons/gi';

import axios from 'axios';

import { uploadIPFS } from 'services/upload-ipfs';
import { enterProduct } from 'utils/callContract';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import withRole from 'hocs/withRole';
import { ROLES } from 'configs';

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
      toast({
        position: 'top-right',
        title: 'Vui l??ng ch???n ???nh c???a S???n ph???m !!!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    const { quantity } = productInfo;
    if (!quantity) {
      toast({
        position: 'top-right',
        title: 'Vui l??ng nh???p s??? l?????ng c???a S???n ph???m m?? b???n cung c???p !!!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    try {
      setSubmitting(true);
      const uploadedImage = await uploadIPFS(productImage, true);
      let result = await enterProduct(library, account, { ...productInfo, image: uploadedImage }, quantity);
      setSubmitting(false);
      console.log(result);
      if (result) {
        toast({
          position: 'top-right',
          title: '????ng s???n ph???m th??nh c??ng !!!.',
          description: 'Th??ng tin s???n ph???m ???? ???????c g???i l??n cho nh???ng Ng?????i ph?? duy???t ',
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
        setProductImage('');
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

  const handleCancelClick = (e) => {
    try {
      toast({
        position: 'top-right',
        title: 'Cancel of Register Product Successfully.',
        description: 'Cancel of Register Product Successfully.',
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
      setProductImage('');
    } catch (error) {
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
          <Text marginLeft={'4px'}>Quay l???i Trang ch???</Text>
        </Link>
        <Text color={'#003265'}>
          <b>Nh???p th??ng tin s???n ph???m</b>
        </Text>

        {/* BOX CHO THONG TIN TAI KHOAN   */}
        <Box w="100%">
          <fieldset className="fieldset__box">
            <legend className="fieldset__title">
              <b>Th??ng tin Ch??nh</b>
            </legend>
            <VStack w="100%" mb={'10px'} justifyContent={'space-between'}>
              <HStack w="100%" mb="10px">
                <HStack w="100%">
                  <FormControl w="50%">
                    <Box className="box__field">
                      <Box>
                        <FormLabel htmlFor="ltb">
                          <b className="input__title">Lo???i s???n ph???m</b> <span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <Select
                          id="type"
                          className="input__field"
                          size="sm"
                          placeholder="-- Ch???n Thu???c / Thi???t b??? y t??? --"
                          value={productInfo.productType}
                          onChange={(e) =>
                            setProductInfo({
                              ...productInfo,
                              productType: e.target.value,
                            })
                          }
                        >
                          <option value="Thu???c">Thu???c</option>
                          <option value="Thi???t b??? y t???">Thi???t b??? y t???</option>
                        </Select>
                      </Box>
                    </Box>
                  </FormControl>
                  <FormControl width="50%">
                    <Box className="box__field">
                      <Box>
                        <FormLabel htmlFor="ttb">
                          <b className="input__title">T??n s???n ph???m</b> <span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <Input
                          className="input__field"
                          size="sm"
                          id="ttb"
                          type="ttb"
                          placeholder="Nh???p t??n s???n ph???m"
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
                          <b className="input__title">????n v??? t??nh</b> <span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <Input
                          className="input__field"
                          size="sm"
                          id="dvt"
                          type="dvt"
                          placeholder="Nh???p ????n v??? t??nh"
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
                          <b className="input__title">Gi?? (ch??a bao g???m VAT)</b> <span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <Input
                          className="input__field"
                          size="sm"
                          id="gia"
                          type="gia"
                          placeholder="Nh???p gi?? s???n ph???m"
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
                          <b className="input__title">H??ng s???n xu???t</b> <span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <Input
                          className="input__field"
                          size="sm"
                          id="hsx"
                          type="hsx"
                          placeholder="Nh???p h??ng s???n xu???t"
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
                          <b className="input__title">N?????c s???n xu???t</b> <span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <Input
                          className="input__field"
                          size="sm"
                          id="nsx"
                          type="nsx"
                          placeholder="Nh???p n?????c s???n xu???t"
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
                          <b className="input__title">Ng??y s???n xu???t</b> <span style={{ color: 'red' }}>*</span>
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
                          <b className="input__title">Ng??y h???t h???n</b> <span style={{ color: 'red' }}>*</span>
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
                          <b className="input__title">T??n doanh nghi???p c??ng b??? gi?? </b>
                          <span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <Input
                          className="input__field"
                          id="tdn"
                          type="tdn"
                          size="sm"
                          placeholder="Nh???p t??n doanh nghi???p c??ng b??? gi??"
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
                          <b className="input__title">S??? ??i???n tho???i li??n h???</b> <span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <Input
                          className="input__field"
                          size="sm"
                          id="sdtlh"
                          type="sdtlh"
                          placeholder="Nh???p s??? ??i???n tho???i li??n h???"
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
                          <b className="input__title">?????a ch??? doanh nghi???p </b> <span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <Input
                          className="input__field"
                          size="sm"
                          id="dcdn"
                          type="dcdn"
                          placeholder="Nh???p ?????a ch??? doanh nghi???p"
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
                    src={productImage ? URL.createObjectURL(productImage) : props.image}
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
                        <b className="input__title">S??? L?????ng </b> <span style={{ color: 'red' }}>*</span>
                      </FormLabel>
                      <Input
                        className="input__field"
                        size="sm"
                        id="soluong"
                        type="soluong"
                        placeholder="Nh???p s??? l?????ng s???n ph???m"
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

        {/* BOX x??c y???u t??? khac */}
        <Box w="100%" mt={'12px'} mb={'34px'}>
          <fieldset className="fieldset__box">
            <legend className="fieldset__title">
              <b>C??c y???u t??? kh??c</b>
            </legend>
            <VStack w="100%" mb={'10px'} justifyContent={'space-between'}>
              <FormControl width="100%">
                <Box className="box__field">
                  <Box>
                    <FormLabel htmlFor="ttm">
                      <b className="input__title">Th??ng tin chung v??? s???n ph???m</b>{' '}
                      <span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <Textarea
                      placeholder="Th??ng tin chung v??? thi???t b???"
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
                      <b className="input__title">H?????ng d???n s??? d???ng</b> <span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <Textarea
                      placeholder=" H?????ng d???n s??? d???ng"
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

        {submitting && <Progress size="xs" isIndeterminate h={'12px'} borderRadius={'12px'} marginBottom={'8px'} />}

        <Box pb="4" display={'flex'} justifyContent="center">
          <Button
            leftIcon={<FiUploadCloud />}
            onClick={() => handleOnSubmit()}
            colorScheme="blue"
            isLoading={submitting}
            mr="8px"
          >
            ????ng S???n Ph???m{' '}
          </Button>
          <Button leftIcon={<GiCancel />} onClick={handleCancelClick} colorScheme="blue" isLoading={submitting}>
            <p>Hu??? B???</p>
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default withRole(ProductField, [ROLES.PROVIDER]);
