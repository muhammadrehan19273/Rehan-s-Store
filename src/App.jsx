import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag, Menu, ArrowUpRight, Star, Heart, X, Plus, Minus, Sparkles, Truck, ShieldCheck, Headphones } from 'lucide-react'

const categories = ['All products', 'Technology', 'Fashion', 'Home & Living', 'Beauty', 'Accessories']
const products = [
  { id: 1, name: 'Studio Wireless Headphones', category: 'Technology', price: 7499, oldPrice: 9999, badge: 'BESTSELLER', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85', tone: 'lavender', rating: '4.9', description: 'Immersive sound, all-day comfort and a clean minimal silhouette.' },
  { id: 2, name: 'Everyday Runner Sneakers', category: 'Fashion', price: 5899, oldPrice: 6999, badge: 'TRENDING', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85', tone: 'peach', rating: '4.8', description: 'Lightweight everyday sneakers made for moving in comfort.' },
  { id: 3, name: 'Minimal Timepiece', category: 'Accessories', price: 4299, oldPrice: null, badge: 'NEW DROP', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85', tone: 'mint', rating: '4.7', description: 'A refined everyday watch with a timeless, understated design.' },
  { id: 4, name: 'Sculptural Table Lamp', category: 'Home & Living', price: 3799, oldPrice: 4499, badge: 'JUST IN', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85', tone: 'sand', rating: '4.8', description: 'Warm ambient lighting that makes any corner feel considered.' },
  { id: 5, name: 'Daily Care Essentials', category: 'Beauty', price: 2199, oldPrice: null, badge: 'DAILY PICK', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85', tone: 'pink', rating: '4.6', description: 'A simple self-care set for your everyday routine.' },
  { id: 6, name: 'Compact Smart Speaker', category: 'Technology', price: 6499, oldPrice: 7999, badge: 'POPULAR', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85', tone: 'blue', rating: '4.8', description: 'Big, room-filling sound in a compact, modern design.' },
  { id: 7, name: 'Carry-All Everyday Bag', category: 'Fashion', price: 3199, oldPrice: null, badge: 'CUSTOMER FAVOURITE', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85', tone: 'sand', rating: '4.7', description: 'A versatile carry-all for busy days and weekend plans.' },
  { id: 8, name: 'Modern Desk Companion', category: 'Home & Living', price: 2699, oldPrice: 3299, badge: 'LIMITED OFFER', image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=85', tone: 'mint', rating: '4.6', description: 'Small details that bring a calmer feeling to your workspace.' },
]
const money = n => 'Rs. ' + n.toLocaleString('en-PK')

function App() {
  const [category, setCategory] = useState('All products')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [notice, setNotice] = useState('')
  const visibleProducts = useMemo(() => products.filter(p =>
    (category === 'All products' || p.category === category) &&
    (p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()))
  ), [category, query])
  const count = cart.reduce((sum, item) => sum + item.qty, 0)
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const addToCart = product => {
    setCart(current => {
      const existing = current.find(i => i.id === product.id)
      return existing ? current.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i) : [...current, { ...product, qty: 1 }]
    })
    setNotice(`${product.name} added to your bag`)
    setTimeout(() => setNotice(''), 2400)
  }
  const changeQty = (id, delta) => setCart(current => current.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0))
  const toggleWishlist = id => setWishlist(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id])

  return <div className="site-shell">
    <div className="announcement"><Sparkles size={14}/> A little something for your everyday <span>— discover the latest drops</span></div>
    <header className="header">
      <button className="icon-button mobile-only" aria-label="Open menu" onClick={() => setMobileMenu(!mobileMenu)}><Menu/></button>
      <a className="brand" href="#" aria-label="Rehan's Store home"><span className="brand-mark">R<span>.</span></span><span className="brand-copy">REHAN'S <b>STORE</b><small>YOUR EVERYDAY DISCOVERY</small></span></a>
      <nav className={`nav ${mobileMenu ? 'nav-open' : ''}`}>
        {['Home', 'Shop', 'New arrivals', 'Deals'].map((item, i) => <a key={item} href={i === 1 ? '#shop' : i === 2 ? '#new' : i === 3 ? '#deals' : '#'} onClick={() => setMobileMenu(false)}>{item}{i === 2 && <span className="nav-new">NEW</span>}</a>)}
      </nav>
      <div className="header-actions">
        <label className="search-box"><Search size={18}/><input value={query} onChange={e => {setQuery(e.target.value); document.getElementById('shop')?.scrollIntoView({behavior:'smooth'})}} placeholder="Search products..." aria-label="Search products"/></label>
        <button className="icon-button wishlist-head" aria-label="Wishlist" onClick={() => {setNotice(`${wishlist.length} item(s) saved to your wishlist`); setTimeout(() => setNotice(''), 2400)}}><Heart/><span className="tiny-count">{wishlist.length}</span></button>
        <button className="bag-button" onClick={() => setCartOpen(true)}><ShoppingBag size={18}/><span>Bag</span><b>{count}</b></button>
      </div>
    </header>

    <main>
      <section className="hero">
        <div className="hero-glow glow-one"></div><div className="hero-glow glow-two"></div>
        <div className="hero-content">
          <motion.div className="eyebrow" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.65}}><span className="eyebrow-dot"></span> THE EVERYDAY EDIT · VOL. 01</motion.div>
          <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.1}}>Good finds.<br/><em>Great feeling.</em></motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.22}}>The little upgrades, the big favourites, and everything in between. Find your next favourite, all in one place.</motion.p>
          <motion.div className="hero-actions" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.32}}><a href="#shop" className="primary-button">Explore the store <ArrowUpRight size={18}/></a><a href="#new" className="text-link">See what's new <span>↗</span></a></motion.div>
          <div className="hero-proof"><div className="avatar-stack"><span>R</span><span>✦</span><span>✓</span></div><div><strong>Your next favourite awaits</strong><small>Thoughtful finds for everyday life</small></div></div>
        </div>
        <motion.div className="hero-art" initial={{opacity:0,scale:.92,x:20}} animate={{opacity:1,scale:1,x:0}} transition={{duration:1,delay:.15}}>
          <div className="art-orbit orbit-a"></div><div className="art-orbit orbit-b"></div>
          <div className="art-tag tag-top"><span className="tag-spark">✳</span><span>THE GOOD<br/>STUFF</span></div>
          <div className="hero-product-frame"><img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1100&q=90" alt="Featured wireless headphones"/><div className="image-shine"></div></div>
          <div className="floating-card float-rating"><Star size={15} fill="currentColor"/><b>4.9/5</b><span>loved by shoppers</span></div>
          <div className="floating-card float-price"><small>FEATURED FIND</small><b>Sound, reimagined.</b><span>From Rs. 7,499</span></div>
          <div className="hero-sticker">FIND<br/>YOUR<br/><b>FAV.</b></div>
        </motion.div>
        <div className="hero-bottom"><span>SCROLL TO DISCOVER</span><div className="scroll-line"><i/></div><span>01 / 04</span></div>
      </section>

      <section className="benefits" aria-label="Store benefits">
        <div><span className="benefit-icon"><Truck/></span><p><b>Delivery to your door</b><small>Convenient home delivery</small></p></div>
        <div><span className="benefit-icon"><ShieldCheck/></span><p><b>Cash on delivery</b><small>Pay when it arrives</small></p></div>
        <div><span className="benefit-icon"><Headphones/></span><p><b>Here to help</b><small>Support when you need it</small></p></div>
        <div><span className="benefit-icon"><Sparkles/></span><p><b>Fresh finds, often</b><small>Discover something new</small></p></div>
      </section>

      <section className="categories-section section-wrap">
        <div className="section-heading"><div><span className="section-kicker">A WORLD OF GOOD FINDS</span><h2>What's your <em>thing?</em></h2></div><p>From everyday essentials to the things you didn't know you needed.</p></div>
        <div className="category-pills">{categories.map((c, i) => <button key={c} className={category === c ? 'category-pill active' : 'category-pill'} onClick={() => {setCategory(c); document.getElementById('shop')?.scrollIntoView({behavior:'smooth'})}}>{i === 0 ? '✳' : ['','⌁','◈','⌂','✦','◉'][i]} <span>{c}</span></button>)}</div>
      </section>

      <section className="products-section section-wrap" id="shop">
        <div className="section-heading product-heading"><div><span className="section-kicker">CURATED FOR YOU</span><h2>{category === 'All products' ? <>The good <em>stuff.</em></> : <>{category}<em>.</em></>}</h2></div><span className="product-count">{visibleProducts.length} FINDS</span></div>
        <div className="product-grid">
          <AnimatePresence mode="popLayout">{visibleProducts.map((p, i) => <motion.article className="product-card" key={p.id} layout initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:.96}} transition={{duration:.35,delay:i*.035}}>
            <div className={`product-image ${p.tone}`}><img src={p.image} alt={p.name} loading="lazy"/><span className="product-badge">{p.badge}</span><button className={`heart-button ${wishlist.includes(p.id)?'hearted':''}`} aria-label="Toggle wishlist" onClick={() => toggleWishlist(p.id)}><Heart size={17} fill={wishlist.includes(p.id)?'currentColor':'none'}/></button><button className="quick-add" onClick={() => addToCart(p)}><Plus size={17}/> Quick add</button></div>
            <div className="product-info"><div className="product-meta"><span>{p.category}</span><span className="rating"><Star size={12} fill="currentColor"/> {p.rating}</span></div><h3>{p.name}</h3><div className="price-row"><strong>{money(p.price)}</strong>{p.oldPrice && <del>{money(p.oldPrice)}</del>}</div></div>
          </motion.article>)}</AnimatePresence>
        </div>
        {visibleProducts.length === 0 && <div className="empty-state">No products found. Try another search.</div>}
      </section>

      <section className="promo section-wrap" id="deals"><div className="promo-copy"><span className="section-kicker">A GOOD DEAL, JUST BECAUSE</span><h2>Little treats.<br/><em>Better days.</em></h2><p>Find something that makes your everyday feel a little more you.</p><a href="#shop" className="dark-button">Find your next favourite <ArrowUpRight size={17}/></a></div><div className="promo-visual"><div className="promo-circle circle-one"></div><div className="promo-circle circle-two"></div><img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85" alt="Minimal wristwatch"/></div><span className="promo-side-note">GOOD THINGS LIVE HERE ✳</span></section>

      <section className="newsletter section-wrap" id="new"><div><span className="section-kicker">THE GOOD-FINDS CLUB</span><h2>Stay in the <em>know.</em></h2><p>Fresh arrivals, standout finds and a little inspiration.</p></div><form onSubmit={e => {e.preventDefault(); setNotice('Thanks! Newsletter signup will be connected in a future step.'); setTimeout(()=>setNotice(''),3000)}}><input type="email" placeholder="Your email address" aria-label="Email address" required/><button type="submit" aria-label="Subscribe"><ArrowUpRight/></button></form></section>
    </main>

    <footer className="footer"><a className="brand footer-brand" href="#"><span className="brand-mark">R<span>.</span></span><span className="brand-copy">REHAN'S <b>STORE</b><small>YOUR EVERYDAY DISCOVERY</small></span></a><p>Good finds for real life. © {new Date().getFullYear()} Rehan's Store.</p><div><a href="#shop">Shop</a><a href="#deals">Offers</a><a href="mailto:support@example.com">Contact</a></div></footer>

    <AnimatePresence>{cartOpen && <motion.div className="drawer-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setCartOpen(false)}><motion.aside className="cart-drawer" initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring',damping:28}} onClick={e=>e.stopPropagation()}><div className="drawer-head"><div><span className="section-kicker">YOUR PICKS</span><h2>Your bag <em>({count})</em></h2></div><button className="icon-button" onClick={()=>setCartOpen(false)} aria-label="Close cart"><X/></button></div>
      {cart.length === 0 ? <div className="cart-empty"><ShoppingBag size={40}/><h3>Your bag is taking a breather.</h3><p>Add something lovely to get started.</p><button className="primary-button" onClick={()=>setCartOpen(false)}>Explore products <ArrowUpRight size={17}/></button></div> : <><div className="cart-items">{cart.map(item=><div className="cart-item" key={item.id}><img src={item.image} alt={item.name}/><div className="cart-item-info"><b>{item.name}</b><span>{money(item.price)}</span><div className="qty-control"><button onClick={()=>changeQty(item.id,-1)} aria-label="Decrease quantity"><Minus size={13}/></button><span>{item.qty}</span><button onClick={()=>changeQty(item.id,1)} aria-label="Increase quantity"><Plus size={13}/></button></div></div><strong>{money(item.price*item.qty)}</strong></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><b>{money(total)}</b></div><small>Delivery charges will be confirmed at checkout.</small><button className="primary-button checkout-button" onClick={()=>{setCartOpen(false);setNotice('Checkout will be connected to Firebase in the next development phase.');setTimeout(()=>setNotice(''),3500)}}>Continue to checkout <ArrowUpRight size={18}/></button><p><ShieldCheck size={14}/> Cash on Delivery planned for checkout</p></div></>}
    </motion.aside></motion.div>}</AnimatePresence>
    <AnimatePresence>{notice && <motion.div className="toast" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:10}}>{notice}</motion.div>}</AnimatePresence>
  </div>
}

export default App
