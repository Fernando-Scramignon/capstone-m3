import HeaderAlt from "../../components/HeaderAlt";
import { Container, Content } from "./style";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { updateUserAsync } from "../../store/userSlice/userSlice";

function EditUser() {
  const userData = useSelector((state) => state.user);
  console.log(userData);
  const dispatch = useDispatch();
  const userTokenData = jwtDecode(localStorage.getItem("token"));

  const formSchema = yup.object().shape({
    name: yup.string().required("Este campo é obrigatório"),
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
    resolver: yupResolver(formSchema),
  });

  const handleChange = (data) => {
    dispatch(updateUserAsync(data, userTokenData.sub));
  };

  return (
    <>
      <HeaderAlt />

      <Container>
        <Content>
          <form onSubmit={handleSubmit(handleChange)}>
            <h1>Editar</h1>

            <div>
              <div className="validacao">
                <label>Nome</label>
                <p className="erro">{errors.name?.message}</p>
              </div>
              <input
                type="text"
                placeholder=" Digite seu nome"
                {...register("name")}
              />
            </div>

            <div>
              <div className="validacao">
                <label>Data de nascimento</label>
                <p className="erro">{errors.dataNacimento?.message}</p>
              </div>
              <input
                type="text"
                placeholder=" ex: 07/07/1979"
                {...register("dataNacimento")}
              />
            </div>

            <div>
              <div className="validacao">
                <label>CPF</label>
                <p className="erro">{errors.cpf?.message}</p>
              </div>
              <input
                type="text"
                placeholder=" ex: 123.456.789-01"
                {...register("cpf")}
              />
            </div>

            <div>
              <div className="validacao">
                <label>Email</label>
                <p className="erro">{errors.email?.message}</p>
              </div>
              <input
                type="text"
                placeholder=" Digite seu email"
                {...register("email")}
              />
            </div>

            <div>
              <div className="validacao">
                <label>Endereço</label>
                <p className="erro">{errors.endereco?.message}</p>
              </div>
              <input
                type="text"
                placeholder=" Digite seu endereço"
                {...register("endereco")}
              />
            </div>

            <div>
              <div className="validacao">
                <label>Telefone</label>
                <p className="erro">{errors.telefone?.message}</p>
              </div>
              <input
                type="text"
                placeholder=" Digite seu telefone"
                {...register("telefone")}
              />
            </div>

            <div>
              <div className="validacao">
                <label>Senha</label>
                <p className="erro">{errors.senha?.message}</p>
              </div>
              <input
                type="password"
                placeholder=" Digite uma senha"
                {...register("senha")}
              />
            </div>

            <div>
              <div className="validacao">
                <label>Confirmar senha</label>
                <p className="erro">{errors.confirmarSenha?.message}</p>
              </div>
              <input
                type="password"
                placeholder=" Confirme sua senha"
                {...register("confirmarSenha")}
              />
            </div>

            <div className="btn">
              <button type="submit">Editar</button>
            </div>
            <span>
              <Link to="/Schedules">Voltar</Link>
            </span>
          </form>
        </Content>
      </Container>
    </>
  );
}

export default EditUser;
