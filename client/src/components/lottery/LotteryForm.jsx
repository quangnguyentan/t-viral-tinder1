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
import { apiCreateLottery, apiUpdateResult } from "@/services/evaluateService";

const LotteryForm = ({ initialData }) => {
  const { roomId } = useParams();
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
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    getValues,
    onChange,
  } = useForm({
    defaultValues: initialData
      ? initialData
      : {
          period: "",
          result: "",
          room: "",
          image: "",
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

      if (initialData) {
        if (selectedResults.length > 1) {
          const data = await apiUpdateResult(roomId, {
            resultUpdate: [selectedResults],
          });

          if (data?.success) {
            location.reload();
            window.location.href = "/lottery";
            navigate("/lottery");
          }
        } else {
          toast.error("Vui lòng chọn 2 kết quả");
        }
      } else {
        const formData = new FormData();
        const selectedFile = getValues().image[0];
        if (selectedFile) {
          formData.append("images", selectedFile, selectedFile.name);
        }
        formData.append("period", values.period);
        formData.append("room", values.room);
        const res = await apiCreateLottery(formData);
        if (res.success) {
          setIsLoadding(false);
          toast.success(
            `Phòng cược ${initialData ? "đã được cập nhật" : "đã được tạo"} `
          );
          navigate("/lottery");
        }
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
          <p className="text-lg font-semibold">Chỉnh sửa cược</p>
          <Delete item="collection" id={initialData?._id} />
        </div>
      ) : (
        <p className="text-2xl font-semibold items-center text-center">
          Thêm cược
        </p>
      )}

      <Separator className="bg-grey-1 mt-4 mb-7" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {!initialData && (
          <div className="flex flex-col gap-4">
            <label htmlFor="">Thời gian (Giây) :</label>
            <Input
              {...register("period", { required: true })}
              placeholder="Tạo thời gian (Nhập 3 = 3 phút). Nếu không điền mặc định là 3 phút"
              onKeyDown={handleKeyPress}
              aria-invalid={errors.period ? "true" : "false"}
            />
          </div>
        )}
        {initialData && (
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
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
        )}
        {!initialData && (
          <div className="flex flex-col items-start gap-4">
            <label>Chọn ảnh nền cược</label>
            <Input
              type="file"
              {...register("image", { onChange, required: true })}
              placeholder="Image"
              aria-invalid={errors.image ? "true" : "false"}
              // onKeyDown={handleKeyPress}
              // accept="image/*"
            />
          </div>
        )}
        {!initialData && (
          <div className="flex flex-col gap-4">
            <label htmlFor="">Phòng: </label>
            <Input
              {...register("room", { required: true })}
              placeholder="Tạo phòng"
              onKeyDown={handleKeyPress}
              aria-invalid={errors.room ? "true" : "false"}
            />
          </div>
        )}
        <div className="flex gap-10">
          <Button type="submit" className="bg-blue-500 text-white">
            Gửi
          </Button>
          <Button
            type="button"
            onClick={() => navigate("/lottery")}
            className="bg-blue-500 text-white"
          >
            Quay về
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LotteryForm;
