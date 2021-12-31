import styled from 'styled-components'

// import backgroundImage from '../assets/svg/modal_popup.svg'

const TitleFontSize = 1.5/21
const SectionTitleFontSize = 1.5/36
const RedFontSize = 1.5/52
const DashAreaSize = 1.5/18
const InputAreaSize = 1.5/24
const InputAreaFontSize = 1.5/36


export const ReindexDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: ${props => props.visible};
  transition: 500ms;
`

export const ReindexSectionOverscroll = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.0125) + 'px'};
  left: 0;
  height: ${props => (props.theme.height * .975) + 'px'};
  width: ${props => props.theme.width + 'px'};
  overflow: scroll;
  overscroll-behavior: contain;
`

export const ReindexSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${props => (props.theme.height * 0.875) + 'px'};
  width: ${props => props.theme.width + 'px'};
  display: ${props => props.visible};
`

export const ReindexTitle = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.05) + 'px'};
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

export const ReindexLoader = styled.div`
  position: absolute;
  left: ${props => ((props.theme.width * 0.5)) + 'px'};
  text-align: center;
`

export const ReindexPWTitle = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.075)
       + (props.theme.width * TitleFontSize)
       + 'px'};
  left: ${props => (props.theme.width * 0.15) + 'px'};
  color: #bb9645;
  height: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.80) + 'px'};
  font-size: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
  text-align: left;
`


export const ReindexPWArea = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.10)
       + (props.theme.width * TitleFontSize)
       + (props.theme.width * SectionTitleFontSize)
       + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  background-color: rgba(187,150,69,0.1);
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
`


export const ReindexPWInput = styled.input`
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

export const ReindexPWGradientCapLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background-image: linear-gradient(90deg, rgba(0,0,0,1), rgba(0,0,0,0));
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
  z-index: 1;
`

export const ReindexPWGradientCapRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background-image: linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,1));
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
  z-index: 1;
`

export const ReindexPWRedText = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.10)
        + (props.theme.width * TitleFontSize)
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

export const ReindexNote1 = styled.div`
  position: absolute;
  color: #bb9645;
  width: ${props => (props.theme.width * 0.80) + 'px'};
  height: ${props => (props.theme.width * RedFontSize) + 'px'};
  font-size: ${props => (props.theme.width * RedFontSize) + 'px'};
  left: ${props => (props.theme.width * 0.5 - props.theme.width * 0.8/2) + 'px'};
  top: ${props => (props.theme.height * 0.120)
       + (props.theme.width * TitleFontSize)
       + (props.theme.width * SectionTitleFontSize)
       + (props.theme.width * DashAreaSize)
       + 'px'};
  text-align: center;
`

export const ReindexNote2 = styled.div`
  position: absolute;
  color: #bb9645;
  width: ${props => (props.theme.width * 0.80) + 'px'};
  height: ${props => (props.theme.width * RedFontSize) + 'px'};
  font-size: ${props => (props.theme.width * RedFontSize) + 'px'};
  left: ${props => (props.theme.width * 0.5 - props.theme.width * 0.8/2) + 'px'};
  top: ${props => (props.theme.height * 0.1205)
       + (props.theme.width * TitleFontSize)
       + (props.theme.width * SectionTitleFontSize)
       + (props.theme.width * DashAreaSize)
       + (props.theme.width * RedFontSize * 2)
       + 'px'};
  text-align: center;
`


export const ReindexFirstKnownButton = styled.button`
  position: absolute;
  background-color: rbga(0,0,0,0);
  color: white;
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => (props.theme.height * 0.055) + 'px'}
  height: ${props => (props.theme.height * 0.055) + 'px'};
  left: ${props => (props.theme.width * 0.40 - props.theme.width * 0.325/2) + 'px'};
  top: ${props => (props.theme.height * 0.1555)
      + (props.theme.width * TitleFontSize)
      + (props.theme.width * SectionTitleFontSize)
      + (props.theme.width * DashAreaSize)
      + (props.theme.width * RedFontSize * 8)
      + 'px'};
  border-radius: ${props => (props.theme.height * 0.055/2) + 'px'};
  border: 0px;

  :focus{
    outline: none;
  }
`

export const ReindexFirstNote = styled.div`
  position: absolute;
  color: #bb9645;
  width: ${props => (props.theme.width * 0.65) + 'px'};
  height: ${props => (props.theme.width * RedFontSize) + 'px'};
  font-size: ${props => (props.theme.width * RedFontSize) + 'px'};
  left: ${props => (props.theme.width * 0.35) + 'px'};
  top: ${props => (props.theme.height * 0.1555)
      + (props.theme.height * 0.055/2)
      - (props.theme.width * RedFontSize/2)
      + (props.theme.width * TitleFontSize)
      + (props.theme.width * SectionTitleFontSize)
      + (props.theme.width * DashAreaSize)
      + (props.theme.width * RedFontSize * 8)
      + 'px'};
  text-align: left;
`


