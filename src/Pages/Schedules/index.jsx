import CardSchedulesUser from "../../components/CardSchedulesUser/index.jsx";
import HeaderAlt from "../../components/HeaderAlt";
import { Container } from "./style";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { schedulesContext } from "../../providers/SchedulesList";
import { useContext } from "react";
import { userDataContext } from "../../providers/UserDataProfile.js";
import { BiEdit } from "react-icons/bi";


function Schedules() {
  const userId = localStorage.getItem("@CapstoneM3:userId");
  const { SchedulesList } = useContext(schedulesContext);
  const { requisiçãoShedules } = useContext(schedulesContext);
  const { requisiçãoDados } = useContext(userDataContext);
  const history = useHistory();
  const nameUser = localStorage.getItem("@CapstoneM3:NameUser");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
    }
  }, []);

  const schedulesFilterUser =
    SchedulesList &&
    SchedulesList.filter((item) => {
      return item.userId === +userId;
    });

  function agendation() {
    if (schedulesFilterUser && schedulesFilterUser.length === 0) {
      return <h3>Nenhum agendamento</h3>;
    }
    return (
      <ul>
        {schedulesFilterUser &&
          schedulesFilterUser.map(({ id, date, address, company_name }) => (
            <CardSchedulesUser
              name={company_name}
              address={address}
              date={date}
              key={id}
            />
          ))}
      </ul>
    );
  }

  return (
    <Container>
      <HeaderAlt />
      <div className="topPage">
        <div className="Infos">
          <div className="buttonEContainer">
            <button
               onClick={async () =>   {
                 await history.push("/EditUser");
                 requisiçãoDados()
               console.log("aqui", requisiçãoDados())
              }}
              className="E"
            >
             <BiEdit />

            </button>
          </div>
          <h1 className="nameUser">Olá, {nameUser}</h1>
        </div>
        <button onClick={() => history.push("/Requirements")} className="doar">
          Doar
        </button>
      </div>

      <hr />
      <h2>Agendamentos</h2>
      <main>{agendation()}</main>
    </Container>
  );
}
export default Schedules;
