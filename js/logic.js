import axios from 'axios';
let cancelTokenSource;
const logic = () => {
  let arr = [];
  let arr1 = [];
  return setTimeout(() => {
    let tr = document.querySelectorAll('tbody tr td:nth-child(1)')
    let tableHover = document.querySelectorAll('.tableHover')
    arr = Array.from(tr)
    arr1 = Array.from(tableHover)
    arr.forEach(item => {
      item.onmouseover = async function () {
        try {
          if(cancelTokenSource){
            cancelTokenSource.cancel('bo may dit con me may')
          }
          cancelTokenSource = axios.CancelToken.source();
          let res = await axios.get(
            `https://625e2146d434c6001c56e391.mockapi.io/inforDetail?id=${item.className}`,
            { cancelToken: cancelTokenSource.token }
          )
          // console.log(res.data);
          arr1.map(item => {
            let a = res.data[0].MSN.value + res.data[0].TCB.value + res.data[0].MCH.value;
            let b = res.data[0].TCB.percentage;
            return item.innerHTML = `
                <tr>
                  <td>MNS</td>
                  <td>${res.data[0].MSN.quantity}</td>
                  <td>${res.data[0].MSN.percentage}</td>
                  <td>${res.data[0].MSN.updateDate}</td>
                  <td>${res.data[0].MSN.value}</td>
                </tr>
                <tr>
                  <td>TCB</td>
                  <td>${res.data[0].TCB.quantity}</td>
                  <td style=${b - 50000 > 0 ? '' : 'color:red'}>${b - 50000 > 0 ? b : '-' + b}</td>
                  <td>${res.data[0].TCB.updateDate}</td>
                  <td>${res.data[0].TCB.value}</td>
                </tr>
                <tr>
                  <td>MCH</td>
                  <td>${res.data[0].MCH.quantity}</td>
                  <td>${res.data[0].MCH.percentage}</td>
                  <td>${res.data[0].MCH.updateDate}</td>
                  <td>${res.data[0].MCH.value}</td>
                </tr>
                <tr>
                  <td colspan="4">Total</td>
                  <td>${a}</td>
                </tr>
              `
          })
        }
        catch (error) {
          if (axios.isCancel(error)) {
            cancelTokenSource.cancel("Rap chậm thôi")
          } else {
            throw error;
          }
        }
      };
    })

  }, 1000)
}
export default logic;

//     axios({
        //       method: 'GET',
        //       url: `https://625e2146d434c6001c56e391.mockapi.io/inforDetail?id=${item.className}`,
        //       data: null,
        //     }).then(res => {
        //       console.log(res.data[0])
        //       arr1.map(item => {
        //         let a = res.data[0].MSN.value + res.data[0].TCB.value + res.data[0].MCH.value;
        //         let b = res.data[0].TCB.percentage;
        //         return item.innerHTML = `
        //             <tr>
        //               <td>MNS</td>
        //               <td>${res.data[0].MSN.quantity}</td>
        //               <td>${res.data[0].MSN.percentage}</td>
        //               <td>${res.data[0].MSN.updateDate}</td>
        //               <td>${res.data[0].MSN.value}</td>
        //             </tr>
        //             <tr>
        //               <td>TCB</td>
        //               <td>${res.data[0].TCB.quantity}</td>
        //               <td style=${b - 50000 > 0 ? '' : 'color:red'}>${b-50000 > 0 ? b : '-'+b}</td>
        //               <td>${res.data[0].TCB.updateDate}</td>
        //               <td>${res.data[0].TCB.value}</td>
        //             </tr>
        //             <tr>
        //               <td>MCH</td>
        //               <td>${res.data[0].MCH.quantity}</td>
        //               <td>${res.data[0].MCH.percentage}</td>
        //               <td>${res.data[0].MCH.updateDate}</td>
        //               <td>${res.data[0].MCH.value}</td>
        //             </tr>
        //             <tr>
        //               <td colspan="4">Total</td>
        //               <td>${a}</td>
        //             </tr>
        //           `
        //       })
        //     })
        //       .catch(err => {
        //         console.log(err);
        //       })

