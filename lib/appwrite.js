import { Client, Account, ID } from 'react-native-appwrite';

export const appwriteConfig = {
    enpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.br.myrnapp',
    projectId: '66baa73b001ee86f392b',
    databaseId: '66baa82f000f814a0307',
    userCollectionId: '66baa867000ea0765669',
    videoCollectionId: '66baa88f002f90f61c23',
    storeageId: '66baa9d40006480e5633',   
}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.enpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);
        

        if(!newAccount) throw Error

        const avatarUrl = avatars.getInitials(username)

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

const account = new Account(client);



