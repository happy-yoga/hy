/* global window, HTMLElement, customElements */

class MainNav extends HTMLElement {
  constructor (...args) {
    const self = super(...args)
    this._scrollCheckInterval = 100
    this.scrolledDown = false
    return self
  }

  connectedCallback () {
    if (window.requestAnimationFrame) {
      this.registerScrollSpy()
    }
  }

  disconnectedCallback () {
    this.deRegisterScrollSpy()
    this.removeActivationToggle()
  }

  onScroll () {
    if (this.onScrollActive) {
      const pageOffset = window.pageYOffset

      if (!this.scrolledDown && pageOffset > 50) {
        this.scrolledDown = true
        window.requestAnimationFrame(this.announceNavbar.bind(this))
      }

      if (this.scrolledDown && pageOffset === 0) {
        this.scrolledDown = false
        window.requestAnimationFrame(this.deAnnounceNavbar.bind(this))
      }

      setTimeout(this.onScroll.bind(this), this.scrollCheckInterval)
    }
  }

  toggleNavBar (e) {
    this._toggleNavBar = this._toggleNavBar
      ? this._toggleNavBar
      : e => {
        e.preventDefault()
        this.classList.toggle('active')
      }

    return this._toggleNavBar
  }

  addActivationToggle () {
    const toggle = this.activationToggle
    toggle.addEventListener('click', this.toggleNavBar())

    this.appendChild(toggle)
  }

  removeActivationToggle () {
    this.classList.remove('active')
    const toggle = this.activationToggle
    toggle.removeEventListener('click', this.toggleNavBar())
    toggle.remove()
  }

  announceNavbar () {
    this.classList.add('prepare')

    setTimeout(() => {
      this.classList.remove('prepare')
      this.classList.add('announce')

      this.addActivationToggle()
    }, 500)
  }

  deAnnounceNavbar () {
    this.classList.add('de-announce')
    this.removeActivationToggle()

    setTimeout(() => {
      this.classList.remove('de-announce')
      this.classList.remove('announce')
      this.classList.add('prepare-reset')

      setTimeout(() => {
        this.classList.remove('prepare-reset')
        this.classList.add('reset')

        setTimeout(() => {
          this.classList.remove('reset')
        }, 300)
      }, 300)
    }, 300)
  }

  registerScrollSpy () {
    this.activateScrollSpy()
    setTimeout(this.onScroll.bind(this), this.scrollCheckInterval)
  }

  deRegisterScrollSpy () {
    this.onScrollActive = false
  }

  set scrolledDown (val) {
    this._scrolledDown = val
    this.setAttribute('scrolled-down', this.scrolledDown)
  }

  get scrolledDown () {
    return this._scrolledDown
  }

  set scrollCheckInterval (val) {
    this._scrollCheckInterval = val
  }

  get scrollCheckInterval () {
    return this._scrollCheckInterval
  }

  activateScrollSpy () {
    this.onScrollActive = true
  }

  buildToggle () {
    const toggle = document.createElement('button')
    toggle.innerHTML = 'X'
    toggle.classList.add('activation-toggle')
    return toggle
  }

  get activationToggle () {
    this._toggle = this._toggle ? this._toggle : this.buildToggle()
    return this._toggle
  }
}

customElements.define('main-nav', MainNav)
