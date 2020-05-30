import styled from 'styled-components'

export const QrSection= styled.div`
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  width: ${props => (props.sc.width) + 'px'};
  height: ${props => (props.sc.height) + 'px'};
`

export const QrLeft= styled.div`
  position: absolute;
  top: ${props => (props.sc.height * 0.3) + 'px'};
  left: 0;
  margin: 0;
  padding: 0;
  opacity: 0.65;
  width: ${props => (props.sc.width * 0.15) + 'px'};
  height: ${props => (props.sc.height * 0.4) + 'px'};
  background-color: #303030;
`

export const QrRight= styled.div`
  position: absolute;
  top: ${props => (props.sc.height * 0.3) + 'px'};
  right: 0;
  margin: 0;
  padding: 0;
  opacity: 0.65;
  width: ${props => (props.sc.width * 0.15) + 'px'};
  height: ${props => (props.sc.height * 0.4) + 'px'};
  background-color: #303030;
`

export const QrTop= styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  opacity: 0.65;
  width: ${props => (props.sc.width) + 'px'};
  height: ${props => (props.sc.height * 0.3) + 'px'};
  background-color: #303030;
`

export const QrBottom= styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 0;
  padding: 0;
  opacity: 0.65;
  width: ${props => (props.sc.width) + 'px'};
  height: ${props => (props.sc.height * 0.3) + 'px'};
  background-color: #303030;
`

export const QrTopLeft= styled.div`
  position: absolute;
  top: ${props => (props.sc.height * 0.3) + 'px'};
  left: ${props => (props.sc.width * 0.15) + 'px'};
  margin: 0;
  padding: 0;
  opacity: 1;
  width: ${props => (props.sc.width * 0.045) + 'px'};
  height: ${props => (props.sc.width * 0.045) + 'px'};
  border-left: 2px solid red;
  border-top: 2px solid red;
`

export const QrBottomLeft= styled.div`
  position: absolute;
  bottom: ${props => (props.sc.height * 0.3) + 'px'};
  left: ${props => (props.sc.width * 0.15) + 'px'};
  margin: 0;
  padding: 0;
  opacity: 1;
  width: ${props => (props.sc.width * 0.045) + 'px'};
  height: ${props => (props.sc.width * 0.045) + 'px'};
  border-left: 2px solid red;
  border-bottom: 2px solid red;
`

export const QrTopRight= styled.div`
  position: absolute;
  top: ${props => (props.sc.height * 0.3) + 'px'};
  right: ${props => (props.sc.width * 0.15) + 'px'};
  margin: 0;
  padding: 0;
  opacity: 1;
  width: ${props => (props.sc.width * 0.045) + 'px'};
  height: ${props => (props.sc.width * 0.045) + 'px'};
  border-right: 2px solid red;
  border-top: 2px solid red;
`

export const QrBottomRight= styled.div`
  position: absolute;
  bottom: ${props => (props.sc.height * 0.3) + 'px'};
  right: ${props => (props.sc.width * 0.15) + 'px'};
  margin: 0;
  padding: 0;
  opacity: 1;
  width: ${props => (props.sc.width * 0.045) + 'px'};
  height: ${props => (props.sc.width * 0.045) + 'px'};
  border-right: 2px solid red;
  border-bottom: 2px solid red;
`

export const QrCancelButton = styled.button`
  position: absolute;
  left: ${props => ((props.sc.width * 0.5) - ((props.sc.width * 0.25)/2)) + 'px'};
  bottom: ${props => ((props.sc.height * 0.1)) + 'px'};
  background-color: red;
  color: #ffffff;
  width: ${props => ((props.sc.width * 0.25)) + 'px'};
  height: ${props => ((props.sc.height * 0.065)) + 'px'};
  font-size: ${props => ((props.sc.height * 0.025)) + 'px'};
  border: 0px solid red;
  z-index: 1;
`
