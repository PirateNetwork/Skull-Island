import styled from 'styled-components'

export const WalletKey = styled.textarea`
  width: ${props => ((props.sc.width * 0.6) - 10) + 'px'};
  height: ${props => ((props.sc.height * 0.2) - 10)+ 'px'};
  background-color: #151515;
  color: #ffffff;
  font-size: 14px;
  border: 5px solid #000000;
  border-radius: 10px;
`

export const WalletButtonContainer = styled.div`
  position: relative;
  display: inline-block;
  margin: 0 auto;
  text-align: center;
  width: ${props => ((props.sc.width * 0.7 ) + 20) +'px'};
`

export const WalletPhraseButton = styled.button`
  background-color: #ffd700;
  color: #000000;
  font-size: 14px;
  width: ${props => (props.sc.width * 0.3 ) +'px'};
  height: ${props => (props.sc.height * 0.06) +'px'};
  border-radius: 10px;
  border: 5px solid #ffd700;
  margin: 5px;
`

export const WalletQRButton = styled.button`
  background-color: #ffd700;
  color: #000000;
  font-size: 14px;
  width: ${props => (props.sc.width * 0.3 ) +'px'};
  height: ${props => (props.sc.height * 0.06) +'px'};
  border-radius: 10px;
  border: 5px solid #ffd700;
  margin: 5px;
`

export const WalletSetButton = styled.button`
  background-color: #00cc00;
  color: #000000;
  font-size: 14px;
  width: ${props => (props.sc.width * 0.6 ) + 10 +'px'};
  height: ${props => (props.sc.height * 0.06) +'px'};
  border-radius: 10px;
  border: 5px solid #00cc00;
  display: ${props => props.visible};
`
