import styled from 'styled-components'

const TitleFontSize = 1.5/21
const DashAreaSize = 1.5/18

export const AddressDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  text-align: left;
`
export const AddressDropdownButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => (props.theme.width * DashAreaSize) + 'px'};
  background-color: rgba(0,0,0,0);
  color: #ffffff;
  border: 0px;
  text-align: left;

  :focus{
    outline: none;
  }
`

export const AddressDropdownButtonLi = styled.li`
  display: grid;
  padding: 0;
  margin: 0;
  background-color: rgba(0,0,0,0);
  border-radius: ${props => (props.theme.height * 0.015/2) + 'px'};
  grid-template-columns: ${props => ((props.theme.width) * 0.0125) + 'px '}
                         ${props => ((props.theme.width) * 0.475) + 'px '}
                         ${props => ((props.theme.width) * 0.025) + 'px '}
                         ${props => ((props.theme.width) * 0.375) + 'px '}
                         ${props => ((props.theme.width) * 0.0125) + 'px '};
`


export const AddressDropdownContent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: ${props => props.visible};
  width: ${props => (props.theme.width) + 'px'};
  height: ${props => (props.theme.height) + 'px'};
  background-color: rgba(0,0,0,1);
  color: #ffffff;
  border: 0px;
  z-index: 101;
`

export const AddressTitle = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.013) + 'px'};
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

export const AddressSectionOverscroll = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.023)
        + (props.theme.width * TitleFontSize)
        + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  height: ${props => (props.theme.height * .960) + 'px'};
  width: ${props => (props.theme.width * 0.90) + 'px'};
  overflow: scroll;
  overscroll-behavior: contain;
`

export const AddressListUl = styled.ul`
  color: ${props => props.header ? '#ffd700' : '#ffffff'};
  font-weight: ${props => props.header ? 'bold' : 'normal'};
  font-size: ${props => ((props.theme.width/45) * 1.5) + 'px'};
  list-style-type: none;
  overflow: hidden;
  margin: 0;
  padding: 0;

`

export const AddressListLi = styled.li`
  display: grid;
  padding: 0;
  margin: 0;
  background-color: #111111;
  border-radius: ${props => (props.theme.height * 0.015/2) + 'px'};
  grid-template-columns: ${props => ((props.theme.width) * 0.0125) + 'px '}
                         ${props => ((props.theme.width) * 0.475) + 'px '}
                         ${props => ((props.theme.width) * 0.025) + 'px '}
                         ${props => ((props.theme.width) * 0.375) + 'px '}
                         ${props => ((props.theme.width) * 0.0125) + 'px '};
`


export const ZAddressButton = styled.button`
  width: ${props => (props.theme.width * 0.90) + 'px'};
  border-radius: ${props => (props.theme.height * 0.015/2) + 'px'};
  background-color: rgba(0,0,0,0);
  border: 0px;
  margin: 0;
  padding: 0;

  :focus{
    outline: none;
  }
`

export const Col1Div = styled.div`
  grid-column-start: 1;
  grid-column-end: 1;
`

export const Col2Div = styled.div`
  grid-column-start: 2;
  grid-column-end: 2;
`

export const Col2Top = styled.div`
  display: flex;
  align-items: center;
  color: #907435
  space: nowrap;
  width: ${props => (props.theme.width * 0.45) + 'px'};
  height: ${props => ((props.theme.width * 0.125)/2) + 'px'};
  font-size: ${props => (((props.theme.width * 0.45)/22)*1.5) + 'px'};
  text-align: left;
  margin-left: 0;
  margin: 0;
  padding: 0;
`

export const Col2Bottom = styled.div`
  display: flex;
  align-items: center;
  color: grey;
  width: ${props => (props.theme.width * 0.45) + 'px'};
  height: ${props => ((props.theme.width * 0.125)/2) + 'px'};
  font-size: ${props => (((props.theme.width * 0.45)/25)*1.5) + 'px'};
  text-align: left;
  margin-left: 0;
  margin: 0;
  padding: 0;
`

export const Col3Div = styled.div`
  grid-column-start: 3;
  grid-column-end: 3;
`

export const Col4Div = styled.div`
  grid-column-start: 4;
  grid-column-end: 4;
`

export const Col4Top = styled.div`
  display: flex;
  align-items: center;
  color: #907435
  width: ${props => (props.theme.width * 0.35) + 'px'};
  height: ${props => ((props.theme.width * 0.125)/2) + 'px'};
  font-size: ${props => (((props.theme.width * 0.45)/20)*1.5) + 'px'};
  text-align: left;
  margin: 0;
  padding: 0;
`

export const Col4Bottom = styled.div`
  display: flex;
  align-items: center;
  color: grey;
  width: ${props => (props.theme.width * 0.35) + 'px'};
  height: ${props => ((props.theme.width * 0.125)/2) + 'px'};
  font-size: ${props => (((props.theme.width * 0.45)/25)*1.5) + 'px'};
  text-align: left;
  margin: 0;
  padding: 0;
`

export const Col5Div = styled.div`
  grid-column-start: 5;
  grid-column-end: 5;
`

export const Col5All = styled.div`
  top: 0;
  left: 0;
`

export const Spacer = styled.div`
  min-height: ${props => (props.theme.height * 0.005) + 'px'};
`

// export const AddressDropdownButtonLine = styled.button`
//   width: ${props => ((props.theme.width) * 0.95) + 'px'};
//   background-color: rgba(0,0,0,0);
//   color: #ffffff;
//   font-size: ${props => (props.theme.width * InputAreaSize) + 'px'};
//   border: 0px;
//   text-align: left;
//
//   :focus{
//     outline: none;
//   }
// `
