import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import FormInput from "../../design-systems/molecules/FormInput/FormInput";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

function Login({modalAction}) {
  const setToken = useAuth().setToken
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true)
    api.post('/v1/auth/login', data)
      .then(response => {
        const token  = response.data.data.accessToken;
        setToken(token);
      }).catch(error => {
        const errorDescription = error.response?.data?.message || ''
        modalAction.setTitle('Login Failed')
        modalAction.setDescription(errorDescription)
        modalAction.setType('error')
        modalAction.open()
      }).finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    document.title = 'Login'
  }, [])

  return (
    <div className="flex flex-1 flex-col justify-center items-center h-screen bg-gray-50">
      <div className="shadow-2xl rounded-xl p-5 bg-white w-1/3">
        <h3 className="text-2xl font-light text-blue-700 text-center mb-4">Login</h3>

        <p className="text-base font-extralight text-gray-700 text-center">Login to your account to start chatting</p>

        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            className="mb-4"
            id="username"
            label="Username"
            type="text"
            placeholder="Input your username"
            defaultValue=""
            disabled={loading}
            {...register('username', {
              required: {
                value: true,
                message: 'required'
              }
            })}
          />

          <FormInput
            className="mb-4"
            id="password"
            label="Password"
            type="password"
            placeholder="Input your password"
            defaultValue=""
            disabled={loading}
            {...register('password', {
              required: {
                value: true,
                message: 'required'
              }
            })}
          />

          <button className="bg-blue-700 p-2 w-full text-white rounded-lg disabled:bg-slate-500" disabled={loading}>Sign in</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
