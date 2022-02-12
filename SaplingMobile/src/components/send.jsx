import styled from 'styled-components'

const TitleFontSize = 1.5/21
const SectionTitleFontSize = 1.5/36
const RedFontSize = 1.5/52
const DashAreaSize = 1.5/18
const InputAreaSize = 1.5/24
const InputAreaFontSize = 1.5/36
const MemoInput = 1.5/26

export const SendDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: ${props => props.visible};
  transition: 500ms;
`

export const SendSectionOverscroll = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.0125) + 'px'};
  left: 0;
  height: ${props => (props.theme.height * .975) + 'px'};
  width: ${props => props.theme.width + 'px'};
  overflow: scroll;
  overscroll-behavior: contain;
`

export const SendSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${props => (props.theme.height * props.hsize) + 'px'};
  width: ${props => props.theme.width + 'px'};
  display: ${props => props.visible};
`

export const SendTitle = styled.div`
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
export const SelectAddressTitle = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.075)
       + (props.theme.width * TitleFontSize)
       + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  color: #bb9645;
  height: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.90) + 'px'};
  font-size: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
  text-align: left;
`

export const SelectAddressDashedArea = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.080)
       + (props.theme.width * TitleFontSize)
       + (props.theme.width * SectionTitleFontSize)
       + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  background-color: rgba(187,150,69,0.1);
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
  margin: 0px;
  border: 0px;
  padding: 0px;
  word-wrap: break-word;
  word-break: break-word;
`

export const SendAddressTitle = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.085)
       + (props.theme.width * TitleFontSize)
       + (props.theme.width * SectionTitleFontSize)
       + (props.theme.width * DashAreaSize)
       + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  color: #bb9645;
  height: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.90) + 'px'};
  font-size: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
  text-align: left;
`

export const SendDashedArea = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.090)
       + (props.theme.width * TitleFontSize)
       + (props.theme.width * SectionTitleFontSize)
       + (props.theme.width * SectionTitleFontSize)
       + (props.theme.width * DashAreaSize)
       + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  background-color: rgba(187,150,69,0.1);
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.width * ((InputAreaSize * 2) + DashAreaSize)) + 'px'};
  margin: 0px;
  border: 0px;
  padding: 0px;
  word-wrap: break-word;
  word-break: break-word;
`

export function getDashedAreaScroll(h,w) {
    return (
      (h * 0.090)
    + (w * TitleFontSize)
    + (w * SectionTitleFontSize )
    + (w * SectionTitleFontSize)
    + (w * DashAreaSize)
    - (h * 0.15))
}

export const SendDashedInput = styled.textarea`
  position: absolute;
  left: 0;
  top: 0;
  color: #ffffff;
  background-color: rgba(0,0,0,0);
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.width * InputAreaSize * 3) + 'px'};
  margin: 0px;
  padding: 0px;
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

export const SendGradientCapLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background-image: linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,0));
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * ((InputAreaSize * 2) + DashAreaSize)) + 'px'};
  z-index: 1;
`

export const SendGradientCapRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background-image: linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,0));
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * ((InputAreaSize * 2) + DashAreaSize)) + 'px'};
  z-index: 1;
`

export const SendRedText = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.090)
        + (props.theme.width * TitleFontSize)
        + (props.theme.width * SectionTitleFontSize)
        + (props.theme.width * SectionTitleFontSize)
        + (props.theme.width * DashAreaSize)
        + (props.theme.width * ((InputAreaSize * 2) + DashAreaSize))
        + 'px'};
  left: 0;
  height: ${props => (props.theme.width * RedFontSize) + 'px'};
  width: ${props => (props.theme.width) + 'px'};
  font-size: ${props => (props.theme.width * RedFontSize) + 'px'};
  color: rgba(229,66,18,1);
  text-align: center;
`

export const SendNoteLineOne = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.105)
        + (props.theme.width * TitleFontSize)
        + (props.theme.width * SectionTitleFontSize)
        + (props.theme.width * SectionTitleFontSize)
        + (props.theme.width * DashAreaSize)
        + (props.theme.width * ((InputAreaSize * 2) + DashAreaSize))
        + (props.theme.width * RedFontSize)
        + 'px'};
  left: 0;
  height: ${props => (props.theme.width * RedFontSize) + 'px'};
  width: ${props => (props.theme.width) + 'px'};
  font-size: ${props => (props.theme.width * RedFontSize) + 'px'};
  color: #bb9645;
  text-align: center;
