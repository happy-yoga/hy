/* global HTMLElement, customElements */

const buildHeart = (rSize, rLeft, rNum, rTime) =>
  "<div class='heart' style='width:" +
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

class HiddenMessage extends HTMLElement {
  constructor (...args) {
    const self = super(...args)

    return self
  }

  connectedCallback () {
    this.createInterval = setInterval(() => {
      const rNum = Math.floor(Math.random() * 40) + 1
      const rSize = Math.floor(Math.random() * 15) + 10
      const rLeft = Math.floor(Math.random() * 100) + 1
      const rTime = Math.floor(Math.random() * 5) + 5

      const bgHeart = document.querySelector('.bg-heart')
      bgHeart.innerHTML =
        'happy body. happy life.' +
        buildHeart(rSize, rLeft, 0, rTime) +
        buildHeart(rSize - 5, rLeft, rNum, rTime + 3) +
        buildHeart(rSize - 7, rLeft + 15, rNum, rTime + 4) +
        buildHeart(rSize - 2, rLeft + 3, rNum, rTime + 1) +
        buildHeart(rSize - 10, rLeft + 7, rNum, rTime + 5)
    }, 500)

    this.removeInterval = setInterval(() => {
      const hearts = document.querySelectorAll('.heart')
      hearts.forEach(function (heart) {
        const top = heart.style.top.replace(/[^-\d\.]/g, '')

        if (top <= -100) {
          // heart.remove()
          console.log(heart)
        }
      })
    })
  }

  disconnectedCallback () {
    if (this.interval) {
      clearInterval(this.createInterval)
      clearInterval(this.removeInterval)
    }
  }
}

customElements.define('hidden-message', HiddenMessage)
