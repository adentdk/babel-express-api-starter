import api from "../services/api"
import { Cookies } from "react-cookie"
import { useCallback, useEffect, useRef } from "react"

const withApiInterceptors = (Component) => {
  return (props) => {

    const cookies = useRef(new Cookies());

    const applyRequestInterceptors = useCallback(() => {
      return [
        api.interceptors.request.use(
          originalConfig => {
            let config = { ...originalConfig };

            const token = cookies?.current.get('token')

            if (token) {
              config.headers.authorization = `Bearer ${token}`
            }

            return config
          },
        )
      ]
    }, [cookies])

    useEffect(() => {
      const reqInterceptors = applyRequestInterceptors();

      return () => {
        reqInterceptors.forEach(interceptor => {
          api.interceptors.request.eject(interceptor)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <Component {...props} />
  }
}

export default withApiInterceptors;