`

export const SendNoteLineTwo = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.105)
      + (props.theme.width * TitleFontSize)
      + (props.theme.width * SectionTitleFontSize)
      + (props.theme.width * SectionTitleFontSize)
      + (props.theme.width * DashAreaSize)
      + (props.theme.width * ((InputAreaSize * 2) + DashAreaSize))
      + (props.theme.width * RedFontSize * 2)
      + 'px'};
  left: 0;
  height: ${props => (props.theme.width * RedFontSize) + 'px'};
  width: ${props => (props.theme.width) + 'px'};
  font-size: ${props => (props.theme.width * RedFontSize) + 'px'};
  color: #bb9645;
  text-align: center;
`






export const SendAmountTitle = styled.div`
position: absolute;
top: ${props => (props.theme.height * 0.13)
    + (props.theme.width * TitleFontSize)
    + (props.theme.width * SectionTitleFontSize)
    + (props.theme.width * SectionTitleFontSize)
    + (props.theme.width * DashAreaSize)
    + (props.theme.width * ((InputAreaSize * 2) + DashAreaSize))
    + (props.theme.width * RedFontSize * 3)
    + 'px'};
left: 0;
  left: ${props => (props.theme.width * 0.05) + 'px'};
  color: #bb9645;
  height: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.90) + 'px'};
  font-size: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
  text-align: left;
`

export const SendAmountArea = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.135)
    + (props.theme.width * TitleFontSize)
    + (props.theme.width * SectionTitleFontSize * 2)
    + (props.theme.width * SectionTitleFontSize)
    + (props.theme.width * DashAreaSize)
    + (props.theme.width * ((InputAreaSize * 2) + DashAreaSize))
    + (props.theme.width * RedFontSize * 3)
    + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  background-color: rgba(187,150,69,0.1);
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
`

export function getAmountAreaScroll(h,w) {
    return (
      (h * 0.135)
    + (w * TitleFontSize)
    + (w * SectionTitleFontSize * 2)
    + (w * SectionTitleFontSize)
    + (w * DashAreaSize)
    + (w * ((InputAreaSize * 2) + DashAreaSize) * 1)
    + (w * RedFontSize * 3)
    - (h * 0.15))
}

export const SendAmountDashes = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  color: #ffffff;
  background-color: rgba(0,0,0,0);
  width: ${props => (props.theme.width * 0.45) + 'px'};
  height: ${props => (props.theme.width * InputAreaSize) + 'px'};
  margin: 0px;
  border-width: 0px 0px 2px 0px;
  border-style: dashed;
  border-color: #bb9645;
`

export const SendAmountInput = styled.input`
  position: absolute;
  right: 0;
  left: 0;
  color: #ffffff;
  background-color: rgba(0,0,0,0);
  width: ${props => (props.theme.width * 0.30) + 'px'};
  height: ${props => ((props.theme.width * InputAreaSize)) + 'px'};
  margin: 0px;
  border-width: 0px;
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  text-align: right;

  :focus{
    outline: none;
  }
`

export const SendAmountGradientCapLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background-image: linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,0));
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
  z-index: 1;
`

export const SendAmountGradientCapRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background-image: linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,0));
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
  z-index: 1;
`

export const SendCurrencyCap = styled.div`
  position: absolute;
  right: 0;
  top: ${props => (props.theme.width * 0.0075) + 'px'};
  width: ${props => (props.theme.width * 0.125) + 'px'};
  height: ${props => ((props.theme.width * InputAreaSize)) + 'px'};
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  font-family: 'Bai Jamjuree';
  font-weight: bold;
  z-index: 2;
  color: #bb9645;
  text-align: left;
  margin: 0px;
  border-width: 0px;
`

