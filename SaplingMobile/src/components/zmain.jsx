import styled from 'styled-components'

// , { keyframes }

export const ZMainDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: ${props => props.theme.height + 'px'};
  width: ${props => props.theme.width + 'px'};
  display: ${props => props.visible};
  transition: 500ms;
`

export const ZMainMenu = styled.div`
  position: absolute;
  top: 0
  left: 0
  height: ${props => ((props.theme.height * 0.05)) + 'px'};
  width: ${props => props.theme.width + 'px'};
  display: block;
  background-color: #000000;
  color: #ffffff;
  display: ${props => props.visible};
`

export const ZMainMenuButton = styled.button`
  position: absolute;
  top: ${props => ((props.theme.height * 0.015)) + 'px'};
  left: ${props => ((props.theme.height * 0.02)) + 'px'};
  background-color: #000000;
  color: #ffffff;
  width: ${props => ((props.theme.height * 0.025 * 1.5)) + 'px'};
  height: ${props => ((props.theme.height * 0.025)) + 'px'};
  font-size: ${props => ((props.theme.height * 0.025)) + 'px'};
  border: 0px solid #000000;
  z-index: 1;
  text-align: center;

  :focus{
    outline: none;
  }
`

export const ZMainMenuZSynced = styled.div`
  position: absolute;
  top: ${props => ((props.theme.height * 0.015)) + 'px'};
  left: ${props => ((props.theme.height * 0.075)) + 'px'};
  background-color: rgba(0,0,0,0);
  width: ${props => ((props.theme.height * 0.05)) + 'px'};
  height: ${props => ((props.theme.height * 0.05)) + 'px'};
  border: 0px solid #000000;
  z-index: 1;
  text-align: center;
`

export const ZMainCenteredDiv = styled.div`
  display: inline-block;
`

export const ZMainMenuButtonLine = styled.button`
  position: absolute;
  top: ${props => (props.theme.width * 0.6/2) - (((props.theme.width * 0.6/20)*1.5) * props.pos) + 'px'};
  left: 0;
  background-color: #303030;
  color: white;
  width: ${props => ((props.theme.width * 0.6)) + 'px'};
  height: ${props => (((props.theme.width * 0.6/20)*1.5)*2) + 'px'};
  font-size: ${props => ((props.theme.width * 0.6/20)*1.5) + 'px'};
  border-radius: ${props => ((props.theme.width * 0.6/20)*1.5)/2 + 'px'};
  border: 0px solid #000000;
  z-index: 1;
  text-align: center;

  :focus{
    outline: none;
  }
`

export const ZMainMenuButtonImg = styled.img `
  height: ${props => ((props.theme.height * 0.025)) + 'px'};
`

export const ZMainMenuContent = styled.div`
  display: ${props => props.visible};
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000;
  height: ${props => (props.theme.height) + 'px'};
  width: ${props => (props.theme.width) + 'px'};
  z-index: 2;
`

export const ZMainMenuContentButtons = styled.div`
  position: absolute;
  top: ${props => (props.theme.height/2) - (props.theme.width * 0.6/2) + 'px'};
  left: ${props => (props.theme.width/2) - (props.theme.width * 0.6/2) + 'px'};
  height: ${props => (props.theme.width * 0.6) + 'px'};
  width: ${props => (props.theme.width * 0.6) + 'px'};
  z-index: 2;
`

export const ZMainMenuContentImg = styled.img`
  position: absolute;
  top: ${props => (props.theme.height/2) - (props.theme.width * 0.75/2) + 'px'};
  left: ${props => (props.theme.width/2) - (props.theme.width * 0.75/2) + 'px'};
  height: ${props => (props.theme.width * 0.75) + 'px'};
  width: ${props => (props.theme.width * 0.75) + 'px'};
`

export const ZMainSendButton = styled.button`
  position: absolute;
  background-color: #bb9645;
  color: white;
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.325) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  top: 0;
  border-radius: ${props => (props.theme.height * 0.075/2) + 'px'};
  border: 0px;
  opacity: ${props => props.opacity};

  :focus{
    outline: none;
  }
`

export const ZMainReceiveButton = styled.button`
  position: absolute;
  background-color: #303133;
  color: white;
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.325) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  right: ${props => (props.theme.width * 0.05) + 'px'};
  top: 0;
  border-radius: ${props => (props.theme.height * 0.075/2) + 'px'};
  border: 0px;
  opacity: ${props => props.opacity};

  :focus{
    outline: none;
  }
