import { useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { useFilterStore } from '../store/useStore'
import FilterPanel from '../components/commerce/FilterPanel'
import SortControl from '../components/commerce/SortControl'
import ProductGrid from '../components/product/ProductGrid'
import useFilteredProducts from '../hooks/useFilteredProducts'

export default function Shop({ category = '' }) {
  const filtered = useFilteredProducts(category)
  const filters = useFilterStore()
  const [showFilters, setShowFilters] = useState(false)
  const [limit, setLimit] = useState(12)
  const activeCount = Number(Boolean(filters.selectedCategory)) + Number(Boolean(filters.selectedBrand)) + filters.selectedSizes.length + filters.selectedColors.length + Number(filters.priceRange[1] < 20000)
  return <main className="page-wrap shop-page"><div className="breadcrumbs">Home <span>/</span> {category || 'Shop all'}</div><header className="listing-heading"><div><p className="eyebrow">{category ? 'The category edit' : 'The PAIROZ collection'}</p><h1>{filters.searchQuery ? `Search: “${filters.searchQuery}”` : category || 'Footwear, considered.'}</h1><p>Thoughtful silhouettes for every version of you.</p></div><span>{filtered.length} styles</span></header>
    <div className="listing-toolbar"><button className="filter-trigger" onClick={() => setShowFilters(true)}><SlidersHorizontal size={16} /> Filters {activeCount > 0 && <span>{activeCount}</span>}</button><SortControl /></div>
    {activeCount > 0 && <div className="active-filter-chips">{filters.selectedCategory && <button onClick={() => filters.setFilter('selectedCategory', '')}>{filters.selectedCategory} <X size={13} /></button>}{filters.selectedBrand && <button onClick={() => filters.setFilter('selectedBrand', '')}>{filters.selectedBrand} <X size={13} /></button>}{filters.selectedSizes.map((size) => <button key={size} onClick={() => filters.toggleArrayFilter('selectedSizes', size)}>Size {size}<X size={13} /></button>)}{filters.selectedColors.map((color) => <button key={color} onClick={() => filters.toggleArrayFilter('selectedColors', color)}>{color}<X size={13} /></button>)}<button className="clear-chip" onClick={filters.clearFilters}>Clear all</button></div>}
    <div className="listing-layout"><div className={`filter-overlay ${showFilters ? 'is-open' : ''}`} onClick={() => setShowFilters(false)} role="presentation"><div onClick={(event) => event.stopPropagation()}><FilterPanel onClose={() => setShowFilters(false)} /></div></div><div className="desktop-filters"><FilterPanel /></div><div className="listing-results"><ProductGrid products={filtered.slice(0, limit)} /><div className="load-more">{limit < filtered.length && <button className="button button-outline" onClick={() => setLimit(limit + 12)}>Load more styles <span>({filtered.length - limit} remaining)</span></button>}</div></div></div>
  </main>
}
