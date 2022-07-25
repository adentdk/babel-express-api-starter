import { useCallback, useMemo } from "react";
import {useCookies} from 'react-cookie';
import AuthContext from "./context";

function Provider ({children}) {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const token = useMemo(() => cookies.token, [cookies.token]);

  const isLogin = useMemo(() => !!token, [token]);;

  const setToken = useCallback((token) => {
    if (token) {
      const expiredDate = new Date();

      expiredDate.setDate(expiredDate.getDate() + 3);
  
      setCookie('token', token, {
        expires: expiredDate,
      })
    }
  }, [setCookie]);

  const logout = useCallback(() => {
    removeCookie('token')
  }, [removeCookie])

  return (
    <AuthContext.Provider value={{token, isLogin, setToken, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export default Provider;
