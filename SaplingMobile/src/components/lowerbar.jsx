import styled from 'styled-components'

export const LowerBarDiv = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,1));
  color: white;
  width: ${props => (props.theme.width) + 'px'};
  height: ${props => ((props.theme.height * 0.085) + (props.theme.height * 0.1/2)) + 'px'};
  border: 0px
  z-index: 3;
`

export const LowerBarCenterButton = styled.button`
  position: absolute;
  background-color: #000000;
  color: white;
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => (props.theme.height * 0.1) + 'px'};
  height: ${props => (props.theme.height * 0.1) + 'px'};
  left: ${props => ((props.theme.width * 0.5) - (props.theme.height * 0.1/2)) + 'px'};
  bottom: ${props => ((props.theme.height * 0.085) - (props.theme.height * 0.1/2)) + 'px'};
  border-radius: ${props => (props.theme.height * 0.1/2) + 'px'};
  border: 0px solid #000000;
  z-index: 1;
  :focus{
    outline: none;
  }
`

export const LowerBarCenterButtonImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => ((props.theme.height * 0.1) - 12) + 'px'};
  height: ${props => ((props.theme.height * 0.1) - 12) + 'px'};
  border-radius: ${props => (props.theme.height * 0.1/2) + 'px'};
  border: 6px solid #000000;
  margin: 0;
  padding: 0;
  z-index: 1;
`

export const LowerBarSection = styled.div`
  position: absolute;
  left: ${props => (props.theme.width * 0.05) + 'px'};
  bottom: ${props => (props.theme.height * 0.01) + 'px'};
  background-color: #382d14;
  color: white;
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  border-radius: ${props => (props.theme.height * 0.075/2) + 'px'};
  border: 0px
`

export const LowerBarButton = styled.div`
  display: ${props => props.visible};
  position: absolute;
  left: ${props => (props.theme.width * props.hPosition) + 'px'};
  top: ${props => ((props.theme.height * 0.075/2) - (props.theme.height * 0.06/2))  + 'px'};
  width: ${props => (props.theme.width * 0.16) + 'px'};
  height: ${props => (props.theme.height * 0.06) + 'px'};
  border: 0px;
  border-radius: 50%;
  text-align: center;
  opacity: ${props => props.opacity};
`

export const LowerBarButtonImg = styled.img`
  height: ${props => (props.theme.height * 0.0325) + 'px'};
  border: 0px
  margin-top: ${props => (props.theme.height * 0.0025) + 'px'};
`

export const LowerBarButtonText = styled.div`
  position: absolute;
  left: 0;
  bottom: ${props => (props.theme.height * 0.0045) + 'px'};
  width: ${props => (props.theme.width * 0.16) + 'px'};
  height: ${props => (props.theme.width * 0.0225) + 'px'};
  font-size: ${props => (props.theme.width * 0.0225) + 'px'};
  border: 0px;
  text-align: center;
  color: ${props => props.active == 'visible'  ? '#f0bc5e' : 'white'};
`

export const LowerBarCenteredDiv = styled.div`
  display: inline-block;
`
