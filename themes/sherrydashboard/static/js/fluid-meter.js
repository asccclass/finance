var L = Object.defineProperty;
var y = Object.getOwnPropertySymbols;
var F = Object.prototype.hasOwnProperty
  , A = Object.prototype.propertyIsEnumerable;
var S = (i,t,s)=>t in i ? L(i, t, {
   enumerable: !0,
   configurable: !0,
   writable: !0,
   value: s
}) : i[t] = s
  , C = (i,t)=>{
   for (var s in t || (t = {}))
       F.call(t, s) && S(i, s, t[s]);
   if (y)
       for (var s of y(t))
           A.call(t, s) && S(i, s, t[s]);
   return i
}
;
var r = (i,t,s)=>(S(i, typeof t != "symbol" ? t + "" : t, s),
s);
const O = function() {
   const t = document.createElement("link").relList;
   if (t && t.supports && t.supports("modulepreload"))
       return;
   for (const o of document.querySelectorAll('link[rel="modulepreload"]'))
       e(o);
   new MutationObserver(o=>{
       for (const h of o)
           if (h.type === "childList")
               for (const n of h.addedNodes)
                   n.tagName === "LINK" && n.rel === "modulepreload" && e(n)
   }
   ).observe(document, {
       childList: !0,
       subtree: !0
   });
   function s(o) {
       const h = {};
       return o.integrity && (h.integrity = o.integrity),
       o.referrerpolicy && (h.referrerPolicy = o.referrerpolicy),
       o.crossorigin === "use-credentials" ? h.credentials = "include" : o.crossorigin === "anonymous" ? h.credentials = "omit" : h.credentials = "same-origin",
       h
   }
   function e(o) {
       if (o.ep)
           return;
       o.ep = !0;
       const h = s(o);
       fetch(o.href, h)
   }
};
O();
class z {
   constructor(t) {
       r(this, "_container");
       r(this, "_canvas");
       r(this, "_context");
       r(this, "_width", 0);
       r(this, "_height", 0);
       r(this, "_time", 0);
       r(this, "_elapsed", 0);
       r(this, "_animationRequestId", 0);
       r(this, "_updateBind");
       r(this, "_resizeBind");
       this._container = t;
       const s = this._container.getBoundingClientRect();
       this._width = Math.floor(s.width),
       this._height = Math.floor(s.height),
       this._canvas = document.createElement("canvas"),
       this._canvas.width = this._width,
       this._canvas.height = this._height;
       const e = this._canvas.getContext("2d");
       if (e)
           this._context = e;
       else
           throw "unable to get 2d context";
       this._container.appendChild(this._canvas),
       this._updateBind = this.update.bind(this),
       this._resizeBind = this.resize.bind(this),
       this._animationRequestId = requestAnimationFrame(this._updateBind),
       window.addEventListener("resize", this._resizeBind)
   }
   update() {
       const t = new Date().getTime();
       this._elapsed = (t - (this._time || t)) / 1e3,
       this._time = t,
       this._animationRequestId = requestAnimationFrame(this._updateBind),
       this.draw()
   }
   resize() {
       if (this._container !== void 0) {
           const t = this._container.getBoundingClientRect()
             , s = Math.floor(t.width)
             , e = Math.floor(t.height);
           this._width = s,
           this._height = e,
           this._canvas.width = s,
           this._canvas.height = e
       }
   }
   dispose() {
       cancelAnimationFrame(this._animationRequestId),
       window.removeEventListener("resize", this._resizeBind)
   }
}
const B = (i,t,s)=>Math.min(Math.max(i, t), s)
  , w = (i,t)=>{
   const s = t - i;
   return t === i ? i : Math.random() * s + i
}
;
class M {
   constructor() {
       r(this, "bubbles", []);
       r(this, "total", 22);
       r(this, "averageSpeed", 50);
       r(this, "speedDeviation", 12);
       r(this, "current", 0);
       r(this, "swing", 0);
       r(this, "averageSize", 4);
       r(this, "minX", 0);
       r(this, "maxX", 0);
       r(this, "minY", 0);
       r(this, "maxY", 0);
       r(this, "yThreshold", 0)
   }
   getBubble() {
       const t = w(this.minX, this.maxX)
         , s = w(this.minY, this.maxY)
         , e = w(this.averageSize * .5, this.averageSize * 1.5)
         , o = e < this.averageSize ? .5 : 1
         , h = w(this.averageSpeed - this.speedDeviation, this.averageSpeed + this.speedDeviation)
         , l = (s - this.yThreshold) / h;
       return new W(t,s,e,h,l,o)
   }
   resetBubble(t) {
       this.bubbles = this.bubbles.filter(s=>s !== t),
       this.bubbles.length < this.total && this.bubbles.push(this.getBubble())
   }
   updateBubbleCount() {
       if (this.bubbles.length < this.total) {
           const t = this.total - this.bubbles.length;
           for (let s = 0; s < t; s++)
               this.bubbles.push(this.getBubble())
       }
   }
   reset() {
       this.bubbles = [];
       for (let t = 0; t < this.total; t++)
           this.bubbles.push(this.getBubble())
   }
}
class W {
   constructor(t, s, e, o, h, n=1) {
       r(this, "x", 0);
       r(this, "y", 0);
       r(this, "r", 0);
       r(this, "velY", 0);
       r(this, "lifespan", 0);
       r(this, "currentRadius", 0);
       r(this, "currentLifespan", 0);
       r(this, "opacityThreshold", 0);
       r(this, "currentOpacity", 1);
       r(this, "opacityDecayingSpeed", 0);
       this.x = t,
       this.y = s,
       this.r = e,
       this.velY = o,
       this.lifespan = h,
       this.currentLifespan = h,
       this.currentOpacity = n,
       this.opacityThreshold = this.lifespan * .2,
       this.opacityDecayingSpeed = 100 / this.lifespan * .2
   }
   get isDead() {
       return this.currentLifespan <= 0
   }
   update(t) {
       this.y -= this.velY * t,
       this.currentRadius < this.r && (this.currentRadius += 20 * t),
       this.currentLifespan < this.opacityThreshold && (this.currentOpacity -= this.opacityDecayingSpeed * t,
       this.currentOpacity <= 0 && (this.currentOpacity = 0)),
       this.currentLifespan -= t
   }
}
class x {
   static pSBC(t, s, e=null, o=null) {
       let h, n, l, d, a, c = typeof e == "string", g, _;
       const b = Math.round;
       return h = s.length > 9,
       h = c ? e.length > 9 ? !0 : e == "c" ? !h : !1 : h,
       _ = this.pSBCr(s),
       g = t < 0,
       a = e && e != "c" ? this.pSBCr(e) : g ? {
           r: 0,
           g: 0,
           b: 0,
           a: -1
       } : {
           r: 255,
           g: 255,
           b: 255,
           a: -1
       },
       t = g ? t * -1 : t,
       g = 1 - t,
       !_ || !a ? null : (o ? (n = b(g * _.r + t * a.r),
       l = b(g * _.g + t * a.g),
       d = b(g * _.b + t * a.b)) : (n = b((g * _.r ** 2 + t * a.r ** 2) ** .5),
       l = b((g * _.g ** 2 + t * a.g ** 2) ** .5),
       d = b((g * _.b ** 2 + t * a.b ** 2) ** .5)),
       c = _.a,
       a = a.a,
       _ = c >= 0 || a >= 0,
       c = _ ? c < 0 ? a : a < 0 ? c : c * g + a * t : 0,
       h ? "rgb" + (_ ? "a(" : "(") + n + "," + l + "," + d + (_ ? "," + b(c * 1e3) / 1e3 : "") + ")" : "#" + (4294967296 + n * 16777216 + l * 65536 + d * 256 + (_ ? b(c * 255) : 0)).toString(16).slice(1, _ ? void 0 : -2))
   }
   static pSBCr(t) {
       let s, e, o, h;
       const n = parseInt
         , l = Math.round;
       let d = t.length;
       const a = {
           r: 0,
           g: 0,
           b: 0,
           a: 0
       };
       if (d > 9) {
           if ([s,e,o,h] = t.split(","),
           d = t.length,
           d < 3 || d > 4)
               return null;
           a.r = n(s[3] == "a" ? s.slice(5) : s.slice(4)),
           a.g = n(e),
           a.b = n(o),
           a.a = h ? parseFloat(h) : -1
       } else {
           if (d == 8 || d == 6 || d < 4)
               return null;
           d < 6 && (t = "#" + t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + (d > 4 ? t[4] + t[4] : ""));
           const c = n(t.slice(1), 16);
           d == 9 || d == 5 ? (a.r = c >> 24 & 255,
           a.g = c >> 16 & 255,
           a.b = c >> 8 & 255,
           a.a = l((c & 255) / .255) / 1e3) : (a.r = c >> 16,
           a.g = c >> 8 & 255,
           a.b = c & 255,
           a.a = -1)
       }
       return a
   }
}
var p;
(function(i) {
   i[i.SLOW = 0] = "SLOW",
   i[i.NORMAL = 1] = "NORMAL",
   i[i.FAST = 2] = "FAST"
}
)(p || (p = {}));
class u {
}
r(u, "ANGULAR_SPEED_NORMAL", Math.PI / 2),
r(u, "ANGULAR_SPEED_FAST", Math.PI),
r(u, "ANGULAR_SPEED_SLOW", Math.PI / 4),
r(u, "HORIZONTAL_SPEED_NORMAL", 55),
r(u, "HORIZONTAL_SPEED_FAST", 155),
r(u, "HORIZONTAL_SPEED_SLOW", 25);
class k {
   static buildFluidLayersFromConfiguration(t, s) {
       let e = u.ANGULAR_SPEED_NORMAL
         , o = u.HORIZONTAL_SPEED_NORMAL;
       const h = this.calculateFrequency(s);
       switch (t.horizontalSpeed) {
       case 2:
           o = u.HORIZONTAL_SPEED_FAST;
           break;
       case 0:
           o = u.HORIZONTAL_SPEED_SLOW;
           break;
       default:
           o = u.HORIZONTAL_SPEED_NORMAL;
           break
       }
       switch (t.waveSpeed) {
       case 2:
           e = u.ANGULAR_SPEED_FAST;
           break;
       case 0:
           e = u.ANGULAR_SPEED_SLOW;
           break;
       default:
           e = u.ANGULAR_SPEED_NORMAL;
           break
       }
       const n = x.pSBC(-.75, t.color || "#ffffff")
         , l = this.calculateWaveAmplitude(s)
         , d = {
           angle: 0,
           horizontalPosition: 0,
           color: t.color || "#ffffff",
           frequency: h,
           waveAmplitude: l,
           horizontalSpeed: o,
           waveSpeed: e
       };
       return [{
           angle: 0,
           horizontalPosition: 0,
           color: n || t.color || "#ffffff",
           frequency: h,
           waveAmplitude: l,
           horizontalSpeed: -o,
           waveSpeed: e
       }, d]
   }
   static calculateWaveAmplitude(t) {
       return t * .021
   }
   static calculateFrequency(t) {
       return t / 11
   }
}
const R = {
   initialProgress: 0,
   maxProgress: 100,
   borderWidth: 30,
   borderColor: "#75758b",
   padding: 30,
   backgroundColor: "#9f9fae",
   showProgress: !0,
   showBubbles: !0,
   bubbleColor: "#ffffff",
   textColor: "#ffffff",
   textDropShadow: !0,
   textShadowOpacity: 1,
   textShadowColor: "#000000",
   fontFamily: "Arial",
   fontSize: 30,
   use3D: !0,
   dropShadow: !0,
   dropShadowColor: "#000000",
   progressFormatter: i=>Math.round(i).toString(),
   fluidConfiguration: {
       color: "#ff0000",
       waveSpeed: p.NORMAL,
       horizontalSpeed: p.NORMAL
   }
}
  , D = (i,t)=>{
   var e, o;
   if (!t.length)
       return 0;
   const s = (o = (e = t.filter(h=>h.resolution <= i)) == null ? void 0 : e.sort(v)) == null ? void 0 : o[0];
   if (s)
       return s.value;
   {
       const h = t.sort(v).reverse()[0];
       return h ? h.value : 0
   }
}
  , v = (i,t)=>i.resolution < t.resolution ? 1 : i.resolution > t.resolution ? -1 : 0;
