import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import VideoCard from '../../components/VideoCard'
import { images } from '../../constants'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import {
  getAllPosts,
  getLatestPosts,
  getUserPosts,
  searchPosts,
  signOut,
} from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import { useLocalSearchParams } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'
import { router } from 'expo-router'

const Profile = () => {
  const { user, setUser, setIsLoggedIn, isLoggedIn } = useGlobalContext()


  const { data: posts } = useAppwrite(() => getUserPosts(user.$id))

  async function logout() {

    await signOut()

    setUser(null)
    setIsLoggedIn(false)

    router.replace('/sign-in')
  }

  const [refreshing, setRefreshing] = useState(false)

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox 
              title={user?.username}
              containerStyles='mt-5'
              textStyles='text-lg'
            />

            <View className='mt-5 flex-row'>
            <InfoBox 
              title={posts.length || 0}
              subtitle='Posts'
              containerStyles='mr-10'
              textStyles='text-xl'
            />
            <InfoBox 
              title={`1.2k`}
              subtitle='Followers'
              textStyles='text-lg'
            />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No videos found" subtitle="No videos found..." />
        )}
      />
    </SafeAreaView>
  )
}

export default Profile
