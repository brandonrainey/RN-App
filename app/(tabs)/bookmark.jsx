import { View, Text } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview'
import { SafeAreaView } from 'react-native-safe-area-context'


const Bookmark = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <WebView
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        source={{
          uri: 'https://www.youtube.com/embed/RKP_vp1v7Ko?rel=0&autoplay=0&showinfo=0&controls=0',
        }}
      />
    </SafeAreaView>
  )
}

export default Bookmark
