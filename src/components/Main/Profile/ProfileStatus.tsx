import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../../API/api'
import { profileType, setStatusThunk } from '../../../redux/profile'
import s from './Profile.module.css'
import { authType } from '../../../redux/auth'

const ProfileStatus = () => {
  let pageID: any = useParams().id
  pageID = pageID * 1
  const authID = useSelector((state: { auth: authType }) => state.auth.id)
  const dispatch = useDispatch()
  const status = useSelector((state: { profile: profileType }) => state.profile.status)
  // eslint-disable-next-line prefer-const
  let [key, setKey] = useState(true)
  const statusClick = () => {
    setKey(false)
  }
  const statusInputForm = async (e: any) => {
    e.preventDefault()
    if (e.target.value !== undefined) {
      e = e.target.value
    } else e = e.target.children[0].value
    if (e === '' || e === status) {
      setKey(true)
      return
    }
    const response = await api.profile.updateStatus(e)
    if (+response.status === 200 && +response.data.resultCode === 0) dispatch(setStatusThunk(e))
    setKey(true)
  }
  // 11.11.2021 Первый статус
  return <div id={s.status}>
    {pageID === authID
      ? key
        ? <div onClick={statusClick}>{status || 'click on me'}</div>
        : <form onSubmit={statusInputForm}>
          <textarea autoFocus={true} defaultValue={status} onBlur={statusInputForm}/>
        </form>
      : <div>{status}</div>}
  </div>
}
export default ProfileStatus
