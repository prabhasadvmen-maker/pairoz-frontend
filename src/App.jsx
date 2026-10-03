import { useEffect } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import WhatsAppButton from './components/layout/WhatsAppButton'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Category from './pages/Category'
import ProductDetail from './pages/ProductDetail'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Policies from './pages/Policies'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function NotFound() {
  return <main className="page-wrap empty-state"><p className="eyebrow">A little off the path</p><h1>We can’t find that page.</h1><p>Let’s get you back to something beautiful.</p><Link className="button button-dark" to="/">Return home</Link></main>
}

function Storefront() {
  return <>
    <ScrollToTop />
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/category/:slug" element={<Category />} />
      <Route path="/product/:slug" element={<ProductDetail />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/policies" element={<Policies />} />
      <Route path="/policies/:policy" element={<Policies />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
    <WhatsAppButton />
  </>
}

export default function App() {
  return <BrowserRouter><Storefront /></BrowserRouter>
}
