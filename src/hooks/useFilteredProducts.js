import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { products } from '../data/mockData'
import { useFilterStore } from '../store/useStore'

export default function useFilteredProducts(category = '') {
  const location = useLocation()
  const filters = useFilterStore()
  const setFilter = filters.setFilter
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const search = params.get('search')
    const sort = params.get('sort')
    setFilter('searchQuery', search || '')
    if (sort && ['newest', 'price-asc', 'price-desc', 'bestselling'].includes(sort)) setFilter('sortBy', sort)
    if (category) setFilter('selectedCategory', category)
    else if (!location.search) setFilter('selectedCategory', '')
  }, [location.pathname, location.search, category, setFilter])

  return useMemo(() => {
    const query = filters.searchQuery.trim().toLowerCase()
    return products.filter((product) =>
      (!filters.selectedCategory || product.category === filters.selectedCategory) &&
      (!filters.selectedBrand || product.brand === filters.selectedBrand) &&
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1] &&
      (!filters.selectedSizes.length || filters.selectedSizes.some((size) => product.sizes.includes(size))) &&
      (!filters.selectedColors.length || filters.selectedColors.some((color) => product.colors.includes(color))) &&
      (!query || `${product.title} ${product.brand} ${product.category}`.toLowerCase().includes(query)),
    ).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price
      if (filters.sortBy === 'price-desc') return b.price - a.price
      if (filters.sortBy === 'bestselling') return Number(b.tags.includes('bestseller')) - Number(a.tags.includes('bestseller'))
      return products.indexOf(b) - products.indexOf(a)
    })
  }, [filters.selectedCategory, filters.selectedBrand, filters.priceRange, filters.selectedSizes, filters.selectedColors, filters.searchQuery, filters.sortBy])
}
