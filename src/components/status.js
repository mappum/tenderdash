'use strict'

const { h } = require('virtual-dom')
const hx = require('hyperx')(h)

function NodeInfo (info) {
  return hx`
    <div class="status tenderdash-card mdl-cell mdl-cell--12-col mdl-card">
      <h4>Node Status</h4>
      <ul class="fields">
        <li><label>Public Key</label> <code>${info.pub_key}</code></li>
        <li><label>Moniker</label> ${info.moniker}</li>
        <li><label>Network</label> ${info.network}</li>
        <li><label>Listen Address</label> ${info.listen_addr}</li>
        <li><label>Version</label> ${info.version}</li>
        <li>
          <label>Other</label>
          <ul class="fields">${info.other.map((v) => hx`
            <li><code>${v}</code></li>
          `)}</ul>
        </li>
      </ul>
    </div>
  `
}

function LatestBlock (status) {
  let dateMs = Number(String(status.latest_block_time).slice(0, 13))
  let date = new Date(dateMs)
  let dateString = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  return hx`
    <div class="latest-block tenderdash-card mdl-cell mdl-cell--12-col mdl-card">
      <h4>Latest Block</h4>
      <ul class="fields">
        <li><label>Hash</label> <code>${status.latest_block_hash}</code></li>
        <li><label>Height</label> ${status.latest_block_height}</li>
        <li><label>Time</label> ${dateString}</li>
        <li><label>App Hash</label> <code>${status.latest_app_hash}</code></li>
      </ul>
    </div>
  `
}

module.exports = function (status) {
  let contents = null

  if (status != null) {
    contents = hx`
      <div>
        ${LatestBlock(status)}
        ${NodeInfo(status.node_info)}
      </div>
    `
  }

  return hx`
    <div class="status mdl-cell mdl-cell--4-col">
      ${contents}
    </div>
  `
}
