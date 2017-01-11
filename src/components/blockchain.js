'use strict'

const { h } = require('virtual-dom')
const hx = require('hyperx')(h)

function hash (h) {
  return `${h.slice(0, 20)}...`
}

module.exports = function (blockchain) {
  let contents = null

  if (blockchain != null) {
    contents = hx`
      <div>
        <h4>Blockchain</h4>
        <table class="mdl-data-table mdl-js-data-table">
          <thead>
            <tr>
              <th>Height</th>
              <th>Hash</th>
              <th>Txs</th>
              <th>App Hash</th>
            </tr>
          </thead>
          <tbody>${blockchain.block_metas.map((block) => hx`
            <tr>
              <td>${block.header.height}</td>
              <td><code>${hash(block.hash)}</code></td>
              <td>${block.header.num_txs}</td>
              <td><code>${hash(block.header.app_hash)}</code></td>
            </tr>
          `)}</tbody>
        </table>
      </div>
    `
  }

  return hx`
    <div class="blockchain mdl-cell mdl-cell--8-col tenderdash-card mdl-card mdl-shadow--2dp">
      ${contents}
    </div>
  `
}
