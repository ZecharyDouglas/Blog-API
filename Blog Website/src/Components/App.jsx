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
} from "@chakra-ui/react";

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="flex items-center">
      <Button className=" mt-5" onClick={onOpen}>
        Open Modal
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Perferendis rem veritatis atque doloribus reiciendis vero sint
              earum velit, in suscipit ipsum ullam! Incidunt delectus odit nobis
              ea enim commodi cupiditate!
            </p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
