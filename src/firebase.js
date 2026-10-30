// Firebase will be connected after the frontend design is approved.
// Do not put private server credentials in frontend code.
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT.firebasestorage.app',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
}

export const firebaseConfigured = false
export const app = firebaseConfigured ? initializeApp(firebaseConfig) : null
