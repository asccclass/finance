
$.ajax({
   url: "https://www.justdrink.com.tw/finance/read/liabilities.json",
   method: 'GET',
   async: true,　//  預設是true=非同步,false=同步 (true時整行可省略)
   data: {
   },
   success: function(res) {
 console.log(res);
   }
});
