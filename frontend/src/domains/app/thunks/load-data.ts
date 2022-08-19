import {UserDocument} from 'src/shared/auth'
import config from '../../../config/custom-env-variables'
import {fetcher} from '../lib/fetcher'
import {setUserInfo, setAppUtilization, setManageUtilizationTable} from '../state'

export const fetchUserInfo: any = () => {
  return async (dispatch: any) => {
    const data = await fetcher<UserDocument>(`${config.API_URL}/home`)
    dispatch(setUserInfo(data))
  }
}

/* export function loadUtilizationData(claim_id: any) {
  return (dispatch: (arg0: {type: string; payload: any}) => any) => {
    return axios
      .get(`${environment.apiUrl}/claims/${claim_id}/utilization`)
      .then(data => dispatch(setAppUtilization(data)))
  }
}

export const manageUpdateTables = (
  row: {id: any; claim_line_item_type: any; quantity: any; amount_claimed: any},
  claim_id: any,
  value: any,
  status: any
) => {
  return (dispatch: (arg0: {row: any; type: string; payload: any}) => void) => {
    // save row item => save utilization table
    axios
      .post(`$${environment.apiUrl}/claims/update`, {
        id: row.id,
        claim_line_item_type: row.claim_line_item_type,
        quantity: row.quantity,
        decision: value,
        amount_claimed: row.amount_claimed,
        claim_id,
        status,
      })
      .then(function (new_updated_util_obj) {
        dispatch(setManageUtilizationTable(row, new_updated_util_obj))
      })
  }
} */
