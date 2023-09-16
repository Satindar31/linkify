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
import CreateLinkModal from "./createLinkModal";

export default function NoLinks() {

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-7xl font-bold text-center">
        You don&apos;t have any links,
        <br /> yet.
      </h1>
      <div className="flex flex-row gap-6">
        <CreateLinkModal />
        <Button variant="bordered">How it works</Button>
      </div>
    </div>
  );
}
