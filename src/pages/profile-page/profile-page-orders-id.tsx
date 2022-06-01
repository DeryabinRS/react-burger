import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'

const ProfilePageOrdersId = () => {
  const {id} = useParams()
  const data = useAppSelector(store => store.webSocketApi.queries?.getOrders?.data)

  return (
    <div>ProfilePageOrdersId</div>
  )
}

export default ProfilePageOrdersId