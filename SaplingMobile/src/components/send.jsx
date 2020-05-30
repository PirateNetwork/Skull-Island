import styled from 'styled-components'

import backgroundImage from '../assets/login.jpg'

export const SendGrid = styled.div`
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

export const SendSection = styled.div`
  height: ${props => props.sc.height + 'px'};
  width: ${props => props.sc.width + 'px'};
  background-color: #000000;
  color: #ffffff;
  position: absolute;
  top: 0
  left: 0;
  opacity: 0.80;
`
export const SpinnerSection = styled.div`
  height: ${props => props.sc.height * 0.40 + 'px'};
  width: ${props => props.sc.width + 'px'};
  position: absolute;
  bottom: 0
  left: 0;
  opacity: 0.80;
  display: ${props => props.visible};
`

export const SendSectionOpaque = styled.div`
  height: ${props => (props.sc.height) + 'px'};
  width: ${props => props.sc.width + 'px'};
  color: #ffffff;
  position: absolute;
  top: 0
  left: 0;
  opacity: 1;
  display: ${props => props.visible};
`



export const AddressSelectSection = styled.div`
  position: absolute;
  top: ${props => (props.sc.height * 0.025) + 'px'};
  left: ${props => (props.sc.width * 0.025) + 'px'};
  width: ${props => (props.sc.width * 0.95) + 'px'};
  height: ${props => (props.sc.height * 0.15) + 'px'};
  color: #ffffff;
  font-size: ${props => (props.sc.height * 0.025) + 'px'};
  display: ${props => props.visible};
`
export const AddressSelectHeading = styled.div`
  color: #ffffff;
  font-weight: bold;
  font-size: ${props => (props.sc.height * 0.03) + 'px'};
`

export const AddressBalanceNumberDiv = styled.div`
  color: #ffd700;
  font-size: ${props => (props.sc.height * 0.028) + 'px'};
  font-weight: bold;
`

export const AddressCurrencyDiv = styled.div`
  color: #ffffff;
  font-size: ${props => (props.sc.height * 0.020) + 'px'};
`

export const AddressSelectLabel = styled.div`
  color: #ffffff;
  font-size: ${props => (props.sc.height * 0.025) + 'px'};
  display: ${props => props.visible};
`
export const AddressToggleButton = styled.button`
  position: absolute;
  top: ${props => (props.sc.height * 0.035) + 'px'};
  right: ${props => (props.sc.width * 0.0) + 'px'};
  background-color: ${props => props.disabled !== true ? '#707070' : '#707070' };
  opacity: ${props => props.disabled !== true ? '1.0' : '0.3' };
  color: #000000;
  border: 0px solid ${props => props.disabled !== true ? '#707070' : '#707070' };
  font-size: ${props => (props.sc.height * 0.0225) + 'px'};
  margin-top: ${props => (props.sc.height * 0.00125) + 'px'};
  margin-bottom: ${props => (props.sc.height * 0.00125) + 'px'};
  margin-left: ${props => (props.sc.width * 0.0125) + 'px'};
  margin-right: ${props => (props.sc.width * 0.0) + 'px'};
  height: ${props => (props.sc.height * 0.08) + 'px'};
  width: ${props => (props.sc.height * 0.08)+ 'px'};
  border-radius: 3px;
`
export const QRButton = styled.button`
  position: absolute;
  top: ${props => (props.sc.height * 0.425) + 'px'};
  right: ${props => (props.sc.width * 0.025) + 'px'};
  background-color: #707070;
  color: #000000;
  border: 0px solid #707070;
  font-size: ${props => (props.sc.height * 0.0225) + 'px'};
  margin-top: ${props => (props.sc.height * 0.00125) + 'px'};
  margin-bottom: ${props => (props.sc.height * 0.00125) + 'px'};
  margin-left: ${props => (props.sc.width * 0.0125) + 'px'};
  margin-right: ${props => (props.sc.width * 0.0) + 'px'};
  height: ${props => (props.sc.height * 0.08) + 'px'};
  width: ${props => (props.sc.height * 0.08)+ 'px'};
  border-radius: 3px;
`

export const SendAddressSection = styled.div`
  position: absolute;
  top: ${props => (props.sc.height * 0.215) + 'px'};
  left: ${props => (props.sc.width * 0.025) + 'px'};
  width: ${props => (props.sc.width * 0.95) + 'px'};
  height: ${props => (props.sc.height * 0.15) + 'px'};
  font-size: ${props => (props.sc.height * 0.03) + 'px'};
  font-weight: bold;
`

export const SendAddress = styled.textarea`
  position: absolute;
  margin: auto;
  width: ${props => ((props.sc.width * 0.95) - 2) + 'px'};
  height: ${props => (props.sc.height * 0.15) + 'px'};
  background-color: #121212;
  color: #ffffff;
  font-size: ${props => (props.sc.height * 0.025) + 'px'};
  border-radius: 10px;
  border: 1px solid #ffffff;
