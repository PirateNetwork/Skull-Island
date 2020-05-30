import styled from 'styled-components'

import backgroundImage from '../assets/login.jpg'

export const ReceiveGrid = styled.div`
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

export const ReceiveSection = styled.div`
  text-align: center;
  background-color: #000000;
  color: #ffffff;
  border-radius: 35px;
  border: 5px solid black;
  height: ${props => ((props.sc.height * 0.95) - 10) + 'px'};
  width: ${props => ((props.sc.width * 0.95) - 10) + 'px'};
  position: absolute;
  top: ${props => ((props.sc.height * 0.025)) + 'px'};
  left: ${props => ((props.sc.width * 0.025)) + 'px'};
`
export const ReceiveAddress = styled.textarea`
  position: absolute;
  top: ${props => ((props.sc.height * 0.025)) + 'px'};
  left: ${props => ((props.sc.width * 0.075) - 5) + 'px'};
  width: ${props => (props.sc.width * 0.8) + 'px'};
  height: ${props => (props.sc.height * 0.30) + 'px'};
  background-color: #151515;
  color: #ffffff;
  font-size: 14px;
  border: 1px solid #000000;
  border-radius: 10px;
`

export const ReceiveQR = styled.div`
  position: absolute;
  bottom: ${props => ((props.sc.height * 0.13)) + 'px'};
  left: ${props => ((props.sc.width * 0.125) - 5) + 'px'};
  width: ${props => ((props.sc.width * 0.7)) + 'px'};
  height: ${props => ((props.sc.width * 0.7)) + 'px'};
  border: 0px solid #000000;
`
export const ReceiveButtonSection = styled.div`
  position: absolute;
  bottom: ${props => ((props.sc.height * 0.05)) + 'px'};
  left: ${props => ((props.sc.width * 0.075) - 5) + 'px'};
  width: ${props => ((props.sc.width * 0.8)) + 'px'};
  border: 0px solid #000000;
  display: inline-block;
`

export const ReceiveGreyButton = styled.button`
  background-color: #707070;
  color: #000000;
  border: 0px solid #707070;
  font-size: ${props => (props.sc.height * 0.0225) + 'px'}
  margin-top: ${props => (props.sc.height * 0.00125) + 'px'};
  margin-bottom: ${props => (props.sc.height * 0.00125) + 'px'};
  margin-left: ${props => (props.sc.width * 0.0125) + 'px'};
  margin-right: ${props => (props.sc.width * 0.0125) + 'px'};
  height: ${props => (props.sc.height * 0.0475) + 'px'};
  width: ${props => (props.sc.width * 0.35)+ 'px'};
  border-radius: 3px;
`

export const PinSection = styled.div`
  display: ${props => props.visible};
`

export const KeySection = styled.div`
  display: ${props => props.visible};
`
