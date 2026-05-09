import { Client, Databases, ID, Query } from "react-native-appwrite"

const client = new Client()

client
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID)
  .setPlatform('com.readinglist.app')

export const databases = new Databases(client)

export const DATABASE_ID = ''
export const COLLECTION_ID = ''

export async function getBooks() {
  const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
    Query.orderDesc('$createdAt')
  ])
  return res.documents
}

export async function createBook(title, author) {
  return await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
    title,
    author,
    status: 'unread'
  })
}

export async function deleteBook(id) {
  return await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id)
}

export async function updateBookStatus(id, status) {
  return await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, { status })
}
