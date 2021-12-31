import styled from 'styled-components'

const TitleFontSize = 1.5/21
// const SectionTitleFontSize = 1.5/36
// const RedFontSize = 1.5/52
// const DashAreaSize = 1.5/18
// const InputAreaSize = 1.5/24
const InputAreaFontSize = 1.5/44

export const ZTransactionMain = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => (props.theme.width) + 'px'};
  height: ${props => (props.theme.height * 0.90) + 'px'};
  z-index: 98;
`

export const ZTransactionOverScroll = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.0125) + 'px'};
  left: 0;
  height: ${props => (props.theme.height * .890) + 'px'};
  width: ${props => (props.theme.width) + 'px'};
  overflow: scroll;
  overscroll-behavior: contain;
`

export const ZTransactionTitle = styled.div`
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

export const ZTransactionDetails = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.05)
    + (props.theme.width * TitleFontSize)
    + 'px'};
  left: 0;
  color: #bb9645;
  height: ${props => (props.theme.height * .890)
    - (props.theme.height * .05)
    - (props.theme.width * TitleFontSize) + 'px'};
  width: ${props => props.theme.width + 'px'};
  font-family: 'Bai Jamjuree';
  font-style: normal;
  font-weight: bold;
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  text-align: left;
`

export const ZTransactionDetailFieldName = styled.div`
  position: relative;
  left: ${props => (props.theme.width * 0.025) + 'px'};
  color: #bb9645;
  width: ${props => (props.theme.width * 0.95) + 'px'};
  font-family: 'Bai Jamjuree';
  font-style: normal;
  font-weight: bold;
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  text-align: left;
`

export const ZTransactionDetailFieldData = styled.div`
  position: relative;
  left: ${props => (props.theme.width * 0.05) + 'px'};
  color: white;
  width: ${props => (props.theme.width * 0.90) + 'px'};
  font-family: 'Bai Jamjuree';
  font-style: normal;
  font-weight: bold;
  font-size: ${props => (props.theme.width * InputAreaFontSize) + 'px'};
  text-align: left;
  word-wrap: break-word;
  word-break: break-word;
`

export const ZTransactionButtonBar = styled.div`
  position: relative;
  left: 0;
`


export const ZTransactionBackButton = styled.button`
  position: absolute;
  top: 0;
  left: ${props => (props.theme.width * 0.25 - props.theme.width * 0.325/2) + 'px'};
  background-color: rgba(187,150,69,1);
  color: white;
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.325) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  border-radius: ${props => (props.theme.height * 0.075/2) + 'px'};
  border: 0px;

  :focus{
    outline: none;
  }
`

export const ZTransactionExplorerButton = styled.button`
  position: absolute;
  top: 0;
  left: ${props => (props.theme.width * 0.75 - props.theme.width * 0.325/2) + 'px'};
  background-color: grey;
  color: white;
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.325) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  border-radius: ${props => (props.theme.height * 0.075/2) + 'px'};
  border: 0px;

  :focus{
    outline: none;
  }
`
