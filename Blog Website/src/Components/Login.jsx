import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export default function Login({ isOpen, onClose }) {
  const { onOpen } = useDisclosure();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const submit = async () => {
    const login = {
      email: `${email}`,
      password: `${password}`,
    };
    try {
      await axios({
        method: "post",
        url: "http://localhost:4000/login",
        data: login,
      }).then((res) => {
        setSuccess(true);
        console.log(res);
      });
    } catch (res) {
      if (res.response.status > 300) setSuccess(false);
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const isError = email === "";

  return (
    <div className="flex items-center">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          {success != null ? (
            <Alert status={success == true ? "success" : "error"}>
              <AlertIcon />
              <Box className="flex justify-center">
                <AlertTitle>
                  {success == true ? "Success!" : "Error!"}
                </AlertTitle>
                <AlertDescription>
                  {success == true
                    ? "Logged in successfully."
                    : "User information could not be found."}
                </AlertDescription>
              </Box>
            </Alert>
          ) : null}

          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={isError}>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={handleEmailChange} />
              {!isError ? (
                <FormHelperText>
                  Enter the email like to receive the newsletter on.
                </FormHelperText>
              ) : (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}

              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              {!isError ? (
                <FormHelperText>Enter a password to sign in.</FormHelperText>
              ) : (
                <FormErrorMessage>Password is required.</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={submit}>
              Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
