import styled from 'styled-components'

const TitleFontSize = 1.5/21
const SectionTitleFontSize = 1.5/36
const RedFontSize = 1.5/52
const DashAreaSize = 1.5/18
const InputAreaSize = 1.5/24
const InputAreaFontSize = 1.5/36


export const SendDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: ${props => props.visible};
  transition: 500ms;
`

export const SendSectionOverscroll = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.125) + 'px'};
  left: 0;
  height: ${props => (props.theme.height * .875) + 'px'};
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

export const SendAddressTitle = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.075)
       + (props.theme.width * TitleFontSize)
       + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  color: #bb9645;
  height: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.45) + 'px'};
  font-size: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
  text-align: left;
`

export const SendDashedArea = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.080)
       + (props.theme.width * TitleFontSize)
       + (props.theme.width * SectionTitleFontSize)
       + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  background-color: rgba(187,150,69,0.1);
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
`

export function getDashedAreaScroll(h,w) {
    return (
      (h * 0.080)
    + (w * TitleFontSize)
    + (w * SectionTitleFontSize )
    - (h * 0.15))
}

export const SendDashedInput = styled.input`
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

export const SendGradientCapLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background-image: linear-gradient(90deg, rgba(0,0,0,1), rgba(0,0,0,0));
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
  z-index: 1;
`

export const SendGradientCapRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background-image: linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,1));
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
  z-index: 1;
`

export const SendRedText = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.080)
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

export const SendNoteLineOne = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.095)
        + (props.theme.width * TitleFontSize)
        + (props.theme.width * SectionTitleFontSize)
        + (props.theme.width * DashAreaSize)
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
  top: ${props => (props.theme.height * 0.095)
      + (props.theme.width * TitleFontSize)
      + (props.theme.width * SectionTitleFontSize)
      + (props.theme.width * DashAreaSize)
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
top: ${props => (props.theme.height * 0.12)
    + (props.theme.width * TitleFontSize)
    + (props.theme.width * SectionTitleFontSize)
    + (props.theme.width * DashAreaSize)
    + (props.theme.width * RedFontSize * 3)
    + 'px'};
left: 0;
  left: ${props => (props.theme.width * 0.05) + 'px'};
  color: #bb9645;
  height: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.45) + 'px'};
  font-size: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
  text-align: left;
`

export const SendAmountArea = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.125)
    + (props.theme.width * TitleFontSize)
    + (props.theme.width * SectionTitleFontSize * 2)
    + (props.theme.width * DashAreaSize)
    + (props.theme.width * RedFontSize * 3)
    + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  background-color: rgba(187,150,69,0.1);
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
`

export function getAmountAreaScroll(h,w) {
    return (
      (h * 0.125)
    + (w * TitleFontSize)
    + (w * SectionTitleFontSize * 2)
    + (w * DashAreaSize * 1)
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
  background-image: linear-gradient(90deg, rgba(0,0,0,1), rgba(0,0,0,0));
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
  z-index: 1;
`

export const SendAmountGradientCapRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background-image: linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,1));
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
  top: ${props => (props.theme.height * 0.125)
    + (props.theme.width * TitleFontSize)
    + (props.theme.width * SectionTitleFontSize * 2)
    + (props.theme.width * DashAreaSize * 2)
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
  top: ${props => (props.theme.height * 0.125)
    + (props.theme.width * TitleFontSize)
    + (props.theme.width * SectionTitleFontSize * 2)
    + (props.theme.width * DashAreaSize * 2)
    + (props.theme.width * RedFontSize * 3)
    + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  height: ${props => (props.theme.width * RedFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.30) + 'px'};
  font-size: ${props => (props.theme.width * RedFontSize) + 'px'};
  color: #bb9645;
  text-align: center;
`



export const SendUSDArea = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.145)
    + (props.theme.width * TitleFontSize)
    + (props.theme.width * SectionTitleFontSize * 2)
    + (props.theme.width * DashAreaSize * 2)
    + (props.theme.width * RedFontSize * 4)
    + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  background-color: rgba(187,150,69,0.1);
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
`
export function getUSDAreaScroll(h,w) {
    return (
      (h * 0.145)
    + (w * TitleFontSize)
    + (w * SectionTitleFontSize * 2)
    + (w * DashAreaSize * 2)
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
  background-image: linear-gradient(90deg, rgba(0,0,0,1), rgba(0,0,0,0));
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
  z-index: 1;
`

export const SendUSDGradientCapRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background-image: linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,1));
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
  z-index: 1;
