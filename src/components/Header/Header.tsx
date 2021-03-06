import s from './Header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { loginThunk, logoutThunk } from '../../redux/auth'
import { useEffect } from 'react'

export const Header = () => {
  const auth = useSelector((state: any) => state.auth)
  const dispatch = useDispatch()
  const logout = async () => {
    dispatch(logoutThunk())
  }
  useEffect(() => {
  }, [auth.id])
  return <header id={s.header}>
    {
      auth.id
        ? <div>
          <button onClick={logout} type="button">Выйти</button>
          <div id={s.login}>{auth.login}</div>
        </div>
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        : <AuthForm/>
    }
  </header>
}
// ----------------------------------------------------------------------------------------------------------------------
const AuthForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const serverError = ''
  const dispatch = useDispatch()
  const onSubmit = async (data: any) => {
    dispatch(loginThunk(data))
  }

  // watch // watch input value by passing the name of it
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <table>
        <tbody>
        <tr>
          <td>Email</td>
          <td>
            <input placeholder='Email@gmail.com'
                   {...register('email', { required: true })} />
            {errors.email && <span>email</span>}
          </td>
        </tr>
        <tr>
          <td>password</td>
          <td>
            <input placeholder='password'
                   {...register('password', { required: true })} />
            {errors.password && <span>password</span>}
          </td>
        </tr>
        <tr>
          <td>remember my</td>
          <td>
            <input type={'checkbox'} placeholder="rememberMe" {...register('rememberMe')} />
          </td>
        </tr>
        </tbody>
      </table>
      <input type="submit" value={'Отправить'}/>
      {serverError}
    </form>
  )
}
