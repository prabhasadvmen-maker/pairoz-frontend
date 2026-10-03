import { useFilterStore } from '../../store/useStore'
import { brands, categories, colors, sizes } from '../../data/mockData'

function CheckOption({ checked, onChange, children }) {
  return <label className="check-option"><input type="checkbox" checked={checked} onChange={onChange} /><span>{children}</span></label>
}

export default function FilterPanel({ onClose }) {
  const filters = useFilterStore()
  return <aside className="filter-panel">
    <div className="filter-panel-head"><h3>Refine edit</h3><button className="text-button" onClick={filters.clearFilters} type="button">Clear all</button>{onClose && <button className="icon-button mobile-filter-close" onClick={onClose} type="button" aria-label="Close filters">×</button>}</div>
    <section className="filter-group"><h4>Category</h4>{categories.map((item) => <CheckOption key={item.slug} checked={filters.selectedCategory === item.name} onChange={() => filters.setFilter('selectedCategory', filters.selectedCategory === item.name ? '' : item.name)}>{item.name}</CheckOption>)}</section>
    <section className="filter-group"><h4>Brand</h4>{brands.map((brand) => <CheckOption key={brand} checked={filters.selectedBrand === brand} onChange={() => filters.setFilter('selectedBrand', filters.selectedBrand === brand ? '' : brand)}>{brand}</CheckOption>)}</section>
    <section className="filter-group price-filter-group"><div className="price-filter-heading"><h4>Price</h4><span>₹{filters.priceRange[0].toLocaleString('en-IN')} – ₹{filters.priceRange[1].toLocaleString('en-IN')}</span></div><input aria-label="Maximum price" className="price-slider" type="range" min="4000" max="20000" step="500" value={filters.priceRange[1]} onChange={(event) => filters.setFilter('priceRange', [4000, Number(event.target.value)])} /></section>
    <section className="filter-group"><h4>Size</h4><div className="size-filter">{sizes.map((size) => <button key={size} type="button" className={filters.selectedSizes.includes(size) ? 'selected' : ''} onClick={() => filters.toggleArrayFilter('selectedSizes', size)}>{size}</button>)}</div></section>
    <section className="filter-group"><h4>Colour</h4>{colors.map((color) => <CheckOption key={color} checked={filters.selectedColors.includes(color)} onChange={() => filters.toggleArrayFilter('selectedColors', color)}>{color}</CheckOption>)}</section>
  </aside>
}
