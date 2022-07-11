import { useForm } from "react-hook-form";
import { Container, Content } from "./style";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginUser } from "../../services/FakeApi";
import { useHistory } from "react-router-dom";

function LoginUser() {
  const schema = yup
    .object({
      email: yup.string().required("Digite seu e-mail").email("email inválido"),
      password: yup.string().required("Digite sua senha"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    loginUser(data)
      .then((resp) => {
        history.push("/Schedules");
      })
      .catch((error) => console.log(error.response.data));
  };
  const history = useHistory();

  function goToRegisterPage() {
    history.push("/RegisterUser");
  }
  return (
    <Container>
      <Content>
        <h1>Doe Vida</h1>
        <h2>Doador</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <p>Login</p>
          <div>
            <label>Email</label>
            <span>{errors.email?.message} </span>
            <input
              name="email"
              type="text"
              placeholder=" Digite aqui seu email"
              {...register("email")}
            />
          </div>
          <div>
            <label>Senha</label>
            <span>{errors.password?.message} </span>
            <input
              name="password"
              type="password"
              placeholder=" Digite sua senha"
              {...register("password")}
            />
          </div>
          <button>Entrar</button>
          <span onClick={goToRegisterPage}>Não possui uma conta?</span>
          <span
            onClick={() => {
              history.push("/");
            }}
            className="voltar"
          >
            Voltar
          </span>
        </form>
      </Content>
    </Container>
  );
}

export default LoginUser;