`

export const SendUSDRedText = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.145)
    + (props.theme.width * TitleFontSize)
    + (props.theme.width * SectionTitleFontSize * 2)
    + (props.theme.width * DashAreaSize * 3)
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
  top: ${props => (props.theme.height * 0.155)
    + (props.theme.width * TitleFontSize)
    + (props.theme.width * SectionTitleFontSize * 2)
    + (props.theme.width * DashAreaSize * 3)
    + (props.theme.width * RedFontSize * 5)
    + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  color: #bb9645;
  height: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
  width: ${props => (props.theme.width * 0.45) + 'px'};
  font-size: ${props => (props.theme.width * SectionTitleFontSize) + 'px'};
  text-align: left;
`

export const SendMemoArea = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.16)
    + (props.theme.width * TitleFontSize)
    + (props.theme.width * SectionTitleFontSize * 3)
    + (props.theme.width * DashAreaSize * 3)
    + (props.theme.width * RedFontSize * 5)
    + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  background-color: rgba(187,150,69,0.1);
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
`

export function getMemoAreaScroll(h,w) {
    return (
      (h * 0.16)
    + (w * TitleFontSize)
    + (w * SectionTitleFontSize * 3)
    + (w * DashAreaSize * 3)
    + (w * RedFontSize * 5)
    - (h * 0.15))
}

export const SendMemoInput = styled.input`
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

export const SendMemoGradientCapLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background-image: linear-gradient(90deg, rgba(0,0,0,1), rgba(0,0,0,0));
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
  z-index: 1;
`

export const SendMemoGradientCapRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background-image: linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,1));
  width: ${props => (props.theme.width * 0.10) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
  z-index: 1;
`