export const ReindexFullButton = styled.button`
  position: absolute;
  background-color: rbga(0,0,0,0);
  color: white;
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => (props.theme.height * 0.055) + 'px'}
  height: ${props => (props.theme.height * 0.055) + 'px'};
  left: ${props => (props.theme.width * 0.40 - props.theme.width * 0.325/2) + 'px'};
  top: ${props => (props.theme.height * 0.1905)
      + (props.theme.width * TitleFontSize)
      + (props.theme.width * SectionTitleFontSize)
      + (props.theme.width * DashAreaSize)
      + (props.theme.width * RedFontSize * 8)
      + (props.theme.height * 0.055)
      + 'px'};
  border-radius: ${props => (props.theme.height * 0.055/2) + 'px'};
  border: 0px;

  :focus{
    outline: none;
  }
`

export const ReindexButtonImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rbga(0,0,0,0);
  width: ${props => (props.theme.height * 0.055) + 'px'}
  height: ${props => (props.theme.height * 0.055) + 'px'};
`

export const ReindexFullNote = styled.div`
  position: absolute;
  color: #bb9645;
  width: ${props => (props.theme.width * 0.65) + 'px'};
  height: ${props => (props.theme.width * RedFontSize) + 'px'};
  font-size: ${props => (props.theme.width * RedFontSize) + 'px'};
  left: ${props => (props.theme.width * 0.35) + 'px'};
  top: ${props => (props.theme.height * 0.1905)
      + (props.theme.height * 0.055/2)
      - (props.theme.width * RedFontSize/2)
      + (props.theme.width * TitleFontSize)
      + (props.theme.width * SectionTitleFontSize)
      + (props.theme.width * DashAreaSize)
      + (props.theme.width * RedFontSize * 8)
      + (props.theme.height * 0.055)
      + 'px'};
  text-align: left;

  :focus{
    outline: none;
  }
`

export const ReindexButton = styled.button`
  position: absolute;
  background-color: rgba(48,49,51,1);
  color: white;
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.325) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  left: ${props => (props.theme.width * 0.30 - props.theme.width * 0.325/2) + 'px'};
  top: ${props => (props.theme.height * 0.2255)
      + (props.theme.width * TitleFontSize)
      + (props.theme.width * SectionTitleFontSize)
      + (props.theme.width * DashAreaSize)
      + (props.theme.width * RedFontSize * 8)
      + (props.theme.height * 0.055 * 2)
      + 'px'};
  border-radius: ${props => (props.theme.height * 0.075/2) + 'px'};
  border: 0px;

  :focus{
    outline: none;
  }
`

export const ReindexBackButton = styled.button`
  position: absolute;
  background-color: rgba(187,150,69,1);
  color: white;
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.325) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  left: ${props => (props.theme.width * 0.70 - props.theme.width * 0.325/2) + 'px'};
  top: ${props => (props.theme.height * 0.2255)
      + (props.theme.width * TitleFontSize)
      + (props.theme.width * SectionTitleFontSize)
      + (props.theme.width * DashAreaSize)
      + (props.theme.width * RedFontSize * 8)
      + (props.theme.height * 0.055 * 2)
      + 'px'};
  border-radius: ${props => (props.theme.height * 0.075/2) + 'px'};
  border: 0px;

  :focus{
    outline: none;
  }
`

//
//
// export const ReindexArea = styled.div`
//   position: absolute;
//   top: ${props => (props.theme.height * 0.10)
//        + (props.theme.width * TitleFontSize)
//        + (props.theme.width * SectionTitleFontSize)
//        + 'px'};
//   left: ${props => (props.theme.width * 0.05) + 'px'};
//   background-color: rgba(187,150,69,0.1);
//   width: ${props => (props.theme.width * 0.90) + 'px'};
//   height: ${props => (props.theme.width * ((InputAreaSize * 8.25) + DashAreaSize - InputAreaSize)) + 'px'};
// `
//
// export const ReindexInput = styled.div`
//   position: absolute;
//   left: 0;
//   top: 0;
//   color: #ffffff;
//   background-color: rgba(0,0,0,0);
//   width: ${props => (props.theme.width * 0.90) + 'px'};
//   height: ${props => (props.theme.width * InputAreaSize * 8.25) + 'px'};
//   margin: 0px;
//   border-width: 0px 0px 2px 0px;
//   border-style: dashed;
//   border-color: #bb9645;
//   font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
//   text-align: center;
//   word-wrap: break-word;
//
//   :focus{
//     outline: none;
//   }
// `
//
//
//

//

