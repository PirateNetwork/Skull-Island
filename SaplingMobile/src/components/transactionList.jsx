import styled from 'styled-components'

export const ListDiv = styled.div`
  position: absolute;
  top: 0;
  left: 10px;
  width: ${props => (props.sc.width - 20) + 'px'};
  height: ${props => (props.sc.height * 0.6) + 'px'};
  overflow: scroll;
  overscroll-behavior: contain;
`

export const TransactionUl = styled.ul`
  color: ${props => props.header ? '#ffd700' : '#ffffff'};
  font-weight: ${props => props.header ? 'bold' : 'normal'};
  font-size: ${props => ((props.sc.width/45) * 1.5) + 'px'};
  list-style-type: none;
  overflow: hidden;
  margin: 0;
  padding: 0;
`

export const TransactionLi = styled.li`
  display: grid;
  padding: 0;
  margin: 0;
  grid-template-columns: ${props => ((props.sc.width - 20) * 0.41) + 'px '}
                         ${props => ((props.sc.width - 20) * 0.05) + 'px '}
                         ${props => ((props.sc.width - 20) * 0.08) + 'px '}
                         ${props => ((props.sc.width - 20) * 0.41) + 'px '}
                         ${props => ((props.sc.width - 20) * 0.05) + 'px '};
`

export const Col1Div = styled.div`
  grid-column-start: 1;
  grid-column-end: 1;
`

export const Col2Div = styled.div`
  grid-column-start: 2;
  grid-column-end: 2;
`

export const Col3Div = styled.div`
  grid-column-start: 3;
  grid-column-end: 3;
`

export const Col4Div = styled.div`
  grid-column-start: 4;
  grid-column-end: 4;
`

export const Col5Div = styled.div`
  grid-column-start: 5;
  grid-column-end: 5;
`
export const Spacer = styled.div`
  min-height: ${props => (props.sc.height * 0.005) + 'px'};

`
export const ArrowImg = styled.img`
  max-width: ${props => ((props.sc.width - 20) * 0.04) + 'px'};
  max-height: ${props => (props.sc.height * 0.025) + 'px'};
`

export const TransactionListLink = styled.a`
  text-decoration: none;
  color: white;
`
