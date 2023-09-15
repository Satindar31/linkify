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

export default function NoLinks() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [URL, setURL] = useState("");

  async function createLink() {
    const response = await fetch("/api/createLink", {
      method: "POST",
      body: JSON.stringify({ name, description, URL }),
    });
    const data = await response.json();
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-7xl font-bold text-center">
        You don&apos;t have any links,
        <br /> yet.
      </h1>
      <div className="flex flex-row gap-6">
        <Button onPress={onOpen}>Create Link</Button>
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
                    onPress={async () => {
                      createLink().then(() => {
                        onClose;
                      });
                    }}
                  >
                    Create
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <Button variant="bordered">How it works</Button>
      </div>
    </div>
  );
}
