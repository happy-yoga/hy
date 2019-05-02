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
    console.log('connected')
    this.interval = setInterval(function () {
      var rNum = Math.floor(Math.random() * 40) + 1
      var rSize = Math.floor(Math.random() * 15) + 10
      var rLeft = Math.floor(Math.random() * 100) + 1
      var rTime = Math.floor(Math.random() * 5) + 5

      var bgHeart = document.querySelector('.bg-heart')
      bgHeart.innerHTML =
        'happy body. happy life.' +
        buildHeart(rSize, rLeft, 0, rTime) +
        buildHeart(rSize - 5, rLeft, rNum, rTime + 3) +
        buildHeart(rSize - 7, rLeft + 15, rNum, rTime + 4) +
        buildHeart(rSize - 2, rLeft + 3, rNum, rTime + 1) +
        buildHeart(rSize - 10, rLeft + 7, rNum, rTime + 5)

      var hearts = document.querySelectorAll('.heart')

      hearts.forEach(function (heart) {
        var top = heart.style.top.replace(/[^-\d\.]/g, '')
        // var width = heart.style.width.replace(/[^-\d\.]/g, '')
        if (top <= -100) {
          heart.remove()
        }
      })
    }, 500)
  }

  disconnectedCallback () {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }
}

customElements.define('hidden-message', HiddenMessage)
