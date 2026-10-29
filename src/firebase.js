// Firebase setup placeholder.
// Create a Firebase project on the Spark (free) plan, then paste its web app config below.
// Never put service-account keys or private credentials in frontend code.
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'PASTE_YOUR_FIREBASE_WEB_API_KEY',
  authDomain: 'PASTE_YOUR_PROJECT.firebaseapp.com',
  projectId: 'PASTE_YOUR_PROJECT_ID',
  appId: 'PASTE_YOUR_FIREBASE_APP_ID',
}

const isConfigured = !firebaseConfig.apiKey.startsWith('PASTE_')
export const firebaseApp = isConfigured ? initializeApp(firebaseConfig) : null
export const auth = firebaseApp ? getAuth(firebaseApp) : null
export const db = firebaseApp ? getFirestore(firebaseApp) : null
export const firebaseReady = Boolean(firebaseApp)
