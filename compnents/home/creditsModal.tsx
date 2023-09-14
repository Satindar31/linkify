"use client"

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  useDisclosure,
} from "@nextui-org/modal";
import { Link } from "@nextui-org/link";
import React from "react";

export default function CreditsModal() {
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  return (
    <React.Fragment>
      <Button onPress={onOpen}>Credits</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Credits</ModalHeader>
              <ModalBody>
                <p>
                  <Link href="https://chill31.github.io/">Chill31 </Link>-
                  Someparts of the FrontEnd
                </p>
                <p>
                  <Link href="https://optid2.github.io/">Optid </Link>- Provided
                  the DataBase
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="success" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
}
