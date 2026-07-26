import React, { createContext, useState, useEffect } from 'react'
import { collection, getDocs, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

export const ProductContext = createContext()

export const ProductContext = ({ children }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    priceRange: [0, 10000],
    searchTerm: ''
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const productsRef = collection(db, 'products')
      const querySnapshot = await getDocs(productsRef)
      const productsData = []
      querySnapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() })
      })
      setProducts(productsData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getProductById = async (id) => {
    try {
      const productRef = doc(db, 'products', id)
      const productDoc = await getDoc(productRef)
      return productDoc.exists() ? { id: productDoc.id, ...productDoc.data() } : null
    } catch (err) {
      setError(err.message)
      return null
    }
  }

  const addProduct = async (productData) => {
    try {
      const newDocRef = doc(collection(db, 'products'))
      await setDoc(newDocRef, productData)
      await fetchProducts()
      return newDocRef.id
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const updateProduct = async (id, updates) => {
    try {
      const productRef = doc(db, 'products', id)
      await setDoc(productRef, updates, { merge: true })
      await fetchProducts()
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id))
      await fetchProducts()
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const getFilteredProducts = () => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      const matchesCategory = !filters.category || product.category === filters.category
      const matchesBrand = !filters.brand || product.brand === filters.brand
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice
    })
  }

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      error,
      filters,
      setFilters,
      fetchProducts,
      getProductById,
      addProduct,
      updateProduct,
      deleteProduct,
      getFilteredProducts
    }}>
      {children}
    </ProductContext.Provider>
  )
}
