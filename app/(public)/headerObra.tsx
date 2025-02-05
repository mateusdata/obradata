import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function HeaderObra() {
  return (
    <View style={styles.container} >
      <Text>Header Obra</Text>
    </View>
  )
}

const styles =  StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "center",
    
  }
})