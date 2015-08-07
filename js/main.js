!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t()
else if("function"==typeof define&&define.amd)define([],t)
else{var e
e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.App=t()}}(function(){return function t(e,i,n){function s(r,a){if(!i[r]){if(!e[r]){var u="function"==typeof require&&require
if(!a&&u)return u(r,!0)
if(o)return o(r,!0)
var c=new Error("Cannot find module '"+r+"'")
throw c.code="MODULE_NOT_FOUND",c}var h=i[r]={exports:{}}
e[r][0].call(h.exports,function(t){var i=e[r][1][t]
return s(i?i:t)},h,h.exports,t,e,i,n)}return i[r].exports}for(var o="function"==typeof require&&require,r=0;r<n.length;r++)s(n[r])
return s}({1:[function(t,e,i){var n=t("./views/app"),s=t("./models/settings"),o=t("./models/goals"),r=t("./ls"),a=function(t){this.settings=s.get(),this.goals=o.get(this.settings),this.view=new n(t,{settings:this.settings,goals:this.goals}),this.initialize(this.settings,this.goals)}
a.prototype.initialize=function(t,e){e.emit("change"),t.emit("change"),e.on("change",function(){r.save(e)}),t.on("change",function(){r.save(t)})},a.initiate=function(t){a.instance=new a(t)},e.exports=a},{"./ls":6,"./models/goals":7,"./models/settings":8,"./views/app":14}],2:[function(t,e,i){var n=t("./utils")
e.exports=function(t){t.on=function(t,e){this._events||(this._events={}),this._events[t]||(this._events[t]=[]),this._events[t].push(e)},t.emit=function(t){if(this._events&&this._events[t]){var e=n.toArray(arguments).slice(1)
this._events[t].forEach(function(t){t&&t.apply(t,e)})}}}},{"./utils":5}],3:[function(t,e,i){var n=function(t,e,i){return t=Math.min(i,t),Math.max(e,t)}
e.exports={clamp:n}},{}],4:[function(t,e,i){var n=function(t){return t=t||(t=0),function(){return++t}}
e.exports=n},{}],5:[function(t,e,i){var n=function(t,e){for(var i in t)t.hasOwnProperty(i)&&e(t[i],i)},s=function(t,e){var i={}
for(var n in e)("undefined"==typeof t[n]||e[n]!==t[n])&&(i[n]=e[n]||t[n])
return i},o=function(t){var e={}
return a(e,t)},r=function(t,e){var i,n={}
for(i in t)n[i]=t[i]
for(i in e)n[i]=e[i]
return n},a=function(t,e){for(var i in e)t[i]=e[i]},u=function(t){return Array.prototype.slice.call(t)},c=function(t,e){var i={}
return e.forEach(function(e){t[e]&&(i[e]=t[e])}),i}
e.exports={toArray:u,extend:a,clone:o,merge:r,diff:s,each:n,pick:c}},{}],6:[function(t,e,i){var n=t("./mvc/mappers/ls")
e.exports=new n({key:"pomidorka"})},{"./mvc/mappers/ls":10}],7:[function(t,e,i){var n=t("../mvc/model"),s=t("../ls"),o=t("../helpers/math"),r=n.extend({filter:function(t){t.current=o.clamp(t.current,0,t.total)}})
e.exports={get:function(t){var e=new r
return s.fetch("goals",e),e.isNew()&&(e=this.bootstrap(s,t),e.filter(e.data),e.emit("change")),e},bootstrap:function(t,e){var i=this.blank(e)
return t.insert(i),i},blank:function(t){return new r({id:"goals",current:1,total:t.get("total")})}}},{"../helpers/math":3,"../ls":6,"../mvc/model":11}],8:[function(t,e,i){var n=t("../mvc/model"),s=t("../ls"),o=t("../helpers/math"),r=n.extend({filter:function(t){t.time=o.clamp(t.time,5,55),t.shortBreak=o.clamp(t.shortBreak,3,10),t.longBreak=o.clamp(t.longBreak,5,45)}})
e.exports={get:function(){var t=new r
return s.fetch("settings",t),t.isNew()&&(t=this.bootstrap(s),t.filter(t.data),t.emit("change")),t},bootstrap:function(t){var e=this.blank()
return t.insert(e),e},blank:function(){return new r({id:"settings",time:25,shortBreak:5,longBreak:15,round:4,total:12})}}},{"../helpers/math":3,"../ls":6,"../mvc/model":11}],9:[function(t,e,i){var n=t("../helpers/utils"),s=function(t){return function(e){var i=function(){t.apply(this,n.toArray(arguments))}
return i.prototype=Object.create(t.prototype),n.each(e,function(t,e){i.prototype[e]=t}),i}}
e.exports=s},{"../helpers/utils":5}],10:[function(t,e,i){var n=t("../../helpers/events"),s=t("../../helpers/utils"),o=t("../model"),r={model:o},a=function(t){var e=this
this.options=s.merge(r,t),this.storage=JSON.parse(window.localStorage.getItem(t.key))||{},this.on("change",function(){window.localStorage.setItem(e.options.key,JSON.stringify(e.storage))})}
n(a.prototype),a.prototype.parse=function(t){return t},a.prototype.create=function(t,e){return e?(e.merge(t),e):new this.options.model(t)},a.prototype.fetch=function(t,e,i){this.storage[t]&&(e.merge(this.storage[t]),this.storage[t]&&(e.id=t),i&&i())},a.prototype.insert=function(t,e){this.storage[t.id]=t.all(),e&&e(),this.emit("change")},a.prototype.update=function(t,e){this.insert(t,e)},a.prototype.save=function(t,e){t.isNew()?this.insert(t,e):this.update(t,e)},a.prototype.remove=function(t,e){delete this.storage[t.id],t.destroy(),e&&e(),this.emit("change")},e.exports=a},{"../../helpers/events":2,"../../helpers/utils":5,"../model":11}],11:[function(t,e,i){var n=t("../helpers/events"),s=t("../helpers/utils"),o=t("../helpers/unique")(),r=t("./extend"),a=function(t){var e=t&&t.id?t.id:-o()
t&&t.id&&delete t.id,t=s.merge(this.data||{},t||{}),this.previous=s.merge({},t),this.data=t,this.id=e}
n(a.prototype),a.prototype.filter=function(t){},a.prototype.get=function(t){return this.data[t]?this.data[t]:!1},a.prototype.set=function(t,e){this.data[t]=e,this.filter(this.data),this.emit("change")},a.prototype.clear=function(){this.previous=s.merge({},this.data)},a.prototype.revert=function(){this.data=s.merge({},this.previous),this.emit("change")},a.prototype.all=function(){return s.merge(this.data,{})},a.prototype.diff=function(){return s.diff(this.previous,this.data)},a.prototype.destroy=function(){this.data={},this.id=-o(),this.emit("destroy")},a.prototype.reset=function(t){this.data=t,this.filter(this.data),this.emit("change")},a.prototype.merge=function(t){t.id&&(this.id=t.id,delete t.id),this.data=s.merge(this.data,t),this.filter(this.data),this.emit("change")},a.prototype.isNew=function(){return this.id<0},a.prototype.isDirty=function(){return Object.keys(this.diff()).length>0},a.prototype.isEmpty=function(){return 0===Object.keys(this.data).length},a.extend=r(a),e.exports=a},{"../helpers/events":2,"../helpers/unique":4,"../helpers/utils":5,"./extend":9}],12:[function(t,e,i){var n=t("./extend"),s=function(t,e){this.node=t,this.data=e,this.initialize()}
s.prototype.initialize=function(){},s.prototype.render=function(){},s.prototype.find=function(t){return this.node.querySelector(t)},s.prototype.bind=function(t,e,i){this.find(t).addEventListener(e,i.bind(this))},s.extend=n(s),e.exports=s},{"./extend":9}],13:[function(t,e,i){var n=t("../mvc/view"),s=n.extend({initialize:function(){this.data.button.addEventListener("click",this.show.bind(this)),this.bind(".close","click",this.close)},show:function(){this.node.classList.remove("hidden"),this.toggle(this.node.classList.contains("hidden"))},close:function(){this.node.classList.add("hidden"),this.toggle(this.node.classList.contains("hidden"))},toggle:function(t){this.node.classList.toggle("about-appear",!t),this.node.classList.toggle("about-disappear",t)}})
e.exports=s},{"../mvc/view":12}],14:[function(t,e,i){var n=t("../mvc/view"),s=t("./goals"),o=t("./about"),r=t("./settings"),a=n.extend({initialize:function(){this.goals=new s(this.find("#goals"),{goals:this.data.goals}),this.about=new o(this.find(".about"),{button:this.find("#about")}),this.settings=new r(this.find(".settings"),{button:this.find("#settings"),settings:this.data.settings})}})
e.exports=a},{"../mvc/view":12,"./about":13,"./goals":15,"./settings":16}],15:[function(t,e,i){var n=t("../mvc/view"),s=n.extend({initialize:function(){this.data.goals.on("change",this.render.bind(this))},render:function(){var t=this.data.goals
this.find(".current").innerHTML=t.get("current"),this.find(".total").innerHTML=t.get("total")}})
e.exports=s},{"../mvc/view":12}],16:[function(t,e,i){var n=t("../mvc/view"),s=t("./ui-control"),o=t("../helpers/utils"),r=n.extend({initialize:function(){this.data.button.addEventListener("click",this.toggle.bind(this)),this.data.settings.on("change",this.render.bind(this))
var t=this.data.settings
o.toArray(this.node.querySelectorAll(".ui-control")).forEach(function(e){new s(e),e.querySelector("input").addEventListener("change",function(){t.set(this.className,parseInt(this.value))})})},toggle:function(){var t=this.node.classList.contains("hidden")
this.node.classList.toggle("hidden"),this.node.classList.toggle("settings-appear",t),this.node.classList.toggle("settings-disappear",!t)},render:function(){var t=this,e=this.data.settings.all()
o.each(e,function(e,i){t.find("input."+i).value=e})}})
e.exports=r},{"../helpers/utils":5,"../mvc/view":12,"./ui-control":17}],17:[function(t,e,i){var n=t("../mvc/view"),s=n.extend({initialize:function(){this.input=this.find("input"),this.bind(".fa-plus","click",this.add),this.bind(".fa-minus","click",this.sub)},add:function(t){this.perform(t,1)},sub:function(t){this.perform(t,-1)},perform:function(t,e){t.preventDefault()
var i=parseInt(this.input.value)+e,t=document.createEvent("HTMLEvents")
t.initEvent("change",null,!1),this.input.value=isNaN(i)?0:i,this.input.dispatchEvent(t)}})
e.exports=s},{"../mvc/view":12}]},{},[1])(1)})