export const SendAmountRedText = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.135)
    + (props.theme.width * TitleFontSize)
    + (props.theme.width * SectionTitleFontSize * 2)
    + (props.theme.width * SectionTitleFontSize)
    + (props.theme.width * DashAreaSize)
    + (props.theme.width * ((InputAreaSize * 2) + DashAreaSize) * 1)
    + (props.theme.width * DashAreaSize * 1)
    + (props.theme.width * RedFontSize * 3)
    + 'px'};
  right: ${props => (props.theme.width * 0.05) + 'px'};
  height: ${props => (props.theme.width * RedFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.45) + 'px'};
  font-size: ${props => (props.theme.width * RedFontSize) + 'px'};
  color: rgba(229,66,18,1);
  text-align: center;
`

export const SendAmountFeeText = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.135)
    + (props.theme.width * TitleFontSize)
    + (props.theme.width * SectionTitleFontSize * 2)
    + (props.theme.width * SectionTitleFontSize)
    + (props.theme.width * DashAreaSize)
    + (props.theme.width * ((InputAreaSize * 2) + DashAreaSize) * 1)
    + (props.theme.width * DashAreaSize * 1)
    + (props.theme.width * RedFontSize * 3)
    + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  height: ${props => (props.theme.width * RedFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.50) + 'px'};
  font-size: ${props => (props.theme.width * RedFontSize) + 'px'};
  color: #bb9645;
  text-align: left;
`



export const SendUSDArea = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.155)
    + (props.theme.width * TitleFontSize)
    + (props.theme.width * SectionTitleFontSize * 2)
    + (props.theme.width * SectionTitleFontSize)
    + (props.theme.width * DashAreaSize)
    + (props.theme.width * ((InputAreaSize * 2) + DashAreaSize) * 1)
    + (props.theme.width * DashAreaSize * 1)
    + (props.theme.width * RedFontSize * 4)
    + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  background-color: rgba(187,150,69,0.1);
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
`
export function getUSDAreaScroll(h,w) {
    return (
      (h * 0.155)
    + (w * TitleFontSize)
    + (w * SectionTitleFontSize * 2)
    + (w * SectionTitleFontSize)
    + (w * DashAreaSize)
    + (w * ((InputAreaSize * 2) + DashAreaSize) * 1)
    + (w * DashAreaSize * 1)
    + (w * RedFontSize * 4)
    - (h * 0.15))
}

export const SendUSDDashes = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  color: #ffffff;
  background-color: rgba(0,0,0,0);
  width: ${props => (props.theme.width * 0.45) + 'px'};
  height: ${props => (props.theme.width * InputAreaSize) + 'px'};
  margin: 0px;
  border-width: 0px 0px 2px 0px;
  border-style: dashed;
  border-color: #bb9645;
`

export const SendUSDInput = styled.input`
  position: absolute;
  right: 0;
  left: 0;
  color: #ffffff;
  background-color: rgba(0,0,0,0);
  width: ${props => (props.theme.width * 0.30) + 'px'};
  height: ${props => ((props.theme.width * InputAreaSize)) + 'px'};
  margin: 0px;
  border-width: 0px;
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  text-align: right;

  :focus{
    outline: none;
  }
`

export const SendUSDGradientCapLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background-image: linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,0));
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
  z-index: 1;
`

export const SendUSDGradientCapRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background-image: linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,0));
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
  z-index: 1;
`

export const SendUSDRedText = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.155)
    + (props.theme.width * TitleFontSize)
    + (props.theme.width * SectionTitleFontSize * 2)
    + (props.theme.width * SectionTitleFontSize)
    + (props.theme.width * DashAreaSize)
    + (props.theme.width * ((InputAreaSize * 2) + DashAreaSize) * 1)
    + (props.theme.width * DashAreaSize * 2)
    + (props.theme.width * RedFontSize * 4)
    + 'px'};
  right: ${props => (props.theme.width * 0.05) + 'px'};
  height: ${props => (props.theme.width * RedFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.45) + 'px'};
  font-size: ${props => (props.theme.width * RedFontSize) + 'px'};
  color: rgba(229,66,18,1);
  text-align: center;
`


export const SendMemoTitle = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.165)
    + (props.theme.width * TitleFontSize)
    + (props.theme.width * SectionTitleFontSize * 2)
    + (props.theme.width * SectionTitleFontSize)
    + (props.theme.width * DashAreaSize)
    + (props.theme.width * ((InputAreaSize * 2) + DashAreaSize) * 1)
    + (props.theme.width * DashAreaSize * 2)
    + (props.theme.width * RedFontSize * 5)
    + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  color: #bb9645;
  height: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.90) + 'px'};
  font-size: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
  text-align: left;
`

