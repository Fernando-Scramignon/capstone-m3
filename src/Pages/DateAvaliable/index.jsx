import HeaderAlt from "../../components/HeaderAlt";
import { Container, Content } from "./style";
import { toast } from "react-toastify";
import { createSchedule, getShedule, getUser } from "../../services/FakeApi";
import { useState } from "react";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import { schedulesContext } from "../../providers/SchedulesList";
import { useContext } from "react";

registerLocale("pt-br", ptBR);

function DateAvaliable() {
  const { requisiçãoShedules } = useContext(schedulesContext);
  const history = useHistory();
  const [currentHospital, setCurrentHospital] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    getHospitalById();
    getUserById();
  }, []);

  async function getHospitalById() {
    const response = await getUser(localStorage.getItem("currentHospitalId"));
    setCurrentHospital(response);

  }

  async function getUserById() {
    const response = await getUser(localStorage.getItem("@CapstoneM3:userId"));
    setCurrentUser(response);
  }

  const [startDate, setStartDate] = useState(null);

  const dateFormatAux = (date) => {
    let scheduled = new Date(date),
      month = "" + (scheduled.getMonth() + 1),
      day = "" + scheduled.getDate(),
      year = scheduled.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const dateFormat = (date) => {
    let formatYearMonthDay = dateFormatAux(date);

    return formatYearMonthDay;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let scheduledYMD = "";
    if (startDate != null) scheduledYMD = dateFormat(startDate);

    let formData = {
      scheduledDate: startDate,
      scheduledDateFmtYMD: scheduledYMD,
    };

    const output = {
      date: formData.scheduledDateFmtYMD,
      userId: Number(localStorage.getItem("@CapstoneM3:userId")),
      company_number: currentHospital.company_number,
      company_name: currentHospital.company_name,
      email: currentUser.email,
      name: currentUser.name,
      address: currentHospital.address,
    };

    const schedule = await getShedule();

    const currentDaySchedules = schedule.data.filter(
      (item) =>
        item.company_number === output.company_number &&
        item.date === output.date
    );

    if (!output.date) {
      toast.error("Por favor selecione uma data.");
    } else if (currentDaySchedules.length >= 20) {
      toast.error("Data esgotada. Por favor selecione outra");
    } else {
      toast.success("Agendamento criado com sucesso!");
      history.push("/Schedules");
      await createSchedule(output);
      requisiçãoShedules();
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
    }
  }, []);
  return (
    <>
      <HeaderAlt />
      <Container>
        <Content>
          <form onSubmit={handleSubmit}>
            <h1>{currentHospital?.company_name}</h1>
            <p>{currentHospital?.address}</p>
            <div className="form__datepicker">
              <label>Escolha sua data</label>
              <DatePicker
                selected={startDate}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                onChange={(date) => setStartDate(date)}
                filterDate={(date) =>
                  date.getDay() !== 6 && date.getDay() !== 0
                }
                placeholderText="Clique para escolher"
                locale="pt-br"
                id="selectedDate"
                excludeDates={[new Date()]}
              />
              <button id="button" type="submit">
                Agendar
              </button>
            </div>
          </form>
        </Content>
      </Container>
    </>
  );
}

export default DateAvaliable;
