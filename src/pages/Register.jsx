import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Link,
  Progress,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineLogin } from 'react-icons/ai';
import { uploadIPFS } from 'services/upload-ipfs';
import { registerProvider } from 'utils/callContract';
import CancelIcon from '../assets/images/cancel.png';
import RegisterIcon from '../assets/images/Register.png';
import '../styles/react-date.css';
import '../styles/Register.css';

const Register = () => {
  const { account, library } = useActiveWeb3React();

  const toast = useToast();

  const [startDate, setStartDate] = useState(new Date());

  const [avatar, setAvatar] = useState(null);

  const handleOnChangePicker = (date) => {
    setStartDate(date);
    setProviderInfo({
      ...providerInfo,
      daterange: date,
    });
  };

  const [providerInfo, setProviderInfo] = useState({
    taxcode: '',
    email: '',
    representName: '',
    representPosition: '',
    representPhone: '',
    representId: '',
    daterange: '',
    issuedby: '',
    businessName: '',
    businessNameInternational: '',
    businessAddress: '',
    businessPhone: '',
    businessFax: '',
    walletAddress: '',
    certificateUrl: '',
  });

  const handleImage = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleOnSubmit = async (e) => {
    var imagefile = avatar;

    if (!imagefile) {
      toast({
        position: 'top-right',
        title: 'Please choose file again.',
        description: 'Please choose file again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    const avatarUrl = await uploadIPFS(imagefile, true);
    let result = await registerProvider(library, account, { ...providerInfo, certificateUrl: avatarUrl });
    setLoading(false);
    if (result) {
      toast({
        position: 'top-right',
        title: 'Submission of Registration Successfully.',
        description: 'Submission of Registration Successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setProviderInfo({
        taxcode: '',
        email: '',
        representName: '',
        representPosition: '',
        representPhone: '',
        representId: '',
        daterange: '',
        issuedby: '',
        businessName: '',
        businessNameInternational: '',
        businessAddress: '',
        businessPhone: '',
        businessFax: '',
        walletAddress: '',
        certificateUrl: '',
      });
    } else {
      toast({
        position: 'top-right',
        title: 'Please try again .',
        description: 'Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCancelClick = (e) => {
    setProviderInfo({
      taxcode: '',
      email: '',
      representName: '',
      representPosition: '',
      representPhone: '',
      representId: '',
      daterange: '',
      issuedby: '',
      businessName: '',
      businessNameInternational: '',
      businessAddress: '',
      businessPhone: '',
      businessFax: '',
      walletAddress: '',
      certificateUrl: '',
    });
    setAvatar('');
  };

  const [loading, setLoading] = useState(false);

  return (
    <Container maxW="1200px" bg={'white'} centerContent>
      <Box w="100% !important" m="12px 0px 6px" className="header__box">
        <Link to="/" display={'flex'} alignItems="center">
          <AiOutlineLogin />
          <Text marginLeft={'4px'}>Quay lại Trang chủ</Text>
        </Link>
      </Box>
      <Box>
        <Text color={'#003265'}>
          <b>Đăng ký trở thành Nhà cung cấp</b>
        </Text>

        {/* BOX CHO THONG TIN TAI KHOAN   */}
        <Box w="100%">
          <fieldset className="fieldset__box">
            <legend className="fieldset__title">
              <b>Thông tin tài khoản</b>
            </legend>
            <HStack w="100%" mb="10px">
              <HStack w="100%">
                <FormControl w="50%">
                  <Box className="box__field">
                    <Box>
                      <FormLabel htmlFor="taxcode">
                        <b className="input__title">Mã số thuế </b>
                        <span style={{ color: 'red' }}>*</span>
                      </FormLabel>
                      <Input
                        className="input__field"
                        id="taxcode"
                        type="taxcode"
                        size="sm"
                        placeholder="Nhập mã số thuế"
                        _placeholder={{ color: '#ccc' }}
                        value={providerInfo.taxcode}
                        onChange={(e) =>
                          setProviderInfo({
                            ...providerInfo,
                            taxcode: e.target.value,
                          })
                        }
                      />
                    </Box>
                  </Box>
                </FormControl>
                <FormControl width="50%">
                  <Box className="box__field">
                    <Box>
                      <FormLabel htmlFor="email">
                        <b className="input__title">Email</b> <span style={{ color: 'red' }}>*</span>
                      </FormLabel>
                      <Input
                        className="input__field"
                        size="sm"
                        id="email"
                        type="email"
                        placeholder="Nhập Email"
                        _placeholder={{ color: '#ccc' }}
                        value={providerInfo.email}
                        onChange={(e) =>
                          setProviderInfo({
                            ...providerInfo,
                            email: e.target.value,
                          })
                        }
                      />
                    </Box>
                  </Box>
                </FormControl>
              </HStack>
            </HStack>
          </fieldset>
        </Box>

        {/* BOX CHO NGUOI DAI DIEN */}
        <Box w="100%" mt={'12px'}>
          <fieldset className="fieldset__box">
            <legend className="fieldset__title">
              <b>Người đại diện</b>
            </legend>
            <VStack w="100%" mb={'10px'} justifyContent={'space-between'}>
              <HStack w="100%" justifyContent={'space-between'}>
                <HStack w="100%">
                  <FormControl w="100%">
                    <Box className="box__field">
                      <Box>
                        <FormLabel htmlFor="name">
                          <b className="input__title">Họ và tên</b>
                        </FormLabel>
                        <Input
                          className="input__field"
                          id="name"
                          type="name"
                          size="sm"
                          _placeholder={{ color: '#dedede' }}
                          placeholder="Nhập Họ và tên"
                          value={providerInfo.representName}
                          onChange={(e) =>
                            setProviderInfo({
                              ...providerInfo,
                              representName: e.target.value,
                            })
                          }
                        />
                      </Box>
                    </Box>
                  </FormControl>
                  <FormControl>
                    <Box className="box__field">
                      <Box>
                        <FormLabel htmlFor="agent">
                          <b className="input__title">Chức vụ</b>
                        </FormLabel>
                        <Input
                          className="input__field"
                          size="sm"
                          id="agent"
                          type="agent"
                          placeholder="Nhập chức vụ"
                          _placeholder={{ color: '#dedede' }}
                          value={providerInfo.representPosition}
                          onChange={(e) =>
                            setProviderInfo({
                              ...providerInfo,
                              representPosition: e.target.value,
                            })
                          }
                        />
                      </Box>
                    </Box>
                  </FormControl>
                  <FormControl>
                    <Box className="box__field">
                      <Box>
                        <FormLabel htmlFor="phone">
                          <b className="input__title">Điện thoại</b> <span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <Input
                          className="input__field"
                          size="sm"
                          id="phone"
                          type="phone"
                          _placeholder={{ color: '#dedede' }}
                          placeholder="Nhập Số điện thoại"
                          value={providerInfo.representPhone}
                          onChange={(e) =>
                            setProviderInfo({
                              ...providerInfo,
                              representPhone: e.target.value,
                            })
                          }
                        />
                      </Box>
                    </Box>
                  </FormControl>
                </HStack>
              </HStack>
              <HStack w="100%" mt="10px" justifyContent={'space-evenly'}>
                <HStack w="100%">
                  <FormControl>
                    <Box className="box__field">
                      <Box>
                        <FormLabel htmlFor="CMND">
                          <b className="input__title">Số CMND/Hộ chiếu</b>
                          <span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <Input
                          className="input__field"
                          size="sm"
                          id="CMND"
                          type="CMND"
                          _placeholder={{ color: '#dedede' }}
                          placeholder="Nhập số CMND/Hộ chiếu"
                          value={providerInfo.representId}
                          onChange={(e) =>
                            setProviderInfo({
                              ...providerInfo,
                              representId: e.target.value,
                            })
                          }
                        />
                      </Box>
                    </Box>
                  </FormControl>
                  <FormControl>
                    <Box className="box__field">
                      <Box>
                        <FormLabel htmlFor="date">
                          <b className="input__title">Ngày cấp</b> <span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <DatePicker
                          className="input__field"
                          selected={startDate}
                          onChange={handleOnChangePicker}
                          id="date"
                        />
                      </Box>
                    </Box>
                  </FormControl>
                  <FormControl>
                    <Box className="box__field">
                      <Box>
                        <FormLabel htmlFor="address">
                          <b className="input__title">Nơi cấp</b> <span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <Input
                          className="input__field"
                          size="sm"
                          id="address"
                          type="address"
                          _placeholder={{ color: '#dedede' }}
                          placeholder="Nhập nơi cấp"
                          value={providerInfo.issuedby}
                          onChange={(e) =>
                            setProviderInfo({
                              ...providerInfo,
                              issuedby: e.target.value,
                            })
                          }
                        />
                      </Box>
                    </Box>
                  </FormControl>
                </HStack>
              </HStack>
            </VStack>
          </fieldset>

          {/* box thong tin doanh nghiep */}

          <Box w="100%" mt="12px">
            <fieldset className="fieldset__box">
              <legend className="fieldset__title">
                <b>Thông tin doanh nghiệp</b>
              </legend>
              <VStack width="100%">
                <Box width="100%">
                  <Box className="box__field">
                    <FormControl width="100%">
                      <FormLabel htmlFor="nameCompany">
                        <b className="input__title">Tên doanh nghiệp</b> <span style={{ color: 'red' }}>*</span>
                      </FormLabel>
                      <Input
                        className="input__field"
                        size="sm"
                        id="nameCompany"
                        type="nameCompany"
                        _placeholder={{ color: '#dedede' }}
                        placeholder="Nhập tên doanh nghiệp"
                        value={providerInfo.businessName}
                        onChange={(e) =>
                          setProviderInfo({
                            ...providerInfo,
                            businessName: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                  </Box>
                </Box>
                <Box width="100%">
                  <Box className="box__field">
                    <FormControl width="100%">
                      <FormLabel htmlFor="nameNational">
                        <b className="input__title">Tên giao dịch quốc tế</b>
                      </FormLabel>
                      <Input
                        className="input__field"
                        size="sm"
                        id="nameNational"
                        type="nameNational"
                        _placeholder={{ color: '#dedede' }}
                        placeholder="Nhập tên giao dịch quốc tế"
                        value={providerInfo.businessNameInternational}
                        onChange={(e) =>
                          setProviderInfo({
                            ...providerInfo,
                            businessNameInternational: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                  </Box>
                </Box>
                <Box width="100%">
                  <Box className="box__field">
                    <FormControl width="100%">
                      <FormLabel htmlFor="addressDetail">
                        <b className="input__title">Địa chỉ chi tiết</b>
                      </FormLabel>
                      <Input
                        className="input__field"
                        size={'sm'}
                        id="addressDetail"
                        type="addressDetail"
                        _placeholder={{ color: '#dedede' }}
                        placeholder="Nhập địa chỉ chi tiết"
                        value={providerInfo.businessAddress}
                        onChange={(e) =>
                          setProviderInfo({
                            ...providerInfo,
                            businessAddress: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                  </Box>
                </Box>
                <Box display="flex" flexFlow={'nowrap'} width={'100%'}>
                  <Box w="100%">
                    <FormControl width={'50%'}>
                      <Box className="box__field">
                        <FormLabel htmlFor="phoneNumber">
                          <b className="input__title">Điện thoại</b>
                        </FormLabel>
                        <Input
                          className="input__field"
                          size="sm"
                          id="phoneNumber"
                          type="phoneNumber"
                          _placeholder={{ color: '#dedede' }}
                          placeholder="Nhập điện thoại"
                          value={providerInfo.businessPhone}
                          onChange={(e) =>
                            setProviderInfo({
                              ...providerInfo,
                              businessPhone: e.target.value,
                            })
                          }
                        />
                      </Box>
                    </FormControl>
                    <FormControl width={'50%'}>
                      <Box className="box__field">
                        <FormLabel htmlFor="fax">
                          <b className="input__title">Fax</b>
                        </FormLabel>
                        <Input
                          className="input__field"
                          size="sm"
                          id="fax"
                          type="fax"
                          _placeholder={{ color: '#dedede' }}
                          placeholder="Nhập Fax"
                          value={providerInfo.businessFax}
                          onChange={(e) =>
                            setProviderInfo({
                              ...providerInfo,
                              businessFax: e.target.value,
                            })
                          }
                        />
                      </Box>
                    </FormControl>
                  </Box>
                </Box>
                <Box w="100%">
                  <HStack w="100%">
                    <FormControl>
                      <Box className="box__field">
                        <FormLabel htmlFor="TTBYT">
                          <b className="input__title">Địa chỉ ví điện tử</b> <span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <Input
                          className="input__field"
                          size="sm"
                          id="walletAddress"
                          type="walletAddress"
                          value={providerInfo.walletAddress}
                          _placeholder={{ color: '#dedede' }}
                          placeholder="Nhập địa chỉ ví điện tử"
                          onChange={(e) =>
                            setProviderInfo({
                              ...providerInfo,
                              walletAddress: e.target.value,
                            })
                          }
                        />
                      </Box>
                    </FormControl>
                    <FormControl w="100%">
                      <Box className="box__field">
                        <FormLabel htmlFor="TTBYT">
                          <b className="input__title">Cung cấp giấy ủy quyền hợp lệ</b>
                        </FormLabel>

                        <Input
                          colorScheme={'gray.200'}
                          border={'1px solid rgb(152 152 152)'}
                          h="30px"
                          p="0 15px"
                          color="black !important"
                          type={'file'}
                          onChange={handleImage}
                        ></Input>
                      </Box>
                    </FormControl>
                  </HStack>
                </Box>
              </VStack>
            </fieldset>
          </Box>
        </Box>

        <Box mt="18px">
          <Box>
            <Text color="#333333" fontSize={'14px'}>
              <b lineheight={'18px'}>
                Tổ chức, cá nhân thực hiện công khai giá phải chịu trách nhiệm đảm bảo tính hợp lệ, chính xác của thông
                tin và phạm vi công khai theo đúng chỉ định của Chủ sở hữu trang thiết bị y tế hoặc Chủ sở hữu số lưu
                hành trang thiết bị y tế.
              </b>
            </Text>
            <Checkbox iconColor="gray" color="#333333" defaultChecked mt="14px">
              Tôi đã đọc, hiểu rõ trách nhiệm và cam kết thực hiện.
            </Checkbox>

            {loading && <Progress size="xs" isIndeterminate h={'12px'} borderRadius={'12px'} />}

            <Box mt={'8px'}>
              <Button
                bgColor={'#2c4897'}
                p="0 15px"
                borderRadius={'10px'}
                size="sm"
                mr={'16px'}
                onClick={() => handleOnSubmit()}
              >
                <Image src={RegisterIcon} alt="" boxSize={'20px'} mr="8px" />
                <p style={{ color: '#fff' }}> Đăng Ký </p>
              </Button>
              <Button
                bgColor={'white'}
                borderRadius={'10px'}
                border={'1px solid rgb(152 152 152)'}
                color="black !important"
                size="sm"
                onClick={handleCancelClick}
              >
                <Image src={CancelIcon} alt="" boxSize={'20px'} mr="6px" />
                <p>Huỷ Bỏ</p>
              </Button>
            </Box>
            <Text fontWeight={700} color={'black'} mt={'8px'} fontSize="14px" pb="60px">
              <span>Ghi chú: Những trường thông tin có dấu </span>
              <span style={{ color: 'red' }}>*</span> là bắt buộc
            </Text>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