export const SendMemoArea = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.17)
    + (props.theme.width * TitleFontSize)
    + (props.theme.width * SectionTitleFontSize * 3)
    + (props.theme.width * SectionTitleFontSize)
    + (props.theme.width * DashAreaSize)
    + (props.theme.width * ((InputAreaSize * 2) + DashAreaSize) * 1)
    + (props.theme.width * DashAreaSize * 2)
    + (props.theme.width * RedFontSize * 5)
    + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  background-color: rgba(187,150,69,0.1);
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize)
    + (props.theme.width * (MemoInput * ((Math.ceil(props.mlength/35) > 0 ? Math.ceil(props.mlength/35) : 1) - 1)))
    + 'px'};
`

export function getMemoAreaScroll(h,w) {
    return (
      (h * 0.17)
    + (w * TitleFontSize)
    + (w * SectionTitleFontSize * 3)
    + (w * SectionTitleFontSize)
    + (w * DashAreaSize)
    + (w * ((InputAreaSize * 2) + DashAreaSize) * 1)
    + (w * DashAreaSize * 2)
    + (w * RedFontSize * 5)
    - (h * 0.15))
}

export const SendMemoInput = styled.textarea`
  position: absolute;
  left: 0;
  top: 0;
  color: #ffffff;
  line-height: ${props => (props.theme.width * MemoInput) + 'px'};
  background-color: rgba(0,0,0,0);
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.width * InputAreaSize)
         + (props.theme.width * (MemoInput * ((Math.ceil(props.mlength/35) > 0 ? Math.ceil(props.mlength/35) : 1) - 1)))
         + 'px'};
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

export const SendMemoGradientCapLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background-image: linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,0));
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
  z-index: 1;
`

export const SendMemoGradientCapRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background-image: linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,0));
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
  z-index: 1;
`

export const SendMemoRedText = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.17)
    + (props.theme.width * TitleFontSize)
    + (props.theme.width * SectionTitleFontSize * 3)
    + (props.theme.width * SectionTitleFontSize)
    + (props.theme.width * DashAreaSize)
    + (props.theme.width * ((InputAreaSize * 2) + DashAreaSize) * 1)
    + (props.theme.width * DashAreaSize * 3)
    + (props.theme.width * RedFontSize * 5)
    + (props.theme.width * (MemoInput * ((Math.ceil(props.mlength/35) > 0 ? Math.ceil(props.mlength/35) : 1) - 1)))
    + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  height: ${props => (props.theme.width * RedFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.9) + 'px'};
  font-size: ${props => (props.theme.width * RedFontSize) + 'px'};
  color: rgba(229,66,18,1);
  text-align: right;
`

export const SendButton = styled.button`
  position: absolute;
  background-color: ${props => (props.disabled ? '#A9A9A9' : '#bb9645')};
  color: white;
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.325) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  left: ${props => (props.theme.width * 0.75 - props.theme.width * 0.325/2) + 'px'};
  top: ${props => (props.theme.height * 0.195)
      + (props.theme.width * TitleFontSize)
      + (props.theme.width * SectionTitleFontSize * 3)
      + (props.theme.width * SectionTitleFontSize)
      + (props.theme.width * DashAreaSize)
      + (props.theme.width * ((InputAreaSize * 2) + DashAreaSize) * 1)
      + (props.theme.width * DashAreaSize * 3)
      + (props.theme.width * RedFontSize * 6)
      + (props.theme.width * (MemoInput * ((Math.ceil(props.mlength/35) > 0 ? Math.ceil(props.mlength/35) : 1) - 1)))
      + 'px'};
  border-radius: ${props => (props.theme.height * 0.075/2) + 'px'};
  border: 0px;

  :focus{
    outline: none;
  }
