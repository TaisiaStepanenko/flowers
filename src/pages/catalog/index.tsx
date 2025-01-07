import { useShallow } from 'zustand/shallow'
import Container from '../../components/container'
import { useFlower } from '../../store'
import { Box, FormControl, Grid2 as Grid, InputLabel, Typography } from '@mui/material'
import { FLOWER_TYPE, FlowerType, } from '../../consts'
import { useState } from 'react'
import { StyledMenuItem, StyledSelect } from './styles'
import Card from '../../components/card'

const Catalog = () => {
  const [filter, setFilter] = useState<FlowerType[]>([])
  const flowers = useFlower(useShallow((state => Object.values(state.flowers))))

  const filteredFlowers = filter.length ? flowers.filter((flower) => flower.flowers.some((type) => filter.includes(type))) : flowers

  return (
    <Container>
      <Box display="flex" flexDirection="column" gap={2} width="100%">
        <Typography variant='h3' color='var(--green-dark)'>Букеты в наличии</Typography>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel>Фильтр</InputLabel>
          <StyledSelect
            multiple
            value={filter}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e) => setFilter(e.target.value as any)}
            label="Фильтр"

          >
            {Object.values(FLOWER_TYPE).map((fl) =>
              <StyledMenuItem
                key={fl.en}
                value={fl.en}
              >
                {fl.ru}
              </StyledMenuItem>
            )}
          </StyledSelect>
        </FormControl>
        {filteredFlowers.length ?
          <Grid container spacing={{ md: 2 }}>
            {filteredFlowers.map((flower) =>
              <Grid
                key={flower.id}
                size={{ lg: 3, sm: 6 }}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Card flower={flower} />
              </Grid>
            )}
          </Grid>
          : <Box width="100%" justifyContent="center">
            <Typography variant='h4' style={{ textAlign: 'center' }}>
              Букета с такими цветами нет
            </Typography>
          </Box>
        }
      </Box>
    </Container>
  )
}

export default Catalog