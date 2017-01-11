'use strict'

const EventEmitter = require('events')
const old = require('old')
const vdom = require('virtual-dom')
const mainLoop = require('main-loop')
const hyperx = require('hyperx')
const assign = require('object-assign')
const Tendermint = require('tendermint')
const Status = require('./components/status.js')

class App extends EventEmitter {
  constructor (el) {
    super()

    this.state = {}

    this.hx = hyperx(vdom.h)
    this.loop = mainLoop(this.state, this.render.bind(this), vdom)

    this.tendermint = Tendermint('localhost:46657')
  }

  get element () {
    return this.loop.target
  }

  updateState (d) {
    this.loop.update(assign(this.state, d))
  }

  start () {
    this.pollInterval = setInterval(() => {
      this.tendermint.status((err, [ _, status ]) => {
        this.updateState({ err, status })
      })
    }, 1000)
  }

  render (state) {
    const hx = this.hx
    return hx`
      <div class="tenderdash mdl-layout mdl-js-layout mdl-layout--no-desktop-drawer-button mdl-layout--fixed-header">
        <header style="display:none" class="mdl-layout__header mdl-layout__header--transparent mdl-layout__header--scroll">
          <div class="mdl-layout__header-row">
            <span class="mdl-layout-title">Tenderdash</span>
          </div>
        </header>
        <div class="mdl-layout__content">
          <div class="mdl-grid">
            ${Status(state.status)}
          </div>
        </div>
      </div>
    `
  }
}
module.exports = old(App)
