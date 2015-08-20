!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t()
else if("function"==typeof define&&define.amd)define([],t)
else{var e
e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.App=t()}}(function(){return function t(e,i,n){function s(o,a){if(!i[o]){if(!e[o]){var h="function"==typeof require&&require
if(!a&&h)return h(o,!0)
if(r)return r(o,!0)
var u=new Error("Cannot find module '"+o+"'")
throw u.code="MODULE_NOT_FOUND",u}var c=i[o]={exports:{}}
e[o][0].call(c.exports,function(t){var i=e[o][1][t]
return s(i?i:t)},c,c.exports,t,e,i,n)}return i[o].exports}for(var r="function"==typeof require&&require,o=0;o<n.length;o++)s(n[o])
return s}({1:[function(t,e,i){var n=t("./models/settings"),s=t("./ls"),r=t("./models/goals"),o=t("./views/app")
config=t("./version")
var a=function(t){this.resetIfNeeded(),this.settings=n.get(),this.goals=r.get(),this.view=new o(t,{settings:this.settings,goals:this.goals}),this.initialize(this.settings,this.goals)}
a.prototype.resetIfNeeded=function(){var t=s.storage
if(t&&t.goals&&t.goals.start){var e=new Date(t.goals.start),i=new Date
e.getDate()!==i.getDate()&&i.getHours()>=6&&(delete t.goals,s.persist())}},a.prototype.initialize=function(t,e){e.emit("change"),t.emit("change"),e.on("change",function(){s.save(e)}),t.on("change",function(){s.save(t)})},e.exports={initiate:function(t){this.instance=new a(t)}}},{"./ls":6,"./models/goals":8,"./models/settings":9,"./version":15,"./views/app":17}],2:[function(t,e,i){var n=t("./utils")
e.exports=function(t){t.on=function(t,e){this._events||(this._events={}),this._events[t]||(this._events[t]=[]),this._events[t].push(e)},t.emit=function(t){if(this._events&&this._events[t]){var e=n.toArray(arguments).slice(1)
this._events[t].forEach(function(t){t&&t.apply(t,e)})}}}},{"./utils":5}],3:[function(t,e,i){var n=function(t,e,i){return t=Math.min(i,t),Math.max(e,t)},s=function(t,e){return Math.round(Math.random()*(e-t)+t)}
e.exports={clamp:n,random:s}},{}],4:[function(t,e,i){var n=function(t){return t=t||(t=0),function(){return++t}}
e.exports=n},{}],5:[function(t,e,i){var n=function(t,e){for(var i in t)t.hasOwnProperty(i)&&e(t[i],i)},s=function(t,e){var i={}
for(var n in e)("undefined"==typeof t[n]||e[n]!==t[n])&&(i[n]=e[n]||t[n])
return i},r=function(t){var e={}
return a(e,t)},o=function(t,e){var i,n={}
for(i in t)n[i]=t[i]
for(i in e)n[i]=e[i]
return n},a=function(t,e){for(var i in e)t[i]=e[i]},h=function(t){return Array.prototype.slice.call(t)},u=function(t,e){var i={}
return e.forEach(function(e){t[e]&&(i[e]=t[e])}),i}
e.exports={toArray:h,extend:a,clone:r,merge:o,diff:s,each:n,pick:u}},{}],6:[function(t,e,i){var n=t("./mvc/mappers/ls"),s=t("./version")
e.exports=new n({key:s.key})},{"./mvc/mappers/ls":11,"./version":15}],7:[function(t,e,i){var n=t("../ls"),s=t("../version")
e.exports=function(t,e,i){return i=i||s.defaults[e],{get:function(){var i=new t
return n.fetch(e,i),i.isNew()&&(i=this.bootstrap(n)),i},bootstrap:function(t){var e=this.blank()
return t.insert(e),e},blank:function(){return new t(i)}}}},{"../ls":6,"../version":15}],8:[function(t,e,i){var n=t("../mvc/model"),s=t("./factory")
e.exports=s(n,"goals")},{"../mvc/model":12,"./factory":7}],9:[function(t,e,i){var n=t("../mvc/model"),s=(t("../ls"),t("../helpers/math")),r=t("./factory"),o=n.extend({filter:function(t){t.time=s.clamp(t.time,5,55),t.shortBreak=s.clamp(t.shortBreak,3,10),t.longBreak=s.clamp(t.longBreak,5,45),t.total=s.clamp(t.total,1,1/0),t.round=s.clamp(t.round,1,t.total)}})
e.exports=r(o,"settings")},{"../helpers/math":3,"../ls":6,"../mvc/model":12,"./factory":7}],10:[function(t,e,i){var n=t("../helpers/utils"),s=function(t){return function(e){var i=function(){t.apply(this,n.toArray(arguments))}
return i.prototype=Object.create(t.prototype),n.each(e,function(t,e){i.prototype[e]=t}),i}}
e.exports=s},{"../helpers/utils":5}],11:[function(t,e,i){var n=t("../../helpers/events"),s=t("../../helpers/utils"),r=t("../model"),o={model:r},a=function(t){var e=this,i=window.localStorage
this.options=s.merge(o,t),this.storage=JSON.parse(i.getItem(t.key))||{},this.on("change",function(){e.persist()})}
n(a.prototype),a.prototype.persist=function(){var t=window.localStorage
t.setItem(this.options.key,JSON.stringify(this.storage))},a.prototype.parse=function(t){return t},a.prototype.create=function(t,e){return e?(e.merge(t),e):new this.options.model(t)},a.prototype.fetch=function(t,e,i){this.storage[t]&&(e.merge(this.storage[t]),e.id=t,i&&i())},a.prototype.insert=function(t,e){this.storage[t.id]=t.all(),e&&e(),this.emit("change")},a.prototype.update=function(t,e){this.insert(t,e)},a.prototype.save=function(t,e){t.isNew()?this.insert(t,e):this.update(t,e)},a.prototype.remove=function(t,e){delete this.storage[t.id],t.destroy(),e&&e(),this.emit("change")},e.exports=a},{"../../helpers/events":2,"../../helpers/utils":5,"../model":12}],12:[function(t,e,i){var n=t("../helpers/events"),s=t("../helpers/utils"),r=t("../helpers/unique")(),o=t("./extend"),a=function(t){var e=t&&t.id?t.id:-r()
t&&t.id&&delete t.id,t=s.merge(this.data||{},t||{}),this.previous=s.merge({},t),this.data=t,this.id=e}
n(a.prototype),a.prototype.filter=function(t){},a.prototype.get=function(t){return"undefined"!=typeof this.data[t]?this.data[t]:!1},a.prototype.set=function(t,e){this.data[t]=e,this.filter(this.data),this.emit("change")},a.prototype.clear=function(){this.previous=s.merge({},this.data)},a.prototype.revert=function(){this.data=s.merge({},this.previous),this.emit("change")},a.prototype.all=function(){return s.merge(this.data,{})},a.prototype.diff=function(){return s.diff(this.previous,this.data)},a.prototype.destroy=function(){this.data={},this.id=-r(),this.emit("destroy")},a.prototype.reset=function(t){this.data=t,this.filter(this.data),this.emit("change")},a.prototype.merge=function(t){t.id&&(this.id=t.id,delete t.id),this.data=s.merge(this.data,t),this.filter(this.data),this.emit("change")},a.prototype.isNew=function(){return this.id<0},a.prototype.isDirty=function(){return Object.keys(this.diff()).length>0},a.prototype.isEmpty=function(){return 0===Object.keys(this.data).length},a.extend=o(a),e.exports=a},{"../helpers/events":2,"../helpers/unique":4,"../helpers/utils":5,"./extend":10}],13:[function(t,e,i){var n=t("./extend"),s=function(t,e){this.node=t,this.data=e,this.initialize()}
s.prototype.initialize=function(){},s.prototype.render=function(){},s.prototype.find=function(t){var e=this.node.querySelector(t)
return e||console.warn('Could not find node by selector "'+t+'"'),e},s.prototype.bind=function(t,e,i){var n=t instanceof Node?t:this.find(t)
n?n.addEventListener(e,i.bind(this)):console.warn("Node is not suitable for attaching events!")},s.extend=n(s),e.exports=s},{"./extend":10}],14:[function(t,e,i){var n=t("./helpers/events"),s=function(t){this.startTime=null,this.endTime=null,this.remained=null,this.timer=null,this.view=t}
n(s.prototype),s.prototype.start=function(t){this.timer||(t=this.remained?this.remained:1e3*t,this.startTime=Date.now(),this.endTime=this.startTime+t,this.timer=setInterval(this.tick.bind(this),80),this.emit("start"))},s.prototype.tick=function(){var t=this.endTime-Date.now()
return 0>t?(this.view.render(0),this.stop()):void this.view.render(t/1e3)},s.prototype.pause=function(){clearInterval(this.timer),this.timer=null,this.remained=this.endTime-Date.now(),this.startTime=this.endTime=null},s.prototype.stop=function(){this.remained=this.endTime=this.startTime=null,clearInterval(this.timer),this.timer=null,this.emit("stop")},s.prototype.isRunning=function(){return Boolean(this.timer)},s.prototype.getRemained=function(){return this.remained?this.remained:this.endTime-Date.now()},s.prototype.isTimeRemained=function(){return null!==this.remained},e.exports=s},{"./helpers/events":2}],15:[function(t,e,i){var n="0.1.0"
e.exports={version:n,key:"pomidorka",defaults:{settings:{id:"settings",shortBreak:5,longBreak:20,time:25,version:n,round:4,total:12},goals:{id:"goals",remained:!1,current:0,recess:!1,start:Date.now()}}}},{}],16:[function(t,e,i){var n=t("../mvc/view"),s=n.extend({initialize:function(){this.bind(".pa-close","click",this.toggle),this.data.button.addEventListener("click",this.toggle.bind(this))},toggle:function(){var t=this.node.classList.contains("hidden")
this.node.classList.toggle("hidden"),this.node.classList.toggle("pa-about-appear",t),this.node.classList.toggle("pa-about-disappear",!t)}})
e.exports=s},{"../mvc/view":13}],17:[function(t,e,i){var n=t("./settings"),s=t("./goals"),r=t("./about"),o=t("./timer"),a=t("../mvc/view"),h=t("../helpers/utils")
e.exports=a.extend({initialize:function(){this.setupViews(),this.setupEvents(),this.update()},setupEvents:function(){var t=this,e=this.node,i=this.data.goals,n=this.timer.timer,s=new Audio("assets/bell.mp3")
window.addEventListener("keypress",function(e){var i="number"==typeof e.which?e.which:e.keyCode
32===i&&(e.preventDefault(),t.timer.button())}),window.addEventListener("beforeunload",function(){var e=t.timer.timer.getRemained()
e&&e>=0&&i.set("remained",e)}),i.on("change",function(){e.classList.toggle("resting",i.get("recess"))}),n.on("stop",function(){s.play()}),n.on("start",this.update.bind(this))},setupViews:function(){this.timer=new o(this.find(".pa-timer"),h.merge(this.data,{recess:this.find(".pa-skip span")})),this.goals=new s(this.find(".pa-goals"),this.data),this.about=new r(this.find(".pa-about"),{button:this.find(".pa-about-button")}),this.settings=new n(this.find(".pa-settings"),{settings:this.data.settings,button:this.find(".pa-settings-button")})},update:function(){var t=this.data.goals.get("recess")
document.title=(t?"Перерыв":"Работа")+" — помидорковый таймер",document.querySelector("link[rel=icon]").href=t?"assets/img/break.ico":"assets/img/work.ico",document.querySelector(".pa-skip span").innerHTML=t?"Пропустить перерыв":"Пропустить помидорку"}})},{"../helpers/utils":5,"../mvc/view":13,"./about":16,"./goals":18,"./settings":19,"./timer":20}],18:[function(t,e,i){var n=t("../mvc/view"),s=t("../helpers/math"),r=["Так держать!","Отлично!","Супер!","День прожит не зря!","Вау, молодец!","Теперь можно посмотреть любимый сериал","Ого, так много помидорок сегодня еще никто не отрабатывал. Поздравляю!","Горжусь тобой!"],o=function(){return r[s.random(0,r.length-1)]},a=n.extend({initialize:function(){this.data.goals.on("change",this.render.bind(this)),this.data.settings.on("change",this.render.bind(this))},render:function(){var t=this.data.goals,e=this.data.settings,i=t.get("current"),n=(t.get("recess"),this.find(".pa-status")),s=e.get("total")
this.find(".pa-current").innerHTML=i,this.find(".pa-total").innerHTML=s,i>=s&&n.classList.contains("hidden")&&(n.classList.remove("hidden"),n.innerHTML=" &mdash; "+o())}})
e.exports=a},{"../helpers/math":3,"../mvc/view":13}],19:[function(t,e,i){var n=t("../mvc/view"),s=t("./ui-control"),r=t("../helpers/utils"),o=n.extend({initialize:function(){this.data.button.addEventListener("click",this.toggle.bind(this)),this.data.settings.on("change",this.render.bind(this))
var t=this.data.settings,e=this.node.querySelectorAll(".pa-control")
r.toArray(e).forEach(function(e){new s(e,{settings:t})})},toggle:function(){var t=this.node.classList.contains("hidden")
this.node.classList.toggle("hidden"),this.node.classList.toggle("pa-settings-appear",t),this.node.classList.toggle("pa-settings-disappear",!t)},render:function(){var t=this,e=this.data.settings.all()
r.each(e,function(e,i){var n=t.find("input."+i)
n&&(n.value=e)})}})
e.exports=o},{"../helpers/utils":5,"../mvc/view":13,"./ui-control":21}],20:[function(t,e,i){var n=t("../mvc/view"),s=(t("../mvc/model"),t("../timer")),r=t("../helpers/math"),o=function(t,e){return e.substr(t.length)+t},a=n.extend({initialize:function(){this.settings=this.data.settings,this.recess=this.data.recess,this.goals=this.data.goals,this.label=this.find(".pa-timer-time"),this.scale=this.find(".pa-timer-wrapper"),this.timer=new s(this),this.setupEvents(),this.render(this.getTime())},setupEvents:function(){var t=this.settings,e=this.timer,i=this
this.bind(".pa-timer-control","click",this.button),this.timer.on("stop",this.stop.bind(this)),this.recess.addEventListener("click",function(){i.timer.stop()}),t.on("change",function(){e.isTimeRemained()||e.isRunning()||i.render(i.getTime())})},stop:function(){this.toggle(!0),this.render(0)
var t=!this.goals.get("recess"),e=!!t+this.goals.get("current")
this.goals.merge({recess:t,current:e,remained:!1}),this.startOver(e,t)},getTime:function(t,e){var i=this.goals.get("remained")
if(i)return i/1e3
t=t||this.goals.get("current"),e=e||this.goals.get("recess")
var n=e?this.settings.get("shortBreak"):this.settings.get("time")
return e&&t%this.settings.get("round")===0&&(n=this.settings.get("longBreak")),60*n},startOver:function(t,e){this.toggle(!1),this.timer.start(this.getTime(t,e))},render:function(t){var e=Math.floor(t/60),i=Math.floor(t%60+.15)
this.renderTime(e,r.clamp(i,0,59)),this.renderScale(t)},renderScale:function(t){var e=t/60/55,i=3300*e
this.scale.style.marginLeft=-i+"px"},renderTime:function(t,e){this.find(".pa-min").innerHTML=o(t.toString(),"00"),this.find(".pa-sec").innerHTML=o(e.toString(),"00")},button:function(){var t=this.find(".pa-icon").classList.contains("pa-pause")
this.toggle(t),t?this.timer.pause():this.timer.start(this.getTime())},toggle:function(t){var e=this.find(".pa-icon")
e.classList.toggle("pa-pause",!t),e.classList.toggle("pa-play",t),this.find(".pa-timer-control").classList.toggle("pa-play",t)}})
e.exports=a},{"../helpers/math":3,"../mvc/model":12,"../mvc/view":13,"../timer":14}],21:[function(t,e,i){var n=t("../mvc/view"),s=n.extend({initialize:function(){var t=this.data.settings,e=this.find("input")
this.input=e,this.bind(".plus","click",this.add),this.bind(".minus","click",this.sub),this.bind("input","change",function(){var i=parseInt(e.value)
t.set(e.className,isNaN(i)?0:Math.round(i))})},add:function(t){this.perform(t,1)},sub:function(t){this.perform(t,-1)},perform:function(t,e){t.preventDefault()
var i=parseInt(this.input.value)+e,t=document.createEvent("HTMLEvents")
t.initEvent("change",null,!1),this.input.value=isNaN(i)?0:i,this.input.dispatchEvent(t)}})
e.exports=s},{"../mvc/view":13}]},{},[1])(1)})