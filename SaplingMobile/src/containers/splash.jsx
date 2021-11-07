import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {BlackBackground} from '../pagecomponents/PirateShared'

import {
  SplashHeaderFade,
  SplashFade,
  SplashSection,
  SplashSkullImg,
  SplashPirateImg,
  SplashMobileImg,
  SplashFooterImg,
  SplashFooter,
  SplashCopyright,
  SplashLoader
} from '../components/splash'

import Loader from '../containers/loader'

import skull from '../assets/Pirate_Logo_Skull_Gold.png'
import pirateChain from '../assets/svg/pirate_chain.svg'
import mobileWallet from '../assets/svg/mobile_wallet.svg'
import footer from '../assets/svg/footer.svg'

class SplashPage extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <BlackBackground>
        <SplashHeaderFade>
        </SplashHeaderFade>
        <SplashFade>
        </SplashFade>
        <SplashSection>
          <SplashSkullImg src = {skull} />
          <SplashPirateImg src = {pirateChain}/>
          <SplashLoader>
            <Loader/>
          </SplashLoader>
          <SplashMobileImg src = {mobileWallet}/>
          <SplashFooterImg src = {footer} />
          <SplashFooter>
            <SplashCopyright>
              <span>
                © Copyright 2021 PirateChain
                <br/>
                • All rights reserved •
              </span>
            </SplashCopyright>
          </SplashFooter>
        </SplashSection>
      </BlackBackground>
    )
  }
}

SplashPage.propTypes = {
  context: PropTypes.object.isRequired,
}

