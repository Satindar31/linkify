import { Button } from "@nextui-org/button";
import toast from "react-hot-toast";

export default function DeleteLinkButton({
  linkEnding,
}: {
  linkEnding: string;
}) {
  const successToast = () =>
    toast.success("Your link has been deleted!", {
      icon: "👏",
      position: "bottom-right",
    });
  const failToast = () =>
    toast.error("Something went wrong!", {
      icon: "😢",
      position: "bottom-right",
    });

  async function deleteLink() {
    const response = await fetch("/api/links/deleteLink", {
      method: "DELETE",
      body: JSON.stringify({ ending: linkEnding }),
    });
    if (response.ok) successToast()
    else failToast()
  }

  return (
    <Button onPress={deleteLink} variant="solid" color="danger">
      Delete Link
    </Button>
  );
}
