/*
 * @Descripttion:
 * @version:
 * @Author: OpenLcuk
 * @Date: 2021-11-19 13:10:13
 * @LastEditors: OpenLcuk
 * @LastEditTime: 2021-11-19 15:12:52
 */

import React, { FC } from 'react'

interface Props {
  username: string
}

const chid1: FC<Props> = (props) => {
  return <div>{props.username}</div>
}

export default chid1