class E extends z {
   constructor(t, s) {
       super(t);
       r(this, "_fluidConfiguration");
       r(this, "_layers");
       r(this, "_bubbles", new M);
       r(this, "_meterDiameter", 0);
       r(this, "_targetProgress");
       r(this, "_progress");
       r(this, "_maxProgress");
       r(this, "_progressStepSpeed", 0);
       r(this, "_calculatedBorderWidth", 0);
       r(this, "_borderWidth");
       r(this, "_borderColor", "#ff00ff");
       r(this, "_padding", 15);
       r(this, "_backgroundColor", "#ff00ff");
       r(this, "_textColor", "");
       r(this, "_fontFamily", "Arial");
       r(this, "_calculatedFontSize", 0);
       r(this, "_fontSize");
       r(this, "_textDropShadow", !0);
       r(this, "_textShadowOpacity");
       r(this, "_textShadowColor");
       r(this, "_showProgress", !0);
       r(this, "_showBubbles", !0);
       r(this, "_bubbleColor", "#ffffff");
       r(this, "_use3D", !0);
       r(this, "_dropShadow", !0);
       r(this, "_dropShadowColor");
       r(this, "_progressFormatter", t=>`${t}%`);
       const e = C(C({}, R), s);
       this._progress = e.initialProgress,
       this._maxProgress = e.maxProgress,
       this._borderWidth = e.borderWidth,
       this._borderColor = e.borderColor,
       this._padding = e.padding,
       this._targetProgress = this._progress,
       this._backgroundColor = e.backgroundColor,
       this._fluidConfiguration = e.fluidConfiguration,
       this._textColor = e.textColor,
       this._textDropShadow = e.textDropShadow,
       this._textShadowColor = e.textShadowColor,
       this._textShadowOpacity = e.textShadowOpacity,
       this._showProgress = e.showProgress,
       this._fontFamily = e.fontFamily,
       this._fontSize = e.fontSize,
       this._showBubbles = e.showBubbles,
       this._bubbleColor = e.bubbleColor,
       this._use3D = e.use3D,
       this._dropShadow = e.dropShadow,
       this._dropShadowColor = e.dropShadowColor,
       this._progressFormatter = e.progressFormatter,
       this.calculateDrawingValues()
   }
   get progress() {
       return this._progress
   }
   set progress(t) {
       this._targetProgress = B(t, 0, this._maxProgress)
   }
   get maxProgress() {
       return this._maxProgress
   }
   get borderWidth() {
       return this._borderWidth
   }
   set borderWidth(t) {
       this._borderWidth = t,
       this.calculateDrawingValues()
   }
   get borderColor() {
       return this._borderColor
   }
   set borderColor(t) {
       this._borderColor = t
   }
   get meterPadding() {
       return this._padding
   }
   set meterPadding(t) {
       this._padding = t,
       this.calculateDrawingValues()
   }
   get backgroundColor() {
       return this._backgroundColor
   }
   set backgroundColor(t) {
       this._backgroundColor = t
   }
   get textColor() {
       return this._textColor
   }
   set textColor(t) {
       this._textColor = t
   }
   get fontFamily() {
       return this._fontFamily
   }
   set fontFamily(t) {
       this._fontFamily = t
   }
   get fontSize() {
       return this._fontSize
   }
   set fontSize(t) {
       this._fontSize = t
   }
   get textDropShadow() {
       return this._textDropShadow
   }
   set textDropShadow(t) {
       this._textDropShadow = t
   }
   get textShadowOpacity() {
       return this._textShadowOpacity
   }
   set textShadowOpacity(t) {
       this._textShadowOpacity = B(t, 0, 1)
   }
   get textShadowColor() {
       return this._textShadowColor
   }
   set textShadowColor(t) {
       this._textShadowColor = t
   }
   get showProgress() {
       return this._showProgress
   }
   set showProgress(t) {
       this._showProgress = t
   }
   get showBubbles() {
       return this._showBubbles
   }
   set showBubbles(t) {
       this._showBubbles = t
   }
   get bubbleColor() {
       return this._bubbleColor
   }
   set bubbleColor(t) {
       this._bubbleColor = t
   }
   get use3D() {
       return this._use3D
   }
   set use3D(t) {
       this._use3D = t
   }
   get dropShadow() {
       return this._dropShadow
   }
   set dropShadow(t) {
       this._dropShadow = t
   }
   get dropShadowColor() {
       return this._dropShadowColor
   }
   set dropShadowColor(t) {
       this._dropShadowColor = t
   }
   set progressFormatter(t) {
       this._progressFormatter = t
   }
   draw() {
       this.clear(),
       !(this._meterDiameter <= 0 || !this._width || !this._height) && (this._dropShadow && (this._context.save(),
       this._context.beginPath(),
       this._context.shadowColor = this._dropShadowColor,
       this._context.shadowBlur = 10,
       this._context.shadowOffsetY = 5,
       this._context.arc(this._width / 2, this._height / 2, this._meterDiameter / 2 - 1, 0, 2 * Math.PI),
       this._context.closePath(),
       this._context.fill(),
       this._context.restore()),
       this.drawBackground(),
       this._context.save(),
       this._context.arc(this._width / 2, this._height / 2, this._meterDiameter / 2 - this._calculatedBorderWidth, 0, Math.PI * 2),
       this._context.clip(),
       this._layers && (this.drawLayer(this._layers[0], !1),
       this.drawLayer(this._layers[1])),
       this._showBubbles && (this._bubbles.updateBubbleCount(),
       this.drawBubbles()),
       this._showProgress && this.drawText(),
       this._context.restore(),
       this.drawForeground())
   }
   clear() {
       this._context.clearRect(0, 0, this._width, this._height)
   }
   calculateDrawingValues() {
       this._meterDiameter = this.calculateMeterDiameter(),
       this._layers = k.buildFluidLayersFromConfiguration(this._fluidConfiguration, this._meterDiameter),
       this._progressStepSpeed = this._maxProgress / 6;
       const t = window.innerWidth;
       typeof this._borderWidth == "number" ? this._calculatedBorderWidth = this._borderWidth : this._calculatedBorderWidth = D(t, this._borderWidth),
       typeof this._fontSize == "number" ? this._calculatedFontSize = this._fontSize : this._calculatedFontSize = D(t, this._fontSize),
       this.updateBubbleLayer(),
       this._bubbles.reset()
   }
   updateBubbleLayer() {
       const t = this.getMeterBottomLimit();
       let s = this.getFluidLevel();
       this._layers && (s += this._layers[0].waveAmplitude);
       let e = t * .85;
       e < s && (e = s);
       const o = t
         , h = this._width / 2 - this._meterDiameter / 2
         , n = this._width / 2 + this._meterDiameter / 2;
       this._bubbles.minY = e,
       this._bubbles.maxY = o,
       this._bubbles.minX = h,
       this._bubbles.maxX = n,
       this._bubbles.yThreshold = s,
       this._bubbles.averageSize = this._meterDiameter * .006,
       this._bubbles.averageSpeed = this._meterDiameter * 2 / 14,
       this._bubbles.speedDeviation = this._bubbles.averageSpeed * .25;
       let l = this._width * .1;
       this._progress < this._maxProgress * .5 && this._progress >= this._maxProgress * .25 ? l = l * .5 : this._progress < this._maxProgress * .25 && this._progress >= this._maxProgress * .12 ? l = l * .18 : this._progress < this._maxProgress * .12 && (l = l * .04),
       this._bubbles.total = l
   }
   getMeterBottomLimit() {
       return this._height - (this._height - this._meterDiameter) / 2 - this._calculatedBorderWidth
   }
   getFluidLevel() {
       let t = 0;
       this._layers && (t = this._layers[0].waveAmplitude / 2);
       const s = (this._meterDiameter - t - this._calculatedBorderWidth * 2) * this._progress / this._maxProgress;
       return this.getMeterBottomLimit() - s
   }
   updateProgress() {
       this._progress !== this._targetProgress && (this._progress < this._targetProgress ? (this._progress += this._progressStepSpeed * this._elapsed,
       this._progress > this._targetProgress && (this._progress = this._targetProgress)) : this._progress > this._targetProgress && (this._progress -= this._progressStepSpeed * this._elapsed,
       this._progress < this._targetProgress && (this._progress = this._targetProgress)),
       this.updateBubbleLayer())
   }
   drawLayer(t, s=!0) {
       let e = t.angle + t.waveSpeed * this._elapsed;
       e > Math.PI * 2 && (e = e - Math.PI * 2),
       t.angle = e,
       t.horizontalPosition += t.horizontalSpeed * this._elapsed;
       let o = 0
         , h = 0;
       const n = t.waveAmplitude * Math.sin(t.angle)
         , l = this.getMeterBottomLimit()
         , d = this.getFluidLevel();
       for (this.updateProgress(),
       this._context.save(),
       this._context.beginPath(),
       this._context.lineTo(0, d); o < this._width; )
           h = d + n * Math.sin((o + t.horizontalPosition) / t.frequency),
           this._context.lineTo(o, h),
           o++;
       if (this._context.lineTo(o, this._height),
       this._context.lineTo(0, this._height),
       this._context.closePath(),
       this._use3D && s) {
           const a = this._width / 2
             , c = l
             , g = this._meterDiameter * .05
             , _ = this._context.createRadialGradient(a, c, g, a, c, this._meterDiameter * .65)
             , b = t.color
             , P = x.pSBC(-.8, t.color);
           _.addColorStop(0, b),
           P && _.addColorStop(1, P),
           this._context.fillStyle = _
       } else
           this._context.fillStyle = t.color;
       this._context.fill(),
       this._context.restore()
   }
   drawText() {
       const t = this._progressFormatter(this._progress);
       this._context.save(),
       this._context.font = `${this._calculatedFontSize}px ${this._fontFamily}`,
       this._context.fillStyle = this._textColor,
       this._context.textAlign = "center",
       this._context.textBaseline = "middle",
       this._textDropShadow && (this._context.save(),
       this._context.shadowColor = this._textShadowColor,
       this._context.shadowBlur = 7,
       this._context.globalAlpha = this._textShadowOpacity,
       this._context.fillText(t, this._width / 2, this._height / 2),
       this._context.restore()),
       this._context.fillText(t, this._width / 2, this._height / 2),
       this._context.restore()
   }
   drawBackground() {
       if (this._context.save(),
       this._context.beginPath(),
       this._context.arc(this._width / 2, this._height / 2, this._meterDiameter / 2 - this._calculatedBorderWidth, 0, 2 * Math.PI),
       this._context.closePath(),
       this._use3D) {
           const t = this._width / 2
             , s = this._height / 2
             , e = this._meterDiameter * .1
             , o = this._context.createRadialGradient(t, s, e, t, s, this._meterDiameter * .75)
             , h = this._backgroundColor
             , n = x.pSBC(-.8, this.backgroundColor);
           o.addColorStop(0, h),
           n && o.addColorStop(.9, n),
           this._context.fillStyle = o
       } else
           this._context.fillStyle = this.backgroundColor;
       this._context.fill(),
       this._context.restore()
   }
   drawForeground() {
       this._context.save(),
       this._context.lineWidth = this._calculatedBorderWidth,
       this._context.strokeStyle = this._borderColor,
       this._context.beginPath(),
       this._context.arc(this._width / 2, this._height / 2, this._meterDiameter / 2 - this._calculatedBorderWidth / 2, 0, 2 * Math.PI),
       this._context.closePath(),
       this._context.stroke();
       const t = x.pSBC(-.35, this._borderColor)
         , s = this._calculatedBorderWidth * .25;
       this._context.lineWidth = s,
       this._context.strokeStyle = t || this._borderColor,
       this._context.beginPath(),
       this._context.arc(this._width / 2, this._height / 2, this._meterDiameter / 2 - this._calculatedBorderWidth * .85 - s / 2, 0, 2 * Math.PI),
       this._context.closePath(),
       this._context.stroke();
       const e = x.pSBC(.05, this._borderColor)
         , o = this._calculatedBorderWidth * .15;
       if (this._context.lineWidth = o,
       this._context.strokeStyle = e || this._borderColor,
       this._context.beginPath(),
       this._context.arc(this._width / 2, this._height / 2, this._meterDiameter / 2 - o / 2, 0, 2 * Math.PI),
       this._context.closePath(),
       this._context.stroke(),
       this._context.restore(),
       this._use3D) {
           this._context.save(),
           this._context.shadowColor = "#ffffff",
           this._context.shadowBlur = 17;
           const h = this._meterDiameter - this._calculatedBorderWidth;
           let n = this._width / 2 - h / 4.5
             , l = this._height / 2 - h / 5.27
             , d = h * .045;
           const a = new Path2D;
           a.arc(-this._width * 2, l, d, 0, 2 * Math.PI),
           this._context.shadowOffsetX = this._width * 2 + n,
           this._context.globalAlpha = .7,
           this._context.fill(a),
           this._context.restore(),
           this._context.save(),
           this._context.shadowColor = "#ffffff",
           this._context.shadowBlur = 11,
           n = this._width / 2 + h / 5,
           l = this._height / 2 + h / 4,
           d = h * .025;
           const c = new Path2D;
           c.arc(-this._width * 2, l, d, 0, 2 * Math.PI),
           this._context.shadowOffsetX = this._width * 2 + n,
           this._context.globalAlpha = .45,
           this._context.fill(c),
           this._context.restore()
       }
   }
   drawBubbles() {
       this._context.save(),
       this._bubbles.bubbles.forEach(t=>{
           t.update(this._elapsed),
           (t.isDead || t.y < this._bubbles.yThreshold) && this._bubbles.resetBubble(t),
           this._context.beginPath(),
           this._context.strokeStyle = this._bubbleColor,
           this._context.arc(t.x - t.currentRadius / 2, t.y - t.currentRadius / 2, t.currentRadius, 0, 2 * Math.PI),
           this._context.filter = `opacity(${t.currentOpacity})`,
           this._context.stroke(),
           this._context.closePath()
       }
       ),
       this._context.restore()
   }
   calculateMeterDiameter() {
       return this._width >= this._height ? this._height - this._padding : this._width - this._padding
   }
   resize() {
       super.resize(),
       this.calculateDrawingValues(),
       this._bubbles.reset()
   }
}
const m = (i,t)=>{
   const s = new E(i.querySelector(".meter"),t)
     , e = i.querySelector("input")
     , o = i.querySelector("button");
   return o == null || o.addEventListener("click", ()=>{
       const h = Number(e == null ? void 0 : e.value);
       if (isNaN(h)) {
           alert("invalid progress. Number between 0 and 100");
           return
       }
       s.progress = h
   }
   ),
   s
}
;

