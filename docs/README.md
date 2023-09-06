# MyFinance 個人財務管理儀表板

提供個人財務管理使用

## 系統開發

### 如何增加球型圖式

```
// HTML
<div id="meter-1" class="meter-container">
   <div class="meter"></div> <!-- 球體畫面 -->
   <h2 id="meter-1Tag"></h2> <!-- 名稱，名稱命名原則：div.id(ex: meter-1) + Tag -->
</div>

// Javascript 端
addBall("blue", 呈現數字, 總數, 名稱);  // 建立元件

document.addEventListener("DOMContentLoaded",function(){
   AddNodes("#meter-數字", ballElements[第幾個球體]);
});
```


## 相關工具
* [Material Icons](https://fonts.google.com/icons?icon.style=Sharp&icon.set=Material+Icons&icon.query=finance)

## 參考資料
* [Creating a Hugo Theme From Scratch](https://retrolog.io/blog/creating-a-hugo-theme-from-scratch/)
* [文章變數列表](https://gohugo.io/content-management/front-matter/)
* [Creating your own Hugo Theme!](https://www.youtube.com/watch?v=wcMqrb3v2SM)
* [billboard.js](https://naver.github.io/billboard.js/demo/#Chart.PieChart)
