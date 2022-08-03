import { Route, Routes } from "react-router";
import ADDvehicle_Registration from "../Components/Add_Vehicle_registration";

import Dashboard from "./Dashborad.js/Dashboard";

function Pages() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/addregistration" element={<ADDvehicle_Registration />} />
        <Route
          path="/Editregistration/:_id"
          element={<ADDvehicle_Registration />}
        />
      </Routes>
    </>
  );
}
export default Pages;
