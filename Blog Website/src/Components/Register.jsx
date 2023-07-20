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

export default function Register({ isOpen, onClose }) {
  const { onOpen } = useDisclosure();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [alertVisable, setAlertVisable] = useState(false);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleName = (e) => {
    setUserName(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const submit = async () => {
    const login = {
      name: `${userName}`,
      email: `${email}`,
      password: `${password}`,
    };
    try {
      await axios({
        method: "post",
        url: "http://localhost:4000/signup",
        data: login,
      }).then((res) => {
        setAlertVisable(true);
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const isError = email === "";

  return (
    <div className="flex items-center">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register</ModalHeader>
          {alertVisable ? (
            <Alert status="success">
              <AlertIcon />
              <Box>
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                  Your application has been received. We will review your
                  application and respond within the next 48 hours.
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

              <FormLabel>Name</FormLabel>
              <Input type="text" value={userName} onChange={handleName} />
              {!isError ? (
                <FormHelperText>Enter your name.</FormHelperText>
              ) : (
                <FormErrorMessage>Your name is required.</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={submit} variant="ghost">
              Sign Up
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
