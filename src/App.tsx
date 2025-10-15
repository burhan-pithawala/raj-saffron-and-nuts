import { useMemo, useState } from 'react'
import './App.css'
import {
  catalogConfig,
  products,
  serviceHighlights,
  qualityChecklist,
  fulfilmentDetails,
} from './data/catalog'

const whatsappNumberSanitized = catalogConfig.whatsappNumber.replace(/\D/g, '')
const phoneLinkNumber = catalogConfig.whatsappNumber.replace(/\s/g, '')

const buildWhatsAppLink = (message: string) =>
  `https://wa.me/${whatsappNumberSanitized}?text=${encodeURIComponent(message)}`

const WhatsAppIcon = () => (
  <svg className="whatsapp-icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12.04 2c-5.51 0-9.98 4.47-9.98 9.98 0 1.76.46 3.48 1.33 5.01L2 22l5.17-1.35c1.47.81 3.12 1.24 4.8 1.24h.01c5.51 0 9.98-4.47 9.98-9.98 0-2.67-1.04-5.18-2.93-7.07A9.935 9.935 0 0 0 12.04 2Zm0 17.98c-1.46 0-2.89-.38-4.14-1.11l-.3-.17-3.06.8.82-2.99-.2-.31a7.96 7.96 0 0 1-1.24-4.33c0-4.41 3.59-8 8-8 2.14 0 4.15.83 5.66 2.34a7.96 7.96 0 0 1 2.34 5.66c0 4.41-3.59 8-8 8Zm4.33-5.81c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.41-.41-.54-.42-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.59 4.1 3.63.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.43-.58 1.63-1.15.2-.57.2-1.06.14-1.15-.06-.1-.22-.16-.46-.28Z" />
  </svg>
)

const clampQuantity = (value: number) => {
  const min = 1
  const max = 99
  if (Number.isNaN(value) || value < min) return min
  if (value > max) return max
  return Math.floor(value)
}

type QuantityState = Record<string, number>

const buildInitialDraftState = (): QuantityState =>
  products.reduce((acc, product) => {
    acc[product.id] = 1
    return acc
  }, {} as QuantityState)

