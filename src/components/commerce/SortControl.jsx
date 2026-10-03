import { ArrowDownWideNarrow } from 'lucide-react'
import { useFilterStore } from '../../store/useStore'

export default function SortControl() {
  const sortBy = useFilterStore((state) => state.sortBy)
  const setFilter = useFilterStore((state) => state.setFilter)
  return <label className="sort-control"><ArrowDownWideNarrow size={16} /><span>Sort by</span><select value={sortBy} onChange={(event) => setFilter('sortBy', event.target.value)}><option value="newest">Newest</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option><option value="bestselling">Bestselling</option></select></label>
}
