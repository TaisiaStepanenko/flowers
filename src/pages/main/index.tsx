import { Typography } from "@mui/material"
import { CenterText, LogoBig, MainContainer, StyledHeader, StyledLogo } from "./styles"
import Button from "../../components/button"
import { useNavigate } from "react-router-dom"

const Main = () => {
  const navigate = useNavigate()

  return (
    <MainContainer>
      <StyledHeader>
        <StyledLogo src='/public/FlowersWhite.svg' />
        <Button btnType="LIGHT_GREEN" size="small" variant="outlined" onClick={() => navigate('/catalog')}>Каталог</Button>
        <Button btnType="LIGHT_GREEN" size="small" variant="outlined" onClick={() => navigate('/auth')}>Войти</Button>
      </StyledHeader>
      <LogoBig src='/public/FlowersWhite.svg' />
      <CenterText>
        <Typography variant="h3" >
          Цветы всегда делают людей<br /> лучше и счастливее
        </Typography>
        <Button btnType="GREEN" size="large" onClick={() => navigate('/catalog')}>Открыть каталог</Button>
      </CenterText>
    </MainContainer>
  )
}

export default Main