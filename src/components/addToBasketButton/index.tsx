import { Box, Typography } from "@mui/material"
import Button from "../button"
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';


const AddToBasketButton = ({
  changeBasket,
  inStock,
  inBasket
}: {
  changeBasket: (type: "minus" | "plus") => void
  inStock: number
  inBasket: number
}) => (
  <Box
    bgcolor="var(--white)"
    p={1}
    gap={2}
    border="1px solid var(--green-dark)"
    borderRadius={2}
    display="flex"
    width={114}
  >
    <Button
      btnType="LIGHT_GREEN"
      size="small"
      style={{
        background: "var(--green)",
        border: "1px solid var(--green-dark)",
        width: 28,
        minWidth: 0
      }}
      disabled={!inBasket}
      onClick={() => changeBasket('minus')}
    >
      <RemoveIcon fontSize="small" htmlColor="var(--green-dark)" />
    </Button>
    <Typography variant="h5" lineHeight={1}>{inBasket}</Typography>
    <Button
      btnType="LIGHT_GREEN"
      size="small"
      style={{
        background: "var(--green)",
        border: "1px solid var(--green-dark)",
        width: 28,
        minWidth: 0
      }}
      disabled={!inStock}
      onClick={() => changeBasket('plus')}
    >
      <AddIcon fontSize="small" htmlColor="var(--green-dark)" />
    </Button>
  </Box>
)

export default AddToBasketButton