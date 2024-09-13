import { Separator } from "../ui/separator";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import toast from "react-hot-toast";
import Delete from "../custom ui/Delete";
import { useNavigate, useParams } from "react-router-dom";
import { apiCreateCollection } from "@/services/collectionService";
import {
  apiUpdatedDesposit,
  apiUpdatedWithDrawAndDeposit,
} from "@/services/userService";

const CustomerForm = ({ initialData }) => {
  const navigate = useNavigate();
  const [isLoadding, setIsLoadding] = useState(false);
  const [invisible, setInvisible] = useState(false);
  const { id } = useParams();
  const { register, handleSubmit, watch, setValue, getValues, onChange } =
    useForm({
      defaultValues: initialData
        ? initialData
        : {
            desposit: "",
            vip: "",
          },
    });
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const onSubmit = async (values) => {
    try {
      setIsLoadding(true);

      const res = await apiUpdatedDesposit(id, {
        desposit: values?.desposit,
        vip: values?.vip,
      });

      if (res.success) {
        setIsLoadding(false);
        toast.success(res?.message);
        navigate("/customers");
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log("[collections_POST]", error);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-center gap-4">
          <p className="text-xl font-semibold">
            Chỉnh sửa người dùng và nạp tiền
          </p>
          <Delete item="collection" id={initialData?._id} />
        </div>
      ) : (
        <p className="text-xl font-semibold">Thêm người dùng</p>
      )}

      <Separator className="bg-grey-1 mt-4 mb-7" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <label>Nạp tiền:</label>

        <Input
          {...register("desposit")}
          placeholder="Số tiền cần nộp"
          onKeyDown={handleKeyPress}
        />
        <div className="flex items-center gap-4">
          <label for="vip">Chọn Vip cho khách hàng (không bắt buộc):</label>
          <select className="border px-4 border-black" {...register("vip")}>
            <option value="vip0">Vip 0</option>
            <option value="vip1">Vip 1</option>
            <option value="vip2">Vip 2</option>
            <option value="vip3">Vip 3</option>
            <option value="vip4">Vip 4</option>
            <option value="vip5">Vip 5</option>
            <option value="vip6">Vip 6</option>
            <option value="vip7">Vip 7</option>
            <option value="vip8">Vip 8</option>
            <option value="vip9">Vip 9</option>
            <option value="vip10">Vip 10</option>
          </select>
        </div>
        {/* <Input
          type="file"
          {...register("image", { onChange })}
          placeholder="Image"
          // onKeyDown={handleKeyPress}
          // accept="image/*"
        /> */}

        <div className="flex gap-10">
          <Button type="submit" className="bg-blue-500 text-white">
            Gửi
          </Button>
          <Button
            type="button"
            onClick={() => navigate("/collection")}
            className="bg-blue-500 text-white"
          >
            Quay về
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
