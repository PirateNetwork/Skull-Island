import styled from 'styled-components'

export const ZTransactionListMain = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => (props.theme.width) + 'px'};
  height: ${props => ((props.theme.height * 0.55) - (((props.theme.width * 0.7)/25)*1.5)) + 'px'};
`
  // overscroll-behavior: contain;

export const ZTransactionListOverScroll = styled.div`
  position: absolute;
  top: 0;
  left: ${props => (props.theme.width * 0.05) + 'px'};
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => ((props.theme.height * 0.55) - (((props.theme.width * 0.7)/25)*1.5)) + 'px'};
  overflow: scroll;
  overscroll-behavior: contain;
`

  // overflow: hidden;

export const ZTransactionListBottomSpacer = styled.div`
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.height * 0.25) + 'px'};
`


export const ZTransactionMemo = styled.div`
  color: white;
  position: relative;
  top: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0);
  left: ${props => (props.theme.width * 0.05) + 'px'};
  width: ${props => (props.theme.width *0.9) + 'px'};
  font-size: ${props => ((props.theme.width/45) * 1.5) + 'px'};
  text-align: center;
  word-wrap: break-word;
`

export const ZTransactionMemoCloseButton = styled.button`
  position: absolute;
  background-color: rgba(187,150,69,1);
  color: white;
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.325) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  left: ${props => (props.theme.width * 0.45 - props.theme.width * 0.325/2) + 'px'};
  border-radius: ${props => (props.theme.height * 0.075/2) + 'px'};
  border: 0px;

  :focus{
    outline: none;
  }
`

// ${props => props.allowScroll ? '' : 'height:' + (props.theme.height * 0.6) + 'px;'}

export const ZTransactionListUl = styled.ul`
  color: ${props => props.header ? '#ffd700' : '#ffffff'};
  font-weight: ${props => props.header ? 'bold' : 'normal'};
  font-size: ${props => ((props.theme.width/45) * 1.5) + 'px'};
  list-style-type: none;
  overflow: hidden;
  margin: 0;
  padding: 0;
`

export const ZTransactionListLi = styled.li`
  display: grid;
  padding: 0;
  margin: 0;
  background-color: #111111;
  border-radius: ${props => (props.theme.height * 0.015/2) + 'px'};
  grid-template-columns: ${props => ((props.theme.width) * 0.05) + 'px '}
                         ${props => ((props.theme.width) * 0.05) + 'px '}
                         ${props => ((props.theme.width) * 0.20) + 'px '}
                         ${props => ((props.theme.width) * 0.05) + 'px '}
                         ${props => ((props.theme.width) * 0.45) + 'px '}
                         ${props => ((props.theme.width) * 0.05) + 'px '}
                         ${props => ((props.theme.width) * 0.05) + 'px '};
`

export const Col1Div = styled.div`
  grid-column-start: 1;
  grid-column-end: 1;
`

export const Col2Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column-start: 2;
  grid-column-end: 2;
`

export const Col2All = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Col3Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column-start: 3;
  grid-column-end: 3;
`

export const Col3Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #737373;
  width: ${props => (props.theme.width * 0.20) + 'px'};
  height: ${props => ((props.theme.width * 0.125)/2) + 'px'};
  font-size: ${props => (((props.theme.width * 0.40)/20)*1.5) + 'px'};
`

export const Col3Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #737373;
  width: ${props => (props.theme.width * 0.20) + 'px'};
  height: ${props => ((props.theme.width * 0.125)/2) + 'px'};
  font-size: ${props => (((props.theme.width * 0.40)/20)*1.5) + 'px'};
`

export const Col4Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column-start: 4;
  grid-column-end: 4;
`

export const Col4Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #737373;
  width: ${props => ((props.theme.width * 0.125)/2) + 'px'};
  height: ${props => ((props.theme.width * 0.125)/2) + 'px'};
  font-size: ${props => (((props.theme.width * 0.40)/20)*1.5) + 'px'};
`

export const Col4Bottom = styled.div`
  color: #907435;
  width: ${props => ((props.theme.width * 0.125)/2) + 'px'};
  height: ${props => ((props.theme.width * 0.125)/2) + 'px'};
  font-size: ${props => (((props.theme.width * 0.40)/20)*1.5) + 'px'};
  text-align: right;
`

export const Col5Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: right;
  grid-column-start: 5;
  grid-column-end: 5;
`

export const Col5All = styled.div`
  color: ${(props => props.inbound ? '#95c623' : '#e54212')};
  width: ${props => (props.theme.width * 0.45) + 'px'};
  font-size: ${props => (((props.theme.width * 0.40)/20)*1.5) + 'px'};
  margin-left: ${props => ((((props.theme.width * 0.40)/26)*1.5) * 1.5) + 'px'};
`

export const Col6Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column-start: 6;
  grid-column-end: 6;
`

export const Col7Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  grid-column-start: 7;
  grid-column-end: 7;
`

export const Col7All = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
`

export const Spacer = styled.div`
  min-height: ${props => (props.theme.height * 0.005) + 'px'};
`

export const ArrowImg = styled.img`
  max-height: ${props => (props.theme.width * 0.03) + 'px'};
`

export const ZTransactionListImgDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => (props.theme.width * 0.05) - 4 + 'px'};
  height: ${props => (props.theme.width * 0.05) - 4 + 'px'};
  border-radius: ${props => (props.theme.width * 0.05/2) + 'px'};
  border: 0px solid black;
  margin: 0;
  padding: 0;
  background-color: ${(props => props.inbound ? '#95c623' : '#e54212')};
`

export const ZTransactionListImg = styled.img`
  width: ${props => ((props.theme.width * 0.05) - 2) + 'px'};
  height: ${props => ((props.theme.width * 0.05) - 2) + 'px'};
  border-radius: ${props => (props.theme.width * 0.05/2) + 'px'};
  border: 1px solid #000000;
  margin: 0;
  padding: 0;
`

export const ZTransactionMemoButton = styled.button`
  width: ${props => (props.theme.width * 0.90) + 'px'};
  border-radius: ${props => (props.theme.height * 0.015/2) + 'px'};
  background-color: rgba(0,0,0,0);
  border: 0px;
  margin: 0;
  padding: 0;
  text-decoration: none;

  :focus{
    outline: none;
  }
`

export const ZTransactionMemoImg = styled.img`
  width: ${props => ((props.theme.width * 0.035)) + 'px'};
  height: ${props => ((props.theme.width * 0.035)) + 'px'};
  opacity: ${props => props.opacity};
`

export const ZTransactionListLink = styled.a`
  text-decoration: none;
  color: white;
`
