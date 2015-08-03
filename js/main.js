!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e()
else if("function"==typeof define&&define.amd)define([],e)
else{var n
n="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,n.App=e()}}(function(){return function e(n,t,o){function r(i,u){if(!t[i]){if(!n[i]){var d="function"==typeof require&&require
if(!u&&d)return d(i,!0)
if(f)return f(i,!0)
var p=new Error("Cannot find module '"+i+"'")
throw p.code="MODULE_NOT_FOUND",p}var c=t[i]={exports:{}}
n[i][0].call(c.exports,function(e){var t=n[i][1][e]
return r(t?t:e)},c,c.exports,e,n,t,o)}return t[i].exports}for(var f="function"==typeof require&&require,i=0;i<o.length;i++)r(o[i])
return r}({1:[function(e,n,t){var o=function(){}
o.initiate=function(){o.instance=new o},n.exports=o},{}]},{},[1])(1)})
