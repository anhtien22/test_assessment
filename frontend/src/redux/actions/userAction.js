import axios from "axios";
import { LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_SUCCESS, UPDATE_PROFILE_SUCCESS } from "../constants/userConstant";
const baseUrl = "http://localhost:4000"
// Login
export const login = (userLogin, navigate, addToast) => async (dispatch) => {
  try {

    const { data } = await axios.post(`${baseUrl}/api/users/login`, userLogin)
    localStorage.setItem('userInfo', JSON.stringify(data.user))
    localStorage.setItem('userToken', JSON.stringify(data.token))
    if (addToast) {
      addToast("Đăng nhập thành công", { appearance: "success", autoDismiss: true });
    }
    navigate("/profile")

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });

  } catch (error) {
    if (addToast) {
      addToast(`${error.response.data.error}`, { appearance: "error", autoDismiss: true });
    }
  }
  return false;

};
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(`${baseUrl}/api/users/profile`);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

export const editProfile = (payload, addToast) => async (dispatch) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (payload.fullname === "") {
    addToast("Tên không được để trống", { appearance: "error", autoDismiss: true });
  }
  if (payload.birthday === "") {
    addToast("Ngày sinh không được để trống", { appearance: "error", autoDismiss: true });
  }
  if (payload.email === "") {
    addToast("Email không được để trống", { appearance: "error", autoDismiss: true });
  } else if (!regex.test(payload.email)) {
    addToast("Email không hợp lệ", { appearance: "error", autoDismiss: true });
  }


  try {

    const userToken = JSON.parse(localStorage.getItem('userToken'))
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        "Authorization": `Bearer ${userToken || ''}`,
      }
    };
    if (payload) {
      const { data } = await axios.patch(`${baseUrl}/api/users/profile/update`, payload, config);
      if (addToast) {
        addToast("Hồ sơ của bạn được cập nhật thành công", { appearance: "success", autoDismiss: true });
      }
      localStorage.setItem('userInfo', JSON.stringify(data.user))
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    }

  } catch (error) {
    console.log(error);

  }
}
export const logout = async () => {
  try {

    localStorage.removeItem('userInfo')
    localStorage.removeItem('userToken')
    // window.location.replace("/")

  } catch (err) {
    console.log(err);
  }
}
