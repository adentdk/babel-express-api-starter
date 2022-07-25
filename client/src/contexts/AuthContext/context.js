import { createContext } from "react";

const initialValue = {
  token: null,
  isLogin: false,
  setToken: (token = '') => {},
  logout: () => {}
}

const AuthContext = createContext(initialValue);

export default AuthContext