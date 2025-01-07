import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import Input from '../../components/input'
import Button from '../../components/button'
import { useFlower } from '../../store'
import { useShallow } from 'zustand/shallow'
import { useNavigate } from 'react-router-dom'

const Login = ({ setIsLogin }: { setIsLogin: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const navigate = useNavigate();

  const login = useFlower(useShallow((state) => state.login))

  const [error, setError] = useState('')
  const [user, setUser] = useState({ login: '', password: '' })

  const onLogin = () => login(user, () => navigate('/catalog'), (error) => setError(error))

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <>
      <Typography variant='h3' color='var(--brown-dark)' style={{ alignSelf: 'center' }}>Авторизация</Typography>
      <Box
        width={560}
        flexDirection="column"
        display="flex"
        gap={2}
      >
        <Input label='Логин' onChange={e => onChange(e)} name='login' error={Boolean(!user.login && error)} />
        <Input label='Пароль' onChange={e => onChange(e)} name='password' error={Boolean(!user.password && error)} helperText={error} />
      </Box>
      <Button onClick={onLogin} btnType='BROWN'>Войти в аккаунт</Button>
      <Button btnType='WHITE' onClick={() => setIsLogin(false)}>Зарегистрироваться</Button>
    </>
  )
}

export default Login