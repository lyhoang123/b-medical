import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { ROLES_WITH_USER_ADMIN } from 'configs';
import withRole from 'hocs/withRole';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React, { useEffect, useState } from 'react';
import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineFileSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { approveProvider, getPendingProviders } from 'utils/callContract';
import '../styles/AdminPage.css';
import { BiArrowToRight } from 'react-icons/bi';

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
          title: approve ? 'Duyệt Đơn Đăng Ký Thành Công' : 'Từ Chối Đơn Đăng Ký Thành Công.',
          description: approve
            ? 'Đơn Đăng Ký đã được Admin duyệt, họ sẽ trở thành Nhà Cung Cấp'
            : 'Đơn Đăng Ký đã bị Admin từ chối, họ sẽ không thể trở thành Nhà Cung Cấp',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        props.setRefresh((pre) => !pre);
      } else {
        toast({
          position: 'top-right',
          title: 'Thất Bại !!! Vui Lòng Thử Lại.',
          description: 'Thất Bại !!! Vui Lòng Thử Lại. ',
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
                  <ModalCloseButton onClick={() => setImageURL(null)} />
                  <ModalBody>{imageURL && <Image src={imageURL} />}</ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={() => setImageURL(null)}>
                      Đóng
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

const SkeletonCustom = () => {
  return (
    <Stack
      flexDirection={'row'}
      marginLeft={'12px'}
      justifyContent={'space-between'}
      padding={'12px'}
      border={'1px solid #ccc'}
    >
      <Stack w={'70%'}>
        <Skeleton height="30px" />
        <Skeleton height="30px" />
        <Skeleton height="30px" />
        <Skeleton height="30px" />
      </Stack>

      <Stack w={'30%'} alignItems={'center'} justifyContent={'center'}>
        <Skeleton height="40px" w={'120px'} borderRadius={'20px'} />
        <Skeleton height="40px" w={'120px'} borderRadius={'20px'} />
      </Stack>
    </Stack>
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
        <Link to="/censorPage">
          <Button bg={'#fff'} leftIcon={<BiArrowToRight color="black" fontSize={'20px'} fontWeight="700" />}>
            Di chuyển tới Censor Page
          </Button>
        </Link>

        <Text borderTop={'1px solid #ccc'} paddingTop={'6px'} className="container__header">
          Danh Sách Doanh Nghiệp Đăng Ký
        </Text>

        {Loading ? (
          <SkeletonCustom />
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

export default withRole(AdminPage, [ROLES_WITH_USER_ADMIN.ADMIN]);
