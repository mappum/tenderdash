'use strict'

const { h } = require('virtual-dom')
const hx = require('hyperx')(h)

module.exports = function (status) {
  let contents = null

  if (status != null) {
    let info = status.node_info
    contents = hx`
      <div>
        <h4>Node Status</h4>
        <ul>
          <li><label>Public Key</label> <code>${info.pub_key}</code></li>
          <li><label>Moniker</label> ${info.moniker}</li>
          <li><label>Network</label> ${info.network}</li>
          <li><label>Listen Addr</label> ${info.listen_addr}</li>
          <li><label>Version</label> ${info.version}</li>
          <li>
            <label>Other</label>
            <ul>${info.other.map((v) => hx`
              <li><code>${v}</code></li>
            `)}</ul>
          </li>
        </ul>
      </div>
    `
  }

  return hx`
    <div class="status mdl-cell mdl-cell--8-col mdl-card mdl-shadow--2dp">
      ${contents}
    </div>
  `
}
