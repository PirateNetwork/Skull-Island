import styled from 'styled-components'

import backgroundImage from '../assets/login.jpg'

export const MainGrid = styled.div`
  background-image: url(${backgroundImage});
  background-color: #cccccc;
  position: fixed;
  top: 0;
  left: 0;
  height: ${props => props.sc.height + 'px'};
  width: ${props => props.sc.width + 'px'};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  display: ${props => props.visible};
`

export const UpperButtonSection = styled.div`
  height: ${props => (props.sc.height * 0.05) + 'px'};
  width: ${props => props.sc.width + 'px'};
  display: inline-block;
  position: absolute;
  bottom: ${props => (props.sc.height * 0.015) + 'px'};
  left: 0;
  opacity: 1;
`

export const UpperSection = styled.div`
  height: ${props => (props.sc.height * 0.40) + 'px'};
  width: ${props => props.sc.width + 'px'};
  background-color: #000000;
  color: #ffffff;
  position: absolute;
  top: ${props => (props.sc.height * 0.05) + 'px'};
  left: 0;
  opacity: 0.80;
`

export const UpperSectionOpaque = styled.div`
  height: ${props => (props.sc.height * 0.40) + 'px'};
  width: ${props => props.sc.width + 'px'};
  color: #ffffff;
  position: absolute;
  top: ${props => (props.sc.height * 0.05) + 'px'};
  left: 0;
  opacity: 1;
`
export const LowerButtonSection = styled.div`
  height: ${props => (props.sc.height * 0.05) + 'px'};
  width: ${props => props.sc.width + 'px'};
  display: inline-block;
  background-color: #000000;
  position: absolute;
  bottom: 0
  left: 0;
  opacity: 1;
`
export const LowerSection = styled.div`
  height: ${props => (props.sc.height * 0.55) + 'px'};
  width: ${props => props.sc.width + 'px'};
  background-color: #000000;
  color: #ffffff;
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0.75;
`
export const LowerSectionOpaque = styled.div`
  height: ${props => (props.sc.height * 0.55) + 'px'};
  width: ${props => props.sc.width + 'px'};
  color: #ffffff;
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 1;
`

export const Menu = styled.div`
  position: absolute;
  top: 0
  left: 0
  height: ${props => ((props.sc.height * 0.05)) + 'px'};
  width: ${props => props.sc.width + 'px'};
  display: block;
  background-color: #505050;
  color: #ffffff;
  display: ${props => props.visible};
`

export const MenuTitle = styled.div`
  position: absolute;
  top: ${props => ((props.sc.height * 0.0125)) + 'px'};
  left: ${props => (props.sc.width * 0.20) + 'px'};
  font-size: ${props => ((props.sc.height * 0.025)) + 'px'};
  font-weight: bold;
  text-align: center;
  background-color: #505050;
  color: #ffffff;
  width: ${props => (props.sc.width * 0.60) + 'px'};
`

export const MenuContent = styled.div`
  display: ${props => props.visible};
  position: absolute;
  top: ${props => ((props.sc.height * 0.05)) + 'px'};
  left: 0
  background-color: #303030;
  height: ${props => ((props.sc.height * 0.05) * props.size) + 'px'};
  width: ${props => ((props.sc.width * 0.25)) + 'px'};
  z-index: 1;
`
export const MenuButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #303030;
  color: #ffffff;
  width: ${props => ((props.sc.width * 0.15)) + 'px'};
  height: ${props => ((props.sc.height * 0.05)) + 'px'};
  font-size: ${props => ((props.sc.height * 0.025)) + 'px'};
  border: 0px solid #303030;
  z-index: 1;
`
export const MenuButtonLine = styled.button`
  position: absolute;
  top: ${props => ((props.sc.height * 0.05) * props.pos) + 'px'};
  left: 0;
  background-color: #505050;
  color: white;
  width: ${props => ((props.sc.width * 0.45)) + 'px'};
  height: ${props => ((props.sc.height * 0.05)) + 'px'};
  font-size: ${props => ((props.sc.height * 0.025)) + 'px'};
  border: 0px solid #505050;
  z-index: 1;
`
