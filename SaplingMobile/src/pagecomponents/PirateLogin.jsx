import styled from 'styled-components'

const TitleFontSize = 1.5/21
const SectionTitleFontSize = 1.5/36
const RedFontSize = 1.5/52
const DashAreaSize = 1.5/18
const InputAreaSize = 1.5/24
const InputAreaFontSize = 1.5/36

// export const LoginTitle = styled.div`
//   position: absolute;
//   left: 0;
//   top: ${props => (props.theme.height * 0.175) + 'px'};
//   width: ${props => (props.theme.width) + 'px'};
//   height: ${props => (((props.theme.width/3)/7)*1.5) + 'px'};
//   font-family: 'Bai Jamjuree';
//   font-style: normal;
//   font-weight: bold;
//   font-size: ${props => (((props.theme.width/3)/7)*1.5) + 'px'};
//   color: #bb9645;
//   text-align: center;
// `

export const LoginTitleDescription = styled.div`
  position: absolute;
  left: 0;
  top: ${props => (props.theme.height * 0.25) + 'px'};
  width: ${props => (props.theme.width) + 'px'};
  height: ${props => (((props.theme.width * 0.45)/14)*1.5) + 'px'};
  font-size: ${props => (((props.theme.width * 0.45)/16)*1.5) + 'px'};
  color: #bb9645;
  text-align: center;
  border: 0px;
  margin: 0px;
  padding: 0px;
`

export const LoginPassword = styled.div`
  position: absolute;
  left: ${props => (props.theme.width * 0.025) + 'px'};
  top: ${props => (props.theme.height * 0.35) + 'px'};
  width: ${props => (props.theme.width * 0.95) + 'px'};
  height: ${props => (((props.theme.width * 0.45)/14)*1.5) + 'px'};
  font-size: ${props => (((props.theme.width * 0.45)/16)*1.5) + 'px'};
  color: #bb9645;
  text-align: left;
  border: 0px;
  margin: 0px;
  padding: 0px;
`

export const LoginPasswordDescription = styled.div`
  position: absolute;
  left: 0;
  top: ${props => (props.theme.height * 0.475) + 'px'};
  width: ${props => (props.theme.width) + 'px'};
  height: ${props => (((props.theme.width * 0.40)/20)*1.5) + 'px'};
  font-size: ${props => (((props.theme.width * 0.40)/22)*1.5) + 'px'};
  color: red;
  text-align: center;
  border: 0px;
  margin: 0px;
  padding: 0px;
`

export const LoginSectionOverscroll = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.20) + 'px'};
  left: 0;
  height: ${props => (props.theme.height * 0.80) + 'px'};
  width: ${props => props.theme.width + 'px'};
  overflow: scroll;
  overscroll-behavior: contain;
`

export const LoginHeaderFade = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${props => (props.theme.height * 0.20) + 'px'};
  width: ${props => props.theme.width + 'px'};
  background-image: linear-gradient(rgba(187,150,69,1), rgba(0,0,0,1));
  z-index: 5;
`

export const LoginFade = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.1975) + 'px'};
  left: 0;
  height: ${props => (props.theme.height * 0.01) + 'px'};
  width: ${props => props.theme.width + 'px'};
  background-image: linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0));
  z-index: 5;
`

// background-image: linear-gradient(rbga(0,0,0,1), rbga(0,0,0,0.75), rbga(0,0,0,0.5), rbga(0,0,0,0.25),rbga(0,0,0,0));


export const LoginSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${props => (props.theme.height)
          + (props.theme.height * 0.3)
          + (props.theme.width * TitleFontSize)
          + (props.theme.width * SectionTitleFontSize * 2)
          + (props.theme.width * DashAreaSize * 2)
          + (props.theme.width * RedFontSize * 2)
          + 'px'};
  width: ${props => props.theme.width + 'px'};
`

export const LoginTitle = styled.div`
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
`


export const LoginPWTitle = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.05) + 'px'};
  left: ${props => (props.theme.width * 0.15) + 'px'};
  color: #bb9645;
  height: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.80) + 'px'};
  font-size: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
  text-align: left;
`

export const LoginPWArea = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.075)
       + (props.theme.width * SectionTitleFontSize)
       + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  background-color: rgba(187,150,69,0.1);
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
`