function App() {
  const [quantityDrafts, setQuantityDrafts] = useState<QuantityState>(buildInitialDraftState)
  const [cart, setCart] = useState<QuantityState>({})
  const [orderNotes, setOrderNotes] = useState('')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [activeProductId, setActiveProductId] = useState<string | null>(null)
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0)

  const cartProducts = useMemo(
    () => products.filter((product) => cart[product.id]),
    [cart],
  )

  const activeProduct = useMemo(
    () => (activeProductId ? products.find((product) => product.id === activeProductId) ?? null : null),
    [activeProductId],
  )

  const totalItemsInCart = useMemo(
    () => Object.values(cart).reduce((sum, qty) => sum + qty, 0),
    [cart],
  )

  const orderMessage = useMemo(() => {
    if (!cartProducts.length) {
      return catalogConfig.whatsappDefaultMessage
    }

    const lines = cartProducts.map((product, index) => {
      const quantity = cart[product.id]
      return `${index + 1}. ${product.name} x ${quantity} (${product.unit}) - ${product.priceRange}`
    })

    let message = `Hello ${catalogConfig.brandName} team,\n\n`
    message += 'I would like to place an order:\n'
    message += `${lines.join('\n')}\n\n`

    if (orderNotes.trim()) {
      message += `Notes: ${orderNotes.trim()}\n\n`
    }

    message += 'Please share availability, best pricing, and payment details.\nThank you!'

    return message
  }, [cart, cartProducts, orderNotes])

  const whatsappOrderLink = useMemo(() => buildWhatsAppLink(orderMessage), [orderMessage])

  const handleQuantityDraftChange = (productId: string, nextValue: number) => {
    const clamped = clampQuantity(nextValue)
    setQuantityDrafts((prev) => ({ ...prev, [productId]: clamped }))
    if (cart[productId]) {
      setCart((prev) => ({ ...prev, [productId]: clamped }))
    }
  }

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)
  const toggleCart = () => setIsCartOpen((prev) => !prev)

  const openProductModal = (productId: string) => {
    setActiveProductId(productId)
    setActiveGalleryIndex(0)
    setQuantityDrafts((prev) => ({ ...prev, [productId]: cart[productId] ?? prev[productId] ?? 1 }))
    setIsProductModalOpen(true)
  }

  const closeProductModal = () => {
    setIsProductModalOpen(false)
    setActiveProductId(null)
    setActiveGalleryIndex(0)
  }

  const handleAddToCart = (productId: string) => {
    const quantity = quantityDrafts[productId] ?? 1
    setCart((prev) => ({ ...prev, [productId]: clampQuantity(quantity) }))
    openCart()
  }

  const handleAddActiveProductToCart = () => {
    if (!activeProduct) return
    handleAddToCart(activeProduct.id)
    closeProductModal()
  }

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => {
      const next = { ...prev }
      delete next[productId]
      return next
    })
    setQuantityDrafts((prev) => ({ ...prev, [productId]: 1 }))
  }

  const handleClearCart = () => {
    setCart({})
    setQuantityDrafts(buildInitialDraftState())
    setOrderNotes('')
  }

  const heroWhatsAppLink = buildWhatsAppLink(catalogConfig.whatsappDefaultMessage)
  const cartIsEmpty = cartProducts.length === 0

  const activeGallery = activeProduct
    ? activeProduct.gallery && activeProduct.gallery.length > 0
      ? activeProduct.gallery
      : [activeProduct.image]
    : []

  const activeGalleryImage = activeGallery[activeGalleryIndex] ?? activeGallery[0] ?? ''

  return (
    <div className="page">
      <header className="topbar">
        <div className="container topbar-inner">
          <a href="#home" className="brand">
            <span className="brand-badge">RS</span>
            <div className="brand-copy">
              <span className="brand-name">{catalogConfig.brandName}</span>
              <span className="brand-tagline">Saffron, nuts, and curated gifting</span>
            </div>
          </a>
          <nav className="topbar-nav">
            <a href="#catalog">Catalog</a>
            <a href="#assurance">Assurance</a>
            <a href="#contact">Contact</a>
            <a className="btn btn-whatsapp btn-whatsapp--ghost" href={heroWhatsAppLink} target="_blank" rel="noreferrer">
              <WhatsAppIcon />
              <span>Chat on WhatsApp</span>
            </a>
            <button
              type="button"
              className="btn btn-outline cart-toggle"
              onClick={toggleCart}
              aria-expanded={isCartOpen}
              aria-controls="cart-panel"
            >
              <span>Order cart</span>
              <span className="cart-toggle__count">{totalItemsInCart}</span>
            </button>
          </nav>
        </div>
      </header>

      {isCartOpen ? (
        <div className="cart-overlay" role="presentation" onClick={closeCart}>
          <div
            className="cart-panel cart-panel--floating"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-panel-title"
            id="cart-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cart-header">
              <div>
                <p className="eyebrow">Your order cart</p>
                <h2 id="cart-panel-title">WhatsApp checkout</h2>
              </div>
              <div className="cart-header-actions">
                <span className="cart-count">{totalItemsInCart} items</span>
                <button type="button" className="cart-close" onClick={closeCart}>
                  Close
                </button>
              </div>
            </div>

            {cartIsEmpty ? (
              <div className="cart-empty">
                <p>Select products and set quantities to build your order list.</p>
                <button type="button" className="btn btn-outline" onClick={closeCart}>
                  Browse catalog
                </button>
              </div>
            ) : (
              <>
                <ul className="cart-items">
                  {cartProducts.map((product) => {
                    const quantity = cart[product.id]
                    return (
                      <li key={product.id} className="cart-item">
                        <img src={product.image} alt="" loading="lazy" />
                        <div className="cart-item-body">
                          <div className="cart-item-header">
                            <h3>{product.name}</h3>
                            <button type="button" onClick={() => handleRemoveFromCart(product.id)}>
                              Remove
                            </button>
                          </div>
                          <p className="cart-item-meta">
                            {product.unit} · {product.priceRange}
                          </p>
                          <div className="cart-item-controls">
                            <div className="quantity-stepper" aria-label={`Update quantity for ${product.name}`}>
                              <button type="button" onClick={() => handleQuantityDraftChange(product.id, quantity - 1)}>
                                -
                              </button>
                              <input
                                type="number"
                                min={1}
                                max={99}
                                value={quantity}
                                onChange={(event) =>
                                  handleQuantityDraftChange(product.id, Number.parseInt(event.target.value, 10))
                                }
                              />
                              <button type="button" onClick={() => handleQuantityDraftChange(product.id, quantity + 1)}>
                                +
                              </button>
                            </div>
                            <span className="cart-item-qty">Qty: {quantity}</span>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>

                <div className="cart-notes">
                  <label htmlFor="order-notes">Add a note (optional)</label>
                  <textarea
                    id="order-notes"
                    rows={3}
                    placeholder="e.g. Need 10 gift boxes, dispatch by 12 Oct"
                    value={orderNotes}
                    onChange={(event) => setOrderNotes(event.target.value)}
                  />
                </div>

                <div className="cart-footer">
                  <button type="button" className="btn btn-outline" onClick={handleClearCart}>
                    Clear cart
                  </button>
                  <a className="btn btn-whatsapp" href={whatsappOrderLink} target="_blank" rel="noreferrer">
                    <WhatsAppIcon />
                    <span>Send WhatsApp order</span>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}

      {isProductModalOpen && activeProduct ? (
        <div className="product-modal-overlay" role="presentation" onClick={closeProductModal}>
          <div
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="product-modal__close" onClick={closeProductModal}>
              Close
            </button>
            <div className="product-modal__layout">
              <div className="product-modal__media">
                {activeGalleryImage ? (
                  <img src={activeGalleryImage} alt={activeProduct.name} />
                ) : (
                  <div className="product-modal__media-placeholder">No image available</div>
                )}
                {activeGallery.length > 1 ? (
                  <div className="product-modal__thumbnails">
                    {activeGallery.map((imageUrl, index) => (
                      <button
                        key={imageUrl}
                        type="button"
                        className={`product-modal__thumbnail ${index === activeGalleryIndex ? 'is-active' : ''}`}
                        onClick={() => setActiveGalleryIndex(index)}
                      >
                        <img src={imageUrl} alt={`${activeProduct.name} thumbnail ${index + 1}`} />
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="product-modal__content">
                <p className="eyebrow">{activeProduct.origin}</p>
                <h2 id="product-modal-title">{activeProduct.name}</h2>
                <p className="product-modal__price">{activeProduct.priceRange}</p>
                <p className="product-modal__unit">{activeProduct.unit}</p>
                <p className="product-modal__description">{activeProduct.description}</p>
                <div className="product-modal__highlights">
                  <h3>Highlights</h3>
                  <ul>
                    {activeProduct.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
                <p className="product-modal__bestfor">
                  Best for <strong>{activeProduct.bestFor}</strong>
                </p>
                <div className="product-modal__actions">
                  <div className="quantity-stepper" aria-label={`Select quantity for ${activeProduct.name}`}>
                    <button
                      type="button"
                      onClick={() => handleQuantityDraftChange(activeProduct.id, (quantityDrafts[activeProduct.id] ?? 1) - 1)}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={quantityDrafts[activeProduct.id] ?? 1}
                      onChange={(event) =>
                        handleQuantityDraftChange(activeProduct.id, Number.parseInt(event.target.value, 10))
                      }
                    />
                    <button
                      type="button"
                      onClick={() => handleQuantityDraftChange(activeProduct.id, (quantityDrafts[activeProduct.id] ?? 1) + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button type="button" className="btn btn-primary" onClick={handleAddActiveProductToCart}>
                    {cart[activeProduct.id] ? 'Update cart' : 'Add to cart'}
                  </button>
                  <a
                    className="btn btn-whatsapp btn-whatsapp--ghost"
                    href={buildWhatsAppLink(`Hi, I would like to discuss ${activeProduct.name}.`)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <WhatsAppIcon />
                    <span>Ask on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <section className="hero" id="home">
        <div className="container hero-inner">
          <div className="hero-content">
            <p className="eyebrow">{catalogConfig.tagline}</p>
            <h1>Shop premium saffron and gourmet nuts crafted for gifting, retail, and culinary teams.</h1>
            <p>
              Discover lab-certified saffron batches, single-origin almonds, pistachios, and Medjool dates packaged in
              small-batch lots for discerning buyers.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#catalog">
                Browse catalog
              </a>
              <a className="btn btn-whatsapp btn-whatsapp--ghost" href={heroWhatsAppLink} target="_blank" rel="noreferrer">
                <WhatsAppIcon />
                <span>Talk to our team</span>
              </a>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-card">
              <img
                src="https://images.unsplash.com/photo-1604908177223-5c2c9f7d2d59?auto=format&fit=crop&w=900&q=80"
                alt="Saffron jar and nuts"
              />
              <div className="hero-card-overlay">
                <p>Build curated hampers for festive gifting or retail shelves in a few clicks.</p>
                <span>Freshly packed in Jaipur</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="main-content container" id="catalog">
        <section className="catalog-area">
          <header className="section-heading">
            <div>
              <p className="eyebrow">Catalog</p>
              <h2>Seasonal saffron and gourmet dry fruits</h2>
              <p className="section-subtitle">
                Tap any product to view tasting notes, certifications, and packaging options. Add your preferred
                quantities to the cart and send the entire list on WhatsApp.
              </p>
            </div>
            <div className="catalog-meta">
              <span>{products.length} products</span>
              <span>{totalItemsInCart} items selected</span>
            </div>
          </header>

          <div className="product-grid">
            {products.map((product) => {
              const inCart = Boolean(cart[product.id])

              return (
                <article key={product.id} className={`product-card ${inCart ? 'product-card--active' : ''}`}>
                  <button type="button" className="product-card__trigger" onClick={() => openProductModal(product.id)}>
                    <div className="product-media">
                      <img src={product.image} alt={product.name} loading="lazy" />
                      <span className="product-media-tag">{product.unit}</span>
                      {inCart ? <span className="product-media-flag">In cart</span> : null}
                    </div>
                    <div className="product-body">
                      <div className="product-header">
                        <h3>{product.name}</h3>
                        <p className="product-price">{product.priceRange}</p>
                      </div>
                      <p className="product-unit">{product.origin}</p>
                      <span className="product-card__cta">View details</span>
                    </div>
                  </button>
                </article>
              )
            })}
          </div>
        </section>
      </main>

      <section className="assurance-section" id="assurance">
        <div className="container">
          <header className="section-heading">
            <div>
              <p className="eyebrow">Assurance</p>
              <h2>Why buying from Raj Saffron & Nuts works for you</h2>
              <p className="section-subtitle">
                We collaborate with farms across Kashmir, Iran, Afghanistan, and Turkey to ensure every lot is
                traceable and packaged with care.
              </p>
            </div>
          </header>
          <div className="assurance-grid">
            {serviceHighlights.map((highlight) => (
              <article key={highlight.title} className="assurance-card">
                <h3>{highlight.title}</h3>
                <p>{highlight.description}</p>
              </article>
            ))}
          </div>
          <div className="quality-checklist">
            <h3>Quality checkpoints</h3>
            <ul>
              {qualityChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="fulfilment-grid">
            {fulfilmentDetails.map((detail) => (
              <article key={detail.title} className="fulfilment-card">
                <h3>{detail.title}</h3>
                <p>{detail.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="container contact-grid">
          <div className="contact-card">
            <h3>Talk to our team</h3>
            <a href={`tel:${phoneLinkNumber}`}>{catalogConfig.phoneDisplay}</a>
            <a href={`mailto:${catalogConfig.email}`}>{catalogConfig.email}</a>
            <a className="contact-action contact-action--whatsapp" href={heroWhatsAppLink} target="_blank" rel="noreferrer">
              <WhatsAppIcon />
              <span>WhatsApp chat</span>
            </a>
          </div>
          <div className="contact-card">
            <h3>Pick-up & dispatch</h3>
            <p>{catalogConfig.address}</p>
            <p>{catalogConfig.businessHours}</p>
          </div>
          <div className="contact-card">
            <h3>Follow us</h3>
            <a href={catalogConfig.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <p>Copyright {new Date().getFullYear()} {catalogConfig.brandName}. All rights reserved.</p>
          <p>Crafted with care for chefs, retailers, and gifting partners.</p>
        </div>
      </footer>
    </div>
  )
}

export default App






