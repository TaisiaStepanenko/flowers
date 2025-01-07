import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import Input from '../../components/input'
import Button from '../../components/button'
import { useNavigate } from 'react-router-dom'
import { useFlower } from '../../store'
import { useShallow } from 'zustand/shallow'

const Register = ({ setIsLogin }: { setIsLogin: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const navigate = useNavigate();

  const register = useFlower(useShallow((state) => state.register))

  const [error, setError] = useState('')
  const [user, setUser] = useState({
    login: '',
    phone: '',
    email: '',
    password: '',
  })

  const onRegister = () => register(user, () => navigate('/catalog'), (error) => setError(error))

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <>
      <Typography variant='h3' color='var(--brown-dark)' style={{ alignSelf: 'center' }}>Регистрация</Typography>
      <Box
        width={560}
        flexDirection="column"
        display="flex"
        gap={2}
      >
        <Input label='Логин' name="login" onChange={onChange} error={Boolean(!user.login && error)} required />
        <Input label='Телефон' type='tel' name="phone" onChange={onChange} />
        <Input label='Почта' type='mail' name="email" onChange={onChange} />
        <Input label='Пароль' type='password' name="password" onChange={onChange} error={Boolean(!user.password && error)} helperText={error} required />
      </Box>
      <Button onClick={onRegister} btnType='BROWN'>Зарегистрироваться</Button>
      <Button btnType='WHITE' onClick={() => setIsLogin(true)}>Войти в аккаунт</Button>
    </>
  )
}

export default Register