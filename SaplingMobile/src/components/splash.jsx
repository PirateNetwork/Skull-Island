import styled from 'styled-components'

export const SplashSection = styled.div`
  position: absolute;
  width: ${props => (props.theme.width) + 'px'};
  height: ${props => (props.theme.height) + 'px'};
  top: 0;
  left: 0;
  text-align: center;
`

export const SplashHeaderFade = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${props => (props.theme.height * 0.25) + 'px'};
  width: ${props => props.theme.width + 'px'};
  background-image: linear-gradient(rgba(187,150,69,1), rgba(0,0,0,1));

`

export const SplashFade = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.2475) + 'px'};
  left: 0;
  height: ${props => (props.theme.height * 0.05) + 'px'};
  width: ${props => props.theme.width + 'px'};
  background-image: linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0));

`

export const SplashSkullImg = styled.img`
  position: absolute;
  top: ${props => (props.theme.height * 0.25) + 'px'};
  left: ${props => (props.theme.width * 0.375) + 'px'};
  width: ${props => (props.theme.width * 0.25) + 'px'};
  height: ${props => (props.theme.width * 0.25) + 'px'};
`

export const SplashPirateImg = styled.img`
  position: absolute;
  top: ${props => (props.theme.height * 0.265)
      + (props.theme.width * 0.25)
      + 'px'};
  left: 0;
  width: ${props => (props.theme.width) + 'px'};
  height: ${props => (props.theme.height * 0.045) + 'px'};
`

export const SplashMobileImg = styled.img`
  position: absolute;
  top: ${props => (props.theme.height * 0.32)
      + (props.theme.width * 0.25)
      + 'px'};
  left: 0;
  width: ${props => (props.theme.width) + 'px'};
  height: ${props => (props.theme.height * 0.06) + 'px'};
`

export const SplashFooterImg = styled.img`
  position: absolute;
  bottom: ${props => (props.theme.height * 0.18) + 'px'};
  left: 0;
  width: ${props => (props.theme.width) + 'px'};
`

export const SplashFooter = styled.div`
  position: absolute;
  left: 0;
  background-color: rgba(187,150,69,1);
  bottom: 0;
  width: ${props => (props.theme.width) + 'px'};
  height: ${props => (props.theme.height * 0.20) + 'px'};

`

export const SplashCopyright = styled.div`
  position: absolute;
  width: ${props => (props.theme.width) + 'px'};
  left: 0;
  bottom: ${props => (props.theme.width * 0.05) + 'px'};
  text-align: center;
  color: white;
`
