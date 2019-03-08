var vendors = document.createElement('script')
vendors.src = chrome.extension.getURL('js/chunk-vendors.js')
document.head.appendChild(vendors)

var app = document.createElement('script')
app.src = chrome.extension.getURL('js/app.js')
document.head.appendChild(app)

var css = document.createElement('link')
css.rel = 'stylesheet'
css.type = 'text/css'
css.href = chrome.extension.getURL('css/app.css')
document.head.appendChild(css)