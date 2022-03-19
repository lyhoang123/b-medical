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
import "react-datepicker/dist/react-datepicker.css";
import "../styles/react-date.css";
import "../styles/Register.css";
const Register = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <Container maxW="1200px" bg={"white"} centerContent>
      <Box>
        <HStack bg="#382e87" h="20px" maxW="1200px">
          <HStack>
            <Center>
              <Text cursor={"pointer"} onClick={() => console.log("Click")}>
                Trang chủ/
              </Text>
              <Text cursor={"pointer"} onClick={() => console.log("Click")}>
                Danh mục
              </Text>
            </Center>
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

          <Box w="100%">
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
                                Fax Nhập Fax Giấy chứng nhận đăng ký kinh doanh
                                (hoặc đăng ký doanh nghiệp) số:
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
                          border={"1px solid #dedede"}
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
        <Box>
          <Box>
            <Text color="#333333" fontSize={"14px"}>
              <b>
                Tổ chức, cá nhân thực hiện công khai giá phải chịu trách nhiệm
                đảm bảo tính hợp lệ, chính xác của thông tin và phạm vi công
                khai theo đúng chỉ định của Chủ sở hữu trang thiết bị y tế hoặc
                Chủ sở hữu số lưu hành trang thiết bị y tế.
              </b>
            </Text>
            <Checkbox iconColor="gray" color="#333333" defaultChecked>
              Tôi đã đọc, hiểu rõ trách nhiệm và cam kết thực hiện.
            </Checkbox>
            <Box mt={"5px"}>
              <Button
                bgColor={"#2c4897"}
                p="0 15px"
                borderRadius={"10px"}
                size="sm"
                mr={"10px"}
              >
                <Image src={RegisterIcon} alt="" boxSize={"20px"} mr="6px" />
                Đăng ký
              </Button>
              <Button
                bgColor={"white"}
                borderRadius={"10px"}
                border={"1px solid #dedede"}
                color="black !important"
                size="sm"
              >
                <Image src={CancelIcon} alt="" boxSize={"20px"} mr="6px" />
                Button
              </Button>
            </Box>
            <Text fontWeight={700} color={"black"} mt={"5px"}>
              Ghi chú: Những trường thông tin có dấu{" "}
              <span style={{ color: "red" }}>*</span> là bắt buộc
            </Text>
            <Text color={"red"}>
              Sau khi bộ phận Quản trị xác thực thông tin doanh nghiệp đăng ký
              tài khoản, hệ thống sẽ gửi mật khẩu vào tài khoản email và sử dụng
              mã số thuế làm tài khoản đăng nhập của bạn
            </Text>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
