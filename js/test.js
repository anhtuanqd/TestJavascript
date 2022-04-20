// const axios = require('axios')
import axios from 'axios';
import moment from 'moment';

const test = () => {
  let table = document.querySelector('table tbody')
  axios({
    method: 'GET',
    url: 'https://625ce68595cd5855d6178b7b.mockapi.io/dataset',
    data: null
  }).then(res => {
    console.log(res.data)
    let dataList = res.data.map(({
      id,
      name,
      shares,
      percentage,
      last_update,
      share_volume,
      price_range,
      transaction_date
    }) => {
      Number.prototype.format = function (n, x) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
        return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
      };
      return `
        <tr>
          <td id='${id}' class='tabHovermin'>${name}
            <div>
              <table>
                <thead>
                  <tr class='headerTab' colspan="5">
                    <td colspan="4">
                      <input type="radio" id="huey" name="drone"  value="huey" >
                      <label for="huey">Historycal deals</label>

                      <input type="radio" id="dewey" name="drone" value="dewey">
                      <label for="dewey">Dewey</label>
                    </td>
                    <td>
                      Download
                    </td>
                  </tr>
                  <tr>
                    <th>TICKER</th>
                    <th>QUANTITY</th>
                    <th>PERCENTAGE</th>
                    <th>UPDATE DATE</th>
                    <th>VALUE</th>
                  </tr>
                </thead>
                <tbody class='tableHover'>
                    <tr>

                    </tr>
                </tbody>
              </table>
            </div>
          </td>
          <td>${Number(shares).format(2)}</td>
          <td>${percentage}</td>
          <td>${moment(last_update).format("DD/MM/YYYY")}</td>
          <td style=${share_volume - 50 > 0 ? '' : 'color:red'}>
            ${share_volume - 50 > 0 ? `+` : `-`} ${share_volume}
          </td>
          <td>${price_range.start} ~ ${price_range.end}</td>
          <td>${moment(transaction_date).format("DD/MM/YYYY")}</td>
        </tr>
      `
    }).join(' ')
    table.innerHTML = dataList;
  })
    .catch(err => {
      console.log(err);
    })
}

export default test
