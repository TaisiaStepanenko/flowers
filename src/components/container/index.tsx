import React from 'react'
import { StyledContainer, StyledHeader, StyledLogo } from './styles'
import Button from '../button'
import { Box } from '@mui/material'
import { useFlower } from '../../store'
import { useShallow } from 'zustand/shallow'
import { useLocation, useNavigate } from 'react-router-dom'

const Container = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [user, logout] = useFlower(useShallow((store) => [store.user, store.logout]))
  const isAdmin = user?.role === 'ADMIN'

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledLogo src='/public/Flowers.svg' />
        <Box gap={2} display="flex">
          {pathname !== '/catalog' && <Button
            btnType='WHITE'
            variant='outlined'
            onClick={() => navigate('/catalog')}
          >
            Каталог

          </Button>}
          {isAdmin &&
            <Button
              btnType='WHITE'
              variant='outlined'
              onClick={() => navigate('/dashboard')}
            >
              Добавить букет
            </Button>
          }
          {user &&
            <Button
              btnType='WHITE'
              variant='outlined'
              onClick={() => navigate('/basket')}
            >
              Корзина
            </Button>
          }
          {user ?
            <Button
              btnType='WHITE'
              variant='outlined'
              onClick={() => logout()}
            >
              Выйти
            </Button> :
            pathname !== '/auth'
              ?
              <Button
                btnType='WHITE'
                variant='outlined'
                onClick={() => navigate('/auth')}
              >
                Войти
              </Button>
              :
              null
          }
        </Box>
      </StyledHeader>
      <Box m='0px auto' p="20px" width="100%" maxWidth="1580px" height="100%">
        {children}
      </Box>
    </StyledContainer>
  )
}

export default Container