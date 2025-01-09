import { useShallow } from 'zustand/shallow'
import Container from '../../components/container'
import { useFlower } from '../../store'
import { Box, Grid2 as Grid, Modal, Typography } from '@mui/material'
import Button from '../../components/button'
import { useNavigate } from 'react-router-dom'
import AddToBasketButton from '../../components/addToBasketButton'
import { useState } from 'react'

const Basket = () => {
  const navigate = useNavigate()
  const [basket, flowers, addToBasket, removeFromBasket, buy] = useFlower(useShallow((state) => [
    state.basket,
    state.flowers,
    state.addToBasket,
    state.removeFromBasket,
    state.buy
  ]))
  const [isModalOpen, setIsModalOpen] = useState(false)

  const basketItems = Object.values(basket).filter((item) => item.count)
  const totalPrice = basketItems.reduce<number>((acc, item) => {
    const { id, count } = item

    return acc + (flowers?.[id]?.price || 0) * count
  }, 0)

  const changeBasket = (id: number) => (type: 'minus' | 'plus', isAll?: boolean) => {
    (type === 'minus' ? removeFromBasket : addToBasket)(id, isAll)
  }

  return (
    <>
      <Container>
        {
          basketItems.length ?
            <Box display="flex" flexDirection="column" gap={2} width="100%">
              <Typography variant='h3' color='var(--green-dark)'>Корзина</Typography>
              <Grid container spacing={3}>
                <Grid size={9}>
                  {basketItems.map(({ count, id }) => {
                    const flower = flowers[id]
                    if (!flower) return null

                    return (
                      <Box width="100%" border="1px solid var(--brown)" height={240} p={2} display="flex" gap={2}>
                        <img
                          src={!flower.isNew ? `/public/flower_${flower.src}.png` : `data:image/png;base64,${localStorage.getItem(flower.src)}`}
                          style={{ height: '100%' }} 
                        />
                        <Box
                          width="100%"
                          display="flex"
                          justifyContent="space-between"
                          flexDirection="column"
                        >
                          <Box>
                            <Typography color='var(--brown)' variant='h4'>{flower.name}</Typography>
                            <Typography color='var(--brown)' variant='h4'>{flower.price} р.</Typography>
                          </Box>
                          <Box
                            width="100%"
                            display="flex"
                            justifyContent="space-between"
                          >
                            <AddToBasketButton inBasket={count} inStock={flower.inStock} changeBasket={changeBasket(flower.id)} />
                            <Button btnType='BROWN' size='large' onClick={() => changeBasket(flower.id)('minus', true)}>Удалить</Button>
                          </Box>
                        </Box>
                      </Box>
                    )
                  }
                  )}
                </Grid>
                <Grid size={3}>
                  <Box width="100%" p={2} bgcolor="var(--green)">
                    <Typography variant='h4' color='var(--brown)'>
                      Итого: <span style={{ color: "var(--green-dark)" }}>{totalPrice} р.</span>
                    </Typography>
                    <Button btnType='BROWN' size='large' fullWidth style={{ marginTop: 16 }} onClick={() => setIsModalOpen(true)}>Оформить заказ</Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            :
            <Box height="100%" display="flex" justifyContent="center" alignItems="center">
              <Box
                width={460}
                height={460}
                border="1px solid var(--brown)"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="center"
                p={5}
              >
                <img src='/public/basket.svg' />
                <Typography
                  variant='h4'
                  color='var(--brown)'
                  textAlign="center"
                >
                  К сожалению<br /> корзина пока пуста
                </Typography>
                <Button btnType='BROWN' onClick={() => navigate('/catalog')} size='large' fullWidth>Перейти в каталог</Button>
              </Box>
            </Box>
        }

      </Container >

      <Modal onClose={() => setIsModalOpen(false)} open={isModalOpen}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant='h4' color='var(--brown-dark)' textAlign="center">
            Поздравляем!<br /> Доставка успешно оформлена!
          </Typography>
          <Button
            btnType='BROWN'
            size='large'
            fullWidth
            style={{ marginTop: 16 }}
            onClick={() => {
              setIsModalOpen(false)
              buy()
              navigate('/catalog')
            }}
          >Продолжить</Button>
        </Box>
      </Modal>
    </>

  )
}

export default Basket