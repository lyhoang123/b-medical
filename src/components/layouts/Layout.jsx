import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Grid, HStack, Center, Text, VStack } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Image } from "@chakra-ui/react";
import { connectors } from "connectors";
import { useWallet } from "connectors/hooks";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import React from "react";
import { Link } from "react-router-dom";
import LocationIcon from "../../assets/images/location.png";
import PhoneIcon from "../../assets/images/phone.png";
export const Layout = ({ children }) => {
  const { account } = useActiveWeb3React();
  const { connect } = useWallet();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg="gray.200">
      <Modal size="sm" isOpen={isOpen && !account} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="repeat(2, 1fr)" gap="12">
              {connectors.map((c, idx) => (
                <VStack
                  key={idx}
                  cursor="pointer"
                  p="4"
                  borderRadius="md"
                  _hover={{
                    bg: "gray.300",
                  }}
                  onClick={() => connect(c.connector)}
                >
                  <Box h="12">{c.icon}</Box>
                  <Text as="b" textAlign="center">
                    {c.name}
                  </Text>
                </VStack>
              ))}
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>

      <HStack
        h="91"
        w="100"
        px="8"
        py="4"
        align="center"
        flex="1"
        justify="space-around"
        spacing="4"
        background={"white"}
        boxShadow="2xl"
      >
        <Link to="/">
          <Image
            borderRadius={"full"}
            boxSize="80px"
            objectFit="cover"
            src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/275124623_357391922961271_5362003074745920968_n.jpg?stp=dst-jpg_p526x296&_nc_cat=109&ccb=1-5&_nc_sid=5cd70e&_nc_ohc=ixJDeVCng_UAX8yxT_o&tn=SrcJ8qC_4SPYqBKP&_nc_ht=scontent.fhan5-9.fna&oh=00_AT8lcsrqGtVyQDj9lIQZo20WHu16wa8OvwrbSBEwAq4X0Q&oe=622A4760"
            alt="Image"
          />
        </Link>
        <Text as="abbr" fontSize={"30px"} color={"#382e87"}>
          {"Lorem ipsum dolor, sit amet".toUpperCase()}
        </Text>
        {account ? (
          <Link to={`/${account}`}>
            <Button colorScheme="purple">{account}</Button>
          </Link>
        ) : (
          // <Button   colorScheme="purple">{account}</Button>
          <Button colorScheme="purple" onClick={onOpen}>
            Connect wallet
          </Button>
        )}
      </HStack>
      <Box
        minH="calc(100vh - 6em)"
        px="8"
        py="4"
        pos="relative"
        display={"flex"}
        justifyContent={"center"}
      >
        {children}
      </Box>
      <Box w="100%" h="365px" bgColor={"#392c86"}>
        <HStack padding={"51px 15px 31px"} m={"0px 182px"}>
          <Box mr={"50px"}>
            <Text m={"10px 0px"} fontSize={"20px"} color={"#26a9e0"}>
              <b>{"Bộ y tế".toUpperCase()}</b>
            </Text>
            <Box color="white !important" display={"flex"}>
              <Center>
                <Image
                  color={"white"}
                  boxSize={"20px"}
                  src={LocationIcon}
                  mr={"5px"}
                  alt=""
                />
                <Text>Địa chỉ: 138A Giảng Võ, Ba Đình, Hà Nội</Text>
              </Center>
            </Box>
            <Box color="white !important" display={"flex"}>
              <Center>
                <Image
                  color={"white"}
                  boxSize={"20px"}
                  src={PhoneIcon}
                  alt=""
                  mr="5px"
                />
                <Text>Điện thoại: 024 6273 2272</Text>
              </Center>
            </Box>
            <Text color="white !important" m={"10px 0px"} fontSize={"20px"}>
              <b>{"Hotline kỹ thuật".toUpperCase()}</b>
            </Text>
            <Text color="white !important">
              Địa chỉ: 138A Giảng Võ, Ba Đình, Hà Nội
            </Text>
            <Text color="white !important">Line 1: 0931 327 757</Text>
          </Box>
          <Box color="white !important">
            <Text m={"10px 0px"} fontSize={"20px"}>
              <b>{"Hỗ trợ nghiệp vụ".toUpperCase()}</b>
            </Text>
            <Text>Bộ Y tế (Vụ Trang thiết bị và Công trình y tế)</Text>
            <Text>Email: congkhaigiatbyt@moh.gov.vn</Text>
            <Text>Điện thoại: 024 6273 2272</Text>
            <Text>Hỗ trợ công khai giá TBYT: https://zalo.me/g/yupogf644</Text>
            <Text>Hỗ trợ công khai giá VTYT: https://zalo.me/g/nsavsd732</Text>
            <Text>Hỗ trợ công khai giá IVD: https://zalo.me/g/pxdxjo397</Text>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};
