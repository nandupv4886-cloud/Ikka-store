import React, { createContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { getDoc, setDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

export const AuthContext = createContext()

export const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid)
          const userDoc = await getDoc(userDocRef)
          if (userDoc.exists()) {
            setUserData(userDoc.data())
          }
        } catch (err) {
          console.error('Error fetching user data:', err)
          setError(err.message)
        }
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const register = async (email, password, name, phone) => {
    try {
      setLoading(true)
      const result = await createUserWithEmailAndPassword(auth, email, password)
      const user = result.user

      const userData = {
        uid: user.uid,
        name,
        email,
        phone,
        address: '',
        wishlist: [],
        cart: [],
        orders: [],
        createdAt: new Date().toISOString()
      }

      await setDoc(doc(db, 'users', user.uid), userData)
      setUserData(userData)
      return user
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      setLoading(true)
      const result = await signInWithEmailAndPassword(auth, email, password)
      return result.user
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      setUserData(null)
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const updateUserData = async (updates) => {
    try {
      if (!user) throw new Error('No user logged in')
      const userDocRef = doc(db, 'users', user.uid)
      await setDoc(userDocRef, updates, { merge: true })
      setUserData({ ...userData, ...updates })
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      userData,
      loading,
      error,
      register,
      login,
      logout,
      updateUserData
    }}>
      {children}
    </AuthContext.Provider>
  )
}