`

export const MaxButton = styled.button`
  position: absolute;
  background-color: grey;
  color: white;
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.325) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  left: ${props => (props.theme.width * 0.25 - props.theme.width * 0.325/2) + 'px'};
  top: ${props => (props.theme.height * 0.195)
      + (props.theme.width * TitleFontSize)
      + (props.theme.width * SectionTitleFontSize * 3)
      + (props.theme.width * SectionTitleFontSize)
      + (props.theme.width * DashAreaSize)
      + (props.theme.width * ((InputAreaSize * 2) + DashAreaSize) * 1)
      + (props.theme.width * DashAreaSize * 3)
      + (props.theme.width * RedFontSize * 6)
      + (props.theme.width * (MemoInput * ((Math.ceil(props.mlength/35) > 0 ? Math.ceil(props.mlength/35) : 1) - 1)))
      + 'px'};
  border-radius: ${props => (props.theme.height * 0.075/2) + 'px'};
  border: 0px;

  :focus{
    outline: none;
  }
`


export const SendConfirmAmount = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.075)
       + (props.theme.width * TitleFontSize)
       + 'px'};
  left: ${props => (props.theme.width * 0.15) + 'px'};
  color: #bb9645;
  height: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.80) + 'px'};
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  text-align: left;
`

export const SendConfirmAmountArea = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.085)
    + (props.theme.width * TitleFontSize)
    + (props.theme.width * InputAreaFontSize)
    + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  background-color: rgba(36,37,38,1);
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const SendConfirmCenter = styled.div`
  width: ${props => (props.theme.width * 0.90) + 'px'};
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const SendConfirmCoins = styled.div`
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  font-family: 'Bai Jamjuree';
  font-weight: bold;
  color: white;
  text-align: left;
  margin: 0px;
  border-width: 0px;
  display: inline-block;
`

export const SendConfirmCurrency = styled.div`
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  font-family: 'Bai Jamjuree';
  font-weight: bold;
  color: #bb9645;
  text-align: left;
  margin: 0px;
  border-width: 0px;
  display: inline-block;
`

export const SendConfirmFromAddress = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.115)
    + (props.theme.width * TitleFontSize)
    + (props.theme.width * DashAreaSize)
    + (props.theme.width * InputAreaFontSize)
    + 'px'};
  left: ${props => (props.theme.width * 0.15) + 'px'};
  color: #bb9645;
  height: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.80) + 'px'};
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  text-align: left;
`

export const SendConfirmFromAddressArea = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.125)
    + (props.theme.width * TitleFontSize)
    + (props.theme.width * DashAreaSize)
    + (props.theme.width * InputAreaFontSize * 2)
    + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  color: white;
  background-color: rgba(36,37,38,1);
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize * 2.5) + 'px'};
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  word-wrap: break-word;
`

export const SendConfirmToAddress = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.155)
    + (props.theme.width * TitleFontSize)
    + (props.theme.width * DashAreaSize * 3.5)
    + (props.theme.width * InputAreaFontSize * 2)
    + 'px'};
  left: ${props => (props.theme.width * 0.15) + 'px'};
  color: #bb9645;
  height: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.80) + 'px'};
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  text-align: left;
`

export const SendConfirmToAddressArea = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.165)
    + (props.theme.width * TitleFontSize)
    + (props.theme.width * DashAreaSize * 3.5)
    + (props.theme.width * InputAreaFontSize * 3)
    + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  color: white;
  background-color: rgba(36,37,38,1);
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize * 2.5) + 'px'};
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  word-wrap: break-word;
`

export const SendConfirmMemo = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.195)
    + (props.theme.width * TitleFontSize)
    + (props.theme.width * DashAreaSize * 6)
    + (props.theme.width * InputAreaFontSize * 3)
    + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  color: #bb9645;
  height: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.90) + 'px'};
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  text-align: left;
`

export const SendConfirmMemoArea = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.205)
    + (props.theme.width * TitleFontSize)
    + (props.theme.width * DashAreaSize * 6)
    + (props.theme.width * InputAreaFontSize * 4)
    + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  color: white;
  background-color: rgba(36,37,38,1);
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize * (Math.ceil(props.mlength/40) > 0 ? Math.ceil(props.mlength/40) : 1)) + 'px'};
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  word-wrap: break-word;
`

export const SendConfirmPasswordSection = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.235)
    + (props.theme.width * TitleFontSize)
    + (props.theme.width * DashAreaSize * 6)
    + (props.theme.width * DashAreaSize * (Math.ceil(props.mlength/40) > 0 ? Math.ceil(props.mlength/40) : 1))
    + (props.theme.width * InputAreaFontSize * 4)
    + 'px'};
  left: 0;
  width: ${props => (props.theme.width) + 'px'};
  display: ${props => props.visible};
`

