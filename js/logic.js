import axios from 'axios';

const logic = () => {
  let cancelTokenSource;
  let arr = [];
  let arr1 = [];
  return setTimeout(() => {
    let tr = document.querySelectorAll('tbody tr .tabHovermin')
    let tableHover = document.querySelectorAll('.tableHover')
    arr = Array.prototype.slice.call(tr)
    arr1 = Array.from(tableHover)
    arr.forEach(item => {
      item.onmouseenter = async function () {
          if (typeof cancelTokenSource != typeof undefined) {
            cancelTokenSource.cancel('Từ từ thôi a ơiiiiii')
          }
          cancelTokenSource = axios.CancelToken.source();
          let res = await axios.get(
            `https://625e2146d434c6001c56e391.mockapi.io/inforDetail?id=${item.id}`,
            { cancelToken: cancelTokenSource.token }
          )
          arr1.map(item => {
            let totalValue = res.data[0].MSN.value + res.data[0].TCB.value + res.data[0].MCH.value;
            let inforMSN = res.data[0].MSN;
            let inforTCB = res.data[0].TCB;
            let inforMCH = res.data[0].MCH;
            return item.innerHTML = `
                <tr>
                  <td>MNS</td>
                  <td>${inforMSN.quantity}</td>
                  <td>${inforMSN.percentage}</td>
                  <td>${inforMSN.updateDate}</td>
                  <td>${inforMSN.value}</td>
                </tr>
                <tr>
                  <td>TCB</td>
                  <td>${inforTCB.quantity}</td>
                  <td style=${inforTCB.percentage - 50000 > 0 ? '' : 'color:red'}>
                    ${inforTCB.percentage - 50000 > 0 ? inforTCB.percentage : '-' + inforTCB.percentage}
                  </td>
                  <td>${inforTCB.updateDate}</td>
                  <td>${inforTCB.value}</td>
                </tr>
                <tr>
                  <td>MCH</td>
                  <td>${inforMCH.quantity}</td>
                  <td>${inforMCH.percentage}</td>
                  <td>${inforMCH.updateDate}</td>
                  <td>${inforMCH.value}</td>
                </tr>
                <tr>
                  <td colspan="4">Total</td>
                  <td>${totalValue}</td>
                </tr>
              `
          })

        }

    })
  }, 1000)
}
export default logic;


