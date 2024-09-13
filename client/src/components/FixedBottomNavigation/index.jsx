import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import HomePage from "@/pages/HomePage";
import { useEffect, useState } from "react";
import Evalute from "@/pages/Evalute";
import Cinema from "@/pages/Cinema";
import Province from "@/pages/Province";
import Profile from "@/pages/Profile";
import PersonIcon from "@mui/icons-material/Person";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import WavesIcon from "@mui/icons-material/Waves";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "@/stores/actions/userAction";
export default function FixedBottomNavigation() {
  const { currentData } = useSelector((state) => state.user);
  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoggedIn && token) {
      setTimeout(() => {
        dispatch(getCurrent());
      }, 1000);
    }
  }, [isLoggedIn, token]);
  const messageExamples = [
    {
      page: <HomePage currentData={currentData} />,
    },
    {
      page: <Evalute currentData={currentData} />,
    },
    {
      // page: <Province />,
    },
    {
      page: <Cinema currentData={currentData} />,
    },
    {
      page: <Profile />,
    },
  ];
  const page = localStorage.getItem("page");
  const [value, setValue] = useState(Number(page));
  const [activeComponent, setActiveComponent] = useState(
    messageExamples[4].page
  );
  useEffect(() => {
    setActiveComponent(messageExamples[value].page);
  }, [value]);
  return (
    <Box
      sx={{
        pb: 20,
        width: "sm:100% lg:50%",
        mx: "sm:0 lg:auto",
        bgcolor: "#f2f2f5",
      }}
    >
      <CssBaseline />
      {activeComponent}
      <Paper
        sx={{
          py: 4,
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          width: "sm:100% lg:50%",
          mx: "sm:0 lg:auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            localStorage.setItem("page", newValue);
            if (newValue === 2) return;
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Trang chủ"
            sx={{
              fontWeight: 600,
              fontSize: 10,
              color: "rgb(151, 151, 153)",
              ":focus": {
                color: "rebeccapurple",
              },
            }}
            icon={<HomeIcon sx={{ fontSize: 35 }} />}
          />
          <BottomNavigationAction
            label="Sảnh đánh giá"
            sx={{
              fontWeight: 600,
              fontSize: 10,
              color: "rgb(151, 151, 153)",
              ":focus": {
                color: "rebeccapurple",
              },
            }}
            icon={<AccessAlarmIcon sx={{ fontSize: 35 }} />}
          />

          <BottomNavigationAction
            sx={{
              fontWeight: 600,
              color: "palevioletred",
              ":focus": {
                color: "rebeccapurple",
              },
            }}
            icon={<WavesIcon sx={{ fontSize: 50 }} />}
          />
          <BottomNavigationAction
            label="Rạp chiếu phim"
            sx={{
              fontWeight: 600,
              fontSize: 20,
              color: "rgb(151, 151, 153)",
              ":focus": {
                color: "rebeccapurple",
              },
            }}
            icon={<LiveTvIcon sx={{ fontSize: 35 }} />}
          />
          <BottomNavigationAction
            label="Hồ sơ"
            sx={{
              fontWeight: 600,
              fontSize: 10,
              color: "rgb(151, 151, 153)",
              ":focus": {
                color: "rebeccapurple",
              },
            }}
            icon={<PersonIcon sx={{ fontSize: 35 }} />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
