import { apiGetWithDrawById } from "@/services/withdrawAndDepositService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import empty from "@/assets/empty-image-default.png";
import { ChevronLeft, X } from "lucide-react";
import moment from "moment";
const WithDrawalHistory = () => {
  const [withDraw, setWithDraw] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const getWithDrawalHistory = async () => {
    const data = await apiGetWithDrawById(id);
    console.log(data);
    if (data.success) setWithDraw(data?.withDraws);
  };
  useEffect(() => {
    getWithDrawalHistory();
  }, [id]);
  return (
    <div className="h-screen">
      <div className="relative w-full mx-auto">
        <div className="sticky w-full top-0">
          <div className="w-full h-[50px] bg-profileColor">
            <ChevronLeft
              onClick={() => {
                localStorage.setItem("page", 4);
                navigate("/");
              }}
              className="absolute top-2 z-30 left-4 text-white cursor-pointer"
              size={30}
            />
            <span className=" text-xl text-white absolute top-2 left-[40%]">
              Lịch sử rút
            </span>
          </div>
        </div>
        <div>
          {withDraw.length > 0 ? (
            <div className="bg-gray-200 h-fit">
              <div className="w-full px-2 ">
                {withDraw?.map((el, index) => (
                  <div
                    key={index}
                    className="w-full h-fit border-b-2 bg-white flex flex-col gap-1 px-2 py-2 rounded-xl"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="text-lg font-semibold text-gray-500">
                        Khoảng thời gian
                      </span>
                      <span className="text-lg font-bold">
                        {moment(el?.craetedAt).format("YYYY-MM-DD HH:mm:ss")}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-lg font-semibold text-gray-500">
                        Số tiền
                      </span>
                      <span className="text-lg font-bold">{el?.withDraw}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-lg font-semibold text-gray-500">
                        Nội dung
                      </span>
                      <span className="text-lg font-bold">{el?.status}</span>
                    </div>
                    {el?.reson?.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <span className="text-lg font-semibold text-gray-500">
                          Nội dung
                        </span>
                        <span className="text-lg font-bold">{el?.reson}</span>
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

export default WithDrawalHistory;
