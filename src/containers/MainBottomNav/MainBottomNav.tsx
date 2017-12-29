
import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

import BottomNav, { IconItem, RoundItem } from '@voiceofamerica/voa-shared/components/BottomNav'
import ResilientImage from '@voiceofamerica/voa-shared/components/ResilientImage'

import toggleMediaDrawer from 'redux-store/actions/toggleMediaDrawer'
import toggleMediaPlaying from 'redux-store/actions/toggleMediaPlaying'
import AppState from 'types/AppState'

import { bottomNav, centerIcon, iconText, mediaIsOpen, centerButton, backgroundImage, overlay } from './MainBottomNav.scss'

interface OwnProps {
  left: JSX.Element[]
  right: JSX.Element[]
}

interface StateProps {
  mediaDrawerOpen: boolean
  mediaImageUrl: string
  mediaPlaying: boolean
}

interface DispatchProps {
  toggleMediaPlayer: () => void
  togglePlay: () => void
}

type Props = OwnProps & DispatchProps & StateProps

class MainBottomNavBase extends React.Component<Props> {
  hasImage () {
    const { mediaImageUrl } = this.props
    return !!mediaImageUrl
  }

  renderImage () {
    const { mediaImageUrl } = this.props

    if (!this.hasImage()) {
      return null
    }

    return (
     <div className={backgroundImage}>
       <ResilientImage src={mediaImageUrl} style={{ overflow: 'hidden', borderRadius: 100 }} />
       <div className={overlay} />
      </div>
    )
  }

  renderIcon () {
    const { mediaDrawerOpen, mediaPlaying } = this.props
    if (mediaDrawerOpen && mediaPlaying) {
      return <i className={`mdi mdi-pause-circle-outline ${centerIcon}`} />
    } else {
      return <i className={`mdi mdi-play-circle-outline ${centerIcon}`} />
    }
  }

  roundItemAction = () => {
    const { mediaDrawerOpen, togglePlay, toggleMediaPlayer } = this.props

    if (mediaDrawerOpen) {
      togglePlay()
    } else {
      toggleMediaPlayer()
    }
  }

  render () {
    const { left, right, toggleMediaPlayer, mediaDrawerOpen, togglePlay, mediaPlaying } = this.props

    let className = mediaDrawerOpen ? `${bottomNav} ${mediaIsOpen}` : bottomNav

    return (
      <BottomNav className={className}>
        {left}
        <RoundItem onClick={this.roundItemAction} className={centerButton}>
          { this.renderImage() }
          { this.renderIcon() }
          <div className={iconText}>多媒体</div>
        </RoundItem>
        {right}
      </BottomNav>
    )
  }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
  mediaDrawerOpen: state.media.mediaOpen,
  mediaImageUrl: state.media.imageUrl,
  mediaPlaying: state.media.playing,
})

const mapDispatchToProps = (dispatch: Dispatch<AppState>, ownProps: OwnProps): DispatchProps => ({
  toggleMediaPlayer: () => dispatch(toggleMediaDrawer({})),
  togglePlay: () => dispatch(toggleMediaPlaying({})),
})

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default withRedux(MainBottomNavBase)