//
// export const ReindexQRTitle = styled.div`
//   position: absolute;
//   top: ${props => (props.theme.height * 0.2225)
//        + (props.theme.width * TitleFontSize)
//        + (props.theme.width * SectionTitleFontSize)
//        + (props.theme.width * ((InputAreaSize * 8.25) + DashAreaSize - InputAreaSize))
//        + (props.theme.width * RedFontSize * 2)
//        + 'px'};
//   left: ${props => (props.theme.width * 0.10) + 'px'};
//   color: #bb9645;
//   height: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
//   width: ${props => (props.theme.width * 0.80) + 'px'};
//   font-size: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
//   text-align: center;
// `
//
// export const ReindexQRBase = styled.div`
//   position: absolute;
//   left: ${props => (props.theme.width * 0.05) + 'px'};
//   top: ${props => (props.theme.height * 0.2525)
//        + (props.theme.width * TitleFontSize)
//        + (props.theme.width * SectionTitleFontSize * 2)
//        + (props.theme.width * ((InputAreaSize * 8.25) + DashAreaSize - InputAreaSize))
//        + (props.theme.width * RedFontSize * 2)
//        + 'px'};
//   width: ${props => (props.theme.width * 0.90) + 'px'};
//   height: ${props => (props.theme.width * 0.90) + 'px'};
// `
//
// export const ReindexQR= styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: ${props => (props.theme.width * 0.9) + 'px'};
//   height: ${props => (props.theme.width * 0.9) + 'px'};
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
// `
//
// export const ReindexBackButton = styled.button`
//   position: absolute;
//   background-color: rgba(187,150,69,1);
//   color: white;
//   font-size: ${props => (props.theme.height * 0.025) + 'px'};
//   width: ${props => (props.theme.width * 0.325) + 'px'};
//   height: ${props => (props.theme.height * 0.075) + 'px'};
//   left: ${props => (props.theme.width * 0.50 - props.theme.width * 0.325/2) + 'px'};
//   top: ${props => (props.theme.height * 0.2725)
//        + (props.theme.width * TitleFontSize)
//        + (props.theme.width * SectionTitleFontSize * 2)
//        + (props.theme.width * ((InputAreaSize * 8.25) + DashAreaSize - InputAreaSize))
//        + (props.theme.width * RedFontSize * 2)
//        + (props.theme.width * 0.90)
//        + 'px'};
//   border-radius: ${props => (props.theme.height * 0.075/2) + 'px'};
//   border: 0px;
// `












//
//
// export const ReceiveSection = styled.div`
//   text-align: center;
//   background-color: #000000;
//   color: #ffffff;
//   border-radius: 35px;
//   border: 5px solid black;
//   height: ${props => ((props.theme.height * 0.95) - 10) + 'px'};
//   width: ${props => ((props.theme.width * 0.95) - 10) + 'px'};
//   position: absolute;
//   top: ${props => ((props.theme.height * 0.025)) + 'px'};
//   left: ${props => ((props.theme.width * 0.025)) + 'px'};
// `
// export const ReceiveAddress = styled.textarea`
//   position: absolute;
//   top: ${props => ((props.theme.height * 0.025)) + 'px'};
//   left: ${props => ((props.theme.width * 0.075) - 5) + 'px'};
//   width: ${props => (props.theme.width * 0.8) + 'px'};
//   height: ${props => (props.theme.height * 0.30) + 'px'};
//   background-color: #151515;
//   color: #ffffff;
//   font-size: 14px;
//   border: 1px solid #000000;
//   border-radius: 10px;
// `
//
// export const ReceiveQR = styled.div`
//   position: absolute;
//   bottom: ${props => ((props.theme.height * 0.13)) + 'px'};
//   left: ${props => ((props.theme.width * 0.125) - 5) + 'px'};
//   width: ${props => ((props.theme.width * 0.7)) + 'px'};
//   height: ${props => ((props.theme.width * 0.7)) + 'px'};
//   border: 0px solid #000000;
// `
// export const ReceiveButtonSection = styled.div`
//   position: absolute;
//   bottom: ${props => ((props.theme.height * 0.05)) + 'px'};
//   left: ${props => ((props.theme.width * 0.075) - 5) + 'px'};
//   width: ${props => ((props.theme.width * 0.8)) + 'px'};
//   border: 0px solid #000000;
//   display: inline-block;
// `
//
// export const ReceiveGreyButton = styled.button`
//   background-color: #707070;
//   color: #000000;
//   border: 0px solid #707070;
//   font-size: ${props => (props.theme.height * 0.0225) + 'px'}
//   margin-top: ${props => (props.theme.height * 0.00125) + 'px'};
//   margin-bottom: ${props => (props.theme.height * 0.00125) + 'px'};
//   margin-left: ${props => (props.theme.width * 0.0125) + 'px'};
//   margin-right: ${props => (props.theme.width * 0.0125) + 'px'};
//   height: ${props => (props.theme.height * 0.0475) + 'px'};
//   width: ${props => (props.theme.width * 0.35)+ 'px'};
//   border-radius: 3px;
// `
//
// export const PinSection = styled.div`
//   display: ${props => props.visible};
// `
//
// export const KeySection = styled.div`
//   display: ${props => props.visible};
// `