`

export const ZMainCenterButton = styled.button`
  position: absolute;
  background-color: #a6a6a6;
  color: white;
  font-size: ${props => (props.theme.height * 0.025) + 'px'};
  width: ${props => (props.theme.width * 0.20) + 'px'};
  height: ${props => (props.theme.height * 0.075) + 'px'};
  left: ${props => ((props.theme.width * 0.5) - (props.theme.width * 0.20/2)) + 'px'};
  top: 0;
  border-radius: ${props => (props.theme.height * 0.075/2) + 'px'};
  border: 0px;
  opacity: ${props => props.opacity};

  :focus{
    outline: none;
  }
`

export const ZMainCenterButtonImg = styled.img`
  position: absolute;
  top: ${props => (props.theme.height * 0.015) + 'px'};
  left: ${props => ((props.theme.width * 0.1) - (props.theme.height * 0.045/2)) + 'px'};
  height: ${props => (props.theme.height * 0.045) + 'px'};
  width: ${props => (props.theme.height * 0.045) + 'px'};
`

export const ZMainMiddleSection = styled.div`
  height: ${props => (props.theme.height * 0.075) + ((((props.theme.width * 0.7)/15)*1.5)*2) + 'px'};
  width: ${props => props.theme.width + 'px'};
  position: absolute;
  top: ${props => ((props.theme.height * 0.40) - (props.theme.height * props.hPositionMod))+ 'px'};
  left: 0;
  transition:  500ms;
`

export const ZMainTransactionListHeader = styled.div`
  height: ${props => ((((props.theme.width * 0.7)/15)*1.5)) + 'px'};
  width: ${props => (props.theme.width * 0.9) + 'px'};
  font-size: ${props => (((props.theme.width * 0.7)/20)*1.5) + 'px'};
  font-weight: bold;
  color: #bb9645;
  position: absolute;
  bottom: ${props => ((((props.theme.width * 0.7)/15)*1.5) * 6/8) + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  transition: 500ms;
`

export const ZMainTransactionListSwipeUp= styled.div`
  height: ${props => ((((props.theme.width * 0.7)/15)*1.5)/2) * props.hSize + 'px'};
  width: ${props => (props.theme.width * 0.9) + 'px'};
  position: absolute;
  bottom: ${props => ((((props.theme.width * 0.7)/15)*1.5) * 2/8) + 'px'};
  left:${props => (props.theme.width * 0.05) + 'px'};
  transition: 500ms;
  z-index: 2;
  text-align: center;
`

export const ZMainTransactionListSwipeDown = styled.div`
  height: ${props => ((((props.theme.width * 0.7)/15)*1.5)/2) * props.hSize + 'px'};
  width: ${props => (props.theme.width * 0.9) + 'px'};
  position: absolute;
  bottom: ${props => ((((props.theme.width * 0.7)/15)*1.5) * 1/8) + 'px'};
  left: ${props => (props.theme.width * 0.05) + 'px'};
  transition: 500ms;
  z-index: 2;
  text-align: center;
`

export const ZMainTransactionListSwipeUpImg = styled.img`
  position: absolute;
  bottom: 0;
  left: ${props =>(props.theme.width * 0.45) - (((((props.theme.width * 0.7)/15)*1.5)/2) * 0.85 * 2.5 * props.hSize)/2 + 'px'};
  height: ${props => ((((props.theme.width * 0.7)/15)*1.5)/2) * 0.85 * props.hSize + 'px'};
  width: ${props => ((((props.theme.width * 0.7)/15)*1.5)/2) * 0.85 * 2.5 * props.hSize + 'px'};
  transition: 500ms;
`

export const ZMainTransactionListSwipeDownImg = styled.img`
  position: absolute;
  bottom: 0;
  left: ${props =>(props.theme.width * 0.45) - (((((props.theme.width * 0.7)/15)*1.5)/2) * 0.85 * 2.5 * props.hSize)/2 + 'px'};
  height: ${props => ((((props.theme.width * 0.7)/15)*1.5)/2) * 0.85 * props.hSize + 'px'};
  width: ${props => ((((props.theme.width * 0.7)/15)*1.5)/2) * 0.85 * 2.5 * props.hSize + 'px'};
  transform: rotate(180deg);
  transition: 500ms;
`

export const ZMainTransactionListSwipe = styled.div`
  height: ${props => ((((props.theme.width * 0.7)/15)*1.5)*2) + 'px'};
  width: ${props => (props.theme.width) + 'px'};
  font-size: ${props => (((props.theme.width * 0.7)/20)*1.5) + 'px'};
  font-weight: bold;
  color: #bb9645;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
`

export const ZMainLowerSection = styled.div`
  background-image: linear-gradient(rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,0));
  height: ${props => ((props.theme.height * 0.365) - ((((props.theme.width * 0.7)/15)*1.5)*2) + (props.theme.height * props.hPositionMod)) + 'px'};
  width: ${props => props.theme.width + 'px'};
  position: absolute;
  bottom: ${props => (props.theme.height * 0.15) + 'px'};
  left: 0;
  transition:  500ms;
`
