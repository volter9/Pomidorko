/** 
 * Likely v0.94 by Ilya Birman
 * Based on Social Likes v3.0.14 - Licensed MIT
 * Ported by volter9 to vanilla JS (without dependencies)
 * 
 * @author Ilya Birman - http://ilyabirman.net/projects/likely/
 * @author Artem Sapegin - http://sapegin.github.com/social-likes/
 * @author volter9
 */
!function t(e,i,n){function o(s,c){if(!i[s]){if(!e[s]){var a="function"==typeof require&&require
if(!c&&a)return a(s,!0)
if(r)return r(s,!0)
var u=new Error("Cannot find module '"+s+"'")
throw u.code="MODULE_NOT_FOUND",u}var h=i[s]={exports:{}}
e[s][0].call(h.exports,function(t){var i=e[s][1][t]
return o(i?i:t)},h,h.exports,t,e,i,n)}return i[s].exports}for(var r="function"==typeof require&&require,s=0;s<n.length;s++)o(n[s])
return o}({1:[function(t,e,i){function n(t,e){this.widget=t,this.options=c.merge(e),this.init()}var o=t("./promises"),r=t("./services"),s=t("./config"),c=t("./utils"),a='<span class="{className}">{content}</span>',u='<a href="{href}"></a>',h="left={left},top={top},width={width},height={height},personalbar=0,toolbar=0,scrollbars=1,resizable=1"
n.prototype={init:function(){this.detectService(),this.detectParams(),this.initHtml(),setTimeout(this.initCounter.bind(this),0)},update:function(t){var e=this.widget.querySelectorAll("."+s.prefix+"counter")
c.extend(this.options,c.merge({forceUpdate:!1},t)),c.toArray(e).forEach(function(t){t.parentNode.removeChild(t)}),this.initCounter()},detectService:function(){var t=this.widget.dataset.service
if(!t){for(var e=this.widget.className.split(" "),i=0;i<e.length;i++)if(e[i]in r){t=e[i]
break}if(!t)return}this.service=t,c.extend(this.options,r[t])},detectParams:function(){var t=this.widget.dataset
if(t.counter){var e=parseInt(t.counter,10)
isNaN(e)?this.options.counterUrl=t.counter:this.options.counterNumber=e}t.title&&(this.options.title=t.title),t.url&&(this.options.url=t.url)},initHtml:function(){var t=this.options,e=this.widget,i=e.innerHTML
if(t.clickUrl){var n=c.makeUrl(t.clickUrl,{url:t.url,title:t.title}),o=c.createNode(c.template(u,{href:n}))
this.cloneDataAttrs(e,o),e.parentNode.replaceChild(o,e),this.widget=e=o}else e.addEventListener("click",this.click.bind(this))
e.classList.remove(this.service),e.className+=" "+this.getElementClassNames("widget")
var r={className:this.getElementClassNames("button"),content:i},s={className:this.getElementClassNames("icon"),content:c.wrapSVG(t.svgi)}
e.innerHTML=c.template(a,s)+c.template(a,r)},initCounter:function(){this.options.counters&&this.options.counterNumber?this.updateCounter(this.options.counterNumber):o.fetch(this.service,this.options.url,{counterUrl:this.options.counterUrl,forceUpdate:this.options.forceUpdate}).always(this.updateCounter.bind(this))},cloneDataAttrs:function(t,e){var i=t.dataset
for(var n in i)i.hasOwnProperty(n)&&(e.dataset[n]=i[n])},getElementClassNames:function(t){return c.likelyClass(t,this.service)},updateCounter:function(t){t=parseInt(t,10)||0
var e={className:this.getElementClassNames("counter"),content:t}
t||this.options.zeroes||(e.className+=" "+s.prefix+"counter_empty",e.content=""),this.widget.appendChild(c.createNode(c.template(a,e)))},click:function(t){var e=this.options,i="function"==typeof e.click?e.click.call(this,t):!0
if(i){var n=c.makeUrl(e.popupUrl,{url:e.url,title:e.title})
this.openPopup(this.addAdditionalParamsToUrl(n),{width:e.popupWidth,height:e.popupHeight})}return!1},addAdditionalParamsToUrl:function(t){var e=c.query(c.merge(this.widget.dataset,this.options.data)),i=-1===t.indexOf("?")?"?":"&"
return""===e?t:t+i+e},openPopup:function(t,e){var i=Math.round(screen.width/2-e.width/2),n=0
screen.height>e.height&&(n=Math.round(screen.height/3-e.height/2))
var o=window.open(t,"sl_"+this.service,c.template(h,{height:e.height,width:e.width,left:i,top:n}))
if(o){var r=function(){o.closed&&clearInterval(s)}
o.focus()
var s=setInterval(r.bind(this),this.options.popupCheckInterval)}else location.href=t}},e.exports=n},{"./config":2,"./promises":6,"./services":7,"./utils":9}],2:[function(t,e,i){e.exports={name:"likely",prefix:"likely__",secure:"https:"===window.location.protocol,protocol:"https:"===window.location.protocol?"https:":"http:"}},{}],3:[function(t,e,i){var n=function(t){t.on=function(t,e){this._events||(this._events={}),this._events[t]||(this._events[t]=[]),this._events[t].push(e)},t.emit=function(t){if(this._events&&this._events[t]){var e=Array.prototype.slice.call(arguments).slice(1)
this._events[t].forEach(function(t){t&&t.apply(t,e)})}}}
e.exports=n},{}],4:[function(t,e,i){"use strict"
var n=t("./widget"),o=t("./config"),r=t("./utils")
window.socialLikes=function(t,e){e=e||{}
var i=t[o.name]
i?i.update(e):t[o.name]=new n(t,r.merge({},socialLikes.defaults,e,r.bools(t)))},window.socialLikes.defaults={popupCheckInterval:150,counters:!0,timeout:1e3,zeroes:!1,title:document.title,wait:500,url:window.location.href.replace(window.location.hash,"")},window.addEventListener("load",function(){var t=document.querySelectorAll("."+o.name)
r.toArray(t).forEach(function(t){socialLikes(t)})})},{"./config":2,"./utils":9,"./widget":10}],5:[function(t,e,i){var n=t("./events"),o=function(){}
o.prototype={always:function(t){this.on("rejected",t),this.on("accepted",t)},fail:function(t){this.on("rejected",t)},done:function(t){this.on("accepted",t)},reject:function(){this.emit("rejected")},resolve:function(t){this.emit("accepted",t)}},n(o.prototype),o.make=function(){return new o},e.exports=o},{"./events":3}],6:[function(t,e,i){var n=t("./services"),o=t("./promise"),r=t("./utils"),s={promises:{},fetch:function(t,e,i){this.promises[t]||(this.promises[t]={})
var s=this.promises[t]
if(!i.forceUpdate&&s[e])return s[e]
var c=r.merge(n[t],i),a=o.make(),u=c.counterUrl&&r.makeUrl(c.counterUrl,{url:e})
return u&&"function"==typeof c.counter?c.counter(u,a,e):c.counterUrl?r.getJSON(u,function(t){try{var e=t
"function"==typeof c.convertNumber&&(e=c.convertNumber(t)),a.resolve(e)}catch(i){a.reject()}}):a.reject(),s[e]=a}}
e.exports=s},{"./promise":5,"./services":7,"./utils":9}],7:[function(t,e,i){var n=t("./config"),o=t("./utils"),r=t("./svg"),s={facebook:{counterUrl:"https://graph.facebook.com/fql?q=SELECT+total_count+FROM+link_stat+WHERE+url%3D%22{url}%22&callback=?",convertNumber:function(t){return t.data[0].total_count},popupUrl:"https://www.facebook.com/sharer/sharer.php?u={url}",popupWidth:600,popupHeight:500},twitter:{counterUrl:"https://cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?",convertNumber:function(t){return t.count},popupUrl:"https://twitter.com/intent/tweet?url={url}&text={title}",popupWidth:600,popupHeight:450,click:function(){return/[\.\?:\-–—]\s*$/.test(this.options.title)||(this.options.title+=":"),!0}},vkontakte:{counterUrl:"https://vk.com/share.php?act=count&url={url}&index={index}",counter:function(t,e,i){var n=s.vkontakte
n._||(n._=[],window.VK=window.VK||{},window.VK.Share={},window.VK.Share.count=function(t,e){n._[t].resolve(e)})
var r=n._.length
n._.push(e),o.getScript(o.makeUrl(t,{index:r}))},popupUrl:n.protocol+"//vk.com/share.php?url={url}&title={title}",popupWidth:550,popupHeight:330},gplus:{counterUrl:n.secure?void 0:"http://share.yandex.ru/gpp.xml?url={url}",counter:function(t,e,i){var n=s.gplus
n._||(n._={},window.services||(window.services={}),window.services.gplus={},window.services.gplus.cb=function(t){"string"==typeof t&&(t=t.replace(/\D/g,"")),n._[o.getStackURL()].resolve(parseInt(t,10))}),n._[i]=e,o.getScript(o.makeUrl(t))},popupUrl:"https://plus.google.com/share?url={url}",popupWidth:700,popupHeight:500},pinterest:{counterUrl:n.protocol+"//api.pinterest.com/v1/urls/count.json?url={url}&callback=?",convertNumber:function(t){return t.count},popupUrl:n.protocol+"//pinterest.com/pin/create/button/?url={url}&description={title}",popupWidth:630,popupHeight:270},odnoklassniki:{counterUrl:n.secure?void 0:"http://connect.ok.ru/dk?st.cmd=extLike&ref={url}&uid={index}",counter:function(t,e){var i=s.odnoklassniki
i._||(i._=[],window.ODKL=window.ODKL||{},window.ODKL.updateCount=function(t,e){i._[t].resolve(e)})
var n=i._.length
i._.push(e),o.getScript(o.makeUrl(t,{index:n}))},popupUrl:"http://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl={url}",popupWidth:640,popupHeight:400}}
for(var c in s)s[c].svgi=r[c]
e.exports=s},{"./config":2,"./svg":8,"./utils":9}],8:[function(t,e,i){e.exports={facebook:"13 0H3C1 0 0 1 0 3v10c0 2 1 3 3 3h5V9H6V7h2V5c0-2 2-2 2-2h3v2h-3v2h3l-.5 2H10v7h3c2 0 3-1 3-3V3c0-2-1-3-3-3",twitter:"15.96 3.42c-.04.153-.144.31-.237.414l-.118.058v.118l-.59.532-.237.295c-.05.036-.398.21-.413.237V6.49h-.06v.473h-.058v.294h-.058v.296h-.06v.235h-.06v.237h-.058c-.1.355-.197.71-.295 1.064h-.06v.116h-.06c-.02.1-.04.197-.058.296h-.06c-.04.118-.08.237-.118.355h-.06c-.038.118-.078.236-.117.353l-.118.06-.06.235-.117.06v.116l-.118.06v.12h-.06c-.02.057-.038.117-.058.175l-.118.06v.117c-.06.04-.118.08-.177.118v.118l-.237.177v.118l-.59.53-.532.592h-.117c-.06.078-.118.156-.177.236l-.177.06-.06.117h-.118l-.06.118-.176.06v.058h-.118l-.06.118-.353.12-.06.117c-.078.02-.156.04-.235.058v.06c-.118.038-.236.078-.354.118v.058H8.76v.06h-.12v.06h-.176v.058h-.118v.06H8.17v.058H7.99v.06l-.413.058v.06h-.237c-.667.22-1.455.293-2.36.293h-.886v-.058h-.53v-.06H3.27v-.06h-.295v-.06H2.68v-.057h-.177v-.06h-.236v-.058H2.09v-.06h-.177v-.058h-.177v-.06H1.56v-.058h-.12v-.06l-.294-.06v-.057c-.118-.04-.236-.08-.355-.118v-.06H.674v-.058H.555v-.06H.437v-.058H.32l-.06-.12H.142v-.058c-.13-.08-.083.026-.177-.118H1.56v-.06c.294-.04.59-.077.884-.117v-.06h.177v-.058h.237v-.06h.118v-.06h.177v-.057h.118v-.06h.177v-.058l.236-.06v-.058l.236-.06c.02-.038.04-.078.058-.117l.237-.06c.02-.04.04-.077.058-.117h.118l.06-.118h.118c.036-.025.047-.078.118-.118V12.1c-1.02-.08-1.84-.54-2.303-1.183-.08-.058-.157-.118-.236-.176v-.117l-.118-.06v-.117c-.115-.202-.268-.355-.296-.65.453.004.987.008 1.354-.06v-.06c-.254-.008-.47-.08-.65-.175v-.058H2.32v-.06c-.08-.02-.157-.04-.236-.058l-.06-.118h-.117l-.118-.178h-.12c-.077-.098-.156-.196-.235-.294l-.118-.06v-.117l-.177-.12c-.35-.502-.6-1.15-.59-2.006h.06c.204.234.948.377 1.357.415v-.06c-.257-.118-.676-.54-.827-.768V5.9l-.118-.06c-.04-.117-.08-.236-.118-.354h-.06v-.118H.787c-.04-.196-.08-.394-.118-.59-.06-.19-.206-.697-.118-1.005h.06V3.36h.058v-.177h.06v-.177h.057V2.83h.06c.04-.118.078-.236.117-.355h.118v.06c.12.097.237.196.355.295v.118l.118.058c.08.098.157.197.236.295l.176.06.354.413h.118l.177.236h.118l.06.117h.117c.04.06.08.118.118.177h.118l.06.118.235.06.06.117.356.12.06.117.53.176v.06h.118v.058l.236.06v.06c.118.02.236.04.355.058v.06h.177v.058h.177v.06h.176v.058h.236v.06l.472.057v.06l1.417.18v-.237c-.1-.112-.058-.442-.057-.65 0-.573.15-.99.354-1.358v-.117l.118-.06.06-.235.176-.118v-.118c.14-.118.276-.236.414-.355l.06-.117h.117l.12-.177.235-.06.06-.117h.117v-.058H9.7v-.058h.177v-.06h.177v-.058h.177v-.06h.296v-.058h1.063v.058h.294v.06h.177v.058h.178v.06h.177v.058h.118v.06h.118l.06.117c.08.018.158.038.236.058.04.06.08.118.118.177h.118l.06.117c.142.133.193.163.472.178.136-.12.283-.05.472-.118v-.06h.177v-.058h.177v-.06l.236-.058v-.06h.177l.59-.352v.176h-.058l-.06.295h-.058v.117h-.06v.118l-.117.06v.118l-.177.118v.117l-.118.06-.354.412h-.117l-.177.236h.06c.13-.112.402-.053.59-.117l1.063-.353",vkontakte:"13 0H3C1 0 0 1 0 3v10c0 2 1 3 3 3h10c2 0 3-1 3-3V3c0-2-1-3-3-3zm.452 11.394l-1.603.022s-.345.068-.8-.243c-.598-.41-1.164-1.48-1.604-1.342-.446.144-.432 1.106-.432 1.106s.003.206-.1.315c-.11.12-.326.144-.326.144H7.87s-1.582.095-2.975-1.356c-1.52-1.583-2.862-4.723-2.862-4.723s-.078-.206.006-.305c.094-.112.35-.12.35-.12l1.716-.01s.162.026.277.11c.095.07.15.202.15.202s.276.7.643 1.335c.716 1.238 1.05 1.508 1.293 1.376.353-.193.247-1.75.247-1.75s.006-.565-.178-.817c-.145-.194-.415-.25-.534-.267-.096-.014.062-.238.267-.338.31-.15.853-.16 1.497-.153.502.004.646.035.842.083.59.143.39.694.39 2.016 0 .422-.075 1.018.23 1.215.13.085.453.013 1.256-1.352.38-.647.666-1.407.666-1.407s.062-.136.16-.194c.098-.06.232-.04.232-.04l1.804-.012s.542-.065.63.18c.092.257-.203.857-.94 1.84-1.21 1.612-1.345 1.46-.34 2.394.96.89 1.16 1.325 1.192 1.38.4.66-.44.71-.44.71",gplus:'16 7h-2V5h-1v2h-2v1h2v2h1V8h2z"/><path d="M5.334 16c-1.47-.012-2.593-.337-3.335-.968C1.24 14.44.853 13.71.853 12.86c0-.41.125-.87.37-1.363.242-.502.68-.947 1.302-1.315.676-.39 1.4-.654 2.152-.786.55-.08 1.014-.133 1.41-.16-.062-.102-.12-.206-.174-.31-.148-.236-.227-.534-.227-.878 0-.21.03-.385.093-.537l.002-.005c-.11.007-.217.01-.32.01-1.15-.015-2.04-.387-2.65-1.107-.625-.655-.945-1.44-.945-2.326 0-1.06.45-2.034 1.334-2.893C3.814.68 4.455.347 5.11.192 5.733.063 6.334 0 6.895 0H11.8L9.82 1.16l-.75.02c.16.172.31.366.456.597.145.228.278.504.394.82.1.327.148.704.148 1.124-.013.78-.19 1.414-.523 1.886-.16.222-.326.424-.503.612-.196.193-.4.374-.614.563-.096.104-.2.235-.295.38-.1.14-.145.283-.145.456 0 .156.043.282.127.374.11.14.206.247.3.343l.674.552c.44.362.83.765 1.163 1.204.334.47.508 1.084.522 1.824 0 1.056-.465 2-1.383 2.806-.94.824-2.305 1.254-4.054 1.28h-.004zm1.168-5.782c-.135 0-.36.015-.672.046-.4.056-.822.152-1.246.282-.09.033-.23.09-.41.17-.17.076-.346.188-.522.334-.16.143-.302.33-.42.55-.132.23-.196.5-.196.83 0 .645.286 1.167.875 1.592.574.433 1.38.66 2.397.673.898-.014 1.588-.21 2.05-.586.44-.365.652-.82.652-1.39 0-.46-.152-.864-.45-1.205-.336-.345-.887-.786-1.63-1.307l-.428.01zM5.636 1.13c-.485.015-.878.206-1.2.587-.273.403-.403.854-.39 1.366 0 .703.21 1.444.618 2.205.193.345.444.64.747.875.29.227.623.343.992.343.472-.02.858-.187 1.175-.512.132-.204.23-.445.27-.68.027-.246.042-.47.042-.648 0-.767-.2-1.552-.593-2.334-.177-.36-.41-.656-.695-.88-.275-.197-.6-.307-.966-.32',pinterest:"7.99 0c-4.417 0-8 3.582-8 8 0 3.39 2.11 6.284 5.086 7.45-.07-.633-.133-1.604.028-2.295.145-.624.938-3.977.938-3.977s-.24-.48-.24-1.188c0-1.112.645-1.943 1.448-1.943.683 0 1.012.512 1.012 1.127 0 .686-.437 1.713-.663 2.664-.19.796.398 1.446 1.184 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.255-3.343-3.255-2.276 0-3.612 1.707-3.612 3.472 0 .688.265 1.425.595 1.826.065.08.075.15.055.23-.06.252-.195.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.835-4.84 5.287-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.74 4.976-4.152 4.976-.81 0-1.573-.42-1.834-.92l-.498 1.903c-.18.695-.668 1.566-.994 2.097.75.232 1.544.357 2.37.357 4.417 0 8-3.582 8-8s-3.583-8-8-8",odnoklassniki:"8 6.107c.888 0 1.607-.72 1.607-1.607 0-.888-.72-1.607-1.607-1.607s-1.607.72-1.607 1.607c0 .888.72 1.607 1.607 1.607zM13 0H3C1 0 0 1 0 3v10c0 2 1 3 3 3h10c2 0 3-1 3-3V3c0-2-1-3-3-3zM8 .75c2.07 0 3.75 1.68 3.75 3.75 0 2.07-1.68 3.75-3.75 3.75S4.25 6.57 4.25 4.5C4.25 2.43 5.93.75 8 .75zm3.826 12.634c.42.42.42 1.097 0 1.515-.21.208-.483.313-.758.313-.274 0-.548-.105-.758-.314L8 12.59 5.69 14.9c-.42.418-1.098.418-1.516 0s-.42-1.098 0-1.516L6.357 11.2c-1.303-.386-2.288-1.073-2.337-1.11-.473-.354-.57-1.025-.214-1.5.354-.47 1.022-.567 1.496-.216.03.022 1.4.946 2.698.946 1.31 0 2.682-.934 2.693-.943.474-.355 1.146-.258 1.5.213.355.474.26 1.146-.214 1.5-.05.036-1.035.723-2.338 1.11l2.184 2.184"}},{}],9:[function(t,e,i){function n(t){return Array.prototype.slice.call(t)}function o(){for(var t={},e=0;e<arguments.length;e++){var i=arguments[e]
if(i)for(var n in i)t[n]=i[n]}return t}function r(t,e){for(var i in e)t[i]=e[i]}function s(t){var e={},i=t.dataset
for(var n in i){var o=i[n]
e[n]=w[o]||o}return e}function c(t,e){return t.replace(/\{([^\}]+)\}/g,function(t,i){return i in e?e[i]:t})}function a(t,e){for(var i in e)e[i]=encodeURIComponent(e[i])
return c(t,e)}function u(t,e){var i=m.prefix+t
return i+" "+i+"_"+e}function h(t){return'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M'+t+'z"/></svg>'}function l(t){return g.innerHTML=t,g.children[0]}function p(t){var e=document.createElement("script")
e.type="text/javascript",e.src=t,document.head.appendChild(e),document.head.removeChild(e)}function v(t,e){var i="random_func_"+Date.now()
t=t.replace(/callback=(\?)/,"callback="+encodeURIComponent(i)),window[i]=function(t){e(t)},p(t)}function d(t){var e=encodeURIComponent,i=[]
for(var n in t)"object"!=typeof t[n]&&i.push(e(n)+"="+e(t[n]))
return i.join("&")}function f(){try{throw new Error}catch(t){var e=t.stack,i=""
return i=0===t.stack.search(/^Error:/i)?e.split("at").pop():e.split("\n").pop().split("@")[1].replace(/:\d+:\d+$/,""),decodeURIComponent(i.match(/url=[^&]+/)[0].split("=")[1])}}var m=t("./config"),w={yes:!0,no:!1},g=document.createElement("div"),k=function(t,e){for(var i in t)t.hasOwnProperty(i)&&e(t[i],i)}
e.exports={likelyClass:u,getStackURL:f,createNode:l,template:c,makeUrl:a,toArray:n,wrapSVG:h,extend:r,merge:o,bools:s,query:d,each:k,getScript:p,getJSON:v}},{"./config":2}],10:[function(t,e,i){function n(t,e){this.container=t,this.options=e,this.init()}var o=t("./button"),r=t("./services"),s=t("./config"),c=t("./utils")
n.prototype={init:function(){this.container.classList.add(s.name),this.initUserButtons(),this.countersLeft=0,this.buttons=[],this.number=0,c.toArray(this.container.children).forEach(this.addButton.bind(this)),this.options.counters?(this.timer=setTimeout(this.appear.bind(this),this.options.wait),this.timeout=setTimeout(this.ready.bind(this),this.options.timeout)):this.appear()},addButton:function(t){var e=new o(t,this.options)
this.buttons.push(e),e.options.counterUrl&&this.countersLeft++},initUserButtons:function(){!this.userButtonInited&&window.socialLikesButtons&&c.extend(r,socialLikesButtons),this.userButtonInited=!0},update:function(t){(t.forceUpdate||this.options.url!==t.url)&&(this.countersLeft=this.buttons.length,this.number=0,this.buttons.forEach(function(e){e.update(t)}))},updateCounter:function(t,e,i){i&&(this.number+=i,this.countersLeft--,0===this.countersLeft&&(this.appear(),this.ready()))},appear:function(){this.container.classList.add(s.name+"_visible")},ready:function(){this.timeout&&(clearTimeout(this.timeout),this.container.classList.add(s.name+"_ready"))}},e.exports=n},{"./button":1,"./config":2,"./services":7,"./utils":9}]},{},[4])
