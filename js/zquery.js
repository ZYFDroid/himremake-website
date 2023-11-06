
var __zqloaded = false;
var __zqloadcb = [];
function ZQDoms(selector){
    this._selector = selector;
    this.getDoms = function(){
        return document.querySelectorAll(this._selector);
    }
    this.text = function (t) {
        if(t){
            this.getDoms().forEach(d => d.innerText = t);
        }
        else{
            return this.getDoms()[0].innerText;
        }
    }

    this.click = function(callback){
        this.getDoms().forEach(d => d.addEventListener("click",callback));
    }

    this.show = function(){
        this.getDoms().forEach(d => d.style.visibility="visible");
    }
    
    this.hide = function(){
        this.getDoms().forEach(d => d.style.visibility="hidden");
    }

    this.css = function(key,value){
        this.getDoms().forEach(d => d.style[key]=value);
    }
    
}

var $ = function(o){
    var type = typeof(o);
    if(type == "function"){
        if(__zqloaded){
            o();
        }
        else{
            __zqloadcb.push(o);
        }
    }
    if(type == "string"){
        return new ZQDoms(o);
    }
}

window.addEventListener("load", function(){
    __zqloadcb.forEach(f => f());
    __zqloaded = true;
});

function getSearchParam(){
    var obj = {};
    var str = window.location.search.substring(1);
    var single=str.split("&");
    for(var i =0;i<single.length;i++){
        var entry = single[i].split("=");
        var eKey = entry[0];
        var eValue = "";
        if(entry.length>0){
            eValue = decodeURI(entry[1]);
        }
        obj[eKey] = eValue;
    }
    return obj;
}
