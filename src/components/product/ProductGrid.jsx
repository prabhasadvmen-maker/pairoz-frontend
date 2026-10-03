import { PackageSearch } from 'lucide-react'
import ProductCard from './ProductCard'

export default function ProductGrid({ products, loading = false }) {
  if (loading) return <div className="product-grid">{Array.from({ length: 8 }, (_, i) => <div className="product-skeleton" key={i} />)}</div>
  if (!products.length) return <div className="empty-state"><PackageSearch size={36} /><h3>No shoes found</h3><p>Try adjusting your filters or search for another style.</p></div>
  return <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
}
