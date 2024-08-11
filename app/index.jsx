import { Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Link } from 'expo-router'
import React from 'react'

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className='text-3xl font-pblack'>hello world</Text>
      <StatusBar style="auto" />
      <Link href="/home" className='text-blue-500'>Go to Home</Link>
    </View>
  )
}