function AddNodes(elemID, elem) {
   if (elem.ballName) {
       let tagElem = document.querySelector(elemID + "Tag");
       if (tagElem)
           tagElem.innerHTML = elem.ballName;
   }
   return m(document.querySelector(elemID), elem);
}

Number.prototype.numberFormat = function(c, d, t) {
   var n = this
     , c = isNaN(c = Math.abs(c)) ? 2 : c
     , d = d == undefined ? "." : d
     , t = t == undefined ? "," : t
     , s = n < 0 ? "-" : ""
     , i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)))
     , j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}
;

const ballElements = [];

// 紫色球體冒泡泡
function addpuppleBall(initValue, maxValue, tag) {
   ballElements.push({
       borderWidth: 10,
       initialProgress: initValue,
       maxProgress: maxValue,
       borderColor: "#dadada",
       backgroundColor: "#dadada",
       showBubbles: !0,
       dropShadow: !1,
       fontSize: 24,
       progressFormatter: i=>i.numberFormat(0, '.', ','),
       fluidConfiguration: {
           color: "#800080"
       },
       ballName: tag
   });
}

// 藍色
function addblueBall(initValue, maxValue, tag) {
   ballElements.push({
       borderWidth: 10,
       borderColor: "#567656",
       initialProgress: initValue,
       maxProgress: maxValue,
       fontSize: 24,
       backgroundColor: "#2d3d2d",
       textColor: "#80cd32",
       fontFamily: "Creepster",
       progressFormatter: i=>i.numberFormat(0, '.', ','),
       fluidConfiguration: {
           color: "#adff2f",
           horizontalSpeed: p.FAST,
           waveSpeed: p.FAST
       },
       ballName: tag
   });
}

