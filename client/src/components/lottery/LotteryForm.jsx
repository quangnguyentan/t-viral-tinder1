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
import { useNavigate } from "react-router-dom";
import { apiCreateLottery } from "@/services/evaluateService";

const LotteryForm = ({ initialData }) => {
  const navigate = useNavigate();
  const [isLoadding, setIsLoadding] = useState(false);
  const [invisible, setInvisible] = useState(false);
  const [selectedResults, setSelectedResults] = useState([]);

  const handleResultChange = (event) => {
    const newSelectedResults = [...event.target.options]
      .filter((option) => option.selected) // Filter selected options
      .map((option) => option.value) // Extract option values
      .slice(0, 2); // Limit to a maximum of 2 selected values

    setSelectedResults(newSelectedResults);
  };
  const { register, handleSubmit, watch, setValue, getValues, onChange } =
    useForm({
      defaultValues: initialData
        ? initialData
        : {
            period: "",
            result: "",
            room: "",
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
      console.log(values);
      console.log(values.period);
      console.log(values.room);
      console.log(selectedResults);

      // const url = initialData
      //   ? `/api/collections/${initialData?._id}`
      //   : "/api/collections/new";
      // const formData = new FormData();

      // const res = await apiCreateLottery({
      //   period: values.period,
      //   room: values.room,
      //   result: [...values.result],
      // });
      // console.log(res);
      // if (res.success) {
      //   setIsLoadding(false);
      //   toast.success(`Collection ${initialData ? "updated" : "created"} `);
      //   // window.location.href = "/collections";
      //   navigate("/admin/lottery");
      // }
    } catch (error) {
      console.log("[collections_POST]", error);
      toast.error("Something went wrong! Please try again.");
    }
  };
  return (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-center">
          <p className="text-heading2-bold">Edit Collection</p>
          <Delete item="collection" id={initialData?._id} />
        </div>
      ) : (
        <p className="text-2xl font-semibold items-center text-center">
          Thêm cược
        </p>
      )}

      <Separator className="bg-grey-1 mt-4 mb-7" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-4">
          <label htmlFor="">Thời gian :</label>
          <Input
            {...register("period")}
            placeholder="Tạo thời gian (60 = 1 phút). Nếu không điền mặc định là 180 = 3 phút"
            onKeyDown={handleKeyPress}
          />
        </div>
        <div className="flex items-start flex-col gap-4">
          <label for="result">
            Kết quả dự đoán (Nếu không điền tự động random ra kết quả) :
          </label>
          <select
            multiple
            value={selectedResults} // Set the selected values from state
            onChange={handleResultChange}
            className="border px-4 w-full border-black"
          >
            {!invisible && (
              <option className="break-all" value="">
                Chọn kết quả (tối đa là 2 trong 4 kết quả). Vui lòng nhấn giữ
                nút Shift hoặc Crlt để có thể chọn 2 đáp án
              </option>
            )}
            <option value="a">a</option>
            <option value="b">b</option>
            <option value="c">c</option>
            <option value="d">d</option>
          </select>
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="">Tạo phòng: </label>
          <Input
            {...register("room")}
            placeholder="Tạo phòng"
            onKeyDown={handleKeyPress}
          />
        </div>
        <div className="flex gap-10">
          <Button type="submit" className="bg-blue-500 text-white">
            Submit
          </Button>
          <Button
            type="button"
            onClick={() => navigate("/admin/lottery")}
            className="bg-blue-500 text-white"
          >
            Discard
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LotteryForm;
