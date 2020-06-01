import styled from 'styled-components'

const TitleFontSize = 1.5/21
const SectionTitleFontSize = 1.5/36
const RedFontSize = 1.5/52
const DashAreaSize = 1.5/18
const InputAreaSize = 1.5/24
const InputAreaFontSize = 1.5/36

export const WalletMainSection = styled.div`
  position: absolute;
  width: ${props => (props.theme.width) + 'px'};
  height: ${props => (props.theme.height) + 'px'};
  top: 0;
  left: 0;
  text-align: center;
  display: ${props => props.qrScanning.display};
`

export const WalletHeaderFade = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${props => (props.theme.height * 0.20) + 'px'};
  width: ${props => props.theme.width + 'px'};
  background-image: linear-gradient(rgba(187,150,69,1), rgba(0,0,0,1));
`

export const WalletFade = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.1975) + 'px'};
  left: 0;
  height: ${props => (props.theme.height * 0.01) + 'px'};
  width: ${props => props.theme.width + 'px'};
  background-image: linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0));
`

export const WalletTitle = styled.div`
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

// export const WalletSectionOverscroll = styled.div`
//   position: absolute;
//   top: ${props => (props.theme.height * 0.20) + 'px'};
//   left: 0;
//   height: ${props => (props.theme.height * 0.8) + 'px'};
//   width: ${props => props.theme.width + 'px'};
//   overflow: scroll;
//   overscroll-behavior: contain;
// `

export const WalletSubSection = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.20) + 'px'};
  left: 0;
  height: ${props => (props.theme.height * 0.8) + 'px'};
  width: ${props => props.theme.width + 'px'};
  display: ${props => props.visible};
`

export const WalletPassPhraseTitle = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.01) + 'px'};
  left: ${props => (props.theme.width * 0.15) + 'px'};
  color: #bb9645;
  height: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.80) + 'px'};
  font-size: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
  text-align: left;
`

export const WalletPassPhraseArea = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.035)
       + (props.theme.width * SectionTitleFontSize)
       + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  background-color: rgba(187,150,69,0.1);
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.width * ((InputAreaSize * 6.25) + DashAreaSize - InputAreaSize)) + 'px'};
`

export const WalletPassPhraseInput = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  color: #ffffff;
  background-color: rgba(0,0,0,0);
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.width * InputAreaSize * 6.25) + 'px'};
  margin: 0px;
  border-width: 0px 0px 2px 0px;
  border-style: dashed;
  border-color: #bb9645;
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  text-align: center;
  word-wrap: break-word;

  :focus{
    outline: none;
  }
`

export const WalletPassPhraseInnerInput = styled.textarea`
  position: absolute;
  left: ${props => (props.theme.width * 0.10) + 'px'};
  top: 0;
  color: #ffffff;
  background-color: rgba(0,0,0,0);
  width: ${props => (props.theme.width * 0.70) + 'px'};
  height: ${props => (props.theme.width * InputAreaSize * 6.25) + 'px'};
  margin: 0px;
  border: 0px solid rgba(0,0,0,0);
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  text-align: center;
  word-wrap: break-word;

  :focus{
    outline: none;
  }
`

export const WalletPassPhraseGradientCapLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background-image: linear-gradient(90deg, rgba(0,0,0,1), rgba(0,0,0,0));
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * ((InputAreaSize * 6.25) + DashAreaSize - InputAreaSize)) + 'px'};
  z-index: 1;
`

export const WalletPassPhraseGradientCapRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background-image: linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,1));
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * ((InputAreaSize * 6.25) + DashAreaSize - InputAreaSize)) + 'px'};
  z-index: 1;
`

export const WalletPassPhraseRedText = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.035)
    + (props.theme.width * SectionTitleFontSize)
    + (props.theme.width * ((InputAreaSize * 6.25) + DashAreaSize - InputAreaSize))
    + 'px'};
  left: 0;
  height: ${props => (props.theme.width * RedFontSize) + 'px'};
  width: ${props => (props.theme.width) + 'px'};
  font-size: ${props => (props.theme.width * RedFontSize) + 'px'};
  color: rgba(229,66,18,1);
  text-align: center;
`




export const WalletHeightTitle = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.06)
    + (props.theme.width * SectionTitleFontSize)
    + (props.theme.width * ((InputAreaSize * 6.25) + DashAreaSize - InputAreaSize))
    + 'px'};
  left: ${props => (props.theme.width * 0.15) + 'px'};
  color: #bb9645;
  height: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.80) + 'px'};
  font-size: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
  text-align: left;
`

