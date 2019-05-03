/* global HTMLElement, customElements */

const buildHeart = (rSize, rLeft, rNum, rTime) =>
  "<div class='heart' data-date='" +
  Date.now() +
  "' style='width:" +
  rSize +
  'px;height:' +
  rSize +
  'px;left:' +
  (rLeft + rNum) +
  '%;background:rgba(255,255,255);-webkit-animation:love ' +
  rTime +
  's ease;-moz-animation:love ' +
  rTime +
  's ease;-ms-animation:love ' +
  rTime +
  's ease;animation:love ' +
  rTime +
  "s ease'></div>"

const createNode = html => {
  const div = document.createElement('div')
  div.innerHTML = html.trim()

  return div.firstChild
}

const createHeart = (rSize, rLeft, rNum, rTime) => {
  const html = buildHeart(rSize, rLeft, rNum, rTime)
  return createNode(html)
}

class HiddenMessage extends HTMLElement {
  constructor (...args) {
    const self = super(...args)
    this.state = window.happyState = window.happyState || {}
    return self
  }

  connectedCallback () {
    this.createInterval = setInterval(() => {
      if (this.state.scrolledDown) {
        // no hearts necessary when not in view
        return
      }
      const rNum = Math.floor(Math.random() * 40) + 1
      const rSize = Math.floor(Math.random() * 15) + 10
      const rLeft = Math.floor(Math.random() * 100) + 1
      const rTime = Math.floor(Math.random() * 5) + 5

      const bgHeart = document.querySelector('.bg-heart')
      const bgHearts = bgHeart.querySelector('.hearts')

      bgHearts.appendChild(createHeart(rSize, rLeft, 0, rTime))
      bgHearts.appendChild(createHeart(rSize - 5, rLeft, rNum, rTime + 3))
      bgHearts.appendChild(createHeart(rSize - 7, rLeft + 15, rNum, rTime + 4))
      bgHearts.appendChild(createHeart(rSize - 2, rLeft + 3, rNum, rTime + 1))
      bgHearts.appendChild(createHeart(rSize - 10, rLeft + 7, rNum, rTime + 5))
    }, 500)

    this.removeInterval = setInterval(() => {
      const hearts = document.querySelectorAll('.heart')
      const yet = Date.now()

      if (hearts.length <= 0) {
        return
      }

      hearts.forEach(function (heart) {
        const date = heart.getAttribute('data-date')

        if (date <= yet - 3) {
          heart.remove()
        }
      })
    }, 500)
  }

  disconnectedCallback () {
    if (this.interval) {
      clearInterval(this.createInterval)
      clearInterval(this.removeInterval)
    }
  }
}

customElements.define('hidden-message', HiddenMessage)
