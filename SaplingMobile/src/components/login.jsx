import styled from 'styled-components'

import backgroundImage from '../assets/login.jpg'

export const LoginGrid = styled.div`
  background-image: url(${backgroundImage});
  background-color: #cccccc;
  position: fixed;
  top: 0;
  left: 0;
  height: ${props => props.sc.height + 'px' || '100vh'};
  width: ${props => props.sc.width + 'px' || '100vw'};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
`
export const LoginForm = styled.div`
  position: relative;
  background-color: #000000;
  opacity: 0.75;
  border-radius: 35px;
  border: 5px solid black;
  height: ${props => ((props.sc.height * 0.8) - 10) + 'px' || '80vh'};
  width: ${props => ((props.sc.width * 0.8) - 10) + 'px' || '80vw'};
  grid-column-start: 2;
  grid-column-end: span 8;
  grid-row-start: 2;
  grid-row-end: span 8;
`
export const LoginFormOpaque = styled.div`
  position: relative;
  opacity: 1;
  border-radius: 35px;
  border: 5px solid black;
  height: ${props => ((props.sc.height * 0.8) - 10) + 'px' || '80vh'};
  width: ${props => ((props.sc.width * 0.8) - 10) + 'px' || '80vw'};
  grid-column-start: 2;
  grid-column-end: span 8;
  grid-row-start: 2;
  grid-row-end: span 8;
  display: ${props => props.visible};
`

export const LoginHeading = styled.div`
  color: white;
  text-align: center;
  opacity: 1;
`

export const LoginHeadingImg = styled.img`
  width: ${props => (props.sc.width * 0.6) + 'px'};
`

export const LoginPassword = styled.h2`
  color: white;
  text-align: center;
  opacity: 1;
  font-size: 16px;
`

export const LoginInput = styled.input`
  color: black;
  width: ${props => (props.sc.width * 0.4) + 'px'};
  margin: 0 auto;
  bottom-border: 2px solid white;
  font-size: 18px;
  opacity: 1;
  text-align: center;
  border-radius: 20px;
`

export const LoginInfo = styled.div`
  position: relative;
  color: #ffffff;
  left: ${props => (props.sc.width * 0.1) + 'px'};
  font: ${props => (props.sc.height * 0.025) + 'px' };
  width: ${props => ((props.sc.width * 0.7) - 10) + 'px'};
`

export const LoginSocialContainer = styled.div`
  position: absolute;
  bottom: ${props => (props.sc.height / 20) + 'px'};
  left: ${props => ((((props.sc.width * 0.8) - 10) / 4) - 25)+ 'px'};
  margin: 0 auto;
  opacity: 1;
`

export const LoginSocial = styled.img`
  display: inline-block;
  margin: 0 auto;
  padding: 5px;
  width: ${props => (props.sc.width / 12) +'px' || '25px'};
`

export const LoginButton = styled.button`
  background-color: #00cc00;
  color: #000000;
  font-size: 14px;
  width: ${props => (props.sc.width * 0.3 ) +'px'};
  height: ${props => (props.sc.height * 0.06) +'px'};
  border-radius: 10px;
  border: 5px solid #00cc00;

  :active{
    background-color: #006600;
    border: 5px solid #006600;
  }
`
export const ReindexSection = styled.div`
  display: ${props => props.visible};
`
