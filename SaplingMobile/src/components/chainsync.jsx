import styled from 'styled-components'

export const ChainSyncGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${props => (props.sc.height * 0.35) + 'px' };
  width: ${props => (props.sc.width) + 'px'};
  color: #ffd700;
  display: grid;
  grid-template-columns: 10px repeat(2,${props => (((props.sc.width) - 20)/2) + 'px'}) 10px;
  grid-template-rows: repeat(10, ${props => ((props.sc.height * 0.35)/10) + 'px'});
`
export const TitleDiv = styled.div`
  position: absolute;
  top: ${props => (props.sc.height * 0.02) + 'px'};
  left: ${props => (props.sc.height * 0.0125) + 'px'};
  color: #ffd700;
  font-size: ${props => (props.sc.height * 0.032) + 'px'};
  font-weight: bold;
  width: ${props => (((props.sc.width) - 20)) + 'px'};
`

export const AddressDiv = styled.div`
  position: absolute;
  top: ${props => (props.sc.height * 0.055) + 'px'};
  left: ${props => (props.sc.height * 0.0125) + 'px'};
  font-size: ${props => (props.sc.height * 0.025) + 'px'};
  color: #ffffff;
`
export const LogoImg = styled.img`
  height: ${props => (props.sc.width * 0.25) + 'px' };
  width: ${props => (props.sc.width * 0.25) + 'px'};
`
export const ImgDiv = styled.div`
  position: absolute;
  top: ${props => (props.sc.height * 0.09) + 'px'};
  right: ${props => (props.sc.width * 0.125) + 'px' };
`
export const SyncDiv = styled.div`
  position: absolute;
  top: ${props => (props.sc.height * 0.11) + 'px'};
  left: ${props => (props.sc.height * 0.0125) + 'px'};
  font-size: ${props => (props.sc.height * 0.025) + 'px'};
`
export const BalanceDiv = styled.div`
  position: absolute;
  top: ${props => (props.sc.height * 0.195) + 'px'};
  left: ${props => (props.sc.height * 0.0125) + 'px'};
  font-size: ${props => (props.sc.height * 0.025) + 'px'};
`
export const BalanceNumberDiv = styled.div`
  color: #ffd700;
  font-size: ${props => (props.sc.height * 0.028) + 'px'};
  font-weight: bold;
`

export const CurrencyDiv = styled.div`
  color: #ffffff;
  font-size: ${props => (props.sc.height * 0.020) + 'px'};
`
