import React, { useState, useEffect } from "react";
import { Stepper, Step, StepLabel, Box, Modal, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const LovePage = () => {
  const startDate = new Date("2025-07-24");
  const [daysTogether, setDaysTogether] = useState(0);

  useEffect(() => {
    const updateDays = () => {
      const today = new Date();
      const diffTime = Math.abs(today - startDate);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      setDaysTogether(diffDays);
    };
    updateDays();
    const timer = setInterval(updateDays, 86400000);
    return () => clearInterval(timer);
  }, []);

  const milestones = [
    { label: "Tìm hiểu", date: "12/06/2025" },
    { label: "Bắt đầu yêu", date: "24/07/2025" },
    { label: "Kỷ niệm 100 ngày", date: "01/11/2025" },
  ];

  const [openModal, setOpenModal] = useState(null);
  const handleOpen = (person) => setOpenModal(person);
  const handleClose = () => setOpenModal(null);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "white",
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
    width: 350,
  };

  const people = {
    A: {
      name: "Quân",
      img: "https://res.cloudinary.com/dxfjbuybf/image/upload/v1761971931/z7177555632127_9ddb521e5e6d6de048360b09fe0e9c76_ffbzdv.jpg",
      info: "8/8/2004 - Sư tử 💖.",
    },
    B: {
      name: "Phương",
      img: "https://res.cloudinary.com/dxfjbuybf/image/upload/v1761971931/z7177555636434_8b278565221e0ef024e171170ddf618c_lmrjjw.jpg",
      info: "29/3/2004 - Bạch Dương 😍.",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-6">
      {/* 💞 Ảnh đại diện */}
      <div className="flex items-center gap-10 mb-8">
        {Object.entries(people).map(([key, person]) => (
          <div
            key={key}
            className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
            onClick={() => handleOpen(key)}
          >
            <img
              src={person.img}
              alt={person.name}
              className="w-28 h-28 rounded-full border-4 border-pink-300 shadow-md object-cover"
            />
            <p className="mt-2 font-semibold text-pink-600">{person.name}</p>
          </div>
        ))}
      </div>

      {/* Đếm ngày yêu */}
      {/* Đếm ngày yêu */}
{/* 💞 Đếm ngày yêu (biểu đồ tròn ấn tượng) */}
<div className="relative bg-white shadow-xl rounded-3xl p-8 mb-10 text-center w-full max-w-sm flex flex-col items-center justify-center border border-pink-200">
  <h2 className="text-2xl font-semibold text-pink-600 mb-4">
    Chúng mình đã yêu nhau được 💕
  </h2>

  <div className="relative flex items-center justify-center">
    <svg className="w-40 h-40 transform -rotate-90">
      <circle
        cx="80"
        cy="80"
        r="70"
        stroke="#fce7f3"
        strokeWidth="10"
        fill="none"
      />
      <circle
        cx="80"
        cy="80"
        r="70"
        stroke="#ec4899"
        strokeWidth="10"
        fill="none"
        strokeDasharray={2 * Math.PI * 70}
        strokeDashoffset={
          2 * Math.PI * 70 * (1 - Math.min(daysTogether / 100, 1))
        }
        strokeLinecap="round"
        className="transition-all duration-700 ease-out"
      />
    </svg>

    <div className="absolute text-center">
      <p className="text-4xl font-bold text-pink-500">{daysTogether}</p>
      <p className="text-sm text-gray-600 mt-1">ngày 💖</p>
    </div>
  </div>

  <p className="text-gray-500 mt-4 text-sm italic">
    (Từ ngày 24 tháng 7 năm 2025 🌸)
  </p>

  <div className="mt-4 text-pink-400 font-medium animate-bounce">
    ❤️ Mãi bên nhau nhé ❤️
  </div>
</div>



      {/* 🎥 Video tự phát */}
      <div className="w-full max-w-2xl mb-10">
        <video
          src="/video_love_page2.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="rounded-2xl shadow-lg w-full h-80 object-cover"
        />
      </div>

      {/* Stepper */}
      {/* Stepper (Mốc thời gian đẹp mắt 💕) */}
<div className="bg-gradient-to-b from-pink-100 to-pink-50 p-6 rounded-2xl shadow-xl w-full max-w-3xl mb-10 border border-pink-200">
  <h3 className="text-2xl font-semibold text-pink-600 mb-6 text-center">
    Những cột mốc đáng nhớ 💞
  </h3>
  <Stepper
    alternativeLabel
    activeStep={milestones.length - 1}
    sx={{
      "& .MuiStepConnector-line": {
        borderColor: "#f472b6", // màu hồng pastel
        borderTopWidth: 3,
        borderRadius: 2,
      },
      "& .MuiStepLabel-label": {
        color: "#ec4899",
        fontWeight: 600,
      },
      "& .Mui-active .MuiStepIcon-root": {
        color: "#ec4899",
        transform: "scale(1.2)",
        transition: "all 0.3s ease-in-out",
      },
      "& .Mui-completed .MuiStepIcon-root": {
        color: "#f472b6",
      },
    }}
  >
    {milestones.map((m, i) => (
      <Step key={i}>
        <StepLabel
          StepIconProps={{
            icon: "💖",
          }}
        >
          <div className="text-center hover:scale-105 transition-transform duration-300">
            <p className="font-semibold text-gray-700">{m.label}</p>
            <p className="text-sm text-pink-500 font-medium mt-1">
              {m.date}
            </p>
          </div>
        </StepLabel>
      </Step>
    ))}
  </Stepper>
</div>


      {/* Modal */}
      {openModal && (
        <Modal open={true} onClose={handleClose}>
          <Box sx={modalStyle} className="text-center">
            <img
              src={people[openModal].img}
              alt={people[openModal].name}
              className="w-40 h-40 rounded-full mx-auto mb-3 shadow-md object-cover border-4 border-pink-200"
            />
            <Typography variant="h6" className="text-pink-600 font-bold mb-2">
              {people[openModal].name}
            </Typography>
            <Typography variant="body1" className="text-gray-600 mb-4">
              {people[openModal].info}
            </Typography>
            <button
              onClick={handleClose}
              className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600"
            >
              Đóng 💕
            </button>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default LovePage;
