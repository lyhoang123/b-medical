import {
  Box,
  Grid,
  Image,
  VStack,
  Text,
  Button,
  Center,
  GridItem,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getOwners } from "utils/callContract";

const NFTList = () => {
  return (
    <GridItem
      w="100%"
      h="496px"
      bg="transparent"
      border="1px"
      borderRadius={"5px"}
      borderColor={"gray.200"}
      p={"14px"}
    >
      <Link to="/nft/1">
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
            >
              Chi tiết thiết bị
            </Button>
          </Box>
        </VStack>
      </Link>
    </GridItem>
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

const Owner = () => {
  const { account } = useParams();
  const { library } = useActiveWeb3React();

  const [owners, setOwners] = useState([]);

  useEffect(() => {
    (() => {
      if (!account || !library) return;
      getOwners(library, account).then(setOwners).catch(console.error);
    })();
  }, [account, library]);

  return (
    <Box>
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

export default Owner;
