import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineFileSearch,
} from "react-icons/ai";
import "../styles/AdminPage.css";

AdminPage.propTypes = {};

const CompanyList = () => {
  return (
    <Box className="body__box">
      <Box className="box__body-left">
        <Box className="box__content-header">
          <Text className="content__title">Tên doanh nghiệp </Text>
          <span>:</span>
          <Text>CÔNG TY TNHH THIẾT BỊ KỸ THUẬT Y KHOA VIỆT MỸ </Text>
        </Box>
        <Box className="main__content">
          <Box>
            <Box className="content">
              <Text className="content__title">Tỉnh / Thành </Text>
              <span>:</span>
              <Text>Thành Phố Hồ Chí Minh</Text>
            </Box>
            <Box className="content">
              <Text className="content__title">Quận / Huyện </Text>
              <span>:</span>
              <Text>Gò Vấp</Text>
            </Box>
            <Box className="content">
              <Text className="content__title">Phường / Xã </Text>
              <span>:</span>
              <Text>Phường 1</Text>
            </Box>
            <Box className="content">
              <Text className="content__title">Mã số thuế </Text>
              <span>:</span>
              <Text>3803124</Text>
            </Box>
          </Box>
          <Box>
            <Box className="content">
              <Text className="content__title">Người Đại Diện </Text>
              <span>:</span>
              <Text>Nguyễn Hoàng Khang</Text>
            </Box>
            <Box className="content">
              <Text className="content__title">Số Điện Thoại </Text>
              <span>:</span>
              <Text>085xxxxxxx</Text>
            </Box>
            <Box className="content">
              <Text className="content__title">Chức Vụ </Text>
              <span>:</span>
              <Text>Tổng Giám Đốc</Text>
            </Box>
            <Box className="content">
              <Text className="content__title">Số CMND </Text>
              <span>:</span>
              <Text>044200001537</Text>
            </Box>
          </Box>
          <Box>
            <Box className="content">
              <Text className="content__title">Fax </Text>
              <span>:</span>
              <Text>10000000</Text>
            </Box>
            <Box className="content">
              <Text className="content__title">Tên giao dịch quốc tế </Text>
              <span>:</span>
              <Text>ABC</Text>
            </Box>
            <Box className="content">
              <Text className="content__title">Giấy chứng nhận số </Text>
              <span>:</span>
              <Text>ABC</Text>
            </Box>
            <Box className="content">
              <Button
                className="button__view"
                leftIcon={
                  <AiOutlineFileSearch fontSize={"24px"} color="white" />
                }
              >
                Giấy phép kinh doanh
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="box__body-right">
        <Button
          className="button__accept"
          leftIcon={
            <AiFillCheckCircle
              color="white"
              fontSize={"20px"}
              fontWeight="700"
              onClick={"console.log()"}
            />
          }
        >
          Đồng ý
        </Button>
        <Button
          className="button__refuse"
          leftIcon={
            <AiFillCloseCircle
              color="white"
              fontSize={"20px"}
              fontWeight="700"
            />
          }
        >
          Từ chối
        </Button>
      </Box>
    </Box>
  );
};

function AdminPage(props) {
  return (
    <Box bg={"#ccc"} w="100%" height="1400px">
      <Box className="box__container">
        <Text className="container__header">
          Danh Sách Doanh Nghiệp Đăng Ký
        </Text>
        <CompanyList />
        <CompanyList />
        <CompanyList />
        <CompanyList />
        <CompanyList />
      </Box>
    </Box>
  );
}

export default AdminPage;
