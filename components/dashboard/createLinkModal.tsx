"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function CreateLinkModal() {
  const successToast = () =>
    toast.success("Your link has been created!", {
      icon: "👏",
      position: "bottom-right",
    });
  const failToast = () =>
    toast.error("Something went wrong!", {
      icon: "😢",
      position: "bottom-right",
    });

  let response: Response;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [URL, setURL] = useState("");

  async function createLink() {
    const response = await fetch("/api/createLink", {
      method: "POST",
      body: JSON.stringify({ name, description, URL }),
    });

    successToast();
  }

  return (
    <>
      <Button onPress={onOpen} className="mt-12 ml-5">Create Link</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create a new short link
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="Name"
                  placeholder="ScreenSaver"
                />
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  label="Description"
                  placeholder="This is a link to my favorite screen saver"
                />
                <Input
                  isRequired
                  value={URL}
                  onChange={(e) => setURL(e.target.value)}
                  label="URL"
                  placeholder="https://www.google.com/search?q=dvd+screensaver"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    createLink();
                    onClose();
                  }}
                >
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Toaster />
    </>
  );
}
