import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from 'react-native-appwrite'

export const appwriteConfig = {
  enpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.br.myrnapp',
  projectId: '66baa73b001ee86f392b',
  databaseId: '66baa82f000f814a0307',
  userCollectionId: '66baa867000ea0765669',
  videoCollectionId: '66baa88f002f90f61c23',
  storeageId: '66baa9d40006480e5633',
}

const {
  enpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storeageId,
} = appwriteConfig

// Init your React Native SDK
const client = new Client()

client
  .setEndpoint(appwriteConfig.enpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    )

    if (!newAccount) throw Error

    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password)

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    )

    return newUser
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password)

    return session
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

   

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId
    )

    return posts.documents
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export async function getLatestPosts() {
    try {
      const posts = await databases.listDocuments(
        databaseId,
        videoCollectionId,
        [Query.orderDesc('$createdAt'), Query.limit(7)],
      )
  
      return posts.documents
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  export async function searchPosts( query ) {
    try {
      const posts = await databases.listDocuments(
        databaseId,
        videoCollectionId,
        [Query.search('title', query)],
      )
  
      return posts.documents
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  export async function getUserPosts( userId ) {
    try {
      const posts = await databases.listDocuments(
        databaseId,
        videoCollectionId,
        [Query.equal('creator', userId)],
      )
  
      return posts.documents
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  export async function signOut() {
    try {
      const session = await account.deleteSession("current")

      return session
    } catch (error) {
      throw new Error(error)
    }
  }