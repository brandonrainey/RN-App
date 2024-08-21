import { View, Text, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import VideoCard from '../../components/VideoCard'
import { images } from '../../constants'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts, getUserPosts, searchPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import { useLocalSearchParams } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'

const Profile = () => {
  const { user, setUser, setIsLoggedIn, isLoggedIn } = useGlobalContext()

  console.log(isLoggedIn, 'profile')
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  console.log(posts, 'profile')

  const [refreshing, setRefreshing] = useState(false)

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results
            </Text>
            {/* <Text className="text-2xl font-psemibold text-white">{query}</Text> */}

            <View className="mt-6 mb-8">
              {/* <SearchInput initialQuery={query} /> */}
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="No videos found..."
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Profile
