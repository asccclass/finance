function drawTable(res) {
   const obj = JSON.parse(res);
   $.each(obj, function(i, order) {
      order.payed = order.details.length;
      const tr = document.createElement('tr');
      const trContent = `
          <td>${order.bank}</td>
          <td>${order.total}</td>
          <td>${order.start}</td>
          <td class="${order.status === 'Declined' ? 'danger' : order.status === 'Pending' ? 'warning' : 'primary'}">${order.period}</td>
          <td class="primary">${order.payed}</td>
      `;
      tr.innerHTML = trContent;
      document.querySelector('table tbody').appendChild(tr);
  });
}

$.ajax({
   url: "https://www.justdrink.com.tw/finance/read/liabilities.json",
   method: 'GET',
   async: true,　//  預設是true=非同步,false=同步 (true時整行可省略)
   success: function(res) { drawTable(res); }
});
