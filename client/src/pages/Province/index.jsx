import {
  apiGetAllLottery,
  apiGetLotteryById,
  apiUpdateLottery,
  apiUpdateUserIntoRoom,
} from "@/services/evaluateService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Province = () => {
  const api = `https://esgoo.net/api-tinhthanh/4/0.htm`;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="timer"></h1>
      </div>
    </div>
  );
};

export default Province;
