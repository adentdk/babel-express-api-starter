import useAuth from "../../hooks/useAuth"
import { Routes, Route, Navigate } from "react-router-dom"
import { useCallback } from "react";

function Navigation({ routes }) {
  const isLogin = useAuth().isLogin;

  const renderMustAuthenticated = useCallback((route) => {
    if (isLogin) {
      return (
        <route.component routes={route.routes}></route.component>
      )
    }

    return <Navigate to={{pathname: '/login', search: `?from=${route.path}`}} />
  }, [isLogin]);

  const renderMustUnAuthenticated = useCallback((route) => {
    if (!isLogin) {
      return (
        <route.component routes={route.routes}></route.component>
      )
    }

    return <Navigate to={{pathname: '/chats'}} />
  }, [isLogin]);

  return (
    <Routes>
      {routes.map((route, index) => {

        if (route.navigate) {
          return (
            <Route
              key={index}
              path={route.path}
              element={<Navigate key={index} to={{ pathname: route.navigate }} />}
            />
          )
        }

        if (route.meta.private) {
          return (
            <Route
              key={index}
              path={route.path}
              element={renderMustAuthenticated(route)}
            />
          )
        }

        if (route.meta.unAuth) {
          return (
            <Route
              key={index}
              path={route.path}
              element={renderMustUnAuthenticated(route)}
            />
          )
        }

        return (
          <Route
            key={index}
            path={route.path}
            element={<route.component routes={route.routes}></route.component>}
          />
        )
      })}
    </Routes>
  )
}

export default Navigation