export function getConfirmPasswordScroll(h,w,mlength) {
    return (
      (h * 0.235)
    + (w * TitleFontSize)
    + (w * DashAreaSize * 6)
    + (w * DashAreaSize * (Math.ceil(mlength/40) > 0 ? Math.ceil(mlength/40) : 1))
    + (w * InputAreaFontSize * 4)
    - (h * 0.25))
}

export const SendConfirmButtonSection = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.235)
    + (props.theme.width * TitleFontSize)
    + (props.theme.width * DashAreaSize * 6)
    + (props.theme.width * DashAreaSize * (Math.ceil(props.mlength/40) > 0 ? Math.ceil(props.mlength/40) : 1))
    + (props.theme.width * InputAreaFontSize * 4)

    + (((props.theme.width * SectionTitleFontSize)
    + (props.theme.width * DashAreaSize)
    + (props.theme.width * RedFontSize)
    + (props.theme.height * 0.040))
    * (props.visible == 'visible' ? 1 : 0))

    + 'px'};
  left: 0;
  width: ${props => (props.theme.width) + 'px'};
  transistion: 500ms
`


export const SendPasswordTitle = styled.div`
  position: absolute;
  top: 0;
  left: ${props => (props.theme.width * 0.05) + 'px'};
  color: #bb9645;
  height: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.90) + 'px'};
  font-size: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
  text-align: left;
`

export const SendPasswordArea = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.010)
       + (props.theme.width * SectionTitleFontSize)
       + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  background-color: rgba(187,150,69,0.1);
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
`

export const SendPasswordInput = styled.input`
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

export const SendPasswordGradientCapLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background-image: linear-gradient(90deg, rgba(0,0,0,1), rgba(0,0,0,0));
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
  z-index: 1;
`

export const SendPasswordGradientCapRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background-image: linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,1));
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
  z-index: 1;
`

export const SendPasswordRedText = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.020)
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

export const SendConfirmButton = styled.button`
  position: absolute;
  background-color: ${props => (props.disabled ? 'rgba(15,16,18,1)' : 'rgba(187,150,69,1)')};
  color: ${props => (props.disabled ? 'rgba(48,49,51,1)' : 'white')};
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.325) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  left: ${props => (props.theme.width * 0.70 - props.theme.width * 0.325/2) + 'px'};
  top: 0;
  border-radius: ${props => (props.theme.height * 0.075/2) + 'px'};
  border: 0px;
  transistion: 500ms;

  :focus{
    outline: none;
  }
`

export const SendBackButton = styled.button`
  position: absolute;
  background-color: rgba(48,49,51,1);
  color: white;
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.325) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  left: ${props => (props.theme.width * 0.30 - props.theme.width * 0.325/2) + 'px'};
  top: 0;
  border-radius: ${props => (props.theme.height * 0.075/2) + 'px'};
  border: 0px;

  :focus{
    outline: none;
  }
`

export const SendBuildNote = styled.div`
    position: absolute;
    top: ${props => (props.theme.height * 0.10)
          + (props.theme.width * TitleFontSize)
          + 'px'};
    left: ${props => (props.theme.width * 0.05) + 'px'};
    color: #bb9645;
    height: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
    width: ${props => (props.theme.width * 0.90) + 'px'};
    font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
    text-align: center;
`

export const SendEstBuildTime = styled.div`
    position: absolute;
    top: ${props => (props.theme.height * 0.20)
          + (props.theme.width * TitleFontSize)
          + 'px'};
    left: ${props => (props.theme.width * 0.05) + 'px'};
    color: #bb9645;
    height: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
    width: ${props => (props.theme.width * 0.90) + 'px'};
    font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
    text-align: left;
`

export const SendActBuildTime = styled.div`
    position: absolute;
    top: ${props => (props.theme.height * 0.25)
          + (props.theme.width * TitleFontSize)
          + (props.theme.width * InputAreaFontSize)
          + 'px'};
    left: ${props => (props.theme.width * 0.05) + 'px'};
    color: #bb9645;
    height: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
    width: ${props => (props.theme.width * 0.90) + 'px'};
    font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
    text-align: left;
