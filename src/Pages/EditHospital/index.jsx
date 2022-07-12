import { Container, RegisterForm } from "./style";
import HeaderAlt from "../../components/HeaderAlt";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUserAsync } from "../../store/userSlice/userSlice";
import jwtDecode from "jwt-decode";

function EditHospital() {
  const userTokenData = jwtDecode(localStorage.getItem("token"));
  const dispatch = useDispatch();

  const history = useHistory();

  const validationForm = yup.object().shape({
    name: yup.string().required("Este campo é obrigatório"),
    razaoSocial: yup.string().required("Este campo é obrigatório"),
    cnpj: yup
      .string()
      .required("Este campo é obrigatório")
      .matches(
        /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
        "Formato do CNPJ:00.000.000/0000-00"
      ),
    dataNacimento: yup
      .string()
      .required("Este campo é obrigatório")
      .matches(
        "^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}$",
        "Formato da data:dd/mm/aaaa"
      ),
    cpf: yup
      .string()
      .required("Este campo é obrigatório")
      .matches(
        "[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}",
        "Formato para CPF:000.000.000-00"
      ),
    endereco: yup.string().required("Este campo é obrigatório"),
    telefone: yup
      .string()
      .required("Este campo é obrigatório")
      .matches(
        "^([1-9]{2}) [9]{0,1}[6-9]{1}[0-9]{3}-[0-9]{4}$",
        "Formato do telefone :00 0000-0000"
      ),
    email: yup
      .string()
      .required("Este campo é obrigatório")
      .email("Email inválido"),
    senha: yup
      .string()
      .required("Este campo é obrigatório")
      .matches(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$",
        " A senha deve conter 8 caracteres, uma letra maiúscula, um número e um caractere especial!"
      ),
    confirmarSenha: yup
      .string()
      .required("Este campo é obrigatório")
      .oneOf([yup.ref("senha"), null], "As senhas devem corresponder"),
    check: yup.boolean().isTrue("Você não aceitou os termos!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationForm),
  });

  const handleChange = (data) => {
    console.log(data);
    dispatch(updateUserAsync(data, userTokenData.sub));
  };

  return (
    <>
      <HeaderAlt type="hospital" />
      <Container>
        <RegisterForm onSubmit={handleSubmit(handleChange)}>
          <h1> Editar Cadastro</h1>
          <section className="inputSection">
            <div className="inputs">
              <label htmlFor="name">Nome da empresa</label>
              <p className="erro">{errors.name?.message}</p>
            </div>
            <input
              type="text"
              placeholder="Digite aqui o nome do hospital"
              {...register("name")}
            />
            <div className="inputs">
              <label htmlFor="social">Razão Social</label>
              <p className="erro">{errors.razaoSocial?.message}</p>
            </div>
            <input
              type="text"
              placeholder="Digite aqui a social"
              {...register("razaoSocial")}
            />
            <div className="inputs">
              <label htmlFor="cnpj">CNPJ</label>
              <p className="erro">{errors.cnpj?.message}</p>
            </div>
            <input
              type="text"
              placeholder="Digite aqui o cnpj"
              {...register("cnpj")}
            />
            <div className="inputs">
              <label htmlFor="email">Email</label>
              <p className="erro">{errors.email?.message}</p>
            </div>
            <input
              type="email"
              placeholder="Digite aqui o email"
              {...register("email")}
            />
            <div className="inputs">
              <label htmlFor="address">Endereço</label>
              <p className="erro">{errors.endereco?.message}</p>
            </div>
            <input
              type="text"
              placeholder="Digite aqui o endereço"
              {...register("endereco")}
            />
            <div className="inputs">
              <label htmlFor="Telefone">Telefone</label>
              <p className="erro">{errors.telefone?.message}</p>
            </div>
            <input
              type="text"
              placeholder="Digite seu telefone"
              {...register("telefone")}
            />
            <div className="inputs">
              <label htmlFor="password">Senha</label>
              <p className="erro">{errors.senha?.message}</p>
            </div>
            <input
              type="password"
              placeholder="Digite aqui a senha"
              {...register("senha")}
            />
            <div className="inputs">
              <label htmlFor="confirmPassword">Confirmar senha</label>
              <p className="erro">{errors.confirmarSenha?.message}</p>
            </div>
            <input
              type="password"
              placeholder="Confirme sua senha"
              {...register("confirmaSenha")}
            />
          </section>
          <section className="buttonSection">
            <button type="submit">Editar Cadastro</button>
            <span
              onClick={() => {
                history.push("/HospitalProfile");
              }}
            >
              voltar
            </span>
          </section>
        </RegisterForm>
      </Container>
    </>
  );
}

export default EditHospital;
