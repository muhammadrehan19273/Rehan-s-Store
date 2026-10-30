import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown, Heart,
  Menu, Minus, Plus, Search, ShieldCheck, ShoppingBag, Sparkles, Truck, X, Zap
} from 'lucide-react'

const categories = ['Everything', 'Tech & Audio', 'Style', 'Home', 'Self-care']
const products = [
  { id: 1, name: 'Studio Wireless Headphones', category: 'Tech & Audio', price: 7499, oldPrice: 9999, badge: 'BESTSELLER', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=88', tone: 'tone-lime', rating: '4.9', description: 'Rich sound, soft cushions and a clean everyday silhouette.' },
  { id: 2, name: 'Everyday Runner Sneakers', category: 'Style', price: 5899, oldPrice: 6999, badge: 'TRENDING', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=88', tone: 'tone-pink', rating: '4.8', description: 'A comfortable, lightweight pair made for your daily rotation.' },
  { id: 3, name: 'Minimal Timepiece', category: 'Style', price: 4299, oldPrice: null, badge: 'NEW DROP', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=88', tone: 'tone-blue', rating: '4.7', description: 'A refined watch with a timeless, understated design.' },
  { id: 4, name: 'Sculptural Table Lamp', category: 'Home', price: 3799, oldPrice: 4499, badge: 'JUST IN', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=88', tone: 'tone-sand', rating: '4.8', description: 'Warm ambient lighting for your favourite corner.' },
  { id: 5, name: 'Daily Care Essentials', category: 'Self-care', price: 2199, oldPrice: null, badge: 'DAILY PICK', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=88', tone: 'tone-pink', rating: '4.6', description: 'Simple self-care essentials for your everyday routine.' },
  { id: 6, name: 'Compact Smart Speaker', category: 'Tech & Audio', price: 6499, oldPrice: 7999, badge: 'POPULAR', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1000&q=88', tone: 'tone-blue', rating: '4.8', description: 'Room-filling sound in a compact, modern design.' },
  { id: 7, name: 'Carry-All Everyday Bag', category: 'Style', price: 3199, oldPrice: null, badge: 'CUSTOMER FAVOURITE', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=88', tone: 'tone-sand', rating: '4.7', description: 'A versatile carry-all for busy days and weekend plans.' },
  { id: 8, name: 'Modern Desk Companion', category: 'Home', price: 2699, oldPrice: 3299, badge: 'LIMITED OFFER', image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1000&q=88', tone: 'tone-lime', rating: '4.6', description: 'Small details for a calmer, more considered workspace.' },
]
const money = n => `Rs. ${n.toLocaleString('en-PK')}`
const rise = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } }

function App() {
  const [category, setCategory] = useState('Everything')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [notice, setNotice] = useState('')
  const [activeProduct, setActiveProduct] = useState(null)

  const visibleProducts = useMemo(() => products.filter(p =>
    (category === 'Everything' || p.category === category) &&
    `${p.name} ${p.category}`.toLowerCase().includes(query.toLowerCase())
  ), [category, query])
  const count = cart.reduce((s, p) => s + p.qty, 0)
  const total = cart.reduce((s, p) => s + p.price * p.qty, 0)

  const toast = text => {
    setNotice(text)
    window.clearTimeout(window.__rehanToast)
    window.__rehanToast = window.setTimeout(() => setNotice(''), 2300)
  }
  const addToCart = product => {
    setCart(current => {
      const found = current.find(p => p.id === product.id)
      return found ? current.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p) : [...current, { ...product, qty: 1 }]
    })
    toast(`${product.name} added to your bag`)
  }
  const changeQty = (id, delta) => setCart(current => current.map(p => p.id === id ? { ...p, qty: p.qty + delta } : p).filter(p => p.qty > 0))
  const toggleWish = id => {
    const exists = wishlist.includes(id)
    setWishlist(current => exists ? current.filter(x => x !== id) : [...current, id])
    toast(exists ? 'Removed from wishlist' : 'Saved to your wishlist')
  }

  return <div className="site-shell">
    <div className="topline"><span className="pulse-dot" /> A BETTER KIND OF EVERYDAY SHOPPING <span className="topline-right">CASH ON DELIVERY · COMING SOON</span></div>
    <header className="header">
      <button className="icon-btn mobile-toggle" aria-label="Toggle menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button>
      <a className="brand" href="#home" aria-label="Rehan's Store home">
        <span className="brand-symbol">R<span>•</span></span>
        <span className="brand-name">REHAN'S<span>STORE</span></span>
      </a>
      <nav className={`nav ${mobileMenu ? 'nav-open' : ''}`}>
        <a href="#home" onClick={() => setMobileMenu(false)}>Home</a>
        <a href="#shop" onClick={() => setMobileMenu(false)}>Shop all</a>
        <a href="#new" onClick={() => setMobileMenu(false)}>New finds <span className="new-pill">NEW</span></a>
        <a href="#story" onClick={() => setMobileMenu(false)}>Our story</a>
      </nav>
      <div className="header-tools">
        <label className="search-field"><Search size={17}/><input value={query} onChange={e => { setQuery(e.target.value); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }) }} placeholder="Find something good..." aria-label="Search products"/><kbd>/</kbd></label>
        <button className="icon-btn wish-tool" aria-label="Wishlist" onClick={() => toast(`${wishlist.length} saved item${wishlist.length === 1 ? '' : 's'}`)}><Heart size={19}/><i>{wishlist.length}</i></button>
        <button className="cart-tool" onClick={() => setCartOpen(true)}><ShoppingBag size={17}/><span>Bag</span><b>{count}</b></button>
      </div>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-grid" />
        <div className="hero-copy">
          <motion.div className="eyebrow" initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .6 }}><span className="eyebrow-line" /> THE EVERYDAY EDIT <span className="eyebrow-number">/ 001</span></motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: .08 }}>Good finds.<br/><em>Great feeling.</em></motion.h1>
          <motion.p className="hero-description" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .2 }}>Little upgrades. Big favourites. Everyday essentials with a little extra something.</motion.p>
          <motion.div className="hero-cta-row" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .3 }}>
            <a className="btn-primary" href="#shop">Explore the store <ArrowUpRight size={18}/></a>
            <a className="quiet-link" href="#new">Meet the new finds <ArrowDownRight size={16}/></a>
          </motion.div>
          <motion.div className="hero-note" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .8 }}><span className="note-icon"><Zap size={15} fill="currentColor"/></span><span><b>Curated for your everyday</b><small>Good design. Useful things. No fuss.</small></span></motion.div>
        </div>
        <motion.div className="hero-visual" initial={{ opacity: 0, scale: .94, x: 24 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: .9, delay: .12 }}>
          <div className="visual-halo halo-one" /><div className="visual-halo halo-two" />
          <div className="visual-index">RS / OBJECTS FOR DAILY LIFE</div>
          <div className="hero-image-wrap"><img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=90" alt="Featured wireless headphones"/><div className="hero-image-gradient"/></div>
          <div className="hero-product-caption"><span className="caption-label">THE FEATURED FIND</span><b>Sound, reimagined.</b><span>Studio wireless headphones</span><strong>Rs. 7,499 <small>Rs. 9,999</small></strong></div>
          <div className="floating-stamp"><span>GOOD</span><b>STUFF</b><i>✳</i></div>
          <div className="floating-rating"><span>✦</span><b>4.9</b><small>customer rating</small></div>
          <div className="visual-corner">01<br/>—<br/>08</div>
        </motion.div>
        <div className="hero-bottom"><span>SCROLL TO DISCOVER</span><div className="scroll-track"><i/></div><span>DESIGNED FOR EVERYDAY</span></div>
      </section>

      <section className="trust-strip" aria-label="Store benefits">
        <div><span className="trust-icon"><Truck size={19}/></span><span><b>Doorstep delivery</b><small>Delivered to your address</small></span></div>
        <div><span className="trust-icon"><ShieldCheck size={19}/></span><span><b>Thoughtful picks</b><small>Quality-first selection</small></span></div>
        <div><span className="trust-icon"><ShoppingBag size={19}/></span><span><b>Easy shopping</b><small>A simpler way to discover</small></span></div>
        <div><span className="trust-icon lime-icon"><Check size={19}/></span><span><b>Cash on delivery</b><small>Planned for launch</small></span></div>
      </section>

      <section className="category-section section-pad" id="new">
        <div className="section-heading">
          <div><span className="section-kicker">A LITTLE BIT OF EVERYTHING</span><h2>Find your <em>kind of good.</em></h2></div>
          <p>Everyday pieces picked to make the ordinary feel a little more special.</p>
        </div>
        <div className="category-tiles">
          {[
            { name: 'Tech & Audio', title: 'Better sound.\nSmarter days.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=85', className: 'tile-tech' },
            { name: 'Style', title: 'Your everyday,\nwith a twist.', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85', className: 'tile-style' },
            { name: 'Home', title: 'Make room for\nbetter living.', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=85', className: 'tile-home' },
          ].map((tile, i) => <motion.button key={tile.name} className={`category-tile ${tile.className}`} onClick={() => { setCategory(tile.name); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }) }} initial="hidden" whileInView="show" viewport={{ once: true, amount: .2 }} variants={rise} transition={{ duration: .55, delay: i * .1 }}>
            <img src={tile.image} alt="" /><span className="tile-shade"/><span className="tile-copy"><small>EXPLORE THE EDIT</small><b>{tile.title.split('\n').map((line, j) => <span key={j}>{line}</span>)}</b><i><ArrowUpRight size={19}/></i></span><span className="tile-index">0{i+1}</span>
          </motion.button>)}
        </div>
      </section>

      <section className="shop-section section-pad" id="shop">
        <div className="section-heading shop-heading">
          <div><span className="section-kicker">THE GOOD STUFF</span><h2>Current <em>favourites.</em></h2></div>
          <span className="product-count">{visibleProducts.length.toString().padStart(2, '0')} PRODUCTS</span>
        </div>
        <div className="filter-row">
          <div className="category-filters">{categories.map(c => <button key={c} className={category === c ? 'filter-active' : ''} onClick={() => setCategory(c)}>{c}</button>)}</div>
          <button className="sort-button" onClick={() => toast('Products are showing our current picks')}>Our selection <ChevronDown size={15}/></button>
        </div>
        {visibleProducts.length ? <motion.div layout className="product-grid">
          <AnimatePresence mode="popLayout">
            {visibleProducts.map((p, i) => <motion.article layout key={p.id} className={`product-card ${p.tone}`} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .96 }} transition={{ duration: .35, delay: i * .035 }}>
              <button className="product-image" onClick={() => setActiveProduct(p)} aria-label={`View ${p.name}`}><img src={p.image} alt={p.name}/><span className="product-badge">{p.badge}</span><span className="quick-view">Quick view <ArrowUpRight size={14}/></span></button>
              <button className={`product-wish ${wishlist.includes(p.id) ? 'is-wished' : ''}`} onClick={() => toggleWish(p.id)} aria-label="Toggle wishlist"><Heart size={17} fill={wishlist.includes(p.id) ? 'currentColor' : 'none'}/></button>
              <div className="product-info"><div className="product-meta"><span>{p.category}</span><span className="rating">✦ {p.rating}</span></div><button className="product-name" onClick={() => setActiveProduct(p)}>{p.name}</button><p>{p.description}</p><div className="product-bottom"><div className="prices"><b>{money(p.price)}</b>{p.oldPrice && <del>{money(p.oldPrice)}</del>}</div><button className="add-button" onClick={() => addToCart(p)} aria-label={`Add ${p.name} to bag`}><Plus size={18}/></button></div></div>
            </motion.article>)}
          </AnimatePresence>
        </motion.div> : <div className="empty-state"><Search size={25}/><h3>No finds just yet</h3><p>Try another search or category.</p><button onClick={() => {setQuery(''); setCategory('Everything')}}>Clear filters</button></div>}
        <div className="shop-bottom"><span>GOOD THINGS TAKE A LITTLE LOOKING.</span><a href="#shop" onClick={() => {setCategory('Everything'); setQuery('')}}>View all finds <ArrowRight size={16}/></a></div>
      </section>

      <section className="statement-section" id="story">
        <div className="statement-orb orb-a"/><div className="statement-orb orb-b"/>
        <motion.div className="statement-content" initial="hidden" whileInView="show" viewport={{ once: true, amount: .3 }} variants={rise} transition={{ duration: .7 }}>
          <span className="section-kicker">THE REHAN'S STORE WAY</span><h2>Not more stuff.<br/><em>Better finds.</em></h2><p>We're building a place for useful things, little upgrades and everyday favourites. Easy to browse, simple to shop, and always focused on the things worth bringing home.</p><a className="btn-primary" href="#shop">Explore the edit <ArrowUpRight size={17}/></a>
        </motion.div>
        <div className="statement-aside"><span>RS.</span><p>EVERYDAY<br/>DISCOVERIES</p><i>✳</i></div>
      </section>

      <section className="newsletter section-pad">
        <div><span className="section-kicker">STAY IN THE LOOP</span><h2>Good finds are<br/><em>worth sharing.</em></h2></div>
        <p>We're getting the store ready. Check back soon for new drops, special finds and launch updates.</p>
        <a className="newsletter-link" href="#shop">Browse the current edit <ArrowUpRight size={17}/></a>
      </section>
    </main>

    <footer className="footer">
      <a className="brand footer-brand" href="#home"><span className="brand-symbol">R<span>•</span></span><span className="brand-name">REHAN'S<span>STORE</span></span></a>
      <span className="footer-tagline">GOOD FINDS. GREAT FEELING.</span>
      <div className="footer-links"><a href="#shop">Shop</a><a href="#story">Our story</a><a href="mailto:hello@rehansstore.example">Contact</a></div>
      <small>© {new Date().getFullYear()} Rehan's Store. A little more everyday.</small>
    </footer>

    <AnimatePresence>{cartOpen && <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={e => e.target === e.currentTarget && setCartOpen(false)}><motion.aside className="cart-drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 250 }}>
      <div className="drawer-head"><div><span className="section-kicker">YOUR SELECTION</span><h2>Your bag <span>({count})</span></h2></div><button className="icon-btn" onClick={() => setCartOpen(false)} aria-label="Close cart"><X/></button></div>
      {cart.length ? <><div className="cart-items">{cart.map(item => <div className="cart-item" key={item.id}><img src={item.image} alt={item.name}/><div className="cart-item-info"><b>{item.name}</b><span>{money(item.price)}</span><div className="qty-control"><button onClick={() => changeQty(item.id, -1)}><Minus size={13}/></button><span>{item.qty}</span><button onClick={() => changeQty(item.id, 1)}><Plus size={13}/></button></div></div><button className="remove-item" onClick={() => changeQty(item.id, -item.qty)} aria-label="Remove item"><X size={15}/></button></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><b>{money(total)}</b></div><p>Delivery costs are confirmed at checkout.</p><button className="btn-primary checkout-btn" onClick={() => toast('Checkout will be enabled after store setup')}>Continue to checkout <ArrowRight size={17}/></button><small><ShieldCheck size={14}/> Secure checkout is planned for launch</small></div></> : <div className="cart-empty"><span><ShoppingBag size={28}/></span><h3>Your bag is taking a breather.</h3><p>Find something you love and it will show up here.</p><button className="btn-primary" onClick={() => {setCartOpen(false); document.getElementById('shop')?.scrollIntoView({behavior:'smooth'})}}>Explore products <ArrowRight size={16}/></button></div>}
    </motion.aside></motion.div>}</AnimatePresence>

    <AnimatePresence>{activeProduct && <motion.div className="overlay product-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={e => e.target === e.currentTarget && setActiveProduct(null)}><motion.div className="product-modal" initial={{ opacity: 0, y: 25, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15 }}><button className="modal-close icon-btn" onClick={() => setActiveProduct(null)} aria-label="Close product"><X/></button><div className="modal-image"><img src={activeProduct.image} alt={activeProduct.name}/></div><div className="modal-info"><span className="section-kicker">{activeProduct.category} · ✦ {activeProduct.rating}</span><h2>{activeProduct.name}</h2><p>{activeProduct.description}</p><div className="modal-price">{money(activeProduct.price)} {activeProduct.oldPrice && <del>{money(activeProduct.oldPrice)}</del>}</div><div className="modal-note"><Truck size={17}/> Doorstep delivery · Cash on delivery planned</div><button className="btn-primary modal-add" onClick={() => {addToCart(activeProduct); setActiveProduct(null); setCartOpen(true)}}>Add to bag <Plus size={17}/></button></div></motion.div></motion.div>}</AnimatePresence>

    <AnimatePresence>{notice && <motion.div className="toast" initial={{ opacity: 0, y: 18, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }}><span><Check size={15}/></span>{notice}</motion.div>}</AnimatePresence>
    <button className="back-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUpRight size={18}/></button>
  </div>
}

export default App
