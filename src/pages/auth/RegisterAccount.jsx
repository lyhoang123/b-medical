import { useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import Login from './Login';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const RegisterAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setReTypeShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);
  const handleShowRetypeClick = () => setReTypeShowPassword(!showRetypePassword);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form>
            <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} />
                  <Input type="email" placeholder="Tên Tài Khoản" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300" children={<CFaLock color="gray.300" />} />
                  <Input type={showPassword ? 'text' : 'password'} placeholder="Mật Khẩu" />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300" children={<CFaLock color="gray.300" />} />
                  <Input type={showRetypePassword ? 'text' : 'password'} placeholder="Nhập Lại Mật Khẩu" />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowRetypeClick}>
                      {showRetypePassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button borderRadius={0} type="submit" variant="solid" colorScheme="teal" width="full">
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Already an account to join with us? <Link color="teal.500">Sign In</Link>
      </Box>
    </Flex>
  );
};

export default RegisterAccount;
