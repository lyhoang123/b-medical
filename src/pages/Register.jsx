import {
  Box,
  VStack,
  HStack,
  Text,
  Center,
  Input,
  FormControl,
  FormLabel,
  Link,
  Checkbox,
  Select,
  Button,
  Image,
  Container,
} from "@chakra-ui/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import RegisterIcon from "../assets/images/Register.png";
import CancelIcon from "../assets/images/cancel.png";
import { registerProvider } from "utils/callContract";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/react-date.css";
import "../styles/Register.css";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
const Register = () => {
  const { account, library } = useActiveWeb3React();

  const [startDate, setStartDate] = useState(new Date());

  const [providerInfo, setProviderInfo] = useState({
    MST: "",
    email: "",
    representName: "",
    representPosition: "",
    representPhone: "",
    representId: "",
    businessName: "",
    businessNameInternational: "",
    businessAddress: "",
    businessPhone: "",
    businessFax: "",
  });

  const handleRegisterProvider = async () => {
    try {
      if (!account || !library) return alert("please connect wallet");
      await registerProvider(library, account, providerInfo);
      alert("register success");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxW="1200px" bg={"white"} centerContent>
      <Box>
        <HStack bg="#382e87" h="40px" maxW="1200px" className="header__box">
          <HStack>
            <Box>
              <Text cursor={"pointer"} onClick={() => console.log("Click")}>
                Trang chủ/
              </Text>
              <Text cursor={"pointer"} onClick={() => console.log("Click")}>
                Danh mục
              </Text>
            </Box>
          </HStack>
        </HStack>
        <Link color={"#003265"}>
          <b>Hướng dẫn</b>
        </Link>

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
                      <FormLabel htmlFor="mst">
                        <b className="input__title">Mã số thuế </b>
                        <span style={{ color: "red" }}>*</span>
                      </FormLabel>
                      <Input
                        className="input__field"
                        id="mst"
                        type="mst"
                        size="sm"
                        placeholder="Nhập mã số thuế"
                        _placeholder={{ color: "#ccc" }}
                        value={providerInfo.MST}
                        onChange={(e) =>
                          setProviderInfo((provider) => ({
                            ...provider,
                            MST: e.target.value,
                          }))
                        }
                      />
                    </Box>
                  </Box>
                </FormControl>
                <FormControl width="50%">
                  <Box className="box__field">
                    <Box>
                      <FormLabel htmlFor="email">
                        <b className="input__title">Email</b>{" "}
                        <span style={{ color: "red" }}>*</span>
                      </FormLabel>
                      <Input
                        className="input__field"
                        size="sm"
                        id="email"
                        type="email"
                        placeholder="Nhập Email"
                        _placeholder={{ color: "#ccc" }}
                        value={providerInfo.email}
                        onChange={(e) =>
                          setProviderInfo((provider) => ({
                            ...provider,
                            email: e.target.value,
                          }))
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
        <Box w="100%" mt={"12px"}>
          <fieldset className="fieldset__box">
            <legend className="fieldset__title">
              <b>Người đại diện</b>
            </legend>
            <VStack w="100%" mb={"10px"} justifyContent={"space-between"}>
              <HStack w="100%" justifyContent={"space-between"}>
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
                          _placeholder={{ color: "#dedede" }}
                          placeholder="Nhập Họ và tên"
                          value={providerInfo.representName}
                          onChange={(e) =>
                            setProviderInfo((provider) => ({
                              ...provider,
                              representName: e.target.value,
                            }))
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
                          _placeholder={{ color: "#dedede" }}
                          value={providerInfo.representPosition}
                          onChange={(e) =>
                            setProviderInfo((provider) => ({
                              ...provider,
                              representPosition: e.target.value,
                            }))
                          }
                        />
                      </Box>
                    </Box>
                  </FormControl>
                  <FormControl>
                    <Box className="box__field">
                      <Box>
                        <FormLabel htmlFor="phone">
                          <b className="input__title">Điện thoại</b>{" "}
                          <span style={{ color: "red" }}>*</span>
                        </FormLabel>
                        <Input
                          className="input__field"
                          size="sm"
                          id="phone"
                          type="phone"
                          _placeholder={{ color: "#dedede" }}
                          placeholder="Nhập Số điện thoại"
                          value={providerInfo.representPhone}
                          onChange={(e) =>
                            setProviderInfo((provider) => ({
                              ...provider,
                              representPhone: e.target.value,
                            }))
                          }
                        />
                      </Box>
                    </Box>
                  </FormControl>
                </HStack>
              </HStack>
              <HStack w="100%" mt="10px" justifyContent={"space-evenly"}>
                <HStack w="100%">
                  <FormControl>
                    <Box className="box__field">
                      <Box>
                        <FormLabel htmlFor="CMND">
                          <b className="input__title">Số CMND/Hộ chiếu</b>
                          <span style={{ color: "red" }}>*</span>
                        </FormLabel>
                        <Input
                          className="input__field"
                          size="sm"
                          id="CMND"
                          type="CMND"
                          _placeholder={{ color: "#dedede" }}
                          placeholder="Nhập số CMND/Hộ chiếu"
                          value={providerInfo.representId}
                          onChange={(e) =>
                            setProviderInfo((provider) => ({
                              ...provider,
                              representId: e.target.value,
                            }))
                          }
                        />
                      </Box>
                    </Box>
                  </FormControl>
                  <FormControl>
                    <Box className="box__field">
                      <Box>
                        <FormLabel htmlFor="date">
                          <b className="input__title">Ngày cấp</b>{" "}
                          <span style={{ color: "red" }}>*</span>
                        </FormLabel>
                        <DatePicker
                          className="input__field"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          placeholderText="Nhập ngày cấp"
                          id="date"
                        />
                      </Box>
                    </Box>
                  </FormControl>
                  <FormControl>
                    <Box className="box__field">
                      <Box>
                        <FormLabel htmlFor="address">
                          <b className="input__title">Nơi cấp</b>{" "}
                          <span style={{ color: "red" }}>*</span>
                        </FormLabel>
                        <Input
                          className="input__field"
                          size="sm"
                          id="address"
                          type="address"
                          _placeholder={{ color: "#dedede" }}
                          placeholder="Nhập nơi cấp"
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
                        <b className="input__title">Tên doanh nghiệp</b>{" "}
                        <span style={{ color: "red" }}>*</span>
                      </FormLabel>
                      <Input
                        className="input__field"
                        size="sm"
                        id="nameCompany"
                        type="nameCompany"
                        _placeholder={{ color: "#dedede" }}
                        placeholder="Nhập tên doanh nghiệp"
                        value={providerInfo.businessName}
                        onChange={(e) =>
                          setProviderInfo((provider) => ({
                            ...provider,
                            businessName: e.target.value,
                          }))
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
                        _placeholder={{ color: "#dedede" }}
                        placeholder="Nhập tên giao dịch quốc tế"
                        value={providerInfo.businessNameInternational}
                        onChange={(e) =>
                          setProviderInfo((provider) => ({
                            ...provider,
                            businessNameInternational: e.target.value,
                          }))
                        }
                      />
                    </FormControl>
                  </Box>
                </Box>
                <HStack width="100%">
                  <FormControl w="100%">
                    <Box className="box__field">
                      <Box>
                        <FormLabel htmlFor="province">
                          <b className="input__title">Tỉnh / Thành</b>{" "}
                          <span style={{ color: "red" }}>*</span>
                        </FormLabel>
                        <Select
                          id="province"
                          className="input__field"
                          size="sm"
                          placeholder="-- Chọn tỉnh / thành --"
                        >
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </Select>
                      </Box>
                    </Box>
                  </FormControl>
                  <FormControl w="100%">
                    <Box className="box__field">
                      <Box>
                        <FormLabel htmlFor="district">
                          <b className="input__title">Quận / huyện</b>{" "}
                          <span style={{ color: "red" }}>*</span>
                        </FormLabel>
                        <Select
                          id="district"
                          className="input__field"
                          size={"sm"}
                          placeholder="-- Chọn quận / huyện --"
                        >
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </Select>
                      </Box>
                    </Box>
                  </FormControl>
                  <FormControl w="100%">
                    <Box className="box__field">
                      <Box>
                        <FormLabel htmlFor="ward">
                          <b className="input__title">Phường / xã</b>{" "}
                          <span style={{ color: "red" }}>*</span>
                        </FormLabel>
                        <Select
                          id="ward"
                          className="input__field"
                          size="sm"
                          placeholder="-- Chọn phường / xã --"
                        >
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </Select>
                      </Box>
                    </Box>
                  </FormControl>
                </HStack>
                <Box width="100%">
                  <Box className="box__field">
                    <FormControl width="100%">
                      <FormLabel htmlFor="addressDetail">
                        <b className="input__title">Địa chỉ chi tiết</b>
                      </FormLabel>
                      <Input
                        className="input__field"
                        size={"sm"}
                        id="addressDetail"
                        type="addressDetail"
                        _placeholder={{ color: "#dedede" }}
                        placeholder="Nhập địa chỉ chi tiết"
                        value={providerInfo.businessAddress}
                        onChange={(e) =>
                          setProviderInfo((provider) => ({
                            ...provider,
                            businessAddress: e.target.value,
                          }))
                        }
                      />
                    </FormControl>
                  </Box>
                </Box>
                <Box display="flex" flexFlow={"nowrap"} width={"100%"}>
                  <Box w="100%">
                    <FormControl width={"50%"}>
                      <Box className="box__field">
                        <FormLabel htmlFor="phoneNumber">
                          <b className="input__title">Điện thoại</b>
                        </FormLabel>
                        <Input
                          className="input__field"
                          size="sm"
                          id="phoneNumber"
                          type="phoneNumber"
                          _placeholder={{ color: "#dedede" }}
                          placeholder="Nhập điện thoại"
                          value={providerInfo.businessPhone}
                          onChange={(e) =>
                            setProviderInfo((provider) => ({
                              ...provider,
                              businessPhone: e.target.value,
                            }))
                          }
                        />
                      </Box>
                    </FormControl>
                    <FormControl width={"50%"}>
                      <Box className="box__field">
                        <FormLabel htmlFor="fax">
                          <b className="input__title">Fax</b>
                        </FormLabel>
                        <Input
                          className="input__field"
                          size="sm"
                          id="fax"
                          type="fax"
                          _placeholder={{ color: "#dedede" }}
                          placeholder="Nhập Fax"
                          value={providerInfo.businessFax}
                          onChange={(e) =>
                            setProviderInfo((provider) => ({
                              ...provider,
                              businessFax: e.target.value,
                            }))
                          }
                        />
                      </Box>
                    </FormControl>
                  </Box>
                </Box>
                <Box w="100%">
                  <HStack w="100%">
                    <FormControl w="100%">
                      <Box className="box__field">
                        <Box fontSize={"14px"}>
                          <Center display={"flex"} flexDirection={"column"}>
                            <FormLabel htmlFor="certificate">
                              <b className="input__title">
                                Giấy chứng nhận đăng ký kinh doanh (hoặc đăng ký
                                doanh nghiệp) số:
                              </b>
                            </FormLabel>
                            <Input
                              className="input__field"
                              size="sm"
                              id="certificate"
                              type="certificate"
                              _placeholder={{ color: "#dedede" }}
                              placeholder="Giấy chứng nhận/ mã số doanh nghiệp"
                            />
                          </Center>
                        </Box>
                      </Box>
                    </FormControl>
                    <FormControl>
                      <Box className="box__field">
                        <Box>
                          <FormLabel htmlFor="agent">
                            <b className="input__title">Ngày cấp</b>
                          </FormLabel>
                          <DatePicker
                            className="input__field"
                            size="sm"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            placeholderText="Nhập ngày cấp"
                            id="date"
                          />
                        </Box>
                      </Box>
                    </FormControl>
                    <FormControl>
                      <Box className="box__field">
                        <Box>
                          <FormLabel htmlFor="phone">
                            <b className="input__title">Cơ quan cấp phép</b>
                          </FormLabel>
                          <Input
                            className="input__field"
                            size={"sm"}
                            id="phone"
                            type="phone"
                            _placeholder={{ color: "#dedede" }}
                            placeholder="Cơ quán cấp phép"
                          />
                        </Box>
                      </Box>
                    </FormControl>
                  </HStack>
                </Box>
                <Box w="100%">
                  <HStack w="100%">
                    <FormControl>
                      <Box className="box__field">
                        <FormLabel htmlFor="TTBYT">
                          <b className="input__title">
                            Nhóm TTBYT công khai giá
                          </b>{" "}
                          <span style={{ color: "red" }}>*</span>
                        </FormLabel>
                        <Input
                          className="input__field"
                          size="sm"
                          id="TTBYT"
                          type="TTBYT"
                          _placeholder={{ color: "#dedede" }}
                          placeholder="Chọn nhóm TTBYT công khai giá"
                        />
                      </Box>
                    </FormControl>
                    <FormControl w="100%">
                      <Box className="box__field">
                        <FormLabel htmlFor="TTBYT">
                          <b className="input__title">
                            Cung cấp giấy ủy quyền hợp lệ
                          </b>
                        </FormLabel>
                        <Button
                          colorScheme={"gray.200"}
                          border={"1px solid rgb(152 152 152)"}
                          h="30px"
                          w="99px"
                          p="0 15px"
                          color="black !important"
                        >
                          Tải lên
                        </Button>
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
            <Text color="#333333" fontSize={"14px"}>
              <b lineHeight={"18px"}>
                Tổ chức, cá nhân thực hiện công khai giá phải chịu trách nhiệm
                đảm bảo tính hợp lệ, chính xác của thông tin và phạm vi công
                khai theo đúng chỉ định của Chủ sở hữu trang thiết bị y tế hoặc
                Chủ sở hữu số lưu hành trang thiết bị y tế.
              </b>
            </Text>
            <Checkbox iconColor="gray" color="#333333" defaultChecked mt="14px">
              Tôi đã đọc, hiểu rõ trách nhiệm và cam kết thực hiện.
            </Checkbox>
            <Box mt={"8px"}>
              <Button
                bgColor={"#2c4897"}
                p="0 15px"
                borderRadius={"10px"}
                size="sm"
                mr={"16px"}
                onClick={() => handleRegisterProvider()}
              >
                <Image src={RegisterIcon} alt="" boxSize={"20px"} mr="8px" />
                <p style={{ color: "#fff" }}> Đăng Ký </p>
              </Button>
              <Button
                bgColor={"white"}
                borderRadius={"10px"}
                border={"1px solid rgb(152 152 152)"}
                color="black !important"
                size="sm"
              >
                <Image src={CancelIcon} alt="" boxSize={"20px"} mr="6px" />
                <p>Huỷ Bỏ</p>
              </Button>
            </Box>
            <Text
              fontWeight={700}
              color={"black"}
              mt={"8px"}
              fontSize="14px"
              pb="60px"
            >
              <span>Ghi chú: Những trường thông tin có dấu </span>
              <span style={{ color: "red" }}>*</span> là bắt buộc
            </Text>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
