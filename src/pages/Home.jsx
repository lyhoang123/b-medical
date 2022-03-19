import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Grid,
  Image,
  Center,
  InputGroup,
  Input,
  InputRightElement,
  InputLeftElement,
  GridItem,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon, EmailIcon, InfoIcon } from "@chakra-ui/icons";
import { formatEther } from "ethers/lib/utils";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getOrdering, mintNFT, getOwners } from "utils/callContract";

const Home = () => {
  const { account, library } = useActiveWeb3React();

  const [nft, setNFT] = useState();
  const [minting, setMinting] = useState(false);
  const [nftOrdering, setNftOrdering] = useState([]);
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    (() => {
      if (!account || !library) return;
      getOwners(library, account).then(setOwners).catch(console.error);
    })();
  }, [account, library]);
  useEffect(() => {
    if (!library) return;
    getOrdering(library)
      .then((res) => res && setNftOrdering(res))
      .catch(console.error);
    console.log(nftOrdering);
  }, [library]);

  const handleMintNFT = async () => {
    if (!account || !library) return alert("please connect wallet");
    if (!nft) return alert("please choose a nft image");
    try {
      setMinting(true);
      await mintNFT(library, account, nft);
      alert("mint success");
      setMinting(false);
    } catch (error) {
      console.log(error);
      setMinting(false);
      if (error.data?.message) {
        alert(error.data.message);
      }
    }
  };

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
  const property = [
    {
      imageUrl: "https://bit.ly/2Z4KKcF",
      imageAlt: "Rear view of modern home with pool",
    },
    {
      imageUrl: "https://bit.ly/2Z4KKcF",
      imageAlt: "Rear view of modern home with pool",
    },
    {
      imageUrl: "https://bit.ly/2Z4KKcF",
      imageAlt: "Rear view of modern home with pool",
    },
    {
      imageUrl: "https://bit.ly/2Z4KKcF",
      imageAlt: "Rear view of modern home with pool",
    },
    {
      imageUrl: "https://bit.ly/2Z4KKcF",
      imageAlt: "Rear view of modern home with pool",
    },
    {
      imageUrl: "https://bit.ly/2Z4KKcF",
      imageAlt: "Rear view of modern home with pool",
    },
  ];

  return (
    <Box>
      <HStack
        bg="#382e87"
        h="60px"
        maxW="1200px"
        borderRadius={"8px"}
        m={"109px 109px 30px 109px"}
        p={"6px 10px"}
      >
        <HStack>
          <Center>
            <Text cursor={"pointer"} onClick={() => console.log("Click")}>
              Trang chủ/
            </Text>
            <Text cursor={"pointer"} onClick={() => console.log("Click")}>
              Danh mục
            </Text>
          </Center>
          <Center>
            <Link>
              <Button
                leftIcon={<EmailIcon />}
                colorScheme="teal"
                variant="solid"
                borderRadius={"30px"}
                bgColor={"red.500"}
                whiteSpace={"nowrap"}
                lineHeight={"1.5"}
              >
                Tra cứu y tế YPTT phòng chống dịch Covid
              </Button>
            </Link>
          </Center>
          <Center bgColor={"white"} borderRadius={"5px"}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                type="tel"
                color={"black"}
                _placeholder={{ color: "gray.200" }}
                placeholder="Phone number"
              />
              <InputRightElement children={<CloseIcon color="gray.300" />} />
            </InputGroup>
          </Center>
          <Center>
            <Button
              colorScheme="teal"
              variant="solid"
              borderRadius={"30px"}
              bgColor={"yellow.300"}
              whiteSpace={"nowrap"}
              h={"35px"}
            >
              Tìm kiếm nâng cao
            </Button>
          </Center>
        </HStack>
      </HStack>
      <Grid
        bg="white"
        maxW="1200px"
        borderRadius={"8px"}
        m={"109px 109px 30px 109px"}
        p={"9px"}
        templateColumns="repeat(4, 1fr)"
        gap={6}
      >
        <NFTList />
        <NFTList />
        <NFTList />
        <NFTList />
        <NFTList />
        <NFTList />
        <NFTList />
        <NFTList />
      </Grid>
    </Box>
  );
};

export default Home;
