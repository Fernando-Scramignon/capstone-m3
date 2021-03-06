import { Route, Switch } from "react-router-dom";

import EditHospital from "../Pages/EditHospital";
import EditUser from "../Pages/EditUser";
import Home from "../Pages/Home";

import Requirements from "../Pages/Requirements";
import LoginHospital from "../Pages/LoginHospital";
import LoginUser from "../Pages/LoginUser";
import RegisterHospital from "../Pages/RegisterHospital";
import HospitalProfile from "../Pages/HospitalProfile";
import DateAvaliable from "../Pages/DateAvaliable";
import RegisterUser from "../Pages/RegisterUser";
import Schedules from "../Pages/Schedules";
import PatientsScheduleList from "../Pages/PatientsScheduleList";
import HospitalList from "../Pages/HospitalList";
import SchedulesByDate from "../Pages/SchedulesByDate";

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/Requirements">
        <Requirements />
      </Route>
      <Route exact path="/LoginUser">
        <LoginUser />
      </Route>
      <Route exact path="/LoginHospital">
        <LoginHospital />
      </Route>
      <Route exact path="/RegisterUser">
        <RegisterUser />
      </Route>
      <Route exact path="/RegisterHospital">
        <RegisterHospital />
      </Route>
      <Route exact path="/EditHospital">
        <EditHospital />
      </Route>
      <Route exact path="/EditUser">
        <EditUser />
      </Route>
      <Route exact path="/HospitalProfile">
        <HospitalProfile />
      </Route>
      <Route exact path="/DateAvaliable">
        <DateAvaliable />
      </Route>
      <Route exact path="/Schedules">
        <Schedules />
      </Route>
      <Route exact path="/PatientsScheduleList">
        <PatientsScheduleList />
      </Route>
      <Route exact path="/HospitalList">
        <HospitalList />
      </Route>
      <Route exact path="/SchedulesByDate">
        <SchedulesByDate />
      </Route>
    </Switch>
  );
}

export default Routes;
