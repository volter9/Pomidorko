!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t()
else if("function"==typeof define&&define.amd)define([],t)
else{var e
e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.App=t()}}(function(){return function t(e,i,n){function s(r,a){if(!i[r]){if(!e[r]){var h="function"==typeof require&&require
if(!a&&h)return h(r,!0)
if(o)return o(r,!0)
var c=new Error("Cannot find module '"+r+"'")
throw c.code="MODULE_NOT_FOUND",c}var u=i[r]={exports:{}}
e[r][0].call(u.exports,function(t){var i=e[r][1][t]
return s(i?i:t)},u,u.exports,t,e,i,n)}return i[r].exports}for(var o="function"==typeof require&&require,r=0;r<n.length;r++)s(n[r])
return s}({1:[function(t,e,i){var n=t("./views/app"),s=t("./models/settings"),o=t("./models/goals"),r=t("./ls"),a=function(t){this.settings=s.get(),this.goals=o.get(),this.view=new n(t,{settings:this.settings,goals:this.goals}),this.initialize(this.settings,this.goals)}
a.prototype.initialize=function(t,e){e.emit("change"),t.emit("change"),e.on("change",function(){r.save(e)}),t.on("change",function(){r.save(t)})},a.initiate=function(t){a.instance=new a(t)},e.exports=a},{"./ls":6,"./models/goals":7,"./models/settings":8,"./views/app":15}],2:[function(t,e,i){var n=t("./utils")
e.exports=function(t){t.on=function(t,e){this._events||(this._events={}),this._events[t]||(this._events[t]=[]),this._events[t].push(e)},t.emit=function(t){if(this._events&&this._events[t]){var e=n.toArray(arguments).slice(1)
this._events[t].forEach(function(t){t&&t.apply(t,e)})}}}},{"./utils":5}],3:[function(t,e,i){var n=function(t,e,i){return t=Math.min(i,t),Math.max(e,t)}
e.exports={clamp:n}},{}],4:[function(t,e,i){var n=function(t){return t=t||(t=0),function(){return++t}}
e.exports=n},{}],5:[function(t,e,i){var n=function(t,e){for(var i in t)t.hasOwnProperty(i)&&e(t[i],i)},s=function(t,e){var i={}
for(var n in e)("undefined"==typeof t[n]||e[n]!==t[n])&&(i[n]=e[n]||t[n])
return i},o=function(t){var e={}
return a(e,t)},r=function(t,e){var i,n={}
for(i in t)n[i]=t[i]
for(i in e)n[i]=e[i]
return n},a=function(t,e){for(var i in e)t[i]=e[i]},h=function(t){return Array.prototype.slice.call(t)},c=function(t,e){var i={}
return e.forEach(function(e){t[e]&&(i[e]=t[e])}),i}
e.exports={toArray:h,extend:a,clone:o,merge:r,diff:s,each:n,pick:c}},{}],6:[function(t,e,i){var n=t("./mvc/mappers/ls")
e.exports=new n({key:"pomidorka"})},{"./mvc/mappers/ls":10}],7:[function(t,e,i){var n=t("../mvc/model"),s=t("../ls")
t("../helpers/math")
e.exports={get:function(){var t=new n
return s.fetch("goals",t),t.isNew()&&(t=this.bootstrap(s),t.emit("change")),t},bootstrap:function(t){var e=this.blank()
return t.insert(e),e},blank:function(){return new n({id:"goals",current:1,"break":!1})}}},{"../helpers/math":3,"../ls":6,"../mvc/model":11}],8:[function(t,e,i){var n=t("../mvc/model"),s=t("../ls"),o=t("../helpers/math"),r=n.extend({filter:function(t){t.time=o.clamp(t.time,5,55),t.shortBreak=o.clamp(t.shortBreak,3,10),t.longBreak=o.clamp(t.longBreak,5,45),t.total=o.clamp(t.total,1,1/0),t.round=o.clamp(t.round,1,t.total)}})
e.exports={get:function(){var t=new r
return s.fetch("settings",t),t.isNew()&&(t=this.bootstrap(s),t.filter(t.data),t.emit("change")),t},bootstrap:function(t){var e=this.blank()
return t.insert(e),e},blank:function(){return new r({id:"settings",time:25,shortBreak:5,longBreak:15,round:4,total:12})}}},{"../helpers/math":3,"../ls":6,"../mvc/model":11}],9:[function(t,e,i){var n=t("../helpers/utils"),s=function(t){return function(e){var i=function(){t.apply(this,n.toArray(arguments))}
return i.prototype=Object.create(t.prototype),n.each(e,function(t,e){i.prototype[e]=t}),i}}
e.exports=s},{"../helpers/utils":5}],10:[function(t,e,i){var n=t("../../helpers/events"),s=t("../../helpers/utils"),o=t("../model"),r={model:o},a=function(t){var e=this
this.options=s.merge(r,t),this.storage=JSON.parse(window.localStorage.getItem(t.key))||{},this.on("change",function(){window.localStorage.setItem(e.options.key,JSON.stringify(e.storage))})}
n(a.prototype),a.prototype.parse=function(t){return t},a.prototype.create=function(t,e){return e?(e.merge(t),e):new this.options.model(t)},a.prototype.fetch=function(t,e,i){this.storage[t]&&(e.merge(this.storage[t]),this.storage[t]&&(e.id=t),i&&i())},a.prototype.insert=function(t,e){this.storage[t.id]=t.all(),e&&e(),this.emit("change")},a.prototype.update=function(t,e){this.insert(t,e)},a.prototype.save=function(t,e){t.isNew()?this.insert(t,e):this.update(t,e)},a.prototype.remove=function(t,e){delete this.storage[t.id],t.destroy(),e&&e(),this.emit("change")},e.exports=a},{"../../helpers/events":2,"../../helpers/utils":5,"../model":11}],11:[function(t,e,i){var n=t("../helpers/events"),s=t("../helpers/utils"),o=t("../helpers/unique")(),r=t("./extend"),a=function(t){var e=t&&t.id?t.id:-o()
t&&t.id&&delete t.id,t=s.merge(this.data||{},t||{}),this.previous=s.merge({},t),this.data=t,this.id=e}
n(a.prototype),a.prototype.filter=function(t){},a.prototype.get=function(t){return this.data[t]?this.data[t]:!1},a.prototype.set=function(t,e){this.data[t]=e,this.filter(this.data),this.emit("change")},a.prototype.clear=function(){this.previous=s.merge({},this.data)},a.prototype.revert=function(){this.data=s.merge({},this.previous),this.emit("change")},a.prototype.all=function(){return s.merge(this.data,{})},a.prototype.diff=function(){return s.diff(this.previous,this.data)},a.prototype.destroy=function(){this.data={},this.id=-o(),this.emit("destroy")},a.prototype.reset=function(t){this.data=t,this.filter(this.data),this.emit("change")},a.prototype.merge=function(t){t.id&&(this.id=t.id,delete t.id),this.data=s.merge(this.data,t),this.filter(this.data),this.emit("change")},a.prototype.isNew=function(){return this.id<0},a.prototype.isDirty=function(){return Object.keys(this.diff()).length>0},a.prototype.isEmpty=function(){return 0===Object.keys(this.data).length},a.extend=r(a),e.exports=a},{"../helpers/events":2,"../helpers/unique":4,"../helpers/utils":5,"./extend":9}],12:[function(t,e,i){var n=t("./extend"),s=function(t,e){this.node=t,this.data=e,this.initialize()}
s.prototype.initialize=function(){},s.prototype.render=function(){},s.prototype.find=function(t){return this.node.querySelector(t)},s.prototype.bind=function(t,e,i){this.find(t).addEventListener(e,i.bind(this))},s.extend=n(s),e.exports=s},{"./extend":9}],13:[function(t,e,i){var n=t("./helpers/events"),s=function(t){this.startTime=null,this.endTime=null,this.remained=null,this.timer=null,this.view=t}
n(s.prototype),s.prototype.start=function(t){this.timer||(t=this.remained?this.remained:1e3*t,this.startTime=Date.now(),this.endTime=this.startTime+t,this.timer=setInterval(this.tick.bind(this),80),this.emit("start"))},s.prototype.tick=function(){var t=this.endTime-Date.now()
return 0>t?(this.view.render(0),this.stop()):void this.view.render(t/1e3)},s.prototype.pause=function(){clearInterval(this.timer),this.timer=null,this.remained=this.endTime-Date.now(),this.startTime=this.endTime=null},s.prototype.stop=function(){this.remained=this.endTime=this.startTime=null,clearInterval(this.timer),this.timer=null,this.emit("stop")},s.prototype.isRunning=function(){return Boolean(this.timer)},e.exports=s},{"./helpers/events":2}],14:[function(t,e,i){var n=t("../mvc/view"),s=n.extend({initialize:function(){this.data.button.addEventListener("click",this.show.bind(this)),this.bind(".close","click",this.close)},show:function(){this.node.classList.remove("hidden"),this.toggle(this.node.classList.contains("hidden"))},close:function(){this.node.classList.add("hidden"),this.toggle(this.node.classList.contains("hidden"))},toggle:function(t){this.node.classList.toggle("about-appear",!t),this.node.classList.toggle("about-disappear",t)}})
e.exports=s},{"../mvc/view":12}],15:[function(t,e,i){var n=t("../mvc/view"),s=t("./goals"),o=t("./about"),r=t("./timer"),a=t("./settings"),h=n.extend({initialize:function(){this.timer=new r(this.find("#timer"),{settings:this.data.settings,goals:this.data.goals}),this.goals=new s(this.find("#goals"),this.data),this.about=new o(this.find(".about"),{button:this.find("#about")}),this.settings=new a(this.find(".settings"),{button:this.find("#settings"),settings:this.data.settings})}})
e.exports=h},{"../mvc/view":12,"./about":14,"./goals":16,"./settings":17,"./timer":18}],16:[function(t,e,i){var n=t("../mvc/view"),s=n.extend({initialize:function(){this.data.goals.on("change",this.render.bind(this)),this.data.settings.on("change",this.render.bind(this))},render:function(){var t=this.data.goals,e=this.data.settings
this.find(".current").innerHTML=t.get("current"),this.find(".total").innerHTML=e.get("total")}})
e.exports=s},{"../mvc/view":12}],17:[function(t,e,i){var n=t("../mvc/view"),s=t("./ui-control"),o=t("../helpers/utils"),r=n.extend({initialize:function(){this.data.button.addEventListener("click",this.toggle.bind(this)),this.data.settings.on("change",this.render.bind(this))
var t=this.data.settings,e=this.node.querySelectorAll(".ui-control")
o.toArray(e).forEach(function(e){new s(e,{settings:t})})},toggle:function(){var t=this.node.classList.contains("hidden")
this.node.classList.toggle("hidden"),this.node.classList.toggle("settings-appear",t),this.node.classList.toggle("settings-disappear",!t)},render:function(){var t=this,e=this.data.settings.all()
o.each(e,function(e,i){t.find("input."+i).value=e})}})
e.exports=r},{"../helpers/utils":5,"../mvc/view":12,"./ui-control":19}],18:[function(t,e,i){var n=t("../mvc/view"),s=t("../mvc/model"),o=t("../timer"),r=function(t,e){return e.substr(t.length)+t},a=n.extend({initialize:function(){this.nextState=new s,this.settings=this.data.settings,this.goals=this.data.goals,this.label=this.find("#timer-time"),this.scale=this.find(".timer-wrapper"),this.timer=new o(this),this.setupEvents(),this.render(60*this.settings.get("time"))},setupEvents:function(){this.bind("#timer-control","click",this.button),this.timer.on("stop",this.stop.bind(this))
var t=this.settings,e=this.nextState
t.on("change",function(){e.merge(t.all())})},stop:function(){this.toggle(!0),this.render(0)},render:function(t){var e=Math.floor(t/60).toString(),i=Math.floor(t%60).toString()
this.setTime(e,i),this.renderScale(t)},renderScale:function(t){var e=t/60/55,i=3300*e
this.scale.style.marginLeft=-i+"px"},setTime:function(t,e){t=r(t,"00"),e=r(e,"00"),this.label.innerHTML=t+":"+e},button:function(){var t=this.find(".icon").classList.contains("pause")
this.toggle(t),t?this.timer.pause():this.timer.start(60*this.settings.get("time"))},toggle:function(t){var e=this.find(".icon")
e.classList.toggle("pause",!t),e.classList.toggle("play",t),this.find("#timer-control").classList.toggle("play",t)}})
e.exports=a},{"../mvc/model":11,"../mvc/view":12,"../timer":13}],19:[function(t,e,i){var n=t("../mvc/view"),s=n.extend({initialize:function(){var t=this.data.settings,e=this.find("input")
this.input=e,this.bind(".fa-plus","click",this.add),this.bind(".fa-minus","click",this.sub),this.bind("input","change",function(){var i=parseInt(e.value)
t.set(e.className,Math.round(i))})},add:function(t){this.perform(t,1)},sub:function(t){this.perform(t,-1)},perform:function(t,e){t.preventDefault()
var i=parseInt(this.input.value)+e,t=document.createEvent("HTMLEvents")
t.initEvent("change",null,!1),this.input.value=isNaN(i)?0:i,this.input.dispatchEvent(t)}})
e.exports=s},{"../mvc/view":12}]},{},[1])(1)})
