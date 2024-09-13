import {
  apiGetAllWithDraw,
  apiGetWithDrawById,
} from "@/services/withdrawAndDepositService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import empty from "@/assets/empty-image-default.png";
import { Check, ChevronLeft, X } from "lucide-react";
import moment from "moment";
import { apiUpdatedStatus } from "@/services/userService";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
const TransformHistory = () => {
  const [withDraw, setWithDraw] = useState([]);
  const [reson, setReson] = useState(null);
  const navigate = useNavigate();

  const getWithDrawalHistory = async () => {
    const data = await apiGetAllWithDraw();
    if (data.success) setWithDraw(data?.findWithDraw);
  };
  const handleCheck = async (id, userId, status) => {
    const data = await apiUpdatedStatus(id, userId, {
      status: status,
      reson: reson,
    });
    if (data?.success) {
      toast.success("Đã chấp nhận rút tiền thành công");
    } else {
      toast.error("Không chấp nhận rút tiền");
    }
    setTimeout(() => {
      location.reload();
    }, 2000);
  };
  useEffect(() => {
    getWithDrawalHistory();
  }, []);
  return (
    <div className="h-screen">
      <div className="relative w-full mx-auto">
        <div className="sticky w-full top-0 ">
          <div className="w-full h-[50px] bg-profileColor">
            <span className=" text-xl text-white absolute top-2 left-[40%]">
              Rút tiền
            </span>
          </div>
        </div>
        <div>
          {withDraw.length > 0 ? (
            <div className="bg-gray-200 h-fit">
              <div className="w-full px-2 py-4 ">
                {withDraw
                  ?.filter((fill) => fill?.status?.includes("Đợi duyệt"))
                  ?.map((el) => (
                    <div
                      key={el?._id}
                      className="w-full h-fit border-b-2 bg-white flex justify-between gap-1 px-2 py-2 rounded-xl px-8"
                    >
                      <div>
                        <div className="flex flex-col gap-2">
                          <span className="text-lg font-semibold text-gray-500">
                            Khoảng thời gian
                          </span>
                          <span className="text-lg font-bold">
                            {moment(el?.createdAt).format(
                              "DD-MM-YYYY HH:mm:ss"
                            )}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-lg font-semibold text-gray-500">
                            Tên người muốn rút tiền
                          </span>
                          <span className="text-lg font-bold">
                            {el?.users?.username}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-lg font-semibold text-gray-500">
                            Số tiền hiện có
                          </span>
                          <span className="text-lg font-bold">
                            {el?.users?.withDraw} VNĐ
                          </span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-lg font-semibold text-gray-500">
                            Số tiền muốn rút
                          </span>
                          <span className="text-lg font-bold">
                            {el?.withDraw}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-lg font-semibold text-gray-500">
                            Trạng thái
                          </span>
                          <span className="text-lg font-bold">
                            {el?.status}
                          </span>
                        </div>
                      </div>
                      {el?.status === "Thành công" ? (
                        ""
                      ) : el?.status === "Không thành công" ? (
                        ""
                      ) : (
                        <div className="flex flex-col gap-4 ">
                          <div className="flex items-center gap-4 ">
                            <div
                              className="px-4 py-2  cursor-pointer rounded-full bg-green-100 flex items-center justify-center gap-1"
                              onClick={() =>
                                handleCheck(
                                  el?._id,
                                  el?.users?._id,
                                  "Thành công"
                                )
                              }
                            >
                              <span>Đồng ý</span>
                              <button>
                                <Check className="text-green-500  " />
                              </button>
                            </div>
                            <div
                              className="px-4 py-2  cursor-pointer rounded-full bg-red-100 flex items-center justify-center gap-1"
                              onClick={() =>
                                handleCheck(
                                  el?._id,
                                  el?.users?._id,
                                  "Không thành công"
                                )
                              }
                            >
                              <span>Từ chối</span>
                              <button>
                                <X className="text-red-500" />
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <span className="text-lg font-semibold text-gray-500">
                              Nội dung phản hồi
                            </span>
                            <Textarea
                              className="w-[300px]"
                              placeholder="Nhập nội dung ở đây"
                              onChange={(e) => setReson(e.target.value)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="w-full h-screen flex flex-col items-center justify-start">
              <img src={empty} />
              <span className="text-xl font-semibold text-gray-500">
                Chưa có giao dịch nào !
              </span>
            </div>
          )}
        </div>
        ;
      </div>
    </div>
  );
};

export default TransformHistory;
