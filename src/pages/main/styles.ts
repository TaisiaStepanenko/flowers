import styled from '@emotion/styled'

export const MainContainer = styled.div`
  height: 100vh;
  background-image: url("/public/mainBackground.png");
  background-size: cover;
  position: relative;
`

export const LogoBig = styled.img`
  position: absolute;
  height: 240px;
  bottom: 50%;
  left: calc(50% - 420px);
`

export const CenterText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  color: var(--white)
`

export const StyledHeader = styled.div`
  padding: 10px 30px;
  display: flex;
  align-items: center;
  gap: 16px
`

export const StyledLogo = styled.img`
  height: 50px
  width: 100px
`