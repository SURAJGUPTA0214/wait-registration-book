import { Route, Routes } from "react-router-dom";
import WaitingRegistration from "../waitingRegistration";
import 'bootstrap/dist/css/bootstrap.min.css';
import Status from "../status";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addFormSubmission } from "../waitingRegistration/waitingRegistrationSlice";

const PagesLinks = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 1000) + 1;

      let inviteCode = "new319";

      if (randomNumber >= 100 && randomNumber <= 200) {
        inviteCode = "alvin145";
      } else if (randomNumber > 200 && randomNumber <= 300) {
        inviteCode = "austin234";
      } else if (randomNumber > 300 && randomNumber <= 400) {
        inviteCode = "karthik321";
      } else if (randomNumber > 400 && randomNumber <= 500) {
        inviteCode = "suraj3219";
      } else if (randomNumber > 500 && randomNumber <= 600) {
        inviteCode = "raj32184";
      } else if (randomNumber > 600 && randomNumber <= 700) {
        inviteCode = "jay31570";
      } else if (randomNumber > 700 && randomNumber <= 800) {
        inviteCode = "jp800";
      }

      const first_names = ["Jay", "Priya", "Rahul", "Ananya", "Suraj", "Neha", "Arjun", "Simran", "Chintu", "Ayesha", "Manish", "Divya", "Kunal", "Sanya", "Sameer", "Radhika", "Aditya", "Isha", "Raj", "Komal"];
      const last_names = ["Sharma", "Patel", "Gupta", "Singh", "Mehta", "Verma", "Reddy", "Iyer", "Shah", "Yadav", "Shukla", "Bhatia", "Kumar", "Chopra", "Joshi", "Agarwal", "Dubey", "Malhotra", "Jain", "Pandey"];

      let firstIndex = Math.floor(Math.random() * 20);
      let lastIndex = Math.floor(Math.random() * 20);

      dispatch(
        addFormSubmission({
          username: `${first_names[firstIndex]} ${last_names[lastIndex]}`,
          inviteCode: inviteCode,
          auto: true,
        })
      );
    }, 10000);

    return () => clearInterval(timer);
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<WaitingRegistration />} />
      <Route path="/status" element={<Status />} />
    </Routes>
  );
};
export default PagesLinks;
