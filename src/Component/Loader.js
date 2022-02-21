import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Colors } from '../Helper/Colors.js'

export default function Loader() {
  return (
    <ActivityIndicator size={'large'} color={Colors.Pink} />
  )
}
