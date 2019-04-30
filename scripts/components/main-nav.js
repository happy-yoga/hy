/* global window, HTMLElement, customElements */

const toggleClass = 'hamburger--elastic'
const hoverClassActive = 'hamburger--minus'
const hoverClassInactive = 'hamburger--arrow-r'

class MainNav extends HTMLElement {
  constructor (...args) {
    const self = super(...args)
    this._scrollCheckInterval = 100
    this.scrolledDown = false
    this.active = false
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

  toggleNavBar () {
    this._toggleNavBar = this._toggleNavBar
      ? this._toggleNavBar
      : e => {
        e.preventDefault()

        if (this.active) {
          this.deActivateNavbar()
        } else {
          this.activateNavbar()
        }
      }

    return this._toggleNavBar
  }

  activateNavbar () {
    this.active = true
    const toggle = this.activationToggle
    this.hideToggleHover()

    this.classList.add('is-active')
    toggle.classList.add(toggleClass)
    toggle.classList.add('is-active')
  }

  deActivateNavbar () {
    this.active = false
    const toggle = this.activationToggle
    this.hideToggleHover()

    this.classList.remove('is-active')

    toggle.classList.remove(toggleClass)
    toggle.classList.remove('is-active')
  }

  addActivationToggle () {
    const toggle = this.activationToggle
    toggle.addEventListener('click', this.toggleNavBar())
    toggle.addEventListener('mouseover', this.showToggleHover())
    toggle.addEventListener('mouseout', this.hideToggleHover())

    this.appendChild(toggle)
  }

  showToggleHover () {
    this._showToggleHover = this._showToggleHover
      ? this._showToggleHover
      : e => {
        e.preventDefault()

        const toggle = this.activationToggle

        toggle.classList.remove(toggleClass)

        if (this.active) {
          toggle.classList.add(hoverClassActive)
        } else {
          toggle.classList.add(hoverClassInactive)
        }

        toggle.classList.add('is-active')
      }

    return this._showToggleHover
  }

  hideToggleHover () {
    this._hideToggleHover = this._hideToggleHover
      ? this._hideToggleHover
      : e => {
        if (e) {
          e.preventDefault()
        }
        const toggle = this.activationToggle

        toggle.classList.add(toggleClass)

        toggle.classList.remove(hoverClassActive)

        toggle.classList.remove(hoverClassInactive)

        toggle.classList.remove('is-active')
      }

    return this._hideToggleHover
  }

  removeActivationToggle () {
    this.deActivateNavbar()
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
    toggle.classList.add('activation-toggle')
    toggle.classList.add('hamburger')
    toggle.setAttribute('type', 'button')

    const box = document.createElement('span')
    box.classList.add('hamburger-box')

    const inner = document.createElement('span')
    inner.classList.add('hamburger-inner')

    box.appendChild(inner)
    toggle.appendChild(box)

    return toggle
  }

  get activationToggle () {
    this._toggle = this._toggle ? this._toggle : this.buildToggle()
    return this._toggle
  }
}

customElements.define('main-nav', MainNav)
