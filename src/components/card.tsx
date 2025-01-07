import { Box, Typography } from '@mui/material'
import { Flower } from '../store'
import { useNavigate } from 'react-router-dom'

const Card = ({ flower }: { flower: Flower }) => {
  const navigate = useNavigate()

  return (
    <Box
      width={310}
      height={480}
      border='1px solid var(--brown)'
      p="30px 20px"
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="space-between"
      onClick={() => navigate(`/flower/${flower.id}`)}
    >
      <img
        style={{ width: 270, height: 360, objectFit: 'cover' }}
        src={!flower.isNew ? `/public/flower_${flower.src}.png` : `data:image/png;base64,${localStorage.getItem(flower.src)}`}
      />
      <Box width="100%">
        <Typography variant='h5' color='var(--brown-dark)'>{flower.name}</Typography>
        <Typography variant='h6' color='var(--brown-dark)'>{flower.price}</Typography>
      </Box>
    </Box>
  )
}

export default Card