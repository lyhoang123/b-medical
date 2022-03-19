import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Image,
  Text,
  Center,
  Table,
  Thead,
  Tbody,
  VStack,
  Link,
  Tr,
  Th,
  Td,
  Select,
} from "@chakra-ui/react";
import { EmailIcon, InfoIcon } from "@chakra-ui/icons";
import { formatEther } from "ethers/lib/utils";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  buyOrderNFT,
  cancelOrderNFT,
  getNftById,
  orderNFT,
} from "utils/callContract";

const NFTList = () => {
  return (
    <Link to="/nft/1">
      <GridItem
        w="100%"
        h="496px"
        bg="transparent"
        border="1px"
        borderRadius={"5px"}
        borderColor={"gray.200"}
        p={"14px"}
      >
        <VStack>
          <Center>
            <Box boxSize={"180px"}>
              <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
            </Box>
          </Center>
          <Box>
            <Text color={"#1890ff"}>
              <b>Máy xét nghiệm sinh hóa tự động - BS-360E</b>
            </Text>
            <Text color={"gray.500"} fontSize={"14px"}>
              <b>Model</b>: BS-360E
            </Text>
            <Text color={"gray.500"} fontSize={"14px"}>
              <b>HSX</b>: Shenzhen Mindray Bio-Medical Electronics Co., Ltd.
            </Text>
            <Text color={"gray.500"} fontSize={"14px"}>
              <b>Công ty</b>: Công ty TNHH Vạn Niên
            </Text>
            <Text color={"red.500"} fontSize={"24px"}>
              <b>
                530.000.000<sup>VND</sup>
              </b>
            </Text>
            <Text color={"black"} fontSize={"14px"}>
              (Giá đã bao gồm VAT)
            </Text>
            <Button
              border="1px"
              borderColor={"9dc2ff"}
              bgColor={"teal.200"}
              colorScheme="teal"
              leftIcon={<InfoIcon />}
              variant="solid"
              display={"block"}
            >
              Chi tiết thiết bị
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

  const [nftInfo, setNftInfo] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [price, setPrice] = useState("");

  useEffect(() => {
    (() => {
      if (!library) return;
      getNftById(library, nftId)
        .then((res) => res && setNftInfo(res))
        .catch(console.log);
    })();
  }, [library, nftId]);

  const handleOrderNFT = async () => {
    if (!library || !account) return alert("please connect wallet");
    if (!price || isNaN(price)) return alert("enter sell price");
    try {
      setSubmitting(true);
      await orderNFT(library, account, nftId, price);
      alert("order success");
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      if (error.data?.message) {
        alert(error.data.message);
      }
      setSubmitting(false);
    }
  };

  const handleCancelOrderNFT = async () => {
    if (!library || !account) return alert("please connect wallet");
    try {
      setSubmitting(true);
      await cancelOrderNFT(library, account, nftId);
      alert("cancel order success");
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      if (error.data?.message) {
        alert(error.data.message);
      }
      setSubmitting(false);
    }
  };

  const handleBuyOrderNFT = async (price) => {
    if (!library || !account) return alert("please connect wallet");
    if (!price) return;
    try {
      setSubmitting(true);
      await buyOrderNFT(library, account, nftId, price);
      alert("buy success");
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      if (error.data?.message) {
        alert(error.data.message);
      }
      setSubmitting(false);
    }
  };

  return (
    <Box
      bgColor={"white"}
      borderRadius={"10px"}
      h="2700px"
      w="1190px"
      gap={2}
      p={"15px"}
    >
      <Grid
        borderRadius={"10px"}
        templateColumns={"repeat(5,3fr)"}
        h="2100px"
        w="1190px"
        gap={2}
        p={"15px"}
      >
        <Box
          w={"416px"}
          h={"265px"}
          border="1px solid #26a9e0"
          borderRadius={"10px"}
        >
          <Image
            src={nftInfo?.url}
            alt=""
            w={"410px"}
            h={"265px"}
            objectFit="fill"
            p={6}
          />
        </Box>
        <GridItem colSpan={4}>
          <Box fontSize={"38px"} fontWeight={400} color={"black"}>
            <Text>Lorem ipsum dolor</Text>
          </Box>
          <Box
            border="1px"
            borderRadius={"10px"}
            borderColor={"gray.500"}
            h="51px"
            w="256px"
            display={"flex"}
            justifyContent={"center"}
            color={"black"}
            fontSize={"24px"}
            fontWeight={700}
            p={8}
            mb={"10px"}
          >
            <Center>
              <Text>30.000.000 VND</Text>
            </Center>
          </Box>
          <HStack borderBottom={"1px solid gray"} pb={4} mb={"15px"}>
            <Button leftIcon={<EmailIcon />} colorScheme="teal" variant="solid">
              Email
            </Button>
            <Button leftIcon={<EmailIcon />} colorScheme="teal" variant="solid">
              Email
            </Button>
            <Button leftIcon={<EmailIcon />} colorScheme="teal" variant="solid">
              Email
            </Button>
          </HStack>
          <Box color={"black"}>
            <Table variant="simple" borderColor={"gray.200"}>
              <Thead border="1px solid #87cefa !important">
                <Tr bgColor={"lightblue"}>
                  <Th color={"white"}>Thông tin chính</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody border="1px solid #87cefa !important">
                <Tr>
                  <Td border="1px solid #87cefa !important">
                    Nhóm của thiết bị
                  </Td>
                  <Td border="1px solid #87cefa !important">
                    4. Thiết bị phòng mổ
                  </Td>
                </Tr>
                <Tr bgColor={"gray.200"}>
                  <Td border="1px solid #87cefa !important">
                    Tên chung của thiết bị
                  </Td>
                  <Td border="1px solid #87cefa !important">
                    Bộ dụng cụ phẫu thuật
                  </Td>
                </Tr>
                <Tr>
                  <Td border="1px solid #87cefa !important">Tên thương mại</Td>
                  <Td border="1px solid #87cefa !important">Kéo phẫu thuật</Td>
                </Tr>
                <Tr>
                  <Td border="1px solid #87cefa !important">Đơn vị tính</Td>
                  <Td border="1px solid #87cefa !important">Cây</Td>
                </Tr>
                <Tr bgColor={"gray.200"}>
                  <Td border="1px solid #87cefa !important">
                    Giá (đã bao gồm VAT)
                  </Td>
                  <Td border="1px solid #87cefa !important">7.647.500 VNĐ</Td>
                </Tr>
                <Tr>
                  <Td border="1px solid #87cefa !important">
                    Phân loại TTB theo độ rủi ro
                  </Td>
                  <Td border="1px solid #87cefa !important">A</Td>
                </Tr>
                <Tr bgColor={"gray.200"}>
                  <Td border="1px solid #87cefa !important">
                    Nhóm TTBYT(TT14/2020/TT-BYT)
                  </Td>
                  <Td border="1px solid #87cefa !important">Nhóm 1</Td>
                </Tr>
                <Tr>
                  <Td border="1px solid #87cefa !important">
                    Mã HS (TT14/2018/TT-BYT)
                  </Td>
                  <Td border="1px solid #87cefa !important">-</Td>
                </Tr>
                <Tr bgColor={"gray.200"}>
                  <Td border="1px solid #87cefa !important">Hãng sản xuất</Td>
                  <Td border="1px solid #87cefa !important">Aesculap AG</Td>
                </Tr>
                <Tr>
                  <Td border="1px solid #87cefa !important">Nước sản xuất</Td>
                  <Td border="1px solid #87cefa !important">Ba lan</Td>
                </Tr>
                <Tr bgColor={"gray.200"}>
                  <Td border="1px solid #87cefa !important">Nước sở hữu</Td>
                  <Td border="1px solid #87cefa !important">Ba lan</Td>
                </Tr>
                <Tr>
                  <Td border="1px solid #87cefa !important">Hãng chủ sở hữu</Td>
                  <Td border="1px solid #87cefa !important">Aesculap AG</Td>
                </Tr>
                <Tr bgColor={"gray.200"}>
                  <Td border="1px solid #87cefa !important">Năm sản xuất</Td>
                  <Td border="1px solid #87cefa !important">-</Td>
                </Tr>
                <Tr>
                  <Td border="1px solid #87cefa !important">Xuất xứ</Td>
                  <Td border="1px solid #87cefa !important">Ba lan</Td>
                </Tr>
                <Tr bgColor={"gray.200"}>
                  <Td border="1px solid #87cefa !important">Nước sở hữu</Td>
                  <Td border="1px solid #87cefa !important">Ba lan</Td>
                </Tr>
                <Tr>
                  <Td border="1px solid #87cefa !important">
                    Sổ lưu hành/giấy phép nhập khẩu
                  </Td>
                  <Td border="1px solid #87cefa !important">-</Td>
                </Tr>
                <Tr bgColor={"gray.200"}>
                  <Td border="1px solid #87cefa !important">
                    Ngày bắt đầu hiệu lực
                  </Td>
                  <Td border="1px solid #87cefa !important">2021-07-03</Td>
                </Tr>
                <Tr>
                  <Td border="1px solid #87cefa !important">
                    Ngày hết hiệu lực
                  </Td>
                  <Td border="1px solid #87cefa !important">30-06-2022</Td>
                </Tr>
                <Tr bgColor={"gray.200"}>
                  <Td border="1px solid #87cefa !important">
                    Tên doanh nghiệp công bố giá
                  </Td>
                  <Td border="1px solid #87cefa !important">
                    CÔNG TY TNHH B. BRAUN VIỆT NAM
                  </Td>
                </Tr>
                <Tr>
                  <Td border="1px solid #87cefa !important">
                    Số điện thoại liên hệ
                  </Td>
                  <Td border="1px solid #87cefa !important">02433571616</Td>
                </Tr>
                <Tr bgColor={"gray.200"}>
                  <Td border="1px solid #87cefa !important">
                    Địa chỉ doanh nghiệp
                  </Td>
                  <Td border="1px solid #87cefa !important">
                    Cụm Công Nghiệp Thanh Oai
                  </Td>
                </Tr>
              </Tbody>
              <Thead border="1px solid #87cefa !important">
                <Tr bgColor={"lightblue"}>
                  <Th color={"white"}>Các yếu tố cấu thành giá</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody border="1px solid #87cefa !important">
                <Tr>
                  <Td border="1px solid #87cefa !important" colSpan={2}>
                    <Box>
                      <Text mb="5px">
                        <b>Thông tin chung về thiết bị</b>
                      </Text>
                      <Text mb="5px">HÀNG MỚI 100%</Text>
                      <Text mb="5px">Kéo phẫu thuật Mayo-Lexer Durotip TC</Text>
                    </Box>
                  </Td>
                </Tr>
                <Tr bgColor={"gray.200"}>
                  <Td border="1px solid #87cefa !important" colSpan={2}>
                    <Box>
                      <Text mb="5px">
                        <b>Cấu hình cơ bản</b>
                      </Text>
                      <Text mb="5px">Theo catalogue</Text>
                    </Box>
                  </Td>
                </Tr>
                <Tr>
                  <Td border="1px solid #87cefa !important" colSpan={2}>
                    <Text mb="5px">
                      <b>Cấu hình nâng cao</b>
                    </Text>
                  </Td>
                </Tr>
                <Tr bgColor={"gray.200"}>
                  <Td border="1px solid #87cefa !important" colSpan={2}>
                    <Text mb="5px">
                      <b>Thông số, chi tiêu kỹ thuật</b>
                    </Text>
                    <Text mb="5px">
                      Kéo phẫu thuật Mayo-Lexer Durotip TC, cong, mũi tù/tù, cán
                      vàng, dài 165mm
                    </Text>
                  </Td>
                </Tr>
                <Tr>
                  <Td border="1px solid #87cefa !important" colSpan={2}>
                    <Text mb="5px">
                      <b>Các dịch vụ đi kèm</b>
                    </Text>
                  </Td>
                </Tr>
              </Tbody>
              <Thead border="1px solid #87cefa !important">
                <Tr bgColor={"lightblue"}>
                  <Th
                    border="1px solid #87cefa !important"
                    colSpan={2}
                    color={"white"}
                  >
                    Tài liệu liên quan đến thiết bị
                  </Th>
                </Tr>
              </Thead>
              <Tbody border="1px solid #87cefa !important">
                <Tr>
                  <Td border="1px solid #87cefa !important">
                    Tài liệu Catalogue
                  </Td>
                  <Td border="1px solid #87cefa !important"></Td>
                </Tr>
                <Tr bgColor={"gray.200"}>
                  <Td border="1px solid #87cefa !important">
                    Tài liệu hướng dẫn sửa chữa, bảo dưỡng
                  </Td>
                  <Td border="1px solid #87cefa !important"></Td>
                </Tr>
                <Tr>
                  <Td border="1px solid #87cefa !important">
                    Tài liệu hướng dẫn sử dụng{" "}
                  </Td>
                  <Td border="1px solid #87cefa !important"></Td>
                </Tr>
                <Tr bgColor={"gray.200"}>
                  <Td border="1px solid #87cefa !important">
                    Các tài liệu khác
                  </Td>
                  <Td border="1px solid #87cefa !important"></Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </GridItem>
      </Grid>
      <HStack w="100%" color="black" justifyContent="space-between">
        <Text fontSize="20px" fontWeight={700}>
          Các TTB Y Tế Cùng Phân Loại
        </Text>
        <Select
          w="148px"
          border="1px solid #dedede !important"
          placeholder="Sắp xếp theo"
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </HStack>
      <Grid
        maxW="1200px"
        borderRadius={"8px"}
        p={"9px"}
        templateColumns="repeat(4, 1fr)"
        gap={6}
      >
        <NFTList />
        <NFTList />
        <NFTList />
        <NFTList />
      </Grid>
    </Box>
  );
};

export default NFTDetail;
