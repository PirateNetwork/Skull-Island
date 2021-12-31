import styled from 'styled-components'

export const ZAddressListMain = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => (props.theme.width) + 'px'};
  height: ${props => ((props.theme.height * 0.1625) - (((props.theme.width * 0.7)/15)*1.5)) + 'px'};
`
  // overscroll-behavior: contain;

export const ZAddressListOverScroll = styled.div`
  position: absolute;
  top: 0;
  left: ${props => (props.theme.width * 0.05) + 'px'};
  width: ${props => (props.theme.width * 0.90) + 'px'};
  height: ${props => ((props.theme.height * 0.1625) - (((props.theme.width * 0.7)/15)*1.5)) + 'px'};
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
