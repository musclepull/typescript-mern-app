import axios from 'axios'
import {environment} from 'lib/environment'

export default function postData(data: any) {
  return (dispatch: any) => {
    return axios.post(`${environment.apiUrl}/postUtilization`, data).then(function (response) {
      console.log(response)
    })
  }
}
