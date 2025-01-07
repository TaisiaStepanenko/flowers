import Container from '../../components/container'
import { Box } from '@mui/material'
import { useState } from 'react'
import Login from './login'
import Register from './register'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <Container>
      <Box
        flexDirection="column"
        height="100%"
        alignContent="center"
        justifyContent="center"
        display="flex"
      >
        <Box
          justifyContent="center"
          display="flex"
          flexDirection="column"
          alignContent="center"
          gap={3}
          m="0 auto"
        >
          {isLogin
            ? <Login setIsLogin={setIsLogin} />
            : <Register setIsLogin={setIsLogin} />
          }
        </Box>
      </Box>
    </Container>
  )
}

export default Auth