// <SplashSection>
//   <CenteredDiv>
//     <img id="Pirate_Logo_Skull_Gold" src={pirateLogo} />
//     <PirateSvg width={screenDim.width} height={screenDim.height * 0.075} viewBox="0 10 256 48">
//       <PiratePath fill="rgba(187,150,69,1)" stroke="rgba(0,0,0,0)" strokeWidth="1px" strokeLinejoin="miter" strokeLinecap="butt" strokeMiterlimit="4" shapeRendering="auto" id="Xoin" d="M30.087 26.282C30.087 25.549 30.765 24.944 31.608 24.944L39.086 24.944 44.511 22.213C43.686 21.388 42.531 20.875 41.267 20.875L30.673 20.875C28.089 20.875 26.018 22.946 26.018 25.494L26.018 31.725 30.087 29.617 30.087 26.282ZM45.885 26.025 41.816 28.078 41.816 32.146C41.816 32.898 41.12 33.503 40.277 33.503L31.333 33.503 26.018 36.27 26.018 39.752 26.018 41.732 26.018 43.125 27.631 43.125 29.024 43.088C29.629 42.941 30.123 42.392 30.123 41.732L30.123 37.791 41.285 37.791C43.832 37.791 45.903 35.72 45.903 33.173L45.903 26.263C45.885 26.19 45.885 26.117 45.885 26.025ZM49.262 21.3 53.402 21.3 53.402 42.3 49.262 42.3 49.262 21.3ZM57.422 21.3 68.582 21.3C70.402 21.3 71.867 21.79 72.977 22.77 74.087 23.75 74.642 25.04 74.642 26.64L74.642 28.74C74.642 29.78 74.347 30.685 73.757 31.455 73.167 32.225 72.312 32.81 71.192 33.21L71.192 33.27C71.832 33.69 72.317 34.17 72.647 34.71 72.977 35.25 73.302 36 73.622 36.96L75.302 42.3 71.012 42.3 69.422 37.32C69.162 36.46 68.802 35.82 68.342 35.4 67.882 34.98 67.312 34.77 66.632 34.77L61.562 34.77 61.562 42.3 57.422 42.3 57.422 21.3ZM67.802 31.2C68.642 31.2 69.302 30.975 69.782 30.525 70.262 30.075 70.502 29.49 70.502 28.77L70.502 26.82C70.502 26.24 70.322 25.775 69.962 25.425 69.602 25.075 69.122 24.9 68.522 24.9L61.562 24.9 61.562 31.2 67.802 31.2ZM90.062 37.41 82.202 37.41 80.342 42.3 76.022 42.3 84.242 21.3 86.102 21.3C87.402 21.3 88.282 21.9 88.742 23.1L96.212 42.3 91.892 42.3 90.062 37.41ZM83.312 33.93 88.952 33.93 86.162 26.37 86.132 26.37 83.312 33.93ZM100.352 24.9 93.692 24.9 93.692 21.3 111.152 21.3 111.152 24.9 104.492 24.9 104.492 42.3 100.352 42.3 100.352 24.9ZM116.282 42.3C115.422 42.3 114.722 42.04 114.182 41.52 113.642 41 113.372 40.32 113.372 39.48L113.372 21.3 129.392 21.3 129.392 24.9 117.512 24.9 117.512 29.76 128.492 29.76 128.492 33.36 117.512 33.36 117.512 38.7 129.392 38.7 129.392 42.3 116.282 42.3ZM147.992 42.54C146.452 42.54 145.097 42.21 143.927 41.55 142.757 40.89 141.852 39.955 141.212 38.745 140.572 37.535 140.252 36.14 140.252 34.56L140.252 29.04C140.252 27.46 140.577 26.065 141.227 24.855 141.877 23.645 142.797 22.71 143.987 22.05 145.177 21.39 146.552 21.06 148.112 21.06L151.292 21.06C152.792 21.06 154.112 21.38 155.252 22.02 156.392 22.66 157.277 23.555 157.907 24.705 158.537 25.855 158.852 27.19 158.852 28.71L154.772 28.71C154.772 27.51 154.452 26.545 153.812 25.815 153.172 25.085 152.332 24.72 151.292 24.72L148.112 24.72C146.992 24.72 146.092 25.135 145.412 25.965 144.732 26.795 144.392 27.88 144.392 29.22L144.392 34.38C144.392 35.72 144.722 36.805 145.382 37.635 146.042 38.465 146.912 38.88 147.992 38.88L151.232 38.88C152.292 38.88 153.157 38.47 153.827 37.65 154.497 36.83 154.832 35.75 154.832 34.41L158.912 34.41C158.912 36.03 158.592 37.455 157.952 38.685 157.312 39.915 156.412 40.865 155.252 41.535 154.092 42.205 152.752 42.54 151.232 42.54L147.992 42.54ZM161.492 21.3 165.632 21.3 165.632 29.97 175.412 29.97 175.412 21.3 179.552 21.3 179.552 42.3 175.412 42.3 175.412 33.57 165.632 33.57 165.632 42.3 161.492 42.3 161.492 21.3ZM195.572 37.41 187.712 37.41 185.852 42.3 181.532 42.3 189.752 21.3 191.612 21.3C192.912 21.3 193.792 21.9 194.252 23.1L201.722 42.3 197.402 42.3 195.572 37.41ZM188.822 33.93 194.462 33.93 191.672 26.37 191.642 26.37 188.822 33.93ZM204.002 21.3 208.142 21.3 208.142 42.3 204.002 42.3 204.002 21.3ZM212.162 21.3 215.852 21.3 225.932 35.58 225.932 21.3 229.982 21.3 229.982 42.3 226.292 42.3 216.212 28.02 216.212 42.3 212.162 42.3 212.162 21.3Z">
//       </PiratePath>
//     </PirateSvg>
//     <PirateSvg width={screenDim.width} height={screenDim.height * 0.055} viewBox="0 20 256 48" preserveAspectRatio="xMidYMin meet">
//       <PiratePath fill="rgba(187,150,69,1)" stroke="rgba(0,0,0,0)" strokeWidth="1px" strokeLinejoin="miter" strokeLinecap="butt" strokeMiterlimit="4" shapeRendering="auto" id="Xoin_vm" d="M8.6 18.913 13.212 18.913 21.8 34.513 30.2 18.913 34.812 18.913 34.812 45.163 29.75 45.163 29.75 28.55 24.237 38.525C23.862 39.2 23.481 39.681 23.094 39.969 22.706 40.256 22.262 40.4 21.762 40.4L20.337 40.4 13.662 28.55 13.662 45.163 8.6 45.163 8.6 18.913ZM46.55 45.463C44.975 45.463 43.581 45.156 42.369 44.544 41.156 43.931 40.219 43.063 39.556 41.937 38.894 40.813 38.562 39.513 38.562 38.037L38.562 33.65C38.562 32.175 38.9 30.869 39.575 29.731 40.25 28.594 41.194 27.713 42.406 27.088 43.619 26.463 45.012 26.15 46.587 26.15L49.962 26.15C51.537 26.15 52.931 26.463 54.144 27.088 55.356 27.713 56.3 28.594 56.975 29.731 57.65 30.869 57.987 32.175 57.987 33.65L57.987 38.037C57.987 39.513 57.65 40.813 56.975 41.937 56.3 43.063 55.356 43.931 54.144 44.544 52.931 45.156 51.525 45.463 49.925 45.463L46.55 45.463ZM49.85 41.075C50.775 41.075 51.512 40.756 52.062 40.119 52.612 39.481 52.887 38.65 52.887 37.625L52.887 33.987C52.887 32.962 52.612 32.131 52.062 31.494 51.512 30.856 50.787 30.537 49.887 30.537L46.662 30.537C45.762 30.537 45.037 30.856 44.487 31.494 43.937 32.131 43.662 32.962 43.662 33.987L43.662 37.625C43.662 38.65 43.937 39.481 44.487 40.119 45.037 40.756 45.75 41.075 46.625 41.075L49.85 41.075ZM70.625 45.463C69.85 45.463 69.062 45.213 68.262 44.713 67.462 44.213 66.812 43.563 66.312 42.763L66.312 45.163 61.587 45.163 61.587 18.913 66.687 18.913 66.687 27.913C67.187 27.387 67.806 26.962 68.544 26.638 69.281 26.312 69.987 26.15 70.662 26.15L73.287 26.15C74.737 26.15 76.019 26.456 77.131 27.069 78.244 27.681 79.106 28.55 79.719 29.675 80.331 30.8 80.637 32.1 80.637 33.575L80.637 37.85C80.637 39.35 80.325 40.675 79.7 41.825 79.075 42.975 78.2 43.869 77.075 44.506 75.95 45.144 74.662 45.463 73.212 45.463L70.625 45.463ZM72.612 41C73.487 41 74.194 40.675 74.731 40.025 75.269 39.375 75.537 38.525 75.537 37.475L75.537 33.95C75.537 32.95 75.275 32.144 74.75 31.531 74.225 30.919 73.537 30.613 72.687 30.613L70.362 30.613C69.362 30.613 68.525 30.963 67.85 31.663 67.175 32.363 66.787 33.288 66.687 34.437L66.687 37.663C66.862 38.662 67.269 39.469 67.906 40.081 68.544 40.694 69.3 41 70.175 41L72.612 41ZM87.462 24.687C86.487 24.687 85.706 24.406 85.119 23.844 84.531 23.281 84.237 22.538 84.237 21.613 84.237 20.687 84.531 19.944 85.119 19.381 85.706 18.819 86.487 18.538 87.462 18.537 88.437 18.537 89.219 18.819 89.806 19.381 90.394 19.944 90.687 20.687 90.687 21.613 90.687 22.538 90.394 23.281 89.806 23.844 89.219 24.406 88.437 24.687 87.462 24.687ZM84.912 26.45 90.012 26.45 90.012 45.163 84.912 45.163 84.912 26.45ZM101.487 45.163C99.262 45.163 97.631 44.694 96.594 43.756 95.556 42.819 95.037 41.362 95.037 39.388L95.037 18.913 100.137 18.913 100.137 39.088C100.137 39.687 100.275 40.125 100.55 40.4 100.825 40.675 101.262 40.813 101.862 40.813L103.887 40.813 103.887 45.163 101.487 45.163ZM113.412 45.463C111.837 45.463 110.444 45.169 109.231 44.581 108.019 43.994 107.075 43.169 106.4 42.106 105.725 41.044 105.387 39.825 105.387 38.45L105.387 33.612C105.387 32.138 105.725 30.838 106.4 29.713 107.075 28.587 108.019 27.713 109.231 27.088 110.444 26.463 111.837 26.15 113.412 26.15L116.412 26.15C118.812 26.15 120.737 26.825 122.187 28.175 123.637 29.525 124.362 31.325 124.362 33.575L124.362 37.55 110.487 37.55 110.487 38.45C110.487 39.275 110.75 39.938 111.275 40.438 111.8 40.937 112.512 41.188 113.412 41.188L116.337 41.188C117.212 41.188 117.919 40.994 118.456 40.606 118.994 40.219 119.262 39.713 119.262 39.088L124.287 39.088C124.287 40.338 123.95 41.45 123.275 42.425 122.6 43.4 121.656 44.15 120.444 44.675 119.231 45.2 117.837 45.463 116.262 45.463L113.412 45.463ZM119.337 33.875 119.337 33.575C119.337 32.6 119.075 31.819 118.55 31.231 118.025 30.644 117.325 30.35 116.45 30.35L113.412 30.35C112.512 30.35 111.787 30.663 111.237 31.288 110.687 31.913 110.412 32.737 110.412 33.762L110.412 33.875 119.337 33.875ZM145.025 45.163C144.175 45.163 143.462 44.95 142.887 44.525 142.312 44.1 141.912 43.338 141.687 42.238L137.037 18.913 142.287 18.913 145.512 37.55 145.587 37.55 151.025 20.3 152.9 20.3C153.525 20.3 154.069 20.462 154.531 20.788 154.994 21.113 155.35 21.7 155.6 22.55L160.175 37.513 160.25 37.513 163.475 18.913 168.725 18.913 164.037 42.238C163.837 43.237 163.469 43.975 162.931 44.45 162.394 44.925 161.662 45.163 160.737 45.163L158.562 45.163 152.975 27.162 152.9 27.162 147.2 45.163 145.025 45.163ZM176.225 45.463C174.275 45.463 172.7 44.975 171.5 44 170.3 43.025 169.7 41.738 169.7 40.138L169.7 38.75C169.7 37.175 170.325 35.906 171.575 34.944 172.825 33.981 174.475 33.5 176.525 33.5L178.812 33.5C179.462 33.5 180.162 33.587 180.912 33.762 181.662 33.938 182.35 34.175 182.975 34.475L182.975 32.525C182.975 31.9 182.769 31.394 182.356 31.006 181.944 30.619 181.4 30.425 180.725 30.425L177.5 30.425C176.8 30.425 176.237 30.588 175.812 30.912 175.387 31.238 175.175 31.675 175.175 32.225L170.225 32.225C170.225 30.4 170.894 28.931 172.231 27.819 173.569 26.706 175.325 26.15 177.5 26.15L180.725 26.15C182.925 26.15 184.7 26.731 186.05 27.894 187.4 29.056 188.075 30.6 188.075 32.525L188.075 45.163 183.35 45.163 183.35 42.913C182.75 43.688 182.012 44.306 181.137 44.769 180.262 45.231 179.4 45.463 178.55 45.463L176.225 45.463ZM178.925 41.562C179.85 41.562 180.675 41.325 181.4 40.85 182.125 40.375 182.65 39.738 182.975 38.938L182.975 38.3C182.575 38 182.019 37.763 181.306 37.587 180.594 37.412 179.837 37.325 179.037 37.325L176.675 37.325C176.075 37.325 175.587 37.475 175.212 37.775 174.837 38.075 174.65 38.475 174.65 38.975L174.65 39.95C174.65 40.425 174.856 40.813 175.269 41.112 175.681 41.413 176.225 41.562 176.9 41.562L178.925 41.562ZM198.65 45.163C196.425 45.163 194.794 44.694 193.756 43.756 192.719 42.819 192.2 41.362 192.2 39.388L192.2 18.913 197.3 18.913 197.3 39.088C197.3 39.687 197.438 40.125 197.712 40.4 197.987 40.675 198.425 40.813 199.025 40.813L201.05 40.813 201.05 45.163 198.65 45.163ZM209.525 45.163C207.3 45.163 205.669 44.694 204.631 43.756 203.594 42.819 203.075 41.362 203.075 39.388L203.075 18.913 208.175 18.913 208.175 39.088C208.175 39.687 208.313 40.125 208.587 40.4 208.862 40.675 209.3 40.813 209.9 40.813L211.925 40.813 211.925 45.163 209.525 45.163ZM221.45 45.463C219.875 45.463 218.481 45.169 217.269 44.581 216.056 43.994 215.112 43.169 214.437 42.106 213.763 41.044 213.425 39.825 213.425 38.45L213.425 33.612C213.425 32.138 213.763 30.838 214.437 29.713 215.112 28.587 216.056 27.713 217.269 27.088 218.481 26.463 219.875 26.15 221.45 26.15L224.45 26.15C226.85 26.15 228.775 26.825 230.225 28.175 231.675 29.525 232.4 31.325 232.4 33.575L232.4 37.55 218.525 37.55 218.525 38.45C218.525 39.275 218.788 39.938 219.313 40.438 219.838 40.937 220.55 41.188 221.45 41.188L224.375 41.188C225.25 41.188 225.956 40.994 226.494 40.606 227.031 40.219 227.3 39.713 227.3 39.088L232.325 39.088C232.325 40.338 231.987 41.45 231.312 42.425 230.638 43.4 229.694 44.15 228.481 44.675 227.269 45.2 225.875 45.463 224.3 45.463L221.45 45.463ZM227.375 33.875 227.375 33.575C227.375 32.6 227.112 31.819 226.587 31.231 226.062 30.644 225.362 30.35 224.488 30.35L221.45 30.35C220.55 30.35 219.825 30.663 219.275 31.288 218.725 31.913 218.45 32.737 218.45 33.762L218.45 33.875 227.375 33.875ZM243.8 45.163C241.6 45.163 239.987 44.662 238.963 43.662 237.937 42.663 237.425 41.113 237.425 39.013L237.425 30.8 234.125 30.8 234.125 26.45 237.575 26.45 237.575 20.788 242.525 20.788 242.525 26.45 247.4 26.45 247.4 30.8 242.525 30.8 242.525 38.788C242.525 39.487 242.656 40 242.919 40.325 243.181 40.65 243.6 40.813 244.175 40.813L247.4 40.813 247.4 45.163 243.8 45.163Z">
//       </PiratePath>
//     </PirateSvg>
//   </CenteredDiv>
// </SplashSection>
// <SplashFooter>
//   <PirateSvg width={screenDim.width} height={screenDim.height * 0.35} viewBox="0 10 256 64">
//     <PiratePath fill="rgba(187,150,69,1)" stroke="rgba(0,0,0,0)" strokeWidth="1px" strokeLinejoin="miter" strokeLinecap="butt" strokeMiterlimit="4" shapeRendering="auto" id="Xoin_vm" d="M-.969 159.807-.969 7.556C-.969 7.556 18.82-6.368 31.04-1.078 43.26 4.212 51.136 15.241 67.331 11.898 83.525 8.554 89.488-3.074 107.596 3.214 125.704 9.502 126.735 11.199 146.316 9.552 165.897 7.905 164.94-11.059 186.581-1.078 208.223 8.903 221.915 11.548 228.761 3.214 235.607-5.12 256.218-1.078 256.218-1.078L256.218 159.807-.969 159.807Z">
//     </PiratePath>
//   </PirateSvg>
// </SplashFooter>
// <Copyright>
//   <CenteredDiv>
//     <span>© Copyright 2021 PirateChain <br/>• All rights reserved •</span>
//   </CenteredDiv>
// </Copyright>

function mapStateToProps (state) {
  return {
    context: state.context,
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(SplashPage)
