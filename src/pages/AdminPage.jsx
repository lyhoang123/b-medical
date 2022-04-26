import { Box, Button, Image, Skeleton, Stack, Text, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineFileSearch } from 'react-icons/ai';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import '../styles/AdminPage.css';
import { boolean } from 'yup';
import { approveProvider, getPendingProviders } from 'utils/callContract';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';

AdminPage.propTypes = {};

const CompanyList = (props) => {
  const { account, library } = useActiveWeb3React();
  const toast = useToast();

  const handleApprove = async (approve = true) => {
    try {
      const result = await approveProvider(library, account, props.providerAddress, props.idx, approve);
      if (result) {
        toast({
          position: 'top-right',
          title: approve ? 'Approve registration form successfully.' : 'Reject registration form successfully.',
          description: approve ? 'Approve registration form successfully.' : 'Reject registration form successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        props.setRefresh((pre) => !pre);
      } else {
        toast({
          position: 'top-right',
          title: 'Fail ! Try Again.',
          description: 'Fail ! Try Again. ',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      if (error.data?.message) {
        const errMessage = error.data?.message?.toString().replace('execution reverted: ', '');
        // TODO: toast
        errMessage &&
          toast({
            position: 'top-right',
            title: errMessage,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
      }
    }
  };

  const [imageURL, setImageURL] = useState(null);

  const handleClickShowImage = async (url) => {
    setImageURL(url);
    console.log(url);
  };

  return (
    <Box className="body__box">
      <Box className="box__body-left">
        <Box className="box__content-header">
          <Text className="content__title">Tên doanh nghiệp </Text>
          <span>:</span>
          <Text>{props.businessName}</Text>
        </Box>
        <Box className="main__content">
          <Box>
            <Box className="content">
              <Text className="content__title">Mã số thuế </Text>
              <span>:</span>
              <Text>{props.taxcode}</Text>
            </Box>
            <Box className="content">
              <Text className="content__title">Email </Text>
              <span>:</span>
              <Text>{props.email}</Text>
            </Box>
            <Box className="content">
              <Text className="content__title">Địa chỉ ví </Text>
              <span>:</span>
              <Text w={'64%'}>{props.walletAddress}</Text>
            </Box>
          </Box>
          <Box>
            <Box className="content">
              <Text className="content__title">Người Đại Diện </Text>
              <span>:</span>
              <Text>{props.representName}</Text>
            </Box>
            <Box className="content">
              <Text className="content__title">Số Điện Thoại </Text>
              <span>:</span>
              <Text>{props.representPhone}</Text>
            </Box>
            <Box className="content">
              <Text className="content__title">Chức Vụ </Text>
              <span>:</span>
              {props.representPosition ? <Text>{props.representPosition}</Text> : null}
            </Box>
          </Box>
          <Box>
            <Box className="content">
              <Text className="content__title">Fax </Text>
              <span>:</span>
              <Text>{props.businessFax}</Text>
            </Box>
            <Box className="content">
              <Text className="content__title">Tên giao dịch quốc tế </Text>
              <span>:</span>
              <Text>{props.businessNameInternational}</Text>
            </Box>
            <Box className="content">
              <Button
                className="button__view"
                leftIcon={<AiOutlineFileSearch fontSize={'24px'} color="white" />}
                onClick={() => handleClickShowImage(props.certificateUrl)}
              >
                Giấy phép kinh doanh
              </Button>

              <Modal isOpen={Boolean(imageURL)}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Giấy Phép Kinh Doanh</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>{imageURL && <Image src={imageURL} />}</ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={() => setImageURL(null)}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="box__body-right">
        <Button
          className="button__accept"
          leftIcon={<AiFillCheckCircle color="white" fontSize={'20px'} fontWeight="700" />}
          onClick={() => handleApprove(true)}
        >
          Đồng ý
        </Button>
        <Button
          className="button__refuse"
          leftIcon={<AiFillCloseCircle color="white" fontSize={'20px'} fontWeight="700" />}
          onClick={() => handleApprove(false)}
        >
          Từ chối
        </Button>
      </Box>
    </Box>
  );
};

function AdminPage(props) {
  const { account, library } = useActiveWeb3React();

  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [Loading, setLoading] = useState(true);

  const getData = async (e) => {
    let result = await getPendingProviders(library);
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    library && getData();
  }, [library, refresh]);

  return (
    <Box w="100%">
      <Box className="box__container">
        <Text className="container__header">Danh Sách Doanh Nghiệp Đăng Ký</Text>
        {Loading ? (
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        ) : (
          <Box>
            {data.map((e, idx) => {
              return (
                <CompanyList
                  key={idx}
                  idx={idx}
                  providerAddress={e.providerAddress}
                  businessName={e.businessName}
                  taxcode={e.taxcode}
                  email={e.email}
                  walletAddress={e.walletAddress}
                  representName={e.representName}
                  representPhone={e.representPhone}
                  representPosition={e.representPosition}
                  businessFax={e.businessFax}
                  businessNameInternational={e.businessNameInternational}
                  certificateUrl={e.certificateUrl}
                  setRefresh={setRefresh}
                />
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default AdminPage;
