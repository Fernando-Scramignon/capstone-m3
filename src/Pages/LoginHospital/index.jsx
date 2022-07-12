import { Container, LoginForm } from "./style";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAsync } from "../../store/userSlice/userSlice";

function LoginHospital() {
  const dispatch = useDispatch();
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
    dispatch(loginAsync(data));
  };

  const history = useHistory();

  function goToRegisterPage() {
    history.push("/RegisterHospital");
  }

  return (
    <Container>
      <section className="logoHospital">
        <h1>Doe Vida</h1>
        <span>Hospital</span>
      </section>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <section className="inputSection">
          <div className="input">
            <div className="labelDiv">
              <label htmlFor="email">Email</label>
              {errors?.email?.message && (
                <span> - {errors?.email?.message}</span>
              )}
            </div>
            <input
              type="email"
              placeholder="Digite aqui o seu email"
              {...register("email")}
            />
          </div>
          <div className="input">
            <div className="labelDiv">
              <label htmlFor="password">Senha</label>
              {errors?.password?.message && (
                <span> - {errors?.password?.message}</span>
              )}
            </div>
            <input
              type="password"
              placeholder="Digite aqui sua senha"
              {...register("password")}
            />
          </div>
        </section>
        <section className="buttonSection">
          <button type="submit">Entrar</button>
          <span onClick={goToRegisterPage}>Não possui cadastro?</span>
          <span
            onClick={() => {
              history.push("/");
            }}
            className="voltar"
          >
            Voltar
          </span>
        </section>
      </LoginForm>
    </Container>
  );
}

export default LoginHospital;
