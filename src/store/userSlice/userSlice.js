import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { saveId, saveToken } from "../../services/FakeApi";
export const baseUrl = "https://apicapstonejson.herokuapp.com";

const initialState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state = action.payload;
    },
    updateUser: (state, action) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const { login, updateUser } = userSlice.actions;

export const loginAsync = (data) => (dispatch) => {
  axios({
    url: `${baseUrl}/login`,
    method: "POST",
    data: data,
  })
    .then((resp) => {
      toast.success("Usuário Logado com sucesso");
      saveToken(resp.data.accessToken);
      saveId(resp.data.id);
      dispatch(login(data));
    })
    .catch((error) => toast.error(error.response.data));
};

export const updateUserAsync = (data, id) => (dispatch) => {
  axios({
    url: `${baseUrl}/users/${id}`,
    method: "PATCH",
    data: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  }).then((resp) => dispatch(updateUser(resp.data)));
};

export const getUserProfileAsync = (id) => (dispatch) => {
  axios({
    url: `${baseUrl}/users/${id}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  }).then((resp) => dispatch(updateUser(resp.data)));
};
export default userSlice.reducer;