export const LoginPWInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  color: #ffffff;
  background-color: rgba(0,0,0,0);
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.width * InputAreaSize) + 'px'};
  margin: 0px;
  border-width: 0px 0px 2px 0px;
  border-style: dashed;
  border-color: #bb9645;
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  text-align: center;

  :focus{
    outline: none;
  }
`

export const LoginPWGradientCapLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background-image: linear-gradient(90deg, rgba(0,0,0,1), rgba(0,0,0,0));
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
  z-index: 1;
`

export const LoginPWGradientCapRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background-image: linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,1));
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
  z-index: 1;
`



export const LoginPWRedText = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.075)
      + (props.theme.width * SectionTitleFontSize)
      + (props.theme.width * DashAreaSize)
      + 'px'};
  left: 0;
  height: ${props => (props.theme.width * RedFontSize) + 'px'};
  width: ${props => (props.theme.width) + 'px'};
  font-size: ${props => (props.theme.width * RedFontSize) + 'px'};
  color: rgba(229,66,18,1);
  text-align: center;
`



export const LoginConfirmTitle = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.1)
    + (props.theme.width * SectionTitleFontSize)
    + (props.theme.width * DashAreaSize)
    + (props.theme.width * RedFontSize)
    + 'px'};
  left: ${props => (props.theme.width * 0.15) + 'px'};
  color: #bb9645;
  height: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.80) + 'px'};
  font-size: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
  text-align: left;
`

export const LoginConfirmArea = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.125)
       + (props.theme.width * SectionTitleFontSize * 2)
       + (props.theme.width * DashAreaSize)
       + (props.theme.width * RedFontSize)
       + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  background-color: rgba(187,150,69,0.1);
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
`

export function getLoginConfirmAreaScroll(h,w) {
    return (
      (h * 0.125)
    + (w * SectionTitleFontSize * 2)
    + (w * DashAreaSize)
    + (w * RedFontSize)
    - (h * 0.10))
}

export const LoginConfirmInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  color: #ffffff;
  background-color: rgba(0,0,0,0);
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.width * InputAreaSize) + 'px'};
  margin: 0px;
  border-width: 0px 0px 2px 0px;
  border-style: dashed;
  border-color: #bb9645;
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  text-align: center;

  :focus{
    outline: none;
  }
`

export const LoginConfirmGradientCapLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background-image: linear-gradient(90deg, rgba(0,0,0,1), rgba(0,0,0,0));
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
  z-index: 1;
`

export const LoginConfirmGradientCapRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background-image: linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,1));
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
  z-index: 1;
`

export const LoginConfirmRedText = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.15)
      + (props.theme.width * SectionTitleFontSize * 2)
      + (props.theme.width * DashAreaSize * 2)
      + (props.theme.width * RedFontSize)
      + 'px'};
  left: 0;
  height: ${props => (props.theme.width * RedFontSize) + 'px'};
  width: ${props => (props.theme.width) + 'px'};
  font-size: ${props => (props.theme.width * RedFontSize) + 'px'};
  color: rgba(229,66,18,1);
  text-align: center;
`

export const LoginEyeButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  background-color: rgba(0,0,0,0);
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * InputAreaSize) + 'px'};
  border: 0px solid rgba(0,0,0,0);
  z-index: 2;

  :focus{
    outline: none;
  }
`

export const LoginEyeImg = styled.img`
  position: absolute;
  right: 0;
  top: ${props => (props.theme.width * InputAreaSize * 0.225) + 'px'};
  background-color: rgba(0,0,0,0);
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * InputAreaSize * 0.55) + 'px'};
  border: 0px solid rgba(0,0,0,0);
  z-index: 3;

  :focus{
    outline: none;
  }
`

export const LoginSetPWButton = styled.button`
  position: absolute;
  background-color: rgba(187,150,69,1);
  color: white;
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.325) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  left: ${props => (props.theme.width * 0.50 - props.theme.width * 0.325/2) + 'px'};
  top: ${props => (props.theme.height * 0.155)
      + (props.theme.width * SectionTitleFontSize * 2)
      + (props.theme.width * DashAreaSize * 2)
      + (props.theme.width * RedFontSize * 2)
      + 'px'};
  border-radius: ${props => (props.theme.height * 0.075/2) + 'px'};
  border: 0px;

  :focus{
    outline: none;
  }
`
