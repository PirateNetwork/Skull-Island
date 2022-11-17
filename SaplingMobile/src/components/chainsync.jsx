import styled from 'styled-components'

export const ChainSyncBody = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${props => (props.theme.height * 0.10) + 'px' };
  width: ${props => (props.theme.width) + 'px'};
  z-index: 4;
`

export const ChainSyncDiv = styled.div`
  position: absolute;
  top:  ${props => (props.theme.height * 0.05) + 'px' };
  left: 0;
  height: ${props => (props.theme.height * 0.10) + 'px' };
  width: ${props => (props.theme.width) + 'px'};
  z-index: 4;
`

export const ChainSyncStatus = styled.div`
  position: absolute;
  top: 0;
  left: ${props => (props.theme.width * (0.075 + 0.020)) + 'px' };
  height: ${props => (props.theme.height * 0.015) + 'px' };
  width: ${props => (props.theme.width * 0.50) + 'px' };
  font-size: ${props => (props.theme.height * 0.015) + 'px' };
  color: ${props => props.synced ? 'rgba(149,198,35,1)' : 'rgba(229,66,18,1)'};
  text-align: left;
`

export const ChainSyncUSD = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * (0.0175 + 0.0375 + 0.0225)) + 'px' };
  right: ${props => (props.theme.width * 0.05) + 'px' };
  height: ${props => (props.theme.height * 0.02) + 'px' };
  width: ${props => (props.theme.width * 0.50) + 'px' };
  font-size: ${props => (props.theme.height * 0.02) + 'px' };
  color: white;
  text-align: right;
`

export const ChainSyncCurrentBalance = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * (0.075+0.0175-.018)) + 'px' };
  left: ${props => (props.theme.width * 0.10) + 'px' };
  height: ${props => (props.theme.height * 0.018) + 'px' };
  width: ${props => (props.theme.width * 0.50) + 'px' };
  font-size: ${props => (props.theme.height * 0.018) + 'px' };
  color: white;
  text-align: left;
`

export const ChainSyncBTC = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * (0.0175 + 0.0375)) + 'px' };
  right: ${props => (props.theme.width * 0.05) + 'px' };
  height: ${props => (props.theme.height * 0.02) + 'px' };
  width: ${props => (props.theme.width * 0.50) + 'px' };
  font-size: ${props => (props.theme.height * 0.02) + 'px' };
  color: white;
  text-align: right;
`

export const ChainSyncBalanceLogo = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.0175) + 'px' }
  left: ${props => (props.theme.width * 0.04) + 'px' };
  height: ${props => (props.theme.height * 0.075) + 'px' };
  width: ${props => (props.theme.height * 0.075) + 'px' };
`

export const ChainSyncBalanceLogoImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: ${props => (props.theme.height * 0.075) + 'px' };
  width:  ${props => (props.theme.height * 0.075) + 'px' };
  background-color: #000000;
`

export const ChainSyncBalance = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * 0.0175) + 'px' };
  right: ${props => (props.theme.width * (0.05)) + 'px' };
  height: ${props => (props.theme.height * 0.035) + 'px' };
  width: ${props => (props.theme.width * 0.75) + 'px' };
  font-size: ${props => (props.theme.height * 0.030) + 'px' };
  color: #bb9645;
  text-align: right;
  background-color: #000000;
`

export const ChainSyncBalanceUnits = styled.div`
  position: absolute;
  top: ${props => (props.theme.height * (0.0175 + 0.0125)) + 'px' };
  right: ${props => (props.theme.width * 0.05) + 'px' };
  height: ${props => (props.theme.height * 0.0225) + 'px' };
  width: ${props => (props.theme.width * 0.12) + 'px' };
  font-size: ${props => (props.theme.height * 0.0225) + 'px' };
  color: #bb9645;
  text-align: right;
  background-color: #000000;
`



// export const TitleDiv = styled.div`
//   position: absolute;
//   top: ${props => (props.theme.height * 0.02) + 'px'};
//   left: ${props => (props.theme.height * 0.0125) + 'px'};
//   color: #ffd700;
//   font-size: ${props => (props.theme.height * 0.032) + 'px'};
//   font-weight: bold;
//   width: ${props => (((props.theme.width) - 20)) + 'px'};
// `
//
// export const AddressDiv = styled.div`
//   position: absolute;
//   top: ${props => (props.theme.height * 0.055) + 'px'};
//   left: ${props => (props.theme.height * 0.0125) + 'px'};
//   font-size: ${props => (props.theme.height * 0.025) + 'px'};
//   color: #ffffff;
// `
// export const LogoImg = styled.img`
//   height: ${props => (props.theme.width * 0.25) + 'px' };
//   width: ${props => (props.theme.width * 0.25) + 'px'};
// `
// export const ImgDiv = styled.div`
//   position: absolute;
//   top: ${props => (props.theme.height * 0.09) + 'px'};
//   right: ${props => (props.theme.width * 0.125) + 'px' };
// `
// export const SyncDiv = styled.div`
//   position: absolute;
//   top: ${props => (props.theme.height * 0.11) + 'px'};
//   left: ${props => (props.theme.height * 0.0125) + 'px'};
//   font-size: ${props => (props.theme.height * 0.025) + 'px'};
// `
// export const BalanceDiv = styled.div`
//   position: absolute;
//   top: ${props => (props.theme.height * 0.195) + 'px'};
//   left: ${props => (props.theme.height * 0.0125) + 'px'};
//   font-size: ${props => (props.theme.height * 0.025) + 'px'};
// `
// export const BalanceNumberDiv = styled.div`
//   color: #ffd700;
//   font-size: ${props => (props.theme.height * 0.028) + 'px'};
//   font-weight: bold;
// `
//
// export const CurrencyDiv = styled.div`
//   color: #ffffff;
//   font-size: ${props => (props.theme.height * 0.020) + 'px'};
// `
