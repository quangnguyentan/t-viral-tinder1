import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { apiDeleteUserById } from "@/services/userService";
import { apiDeleteCollectionById } from "@/services/collectionService";
import { apiDeleteLotteryById } from "@/services/evaluateService";

const Delete = ({ id, item }) => {
  console.log(item);
  const [isLoadding, setIsLoadding] = useState(false);
  const onDelete = async (id) => {
    try {
      setIsLoadding(true);
      if (item === "customers") {
        const data = await apiDeleteUserById(id);
        if (data?.success) {
          setIsLoadding(false);
          window.location.href = `/${item}`;
          toast.success(`${item} is deleted`);
        }
      }
      if (item === "collection") {
        const data = await apiDeleteCollectionById(id);
        if (data?.success) {
          setIsLoadding(false);
          window.location.href = `/${item}`;
          toast.success(`${item} is deleted`);
        }
      }
      if (item === "lottery") {
        const data = await apiDeleteLotteryById(id);
        if (data?.success) {
          setIsLoadding(false);
          window.location.href = `/${item}`;
          toast.success(`${item} is deleted`);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! Please try again.");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-red-500 text-white">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-grey-1">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này không thể khôi phục lại.Bạn chắc chắn muốn xóa không?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white"
            onClick={() => onDelete(id)}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
