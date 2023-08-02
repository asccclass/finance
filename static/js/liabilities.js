finction drawTable(res) {
   res.forEach(order => {
      const tr = document.createElement('tr');
      const trContent = `
          <td>${order.productName}</td>
          <td>${order.productNumber}</td>
          <td>${order.paymentStatus}</td>
          <td class="${order.status === 'Declined' ? 'danger' : order.status === 'Pending' ? 'warning' : 'primary'}">${order.status}</td>
          <td class="primary">Details</td>
      `;
      tr.innerHTML = trContent;
      document.querySelector('table tbody').appendChild(tr);
  });
}

$.ajax({
   url: "https://www.justdrink.com.tw/finance/read/liabilities.json",
   method: 'GET',
   async: true,　//  預設是true=非同步,false=同步 (true時整行可省略)
   data: {
   },
   success: drawTable(res)
});
