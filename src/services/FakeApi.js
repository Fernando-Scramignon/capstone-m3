import axios from "axios";
import { toast } from "react-toastify";

//baseUrl
const baseUrl = "https://apicapstonejson.herokuapp.com";

//save token in localStorage
const saveToken = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
};
//save id in localStorage
const saveId = (id) => {
  localStorage.setItem("id", JSON.stringify(id));
};

export const loginUser = (data) =>
  axios({
    url: `${baseUrl}/login`,
    method: "POST",
    data: data,
  })
    .then((resp) => {
      toast.success("Usuário Logado com sucesso");
      saveToken(resp.data.accessToken);
      saveId(resp.data.id);
    })
    .catch((error) => toast.error(error.response.data));

export const registerUser = (data) =>
  axios({
    url: `${baseUrl}/register`,
    method: "POST",
    data: data,
  })
    .then((success) => {
      toast.success("Conta criada com sucesso!");
      return success;
    })
    .catch((err) => {
      if (err.response.data === "Email already exists") {
        toast.error("Email já cadastrado, tente outro!");
      } else {
        toast.error("Ocorreu algum erro. Tente novamente mais tarde");
      }
      return err;
    });

export const editUser = (data, id) => {
  axios({
    url: `${baseUrl}/register/${id}`,
    method: "PATCH",
    data: data,
  });
};
