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
const WithDrawalHistoryAdmin = () => {
  const [withDraw, setWithDraw] = useState([]);
  const [reson, setReson] = useState(null);
  const navigate = useNavigate();

  const getWithDrawalHistory = async () => {
    const data = await apiGetAllWithDraw();
    if (data.success) setWithDraw(data?.findWithDraw);
  };
  const handleCheck = async (id, userId, status) => {
    console.log(id);
    const data = await apiUpdatedStatus(id, userId, {
      status: status,
      reson: reson,
    });
    console.log(data);
  };
  console.log(reson);
  useEffect(() => {
    getWithDrawalHistory();
  }, []);
  console.log(withDraw);
  return (
    <div className="h-screen">
      <div className="relative w-full mx-auto">
        <div className="sticky w-full top-0 ">
          <div className="w-full h-[50px] bg-profileColor">
            <span className=" text-xl text-white absolute top-2 left-[40%]">
              Lịch sử giao dịch
            </span>
          </div>
        </div>
        <div>
          {withDraw.length > 0 ? (
            <div className="bg-gray-200 h-fit">
              <div className="w-full px-2 py-4 ">
                {withDraw
                  ?.filter(
                    (fill) =>
                      fill?.status?.includes("Thành công") |
                      fill?.status?.includes("Không thành công")
                  )
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
                            <button>
                              <Check
                                onClick={() =>
                                  handleCheck(
                                    el?._id,
                                    el?.users?._id,
                                    "Thành công"
                                  )
                                }
                                className="text-green-500  cursor-pointer"
                              />
                            </button>
                            <button>
                              <X
                                className="text-red-500 cursor-pointer"
                                onClick={() =>
                                  handleCheck(
                                    el?._id,
                                    el?.users?._id,
                                    "Không thành công"
                                  )
                                }
                              />
                            </button>
                          </div>
                          <div className="flex flex-col gap-2">
                            <span className="text-lg font-semibold text-gray-500">
                              Nội dung
                            </span>
                            <Textarea
                              className="w-[300px]"
                              placeholder="Nhập nội dung"
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

export default WithDrawalHistoryAdmin;
