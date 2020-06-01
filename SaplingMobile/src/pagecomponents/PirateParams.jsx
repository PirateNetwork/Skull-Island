import styled from 'styled-components'

const TitleFontSize = 1.5/21

export const ParamHeaderFade = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${props => (props.theme.height * 0.20) + 'px'};
  width: ${props => props.theme.width + 'px'};
  background-image: linear-gradient(rgba(187,150,69,1), rgba(0,0,0,1));
`

export const ParamFade = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.1975) + 'px'};
  left: 0;
  height: ${props => (props.theme.height * 0.01) + 'px'};
  width: ${props => props.theme.width + 'px'};
  background-image: linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0));
`

export const ParamTitle = styled.div`
  position: absolute;
  bottom: ${props => (props.theme.height * 0.025) + 'px'};
  left: 0;
  color: #bb9645;
  height: ${props => (props.theme.width * TitleFontSize) + 'px'};
  width: ${props => props.theme.width + 'px'};
  font-family: 'Bai Jamjuree';
  font-style: normal;
  font-weight: bold;
  font-size: ${props => (props.theme.width * TitleFontSize) + 'px'};
  text-align: center;
  z-index: 2;
`

export const ParamInfo = styled.div`
  position: absolute;
  color: #bb9645;
  top: ${props => (props.theme.height * props.vPosition) + 'px'};
  left: ${props => (props.theme.width * 0.025) + 'px' };
  font: ${props => (props.theme.height * 0.030) + 'px' };
  width: ${props => (props.theme.width * 0.95) + 'px'};
`
