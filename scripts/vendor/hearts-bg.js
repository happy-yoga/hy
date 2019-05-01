/*
Based on the work of https://codepen.io/lovefield

see https://codepen.io/lovefield/pen/vEvqZV
*/
setInterval(function () {
  var rNum = Math.floor(Math.random() * 40) + 1
  var rSize = Math.floor(Math.random() * 15) + 10
  var rLeft = Math.floor(Math.random() * 100) + 1
  var rTime = Math.floor(Math.random() * 5) + 5

  var bgHeart = document.querySelector('.bg-heart')
  bgHeart.innerHTML =
    'happy body. happy life.' +
    "<div class='heart' style='width:" +
    rSize +
    'px;height:' +
    rSize +
    'px;left:' +
    rLeft +
    '%;background:rgba(255, 255, 255);-webkit-animation:love ' +
    rTime +
    's ease;-moz-animation:love ' +
    rTime +
    's ease;-ms-animation:love ' +
    rTime +
    's ease;animation:love ' +
    rTime +
    "s ease'></div>" +
    "<div class='heart' style='width:" +
    (rSize - 10) +
    'px;height:' +
    (rSize - 10) +
    'px;left:' +
    (rLeft + rNum) +
    '%;background:rgba(255,255,255);-webkit-animation:love ' +
    (rTime + 5) +
    's ease;-moz-animation:love ' +
    (rTime + 5) +
    's ease;-ms-animation:love ' +
    (rTime + 5) +
    's ease;animation:love ' +
    (rTime + 5) +
    "s ease'></div>"
  var hearts = document.querySelectorAll('.heart')

  hearts.forEach(function (heart) {
    var top = heart.style.top.replace(/[^-\d\.]/g, '')
    // var width = heart.style.width.replace(/[^-\d\.]/g, '')
    if (top <= -100) {
      heart.remove()
    }
  })
}, 500)