export const WalletHeightArea = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.06)
    + (props.theme.width * SectionTitleFontSize)
    + (props.theme.width * (SectionTitleFontSize - InputAreaFontSize))
    + (props.theme.width * ((InputAreaSize * 6.25) + DashAreaSize - InputAreaSize))
    + 'px'};
  left: ${props => (props.theme.width * 0.55) + 'px'};
  background-color: rgba(187,150,69,0.1);
  width: ${props => (props.theme.width * 0.40) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
`

export const WalletHeightInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  color: #ffffff;
  background-color: rgba(0,0,0,0);
  width: ${props => (props.theme.width * 0.40) + 'px'};
  height: ${props => (props.theme.width * InputAreaSize) + 'px'};
  margin: 0px;
  border-width: 0px 0px 2px 0px;
  border-style: dashed;
  border-color: #bb9645;
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  text-align: center;
  word-wrap: break-word;

  :focus{
    outline: none;
  }
`




export const WalletGradientCapLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background-image: linear-gradient(90deg, rgba(0,0,0,1), rgba(0,0,0,0));
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
  z-index: 1;
`

export const WalletGradientCapRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background-image: linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,1));
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
  z-index: 1;
`






export const WalletNewButton = styled.button`
  position: absolute;
  background-color: rgba(187,150,69,1);
  color: white;
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  left: ${props => (props.theme.width * 0.050) + 'px'};
  bottom: ${props => (props.theme.height * 0.15) + 'px'};
  border-radius: ${props => (props.theme.height * 0.075/2) + 'px'};
  border: 0px;

  :focus{
    outline: none;
  }
`

export const WalletRecoverButton = styled.button`
  position: absolute;
  background-color: rgba(48,49,51,1);
  color: white;
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  left: ${props => (props.theme.width * 0.050) + 'px'};
  bottom: ${props => (props.theme.height * 0.05) + 'px'};
  border-radius: ${props => (props.theme.height * 0.075/2) + 'px'};
  border: 0px;

  :focus{
    outline: none;
  }
`


export const WalletBackButton = styled.button`
  position: absolute;
  background-color: grey;
  color: white;
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.425) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  left: ${props => (props.theme.width * 0.525) + 'px'};
  bottom: ${props => (props.theme.height * 0.15) + 'px'};
  border-radius: ${props => (props.theme.height * 0.075/2) + 'px'};
  border: 0px;

  :focus{
    outline: none;
  }
`

export const WalletNewPhraseButton = styled.button`
  position: absolute;
  background-color: rgba(48,49,51,1);
  color: white;
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.425) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  bottom: ${props => (props.theme.height * 0.15) + 'px'};
  border-radius: ${props => (props.theme.height * 0.075/2) + 'px'};
  border: 0px;
`

export const WalletCreateButton = styled.button`
  position: absolute;
  background-color: rgba(187,150,69,1);
  color: white;
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  left: ${props => (props.theme.width * 0.050) + 'px'};
  bottom: ${props => (props.theme.height * 0.05) + 'px'};
  border-radius: ${props => (props.theme.height * 0.075/2) + 'px'};
  border: 0px;
  display: ${props => props.visible};

  :focus{
    outline: none;
  }
`









// export const WalletKey = styled.textarea`
//   width: ${props => ((props.theme.width * 0.6) - 10) + 'px'};
//   height: ${props => ((props.theme.height * 0.2) - 10)+ 'px'};
//   background-color: #151515;
//   color: #ffffff;
//   font-size: 14px;
//   border: 5px solid #000000;
//   border-radius: 10px;
// `
//
// export const WalletButtonContainer = styled.div`
//   position: relative;
//   display: inline-block;
//   margin: 0 auto;
//   text-align: center;
//   width: ${props => ((props.theme.width * 0.7 ) + 20) +'px'};
// `
//
// export const WalletPhraseButton = styled.button`
//   background-color: #ffd700;
//   color: #000000;
//   font-size: 14px;
//   width: ${props => (props.theme.width * 0.3 ) +'px'};
//   height: ${props => (props.theme.height * 0.06) +'px'};
//   border-radius: 10px;
//   border: 5px solid #ffd700;
//   margin: 5px;
// `
//
// export const WalletQRButton = styled.button`
//   background-color: #ffd700;
//   color: #000000;
//   font-size: 14px;
//   width: ${props => (props.theme.width * 0.3 ) +'px'};
//   height: ${props => (props.theme.height * 0.06) +'px'};
//   border-radius: 10px;
//   border: 5px solid #ffd700;
//   margin: 5px;
// `
//
// export const WalletSetButton = styled.button`
//   background-color: #00cc00;
//   color: #000000;
//   font-size: 14px;
//   width: ${props => (props.theme.width * 0.6 ) + 10 +'px'};
//   height: ${props => (props.theme.height * 0.06) +'px'};
//   border-radius: 10px;
//   border: 5px solid #00cc00;
//   display: ${props => props.visible};
// `
