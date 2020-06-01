import styled from 'styled-components'

export const GlobalDiv = styled.div`
  font-family: 'IBM Plex Mono';
`

export const BlackBackground = styled.div`
  background-color: #000000;
  position: fixed;
  top: 0;
  left: 0;
  height: ${props => props.theme.height + 'px'};
  width: ${props => props.theme.width + 'px'};
  padding: 0;
  margin: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

export const BlackBackgroundQR = styled.div`
  background-color: #000000;
  position: fixed;
  top: 0;
  left: 0;
  height: ${props => props.theme.height + 'px'};
  width: ${props => props.theme.width + 'px'};
  padding: 0;
  margin: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: ${props => props.qrScanning.opacity};
`

export const GradientBackground = styled.div`
  background-image: linear-gradient(#bb9645, #000000, #000000, #000000);
  background-color: #000000;
  position: fixed;
  top: 0;
  left: 0;
  height: ${props => props.theme.height + 'px'};
  width: ${props => props.theme.width + 'px'};
  padding: 0;
  margin: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

export const SkullHeading = styled.div`
  position: absolute;
  width: ${props => (props.theme.width) + 'px'};
  height: ${props => (props.theme.height * 0.15) + 'px'};
  top: ${props => (props.theme.height * 0.15) + 'px'};
  text-align: center;
`

export const SkullCenteredDiv = styled.div`
  display: inline-block;
`

//Use Pirate_logo_Skull_Gold@2x
export const SkullImg = styled.img`
  width: ${props => (props.theme.width * 0.20) + 'px'};
`


export const DarkYellowButton = styled.button`
  position: absolute;
  background-color: #bb9645;
  color: white;
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.85) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  left: ${props => (props.theme.width * 0.075) + 'px'};
  top: ${props => (props.theme.height * 0.74) + 'px'};
  border-radius: ${props => (props.theme.height * 0.075/2) + 'px'};
  border: 0px

  :focus{
    outline: none;
  }
`

export const DarkGreyButton = styled.button`
  position: absolute;
  background-color: #303133;
  color: white;
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.85) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  left: ${props => (props.theme.width * 0.075) + 'px'};
  top: ${props => (props.theme.height * 0.85) + 'px'};
  border-radius: ${props => (props.theme.height * 0.075/2) + 'px'};
  border: 0px;

  :focus{
    outline: none;
  }
`
export const BottomDashedArea = styled.div`
  position: absolute;
  left: ${props => (props.theme.width * 0.025) + 'px'};
  top: ${props => (props.theme.height * 0.40) + 'px'};
  background-color: #4a3c1b;
  width: ${props => (props.theme.width * 0.95) + 'px'};
  height: ${props => (props.theme.height * 0.055) + 'px'};
`

export const BottomDashedInput = styled.input`
  position: absolute;
  left: ${props => (props.theme.width * 0.025) + 'px'};
  top: 0;
  color: #ffffff;
  background-color: #4a3c1b;
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.height * 0.040) + 'px'};
  margin: 0px;
  border-width: 0px 0px 2px 0px;
  border-style: dashed;
  border-color: #bb9645;
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  text-align: center;

  :focus{
    outline: none;
  }
`
