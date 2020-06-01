import styled from 'styled-components'

export const BalanceGraphDiv = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * (props.graphOpen ? 0.16 : 0.05)) + 'px'};
  left: ${props => (props.theme.width * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.95) + 'px'};
  height: ${props => (props.theme.height * (props.graphOpen ? 0.23 : 0.10)) + 'px'};
  transition: 500ms;
  z-index: 3;
`
export const BalanceGraphArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => (props.theme.width * 0.95) + 'px'};
  height: ${props => (props.theme.height * (props.graphOpen ? 0.18 : 0.10)) + 'px'};
  font-size: ${props => (props.graphOpen ? 12 : 0) + 'px'};
  opacity: ${props => (props.graphOpen ? 1 : 0.4)};
  transition: 500ms;
`

export const BalanceGraphBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-image: ${props => (props.graphOpen ? 'linear-gradient(rgba(0,0,0,1),rgba(0,0,0,1))' : 'linear-gradient(rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,0))')};
  width: ${props => (props.theme.width * 0.95) + 'px'};
  height: ${props => (props.theme.height * ((props.graphOpen ? 0.18 : 0.10) + (props.zmain=='none' ? 0.035 : 0.0))) + 'px'};
  transition: 500ms;
`


export const BalanceGraphButtonDiv = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${props => (props.theme.width * 0.95) + 'px'};
  height: ${props => (props.theme.height * (props.graphOpen ? 0.05 : 0.0)) + 'px'};
  background-color: #000000;
  border: 0px solid #000000;
  transition: 500ms;
`

export const BalanceGraphButton = styled.button`
  position: absolute;
  bottom: 0;
  left: ${props => (props.theme.width * props.hPosition) + 'px'};
  width: ${props => (props.theme.width * 0.19) + 'px'};
  height: ${props => (props.theme.height * (props.graphOpen ? 0.05 : 0.0)) + 'px'};
  font-size: ${props => ((props.theme.width * (props.graphOpen ? 0.19 : 0.0))/8*1.5)};
  background-color: #000000;
  border: 0px solid #000000;
  color: ${props =>(props.graphOpen ? '#ffffff' : '#000000')};
  transition: 500ms;

  :focus{
    outline: none;
  }
`
