const param = {
  part: 'snippet',
  order: 'date',
  type: 'video',
  videoDefinition: 'high'
}
const apiURL = 'https://www.googleapis.com/youtube/v3/search'
const apiKey = 'AIzaSyDxpcGtEL7bMKiyQDjBjHXTjZXuZbs2ppk'


export const Api = {

  get (query) {
    const url = `${ apiURL }?part=${ param.part }&order=${ param.order }&q=${ query }&type=${ param.type }+&videoDefinition=${ param.videoDefinition }&key=${ apiKey }`

    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