export const SendMemoRedText = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.16)
    + (props.theme.width * TitleFontSize)
    + (props.theme.width * SectionTitleFontSize * 3)
    + (props.theme.width * DashAreaSize * 4)
    + (props.theme.width * RedFontSize * 5)
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
  background-color: #bb9645;
  color: white;
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.325) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  left: ${props => (props.theme.width * 0.5 - props.theme.width * 0.325/2) + 'px'};
  top: ${props => (props.theme.height * 0.185)
      + (props.theme.width * TitleFontSize)
      + (props.theme.width * SectionTitleFontSize * 3)
      + (props.theme.width * DashAreaSize * 4)
      + (props.theme.width * RedFontSize * 6)
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

// export const SpinnerSection = styled.div`
//   height: ${props => props.theme.height * 0.40 + 'px'};
//   width: ${props => props.theme.width + 'px'};
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   opacity: 0.80;
//   display: ${props => props.visible};
// `
//
//
//
// export const AddressSelectSection = styled.div`
//   position: absolute;
//   top: ${props => (props.theme.height * 0.025) + 'px'};
//   left: ${props => (props.theme.width * 0.025) + 'px'};
//   width: ${props => (props.theme.width * 0.95) + 'px'};
//   height: ${props => (props.theme.height * 0.15) + 'px'};
//   color: #ffffff;
//   font-size: ${props => (props.theme.height * 0.025) + 'px'};
//   display: ${props => props.visible};
// `
// export const AddressSelectHeading = styled.div`
//   color: #ffffff;
//   font-weight: bold;
//   font-size: ${props => (props.theme.height * 0.03) + 'px'};
// `
//
// export const AddressBalanceNumberDiv = styled.div`
//   color: #ffd700;
//   font-size: ${props => (props.theme.height * 0.028) + 'px'};
//   font-weight: bold;
// `
//
// export const AddressCurrencyDiv = styled.div`
//   color: #ffffff;
//   font-size: ${props => (props.theme.height * 0.020) + 'px'};
// `
//
// export const AddressSelectLabel = styled.div`
//   color: #ffffff;
//   font-size: ${props => (props.theme.height * 0.025) + 'px'};
//   display: ${props => props.visible};
// `
// export const AddressToggleButton = styled.button`
//   position: absolute;
//   top: ${props => (props.theme.height * 0.035) + 'px'};
//   right: ${props => (props.theme.width * 0.0) + 'px'};
//   background-color: ${props => props.disabled !== true ? '#707070' : '#707070' };
//   opacity: ${props => props.disabled !== true ? '1.0' : '0.3' };
//   color: #000000;
//   border: 0px solid ${props => props.disabled !== true ? '#707070' : '#707070' };
//   font-size: ${props => (props.theme.height * 0.0225) + 'px'};
//   margin-top: ${props => (props.theme.height * 0.00125) + 'px'};
//   margin-bottom: ${props => (props.theme.height * 0.00125) + 'px'};
//   margin-left: ${props => (props.theme.width * 0.0125) + 'px'};
//   margin-right: ${props => (props.theme.width * 0.0) + 'px'};
//   height: ${props => (props.theme.height * 0.08) + 'px'};
//   width: ${props => (props.theme.height * 0.08)+ 'px'};
//   border-radius: 3px;
// `
// export const QRButton = styled.button`
//   position: absolute;
//   top: ${props => (props.theme.height * 0.425) + 'px'};
//   right: ${props => (props.theme.width * 0.025) + 'px'};
//   background-color: #707070;
//   color: #000000;
//   border: 0px solid #707070;
//   font-size: ${props => (props.theme.height * 0.0225) + 'px'};
//   margin-top: ${props => (props.theme.height * 0.00125) + 'px'};
//   margin-bottom: ${props => (props.theme.height * 0.00125) + 'px'};
//   margin-left: ${props => (props.theme.width * 0.0125) + 'px'};
//   margin-right: ${props => (props.theme.width * 0.0) + 'px'};
//   height: ${props => (props.theme.height * 0.08) + 'px'};
//   width: ${props => (props.theme.height * 0.08)+ 'px'};
//   border-radius: 3px;
// `
//
// export const SendAddressSection = styled.div`
//   position: absolute;
//   top: ${props => (props.theme.height * 0.215) + 'px'};
//   left: ${props => (props.theme.width * 0.025) + 'px'};
//   width: ${props => (props.theme.width * 0.95) + 'px'};
//   height: ${props => (props.theme.height * 0.15) + 'px'};
//   font-size: ${props => (props.theme.height * 0.03) + 'px'};
//   font-weight: bold;
// `
//
// export const SendAddress = styled.textarea`
//   position: absolute;
//   margin: auto;
//   width: ${props => ((props.theme.width * 0.95) - 2) + 'px'};
//   height: ${props => (props.theme.height * 0.15) + 'px'};
//   background-color: #121212;
//   color: #ffffff;
//   font-size: ${props => (props.theme.height * 0.025) + 'px'};
//   border-radius: 10px;
//   border: 1px solid #ffffff;
// `
//
//
// export const AmountSection = styled.div`
//   position: absolute;
//   top: ${props => (props.theme.height * 0.425) + 'px'};
//   left: ${props => (props.theme.width * 0.025) + 'px'};
//   width: ${props => (props.theme.width * 0.95) + 'px'};
//   height: ${props => (props.theme.height * 0.035) + 'px'};
//   color: #ffffff;
//   font-size: ${props => (props.theme.height * 0.025) + 'px'};
// `
// export const AmountInput = styled.input`
//   background-color: #121212;
//   color: #ffffff;
//   font-size: ${props => (props.theme.height * 0.025) + 'px'};
//   width: ${props => (props.theme.width * 0.35) + 'px'};
//   border-radius: 5px;
//   border: 1px solid #ffffff;
//   padding-left: 5px;
// `
//
// export const FeeSection = styled.div`
//   position: absolute;
//   top: ${props => (props.theme.height * 0.475) + 'px'};
//   left: ${props => (props.theme.width * 0.025) + 'px'};
//   width: ${props => (props.theme.width * 0.95) + 'px'};
//   height: ${props => (props.theme.height * 0.035) + 'px'};
//   color: #ffffff;
//   font-size: ${props => (props.theme.height * 0.025) + 'px'};
// `
// export const ButtonSection = styled.div`
//   position: absolute;
//   top: ${props => (props.theme.height * 0.525) + 'px'};
//   left: ${props => (props.theme.width * 0) + 'px'};
//   width: ${props => (props.theme.width) + 'px'};
//   height: ${props => (props.theme.height * 0.035) + 'px'};
//   color: #ffffff;
//   font-size: ${props => (props.theme.height * 0.025) + 'px'};
//   display: inline-block;
// `
//
// export const ConfirmHeading = styled.div`
//   width: ${props => (props.theme.width * 0.9) + 'px'};
//   position: absolute;
//   top: ${props => (props.theme.height * 0.03) + 'px'};
//   left: ${props => (props.theme.width * 0.05) + 'px'};
//   color: #ffffff;
//   font-weight: bold;
//   font-size: ${props => (props.theme.height * 0.03) + 'px'};
// `
// export const ConfirmDataSection = styled.div`
//   width: ${props => (props.theme.width * 0.9) + 'px'};
//   position: absolute;
//   top: ${props => (props.theme.height * 0.065) + 'px'};
//   left: ${props => (props.theme.width * 0.05) + 'px'};
//   color: #ffffff;
//   font-size: ${props => (props.theme.height * 0.020) + 'px'};
// `
//
// export const ConfirmData = styled.div`
//   color: #ffffff;
//   font-size: ${props => (props.theme.height * 0.025) + 'px'};
//   width: ${props => (props.theme.width * 0.9) + 'px'};
//   word-wrap: break-word;
// `
// export const ConfirmButtonSection = styled.div`
//   width: ${props => (props.theme.width * 0.9) + 'px'};
//   height: ${props => (props.theme.height * 0.035) + 'px'};
//   color: #ffffff;
//   font-size: ${props => (props.theme.height * 0.025) + 'px'};
//   display: inline-block;
// `
//
// export const ConfirmSendButton = styled.button`
//   background-color: ${props => props.disabled !== true ? '#32CD32' : '#707070' };
//   opacity: ${props => props.disabled !== true ? '1.0' : '0.3' };
//   color: #000000;
//   border: 0px solid ${props => props.disabled !== true ? '#32CD32' : '#707070' };
//   font-size: ${props => (props.theme.height * 0.0225) + 'px'};
//   margin-top: ${props => (props.theme.height * 0.00125) + 'px'};
//   margin-bottom: ${props => (props.theme.height * 0.00125) + 'px'};
//   margin-left: ${props => (props.theme.width * 0.0125) + 'px'};
//   margin-right: ${props => (props.theme.width * 0.0125) + 'px'};
//   height: ${props => (props.theme.height * 0.0475) + 'px'};
//   width: ${props => (props.theme.width * 0.425)+ 'px'};
//   border-radius: 3px;
// `
//
// export const ConfirmCancelButton = styled.button`
//   background-color: #FF0000;
//   color: #000000;
//   border: 0px solid #FF0000;
//   font-size: ${props => (props.theme.height * 0.0225) + 'px'};
//   margin-top: ${props => (props.theme.height * 0.00125) + 'px'};
//   margin-bottom: ${props => (props.theme.height * 0.00125) + 'px'};
//   margin-left: ${props => (props.theme.width * 0.0125) + 'px'};
//   margin-right: ${props => (props.theme.width * 0.0125) + 'px'};
//   height: ${props => (props.theme.height * 0.0475) + 'px'};
//   width: ${props => (props.theme.width * 0.425)+ 'px'};
//   border-radius: 3px;
// `
//
// export const ConfirmPasswordSection = styled.div`
//   display: ${props => props.visible};
// `
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
//
// export const TransactionLink = styled.a`
//
//   width: ${props => (props.theme.width * 0.9) + 'px'};
//   font-size: ${props => (props.theme.height * 0.030) + 'px'};
//   font-weight: bold;
//
//
//   :link {
//     color: gold;
//     text-align: center;
//   }
//
//   :visited {
//     color: white;
//     text-align: center;
//   }
// `
