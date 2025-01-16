import { colorPrimary } from '@/constants/Colors'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

export default function LoadingAuth() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colorPrimary} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})