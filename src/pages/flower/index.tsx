import { useParams } from 'react-router-dom';
import Container from '../../components/container';
import { useFlower } from '../../store';
import { Box, Grid2 as Grid, Typography } from '@mui/material';
import { FLOWER_TYPE } from '../../consts';
import Button from '../../components/button';
import { useShallow } from 'zustand/shallow';
import AddToBasketButton from '../../components/addToBasketButton';

const Flower = () => {
  const { id } = useParams();
  const [flowers, basket, addToBasket, removeFromBasket] = useFlower(useShallow((state) => [
    state.flowers,
    state.basket,
    state.addToBasket,
    state.removeFromBasket
  ]))

  const flower = Object.values(flowers).find(flow => flow.id.toString() === id)
  const basketCount = flower ? basket[flower.id]?.count || 0 : 0

  const changeBasket = (type: 'minus' | 'plus') => {
    if (!flower) return

    (type === 'minus' ? removeFromBasket : addToBasket)(flower.id)
  }


  return (
    <Container>
      {flower ?
        <Grid container spacing={3} >
          <Grid size={{ lg: 3, xs: 12 }} >
            <Box width="100%" height="100%" border="1px solid var(--brown)" p={2}>
              <img
                style={{ width: '100%' }}
                src={!flower.isNew ? `/public/flower_${flower.src}.png` : `data:image/png;base64,${localStorage.getItem(flower.src)}`}
              />
            </Box>
          </Grid>
          <Grid size={{ lg: 9, xs: 12 }}>
            <Box height="100%" display="flex" flexDirection="column" gap={2}>
              <Typography variant='h3'>{flower.name}</Typography>
              <Box bgcolor="var(--green)" p={3} gap={2}>
                <Grid container spacing={2}>
                  <Grid
                    size={{ sm: 12, md: 6 }}
                    sx={{
                      maxHeight: 160,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box>
                      <Typography variant='h4' color="var(--brown-dark)">
                        Стоимость: <span style={{ color: 'var(--green-dark)' }}>{flower.price} p.</span>
                      </Typography>
                      <Typography variant='h4' color="var(--brown-dark)">
                        В наличии: <span style={{ color: 'var(--green-dark)' }}>{`${flower.inStock} ${numWord(flower.inStock, ["букет", "букета", "букетов"])}`}</span>
                      </Typography>
                    </Box>
                    {!basketCount
                      ? <Button
                        btnType='BROWN'
                        size='large'
                        onClick={() => changeBasket('plus')}
                        disabled={!flower.inStock}
                      >
                        В корзину
                      </Button>
                      : <AddToBasketButton
                        changeBasket={changeBasket}
                        inBasket={basketCount}
                        inStock={flower.inStock}
                      />
                    }
                  </Grid>
                  <Grid size={{ sm: 12, md: 6 }}>
                    <Typography variant='h4' color="var(--brown-dark)">Цветы в букете:</Typography>
                    <Typography variant='h4' color="var(--green-dark)">{flower.flowers.map((fl) => FLOWER_TYPE[fl].ru).join(', ')}</Typography>
                    <Typography variant='h4' color="var(--brown-dark)">Описание:</Typography>
                    <Typography variant='h4' color="var(--green-dark)">{flower.description}</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
        : <Box height='100%'>
          <Typography variant='h3'>Букет не найден</Typography>
        </Box>
      }
    </Container >
  )
}

export default Flower

const numWord = (value: number, words: [string, string, string]) => {
  value = Math.abs(value) % 100;
  const num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num == 1) return words[0];

  return words[2];
}