// 綠色
function addgreenBall(initValue, maxValue, tag) {
   ballElements.push({
       borderWidth: 10,
       initialProgress: initValue,
       maxProgress: maxValue,
       borderColor: "#2a2a2a",
       backgroundColor: "#270100",
       showBubbles: !1,
       fontSize: 24,
       progressFormatter: i=>i.numberFormat(0, '.', ','),
       fluidConfiguration: {
           color: "#ff4500",
           horizontalSpeed: p.SLOW,
           waveSpeed: p.SLOW
       },
       ballName: tag
   });
}

// 棕色
function addbrownBall(initValue, maxValue, tag) {
   ballElements.push({
       borderWidth: 10,
       initialProgress: initValue,
       maxProgress: maxValue,
       backgroundColor: "#002d59",
       borderColor: "#3e4954",
       bubbleColor: "#6bcfff",
       fontFamily: "Codystar",
       fontSize: 24,
       progressFormatter: i=>i.numberFormat(0, '.', ','),
       fluidConfiguration: {
           color: "#1e90ff"
       },
       ballName: tag
   });
}

// 淡藍色
function addlightblueBall(initValue, maxValue, tag) {
   ballElements.push({
       borderWidth: 10,
       initialProgress: initValue,
       maxProgress: maxValue,
       use3D: !1,
       fontFamily: "Shizuru",
       backgroundColor: "#002d59",
       borderColor: "#3e4954",
       bubbleColor: "#6bcfff",
       fontSize: 24,
       progressFormatter: i=>i.numberFormat(0, '.', ','),
       fluidConfiguration: {
           color: "#1e90ff",
           horizontalSpeed: p.FAST,
           waveSpeed: p.FAST
       },
       ballName: tag
   });
}

// 不知名色
function addxBall(initValue, maxValue, tag) {
   ballElements.push({
       borderWidth: 22,
       initialProgress: initValue,
       maxProgress: maxValue,
       padding: 0,
       backgroundColor: "#208000",
       borderColor: "#800060",
       showProgress: !1,
       showBubbles: !1,
       dropShadow: !1,
       use3D: !1,
       fluidConfiguration: {
           color: "#f8f8ff"
       },
       ballName: tag
   });
}

function addBall(name, subTotal, total, ballName) {
   name = name.toLowerCase();
   let fc = "add" + name + "Ball";
   if (!subTotal)
       subTotal = 0;
   if (!total)
       total = 0;
   eval(fc)(subTotal, total, ballName);
}

