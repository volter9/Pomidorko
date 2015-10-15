!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t()
else if("function"==typeof define&&define.amd)define([],t)
else{var e
e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.pomidorko=t()}}(function(){return function t(e,i,n){function s(r,a){if(!i[r]){if(!e[r]){var c="function"==typeof require&&require
if(!a&&c)return c(r,!0)
if(o)return o(r,!0)
var u=new Error("Cannot find module '"+r+"'")
throw u.code="MODULE_NOT_FOUND",u}var h=i[r]={exports:{}}
e[r][0].call(h.exports,function(t){var i=e[r][1][t]
return s(i?i:t)},h,h.exports,t,e,i,n)}return i[r].exports}for(var o="function"==typeof require&&require,r=0;r<n.length;r++)s(n[r])
return s}({1:[function(t,e,i){var n=t("./helpers/utils"),s=t("./helpers/ls"),o=t("./models/settings"),r=t("./mvc/model"),a=function(t,e){return n.merge(t.defaults[e],s.fetch(e))},c=e.exports=function(t){var e=new o(a(t,"settings")),i=new r(a(t,"goals"))
return e.on("change",function(){s.save(e.id,e.all())}),i.on("change",function(){s.save(i.id,i.all())}),{settings:e,goals:i}}
c.reset=function(){var t=s.fetch("goals")
if(t&&t.start){var e=new Date(t.start),i=new Date
i.getDate()!==e.getDate()&&i.getHours()>=6&&s.remove("goals")}}},{"./helpers/ls":25,"./helpers/utils":29,"./models/settings":31,"./mvc/model":33}],2:[function(t,e,i){var n=t("./component")
e.exports=n.extend({constructor:function(t,e){this.button=t,this.container=e},activate:function(){var t=this.toggle.bind(this)
this.button.addEventListener("click",t),this.container.querySelector(".pa-close").addEventListener("click",t)},toggle:function(){var t=this.container.classList.contains("hidden")
this.container.classList.toggle("hidden"),this.container.classList.toggle("pa-about-appear",t),this.container.classList.toggle("pa-about-disappear",!t)}})},{"./component":3}],3:[function(t,e,i){var n=function(){}
n.extend=t("../mvc/extend")(n),e.exports=n},{"../mvc/extend":32}],4:[function(t,e,i){var n=t("./component")
e.exports=n.extend({constructor:function(t,e,i){this.link=t,this.timer=e,this.goals=i},activate:function(){this.timer.on("stop",this.change.bind(this)),this.change()},change:function(){var t=this.goals.get("recess")?"break.ico":"work.ico"
this.link.href="assets/img/"+t}})},{"./component":3}],5:[function(t,e,i){var n=t("./component")
e.exports=n.extend({constructor:function(t,e,i){this.label=t,this.goals=e,this.settings=i},activate:function(){var t=this.render.bind(this)
this.goals.on("change",t),this.settings.on("change",t),this.render()},render:function(){var t=this.goals.get("current"),e=this.settings.get("total")
this.label.querySelector(".pa-current").innerHTML=t,this.label.querySelector(".pa-total").innerHTML=e}})},{"./component":3}],6:[function(t,e,i){e.exports={Notifications:t("./notifications"),PlayPause:t("./play-pause"),Settings:t("./settings"),TickTock:t("./tick-tock"),Favicon:t("./favicon"),About:t("./about"),Goals:t("./goals"),Scale:t("./scale"),Sound:t("./sound"),State:t("./state"),Title:t("./title"),Time:t("./time"),Skip:t("./skip"),Save:t("./save")}},{"./about":2,"./favicon":4,"./goals":5,"./notifications":7,"./play-pause":8,"./save":9,"./scale":10,"./settings":11,"./skip":12,"./sound":13,"./state":14,"./tick-tock":15,"./time":16,"./title":17}],7:[function(t,e,i){var n=t("./component"),s=t("../notify"),o=t("../helpers/language")
e.exports=n.extend({constructor:function(t,e,i){this.timer=t,this.goals=e,this.settings=i},activate:function(){var t=this
this.timer.on("stop",this.notify.bind(this)),this.settings.on("change",function(){t.settings.get("notifications")===!0&&s.request()})},notify:function(){if(this.settings.get("notifications")){var t=this.goals.get("recess")?"recess":"pomidorko"
s.notify(o.get(t))}}})},{"../helpers/language":24,"../notify":35,"./component":3}],8:[function(t,e,i){var n=t("./component")
e.exports=n.extend({constructor:function(t,e){this.control=t,this.timer=e,this.icon=t.querySelector(".pa-icon")},activate:function(){var t=this
this.timer.on("stop",function(){t.toggleState(!0)}),this.timer.on("start",function(){t.toggleState(!1)}),this.control.addEventListener("click",function(){var e=t.timer.isRunning()
t.toggle(e),t.toggleState(e)})},toggle:function(t){t?this.timer.pause():this.timer.start()},toggleState:function(t){var e=this.icon
e.classList.toggle("pa-pause",!t),e.classList.toggle("pa-play",t),this.control.classList.toggle("pa-play",t)}})},{"./component":3}],9:[function(t,e,i){var n=t("./component")
e.exports=n.extend({constructor:function(t,e){this.timer=t,this.goals=e},activate:function(){var t=this.timer,e=this.goals
window.addEventListener("beforeunload",function(){var i=t.getRemained()
i>=0&&e.set("remained",i)})}})},{"./component":3}],10:[function(t,e,i){var n=t("./component")
e.exports=n.extend({constructor:function(t,e){this.scale=t,this.timer=e},activate:function(){this.timer.on("tick",this.render.bind(this)),this.timer.on("start",this.render.bind(this)),this.render(this.timer.getTime())},render:function(t){pos=t/60/55*3300,this.scale.style.marginLeft=-pos+"px"}})},{"./component":3}],11:[function(t,e,i){var n=t("./component"),s=t("../controls"),o=t("../helpers/utils")
t("../mvc/view")
e.exports=n.extend({constructor:function(t,e,i){this.button=t,this.view=e,this.settings=i},activate:function(){this.button.addEventListener("click",this.toggle.bind(this)),this.settings.on("change",this.render.bind(this))
var t=this.settings,e=this.view.querySelectorAll(".pa-control, .pa-bool")
this.fields=o.toArray(e).map(function(e){return new s[e.dataset.type](e,{settings:t})}),this.render()},toggle:function(){var t=this.view.classList.contains("hidden"),e=this.view.classList
e.toggle("hidden"),e.toggle("pa-settings-appear",t),e.toggle("pa-settings-disappear",!t)},render:function(){var t=this.settings.all()
this.fields.forEach(function(e){e.set(t[e.input.className])})}})},{"../controls":20,"../helpers/utils":29,"../mvc/view":34,"./component":3}],12:[function(t,e,i){var n=t("./component"),s=t("../helpers/language")
e.exports=n.extend({constructor:function(t,e,i){this.button=t.querySelector("span"),this.timer=e,this.goals=i},activate:function(){var t=this
this.button.addEventListener("click",function(){t.timer.stop()}),this.goals.on("change",this.title.bind(this)),this.title()},title:function(){var t=s.get("skip")[+this.goals.get("recess")]
this.button.innerHTML=t}})},{"../helpers/language":24,"./component":3}],13:[function(t,e,i){var n=t("./component")
e.exports=n.extend({constructor:function(t,e,i){this.timer=t,this.settings=e,this.sound=i},activate:function(){this.timer.on("stop",this.play.bind(this))},play:function(){this.settings.get("sound")&&this.sound.play()}})},{"./component":3}],14:[function(t,e,i){var n=t("./component")
e.exports=n.extend({constructor:function(t,e,i,n){this.container=t,this.settings=n,this.timer=e,this.goals=i},activate:function(){var t=this
this.timer.on("stop",function(){t.next(),t.setup(),t.timer.start()}),this.setup()},setup:function(){var t=this.goals.get("current"),e=this.goals.get("recess")
this.timer.setDuration(this.getTime(t,e)),this.container.classList.toggle("resting",e)},next:function(){var t=!this.goals.get("recess"),e=!!t+this.goals.get("current")
this.goals.merge({recess:t,current:e,remained:!1})},getTime:function(t,e){var i=this.goals.get("remained")
if(i)return i/1e3
var n=e?this.settings.get("shortBreak"):this.settings.get("time")
return e&&t%this.settings.get("round")===0&&(n=this.settings.get("longBreak")),60*n}})},{"./component":3}],15:[function(t,e,i){var n=t("./component")
e.exports=n.extend({constructor:function(t,e,i){this.timer=t,this.sound=i,this.settings=e,this.enabled=!1,this.last=null},activate:function(){var t=this
this.timer.on("tick",this.tick.bind(this)),this.settings.on("change",function(){t.enabled=t.settings.get("tick")}),this.enabled=this.settings.get("tick")},tick:function(t){if(this.enabled){var e=Math.floor(t%60)
this.last!==e&&null!==this.last&&this.sound.play(),this.last=e}}})},{"./component":3}],16:[function(t,e,i){var n=t("./component"),s=t("../helpers/time")
e.exports=n.extend({constructor:function(t,e){this.min=t.querySelector(".pa-min"),this.sec=t.querySelector(".pa-sec"),this.timer=e},activate:function(){var t=this
this.timer.on("tick",this.render.bind(this)),this.timer.on("start",function(){t.render(t.timer.getTime())}),this.render(this.timer.getTime())},render:function(t){t=s(t),this.min.innerHTML=t.min,this.sec.innerHTML=t.sec}})},{"../helpers/time":27,"./component":3}],17:[function(t,e,i){var n=t("./component"),s=t("../helpers/time"),o=t("../helpers/language")
e.exports=n.extend({constructor:function(t,e){this.timer=t,this.goals=e,this.last=null},activate:function(){this.timer.on("tick",this.tick.bind(this)),this.tick(this.timer.getTime())},tick:function(t){if(t=s(t),this.last!==t.sec&&null!==this.last){var e=t.min+":"+t.sec
e+=" · "+o.get(this.goals.get("recess")?"recess":"work"),e+=" — "+o.get("title","помидорковый таймер"),document.title=e}this.last=t.sec}})},{"../helpers/language":24,"../helpers/time":27,"./component":3}],18:[function(t,e,i){var n="1.0"
e.exports={version:n,key:"pomidorko",defaults:{settings:{id:"settings",shortBreak:5,longBreak:20,time:25,version:n,round:4,total:12,sound:!0,tick:!1,notifications:!1},goals:{id:"goals",remained:!1,current:0,recess:!1,start:Date.now()}}}},{}],19:[function(t,e,i){var n=t("../mvc/view"),s=(t("../helpers/utils"),t("../notify")),o=n.extend({initialize:function(){this.input=this.find("input"),this.bind("span.pa-switch-on","click",this.switchOn),this.bind("span.pa-switch-off","click",this.switchOff)},switchOn:function(t){this.node.classList.remove("pa-bool-off"),this.node.classList.add("pa-bool-on"),t!==!0&&(this.data.settings.set(this.input.className,!0),"notifications"===this.input.className&&s.request())},switchOff:function(t){this.node.classList.remove("pa-bool-on"),this.node.classList.add("pa-bool-off"),t!==!0&&this.data.settings.set(this.input.className,!1)},set:function(t){this.input.checked=t,t?this.switchOn(!0):this.switchOff(!0)}})
e.exports=o},{"../helpers/utils":29,"../mvc/view":34,"../notify":35}],20:[function(t,e,i){e.exports={number:t("./number"),bool:t("./bool")}},{"./bool":19,"./number":21}],21:[function(t,e,i){var n=t("../mvc/view"),s=n.extend({initialize:function(){var t=this.data.settings,e=this.find("input")
this.input=e,this.bind(".plus","click",this.add),this.bind(".minus","click",this.sub),this.bind("input","change",function(){var i=parseInt(e.value)
t.set(e.className,isNaN(i)?0:Math.round(i))})},add:function(t){this.perform(t,1)},sub:function(t){this.perform(t,-1)},perform:function(t,e){t.preventDefault()
var i=parseInt(this.input.value)+e,t=document.createEvent("HTMLEvents")
t.initEvent("change",null,!1),this.input.value=isNaN(i)?0:i,this.input.dispatchEvent(t)},set:function(t){this.input.value=isNaN(t)?0:Math.round(t)}})
e.exports=s},{"../mvc/view":34}],22:[function(t,e,i){var n=document.createElement("div")
e.exports={toggle:function(t,e,i){i="undefined"==typeof i?!t.classList.contains(e):i,t.classList.toggle(e,i)},add:function(t,e){t.classList.add(e)},remove:function(t,e){t.classList.remove(e)},createNode:function(t){return n.innerHTML=t,n.children[0]},find:function(t,e){return e=e||document,e.querySelector(t)},findAll:function(t,e){return e=e||document,e.querySelectorAll(t)}}},{}],23:[function(t,e,i){var n=t("./utils")
e.exports=function(t){return t.on=function(t,e){this._events||(this._events={}),this._events[t]||(this._events[t]=[]),this._events[t].push(e)},t.emit=function(t){if(this._events&&this._events[t]){var e=n.toArray(arguments).slice(1)
this._events[t].forEach(function(t){t&&t.apply(t,e)})}},t}},{"./utils":29}],24:[function(t,e,i){e.exports={strings:{},set:function(t){this.strings=t},get:function(t,e){return t in this.strings?this.strings[t]:e}}},{}],25:[function(t,e,i){var n=t("../config"),s=window.localStorage
e.exports={storage:JSON.parse(s.getItem(n.key))||{},fetch:function(t){return this.storage[t]||{}},persist:function(){s.setItem(n.key,JSON.stringify(this.storage))},save:function(t,e){this.storage[t]=e,this.persist()},remove:function(t){delete this.storage[t],this.persist()}}},{"../config":18}],26:[function(t,e,i){e.exports={clamp:function(t,e,i){return t=Math.min(i,t),Math.max(e,t)},random:function(t,e){return Math.round(Math.random()*(e-t)+t)}}},{}],27:[function(t,e,i){var n=function(t,e){return e.substr(t.length)+t}
e.exports=function(t){var e=Math.floor(t/60),i=Math.floor(t%60)
return i=60>i?i:59,e=n(e.toString(),"00"),i=n(i.toString(),"00"),{min:e,sec:i}}},{}],28:[function(t,e,i){e.exports=function(t){return t=t||(t=0),function(){return++t}}},{}],29:[function(t,e,i){e.exports={each:function(t,e){for(var i in t)t.hasOwnProperty(i)&&e(t[i],i)},diff:function(t,e){var i={}
for(var n in e)("undefined"==typeof t[n]||e[n]!==t[n])&&(i[n]=e[n]||t[n])
return i},clone:function(t){var e={}
return extend(e,t),e},merge:function(t,e){var i,n={}
for(i in t)n[i]=t[i]
for(i in e)n[i]=e[i]
return n},extend:function(t,e){for(var i in e)t[i]=e[i]},toArray:function(t){return Array.prototype.slice.call(t)},pick:function(t,e){var i={}
return e.forEach(function(e){t[e]&&(i[e]=t[e])}),i}}},{}],30:[function(t,e,i){e.exports={components:t("./components"),bootstrap:t("./bootstrap"),config:t("./config"),lang:t("./helpers/language"),dom:t("./helpers/dom"),Timer:t("./timer")}},{"./bootstrap":1,"./components":6,"./config":18,"./helpers/dom":22,"./helpers/language":24,"./timer":36}],31:[function(t,e,i){var n=t("../mvc/model"),s=t("../helpers/math")
e.exports=n.extend({filter:function(t){t.shortBreak=s.clamp(t.shortBreak,3,10),t.longBreak=s.clamp(t.longBreak,5,45),t.time=s.clamp(t.time,5,55),t.total=s.clamp(t.total,1,1/0),t.round=s.clamp(t.round,1,t.total)}})},{"../helpers/math":26,"../mvc/model":33}],32:[function(t,e,i){var n=t("../helpers/utils"),s=e.exports=function(t){return function(e){var i=e.constructor
delete e.constructor
var o=function(){t.apply(this,n.toArray(arguments)),i&&i.apply(this,arguments)}
return o.prototype=Object.create(t.prototype),n.each(e,function(t,e){o.prototype[e]=t}),o.extend=s(o),o}}},{"../helpers/utils":29}],33:[function(t,e,i){var n=t("../helpers/events"),s=t("../helpers/utils"),o=t("../helpers/unique")(),r=t("./extend"),a=function(t){var e=t&&t.id?t.id:-o()
t&&t.id&&delete t.id,t=s.merge(this.data||{},t||{}),this.previous=s.merge({},t),this.data=t,this.id=e}
a.prototype={filter:function(t){},get:function(t){return"undefined"!=typeof this.data[t]?this.data[t]:!1},set:function(t,e){this.data[t]=e,this.filter(this.data),this.emit("change")},clear:function(){this.previous=s.merge({},this.data)},revert:function(){this.data=s.merge({},this.previous),this.emit("change")},all:function(){return s.merge(this.data,{})},diff:function(){return s.diff(this.previous,this.data)},destroy:function(){this.data={},this.id=-o(),this.emit("destroy")},reset:function(t){this.data=t,this.filter(this.data),this.emit("change")},merge:function(t){t.id&&(this.id=t.id,delete t.id),this.data=s.merge(this.data,t),this.filter(this.data),this.emit("change")},isNew:function(){return this.id<0},isDirty:function(){return Object.keys(this.diff()).length>0},isEmpty:function(){return 0===Object.keys(this.data).length}},a.extend=r(a),n(a.prototype),e.exports=a},{"../helpers/events":23,"../helpers/unique":28,"../helpers/utils":29,"./extend":32}],34:[function(t,e,i){var n=t("./extend"),s=function(t,e){this.node=t,this.data=e,this.initialize()}
s.prototype={initialize:function(){},render:function(){},find:function(t){var e=this.node.querySelector(t)
return e||console.warn('Could not find node by selector "'+t+'"'),e},bind:function(t,e,i){var n=t instanceof Node?t:this.find(t)
n?n.addEventListener(e,i.bind(this)):console.warn("Node is not suitable for attaching events!")}},s.extend=n(s),e.exports=s},{"./extend":32}],35:[function(t,e,i){e.exports={notify:function(t,e){!1 in window||"granted"!==Notification.permission||new Notification(t,{icon:e})},request:function(){!1 in window||"granted"===Notification.permission||Notification.requestPermission()}}},{}],36:[function(t,e,i){var n=t("./helpers/events"),s=function(t){this.startTime=null,this.remained=null,this.duration=null,this.endTime=null,this.timer=null,this.view=t}
s.prototype={start:function(){this.timer||(time=this.remained?this.remained:1e3*this.duration,this.startTime=Date.now(),this.endTime=this.startTime+time,this.timer=setInterval(this.tick.bind(this),66),this.emit("start"))},setDuration:function(t){this.duration=t},tick:function(){var t=(this.endTime-Date.now())/1e3
return 0>t?(this.emit("tick",0),this.stop()):void this.emit("tick",t)},pause:function(){clearInterval(this.timer),this.timer=null,this.remained=this.endTime-Date.now(),this.startTime=this.endTime=null},stop:function(){this.remained=this.endTime=this.startTime=null,clearInterval(this.timer),this.timer=null,this.emit("stop")},isRunning:function(){return Boolean(this.timer)},getRemained:function(){return this.remained?this.remained:this.endTime-Date.now()},getTime:function(){return this.remained?this.remained/1e3:this.duration},isTimeRemained:function(){return null!==this.remained}},n(s.prototype),e.exports=s},{"./helpers/events":23}]},{},[30])(30)})
