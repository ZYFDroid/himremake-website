
var __zquery_document_loaded = false;
var __zquery_document_loaded_callbacks = [];


function ZQueryDOMCollection(selector){
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

    this.val = function(v){
        if(v){
            this.getDoms().forEach(d => d.value = v);
        }
        else{
            return this.getDoms()[0].value;
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
    this.img = function (src) {
        this.getDoms().forEach(d => d.src = src);
    }
}

var $ = function(o){
    var type = typeof(o);
    if(type == "function"){
        if(__zquery_document_loaded){
            o();
        }
        else{
            __zquery_document_loaded_callbacks.push(o);
        }
    }
    if(type == "string"){
        return new ZQueryDOMCollection(o);
    }


}

window.addEventListener("load", function(){
    __zquery_document_loaded_callbacks.forEach(f => f());
    __zquery_document_loaded = true;
});


function objectToUrlParam(param){
    var searchstr="";
    var keys = Object.keys(param);
    for (var i = 0;i<keys.length;i++){
        searchstr = searchstr+keys[i];
        searchstr = searchstr+"=";
        searchstr = searchstr +encodeURI(param[keys[i]]);
        if(i<keys.length-1){
            searchstr = searchstr+"&";
        }
    }
    return searchstr;
}


$.post = function(url,param){
    var callback = new Promise(function(resolve,reject){

        var loginreq = new XMLHttpRequest();

        loginreq.onreadystatechange=function()
        {
            if (loginreq.readyState==4)
            {
                if(loginreq.status=200){
                    try{
                        var result = loginreq.responseText;
                        resolve(result);
                    }catch(e){
                        reject(e);
                    }
                }
                else{
                    reject(loginreq.status);
                }
            }
        }
    
        loginreq.open("POST",url,true);
        loginreq.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        loginreq.withCredentials=true;
        try{
            loginreq.send(objectToUrlParam(param));
        }catch(err){
            reject(err);
        }
    });
    return callback;
}

$.postJson = function(url,param){
    var callback = new Promise(function(resolve,reject){

        var loginreq = new XMLHttpRequest();

        loginreq.onreadystatechange=function()
        {
            if (loginreq.readyState==4)
            {
                if(loginreq.status=200){
                    try{
                        var result = loginreq.responseText;
                        resolve(result);
                    }catch(e){
                        reject(e);
                    }
                }
                else{
                    reject(loginreq.status);
                }
            }
        }
    
        loginreq.open("POST",url,true);
        loginreq.setRequestHeader("Content-type","application/json");
        loginreq.withCredentials=true;
        try{
            loginreq.send(JSON.stringify(param));
        }catch(err){
            reject(err);
        }
    });
    return callback;
}


$.ajax = function(url,param){
    var callback = new Promise(function(resolve,reject){

        var loginreq = new XMLHttpRequest();

        loginreq.onreadystatechange=function()
        {
            if (loginreq.readyState==4)
            {
                if(loginreq.status=200){
                    try{
                        var result = loginreq.responseText;
                        resolve(result);
                    }catch(e){
                        reject(e);
                    }
                }
                else{
                    reject(loginreq.status);
                }
            }
        }
        var _url = url;
        if(param){
            _url = _url + "?"+objectToUrlParam(param);
        }
        loginreq.open("GET",_url,true);
        loginreq.withCredentials=true;
        try{
            loginreq.send();
        }catch(err){
            reject(err);
        }
    });
    return callback;
}

$.cloneObject = function(obj){
    return JSON.parse(JSON.stringify(obj));
}

$.formatDate = function(date){
    if(typeof(date) == "string"){
        date = new Date(date);
    }
    var datestr = "";

    datestr+=date.getFullYear();
    datestr+="/";
    if(date.getMonth() < 9){
        datestr += "0";
    }
    datestr+=""+(date.getMonth()+1);
    datestr+="/";
    if(date.getDate() < 10){
        datestr += "0";
    }
    datestr+=""+(date.getDate());
    
    datestr+=" ";

    if(date.getHours() < 10){
        datestr += "0";
    }
    datestr+=""+(date.getHours());
    datestr+=":";

    if(date.getMinutes() < 10){
        datestr += "0";
    }
    datestr+=""+(date.getMinutes());

    return datestr;
}

$.insertInTextarea=function(myField, myValue) {
    //IE 浏览器  
    if (document.selection) {  
        myField.focus();  
        sel = document.selection.createRange();
        sel.text = myValue;  
        sel.select();  
    }
     //FireFox、Chrome等  
    else if (myField.selectionStart || myField.selectionStart == '0') {  
        var startPos = myField.selectionStart;  
        var endPos = myField.selectionEnd; 
        // 保存滚动条  
        var restoreTop = myField.scrollTop;  
        myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);  
        if (restoreTop > 0) {  
            myField.scrollTop = restoreTop;  
        }  
        myField.focus();  
        myField.selectionStart = startPos + myValue.length;  
        myField.selectionEnd = startPos + myValue.length;
    } else {  
        myField.value += myValue;
        myField.focus();
    }  
}