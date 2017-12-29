
import { RouterState } from 'react-router-redux'
import AppSettings from './AppSettings'
import MediaState from './MediaState'
import FlatMap from './FlatMap'
import FavoriteContent from './FavoriteContent'

export default interface AppState {
  settings: AppSettings
  media: MediaState
  favorites: FlatMap<FavoriteContent>
  router: RouterState
}
