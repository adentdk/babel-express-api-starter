import api from "../services/api"
import { useCallback, useEffect } from "react"

const withApiInterceptors = (Component) => {
  return (props) => {

    const applyRequestInterceptors = useCallback(() => {
      return [
       
      ]
    }, [])

    useEffect(() => {
      const reqInterceptors = applyRequestInterceptors();

      return () => {
        reqInterceptors.forEach(interceptor => {
          api.interceptors.request.eject(interceptor)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Component {...props} />
  }
}

export default withApiInterceptors;