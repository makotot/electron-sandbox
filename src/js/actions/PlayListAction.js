import { AppDispatcher } from '../dispatcher/dispatcher'
import { Api } from '../api/Api'


function createPlayList (jsonData) {
  const jsonItems = jsonData.items

  const playList = jsonItems.map((item) => {
    return {
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumb: item.snippet.thumbnails.default.url
    }
  })

  return playList
}


export const PlayListAction = {
  updateList (query) {
    Api
      .get(query)
      .then((data) => {
        AppDispatcher.dispatch({
          eventName: 'update-playlist',
          items: createPlayList(data)
        })
      })
  }
}