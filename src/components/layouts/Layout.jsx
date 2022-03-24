import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box,  Grid, HStack, Text, VStack } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import {
  ButtonGroup,
  IconButton,
  Image,
  Input,
} from "@chakra-ui/react";
import { connectors } from "connectors";
import { useWallet } from "connectors/hooks";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaReact,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import LogoHeader from "../../assets/images/logo.png";
import LogoFooter from "../../assets/images/logo1.PNG";

export const Layout = ({ children }) => {
  const { account } = useActiveWeb3React();
  const { connect } = useWallet();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    // Header
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
        background={"white"}
      >
        <Box
          width={"100%"}
          margin="0 auto"
          display="flex"
          alignItems={"center"}
          justifyContent="space-around"
        >
          <Link to="/">
            <Image
              width={"100%"}
              height="60px"
              align={"right"}
              // objectFit="cover"
              src={LogoHeader}
              margin="0 "
              padding={0}
              alt="Image"
            />
          </Link>
          <Text as="abbr" fontSize={"30px"} color={"#382e87"}>
            {"B-Medical ".toUpperCase()}
          </Text>
          {account ? (
            <Link to={`/${account}`}>
              <Button colorScheme="purple">{account}</Button>
            </Link>
          ) : (
            // <Button   colorScheme="purple">{account}</Button>
            <Button align="left" colorScheme="purple" onClick={onOpen}>
              Connect wallet
            </Button>
          )}
        </Box>
      </HStack>

      {/* CONTENT */}
      <Box
        minH="calc(100vh - 6em)"
        px="8"
        py="4"
        pos="relative"
        backgroundColor={"#e5e5e5"}
        display={"flex"}
        justifyContent={"center"}
      >
        {children}
      </Box>

      {/* FOOTER */}
      <Box w="100%" h="300px" bgColor={"#262626"} mt={"34px"}>
        <HStack w={"80%"} margin="0 auto" padding={"28px 16px"} display="flex">
          <Box w={"30%"} mr={"50px"}>
            <Link to="/">
              <Image
                boxSize="50px"
                // objectFit="cover"
                src={LogoFooter}
                w="95%"
                height={"85px"}
                alt="Image"
              />
            </Link>
            <Box color="white !important">
              <p>
                B-Medical system for traceability and supply chain management of
                drugs and medical devices applying Blockchain technology
              </p>
            </Box>
            <Box color="white !important">
              <ButtonGroup variant="ghost" margin={"0"} padding="0">
                <IconButton
                  as="a"
                  href="#"
                  aria-label="LinkedIn"
                  icon={<FaLinkedin fontSize="1.25rem" />}
                />

                <IconButton
                  as="a"
                  href="#"
                  aria-label="GitHub"
                  icon={<FaGithub fontSize="1.25rem" />}
                />
                <IconButton
                  as="a"
                  href="#"
                  aria-label="Twitter"
                  icon={<FaTwitter fontSize="1.25rem" />}
                />
                <IconButton
                  as="a"
                  href="#"
                  aria-label="Twitter"
                  icon={<FaFacebook fontSize="1.25rem" />}
                />
                <IconButton
                  as="a"
                  href="#"
                  aria-label="Twitter"
                  icon={<FaReact fontSize="1.25rem" />}
                />
              </ButtonGroup>
            </Box>
          </Box>

          <Box color="white !important" w={"20%"}>
            <Text m={"10px 0px"} fontSize={"20px"}>
              <b>{"About Product".toUpperCase()}</b>
            </Text>
            <Text>How it works</Text>
            <Text>Pricing</Text>
            <Text>Use Cases</Text>
            <Text>Help Topic</Text>
            <Text>Chakra UI</Text>
          </Box>

          <Box color="white !important" w={"25%"}>
            <Box padding={" 0 10px"}>
              <Text m={"10px 0px"} fontSize={"20px"}>
                <b>{"Pages".toUpperCase()}</b>
              </Text>
              <Text>Home</Text>
              <Text>Register</Text>
              <Text>Market Place</Text>
              <Text>Connect Wallet</Text>
            </Box>
          </Box>

          <Box color="white !important" w={"25%"} margin="0">
            <Text m={"10px 0px"} fontSize={"20px"}>
              <b>{"CONTACT TO US".toUpperCase()}</b>
            </Text>
            <Input placeholder="Enter your email" type="email" required />
            <Button
              bg={"#fff"}
              borderRadius="8px"
              type="submit"
              flexShrink={0}
              mt="24px"
            >
              <Text color={"black"} fontWeight="600">
                Send Email
              </Text>
            </Button>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};