`

export const SendSpinner = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.35)
        + (props.theme.width * TitleFontSize)
        + (props.theme.width * InputAreaFontSize * 2)
        + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  width: ${props => (props.theme.width * 0.90) + 'px'};
  display: flex;
  flex-direction: column;
  justify-content: center;
`



export const SendSummary = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.10)
        + (props.theme.width * TitleFontSize)
        + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  width: ${props => (props.theme.width * 0.90) + 'px'};
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const SendSummarySent = styled.div`
  position: absolute;
  top: 0
  left: 0;
  color: #bb9645;
  height: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.90) + 'px'};
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  text-align: center;
`

export const SendSummaryAmountArea = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.02)
        + (props.theme.width * InputAreaFontSize)
        + 'px'};
  left: 0;
  color: #bb9645;
  height: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.90) + 'px'};
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const SendSummaryAmount = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  height: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.45) + 'px'};
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  text-align: right;
`

export const SendSummaryAmountCurrency = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  color: #bb9645;
  height: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.45) + 'px'};
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  font-weight: bold;
  text-align: left;
`

export const SendSummaryFee = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.04)
        + (props.theme.width * InputAreaFontSize * 2)
        + 'px'};
  color: #bb9645;
  height: ${props => (props.theme.width * RedFontSize) + 'px'};
  font-size: ${props => (props.theme.width * RedFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.90) + 'px'};
  text-align: center;
`

export const SendSummaryTo = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.06)
        + (props.theme.width * InputAreaFontSize * 2)
        + (props.theme.width * RedFontSize)
        + 'px'};
  color: #bb9645;
  height: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.90) + 'px'};
  text-align: center;
`

export const SendSummaryToAddress = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.08)
        + (props.theme.width * InputAreaFontSize * 3)
        + (props.theme.width * RedFontSize)
        + 'px'};
  color: white;
  height: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.90) + 'px'};
  word-wrap: break-word;
`




export const SendExplorerButton = styled.button`
  position: absolute;
  background-color: grey;
  color: white;
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.5) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  left: ${props => (props.theme.width * 0.50 - props.theme.width * 0.5/2) + 'px'};
  top: ${props => (props.theme.height * 0.525) + 'px'};
  border-radius: ${props => (props.theme.height * 0.075/2) + 'px'};
  border: 0px;

  :focus{
    outline: none;
  }
`

export const SendMoreButton = styled.button`
  position: absolute;
  background-color: rgba(187,150,69,1);
  color: white;
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.325) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  left: ${props => (props.theme.width * 0.70 - props.theme.width * 0.325/2) + 'px'};
  top: ${props => (props.theme.height * 0.65) + 'px'};
  border-radius: ${props => (props.theme.height * 0.075/2) + 'px'};
  border: 0px;

  :focus{
    outline: none;
  }
`

export const SendWalletButton = styled.button`
  position: absolute;
  background-color: rgba(48,49,51,1);
  color: white;
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.325) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  left: ${props => (props.theme.width * 0.30 - props.theme.width * 0.325/2) + 'px'};
  top: ${props => (props.theme.height * 0.65) + 'px'};
  border-radius: ${props => (props.theme.height * 0.075/2) + 'px'};
  border: 0px;

  :focus{
    outline: none;
  }
`

export const SendFailed = styled.div`
  position: absolute;
  left: ${props => (props.theme.width * 0.05) + 'px'};
  top: ${props => (props.theme.height * 0.075)
        + (props.theme.width * TitleFontSize)
        + 'px'};
  color: white;
  background-color: rgba(0,0,0,0);
  height: ${props => (props.theme.height * 0.60)
      - (props.theme.height * 0.075)
      - (props.theme.width * TitleFontSize)
      + 'px'};
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.90) + 'px'};
  word-wrap: break-word;
  overflow: scroll;
  overscroll-behavior: contain;
`

export const ConfirmPassword = styled.h2`
  color: white;
  text-align: center;
  opacity: 1;
  font-size: 16px;
`

export const ConfirmPin = styled.input`
  color: black;
  width: ${props => (props.theme.width * 0.4) + 'px'};
  margin: 0 auto;
  bottom-border: 2px solid white;
  font-size: 18px;
  opacity: 1;
  text-align: center;
  border-radius: 20px;
`