`


export const AmountSection = styled.div`
  position: absolute;
  top: ${props => (props.sc.height * 0.425) + 'px'};
  left: ${props => (props.sc.width * 0.025) + 'px'};
  width: ${props => (props.sc.width * 0.95) + 'px'};
  height: ${props => (props.sc.height * 0.035) + 'px'};
  color: #ffffff;
  font-size: ${props => (props.sc.height * 0.025) + 'px'};
`
export const AmountInput = styled.input`
  background-color: #121212;
  color: #ffffff;
  font-size: ${props => (props.sc.height * 0.025) + 'px'};
  width: ${props => (props.sc.width * 0.35) + 'px'};
  border-radius: 5px;
  border: 1px solid #ffffff;
  padding-left: 5px;
`

export const FeeSection = styled.div`
  position: absolute;
  top: ${props => (props.sc.height * 0.475) + 'px'};
  left: ${props => (props.sc.width * 0.025) + 'px'};
  width: ${props => (props.sc.width * 0.95) + 'px'};
  height: ${props => (props.sc.height * 0.035) + 'px'};
  color: #ffffff;
  font-size: ${props => (props.sc.height * 0.025) + 'px'};
`
export const ButtonSection = styled.div`
  position: absolute;
  top: ${props => (props.sc.height * 0.525) + 'px'};
  left: ${props => (props.sc.width * 0) + 'px'};
  width: ${props => (props.sc.width) + 'px'};
  height: ${props => (props.sc.height * 0.035) + 'px'};
  color: #ffffff;
  font-size: ${props => (props.sc.height * 0.025) + 'px'};
  display: inline-block;
`

export const ConfirmHeading = styled.div`
  width: ${props => (props.sc.width * 0.9) + 'px'};
  position: absolute;
  top: ${props => (props.sc.height * 0.03) + 'px'};
  left: ${props => (props.sc.width * 0.05) + 'px'};
  color: #ffffff;
  font-weight: bold;
  font-size: ${props => (props.sc.height * 0.03) + 'px'};
`
export const ConfirmDataSection = styled.div`
  width: ${props => (props.sc.width * 0.9) + 'px'};
  position: absolute;
  top: ${props => (props.sc.height * 0.065) + 'px'};
  left: ${props => (props.sc.width * 0.05) + 'px'};
  color: #ffffff;
  font-size: ${props => (props.sc.height * 0.020) + 'px'};
`

export const ConfirmData = styled.div`
  color: #ffffff;
  font-size: ${props => (props.sc.height * 0.025) + 'px'};
  width: ${props => (props.sc.width * 0.9) + 'px'};
  word-wrap: break-word;
`
export const ConfirmButtonSection = styled.div`
  width: ${props => (props.sc.width * 0.9) + 'px'};
  height: ${props => (props.sc.height * 0.035) + 'px'};
  color: #ffffff;
  font-size: ${props => (props.sc.height * 0.025) + 'px'};
  display: inline-block;
`

export const ConfirmSendButton = styled.button`
  background-color: ${props => props.disabled !== true ? '#32CD32' : '#707070' };
  opacity: ${props => props.disabled !== true ? '1.0' : '0.3' };
  color: #000000;
  border: 0px solid ${props => props.disabled !== true ? '#32CD32' : '#707070' };
  font-size: ${props => (props.sc.height * 0.0225) + 'px'};
  margin-top: ${props => (props.sc.height * 0.00125) + 'px'};
  margin-bottom: ${props => (props.sc.height * 0.00125) + 'px'};
  margin-left: ${props => (props.sc.width * 0.0125) + 'px'};
  margin-right: ${props => (props.sc.width * 0.0125) + 'px'};
  height: ${props => (props.sc.height * 0.0475) + 'px'};
  width: ${props => (props.sc.width * 0.425)+ 'px'};
  border-radius: 3px;
`

export const ConfirmCancelButton = styled.button`
  background-color: #FF0000;
  color: #000000;
  border: 0px solid #FF0000;
  font-size: ${props => (props.sc.height * 0.0225) + 'px'};
  margin-top: ${props => (props.sc.height * 0.00125) + 'px'};
  margin-bottom: ${props => (props.sc.height * 0.00125) + 'px'};
  margin-left: ${props => (props.sc.width * 0.0125) + 'px'};
  margin-right: ${props => (props.sc.width * 0.0125) + 'px'};
  height: ${props => (props.sc.height * 0.0475) + 'px'};
  width: ${props => (props.sc.width * 0.425)+ 'px'};
  border-radius: 3px;
`

export const ConfirmPasswordSection = styled.div`
  display: ${props => props.visible};
`
export const ConfirmPassword = styled.h2`
  color: white;
  text-align: center;
  opacity: 1;
  font-size: 16px;
`

export const ConfirmPin = styled.input`
  color: black;
  width: ${props => (props.sc.width * 0.4) + 'px'};
  margin: 0 auto;
  bottom-border: 2px solid white;
  font-size: 18px;
  opacity: 1;
  text-align: center;
  border-radius: 20px;
`

export const TransactionLink = styled.a`

  width: ${props => (props.sc.width * 0.9) + 'px'};
  font-size: ${props => (props.sc.height * 0.030) + 'px'};
  font-weight: bold;


  :link {
    color: gold;
    text-align: center;
  }

  :visited {
    color: white;
    text-align: center;
  }
`
