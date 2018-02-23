

/*------------------------*/
/*-----> VARIABLES  <-----*/
/*------------------------*/
var creativeId = "HTMLResponsiveRichMediaBanner";
var creativeVersion = "1.1.0";
var lastModified = "2017-03-27";
var lastUploaded = "2017-03-27";
var templateVersion = "1.0.01";
var scrollPos = {x:undefined, y:undefined};
var adId, rnd, uid;


/*********************************
HTML5 Event System - Do Not Modify
*********************************/
var listenerQueue;
var creativeIFrameId;

function addCustomScriptEventListener(eventName, callback, interAd) {
    listenerQueue = listenerQueue || {};
    var data = {
        uid             : uid,
        listenerId      : Math.ceil(Math.random() * 1000000000),
        eventName       : eventName,
        interAd         : !!(interAd),
        creativeIFrameId: creativeIFrameId
    };
    EB._sendMessage("addCustomScriptEventListener", data);
    data.callback = callback;
    listenerQueue[data.listenerId] = data;
    return data.listenerId;
}

function dispatchCustomScriptEvent(eventName, params) {
    params                  = params || {};
    params.uid              = uid;
    params.eventName        = eventName;
    params.creativeIFrameId = creativeIFrameId;
    EB._sendMessage("dispatchCustomScriptEvent", params);
}

function removeCustomScriptEventListener(listenerId) {
    var params = {uid : uid,listenerId:listenerId,creativeIFrameId: creativeIFrameId};
    EB._sendMessage("removeCustomScriptEventListener", params);
    if (listenerQueue[listenerId]) delete listenerQueue[listenerId];
}

function eventManager(event) {
    var msg = JSON.parse(event.data);
    if(msg.type && msg.data && (!uid || (msg.data.uid && msg.data.uid == uid))) {
        switch (msg.type) {
            case "sendCreativeId":
                creativeIFrameId = msg.data.creativeIFrameId;
                addCustomScriptEventListener('pageScroll', onPageScroll);
                EB._sendMessage("dispatchScrollPos",{uid: uid});
                if(creativeContainerReady) creativeContainerReady();
            break;
            case "eventCallback": // Handle Callback
                var list    = msg.data.listenerIds;
                var length  = list.length;
                for (var i = 0; i < length; i++){
                    try {
                        var t = listenerQueue[list[i]];
                        if (!t) continue;
                        t.callback(msg.data);
                    } catch (e){}
                }
            break;
        }
    }
}

window.addEventListener("message",function(){try{eventManager.apply(this, arguments);}catch(e){}},false);
/*************************************
End HTML5 Event System - Do Not Modify
*************************************/


/*------------------------------*/
/*-----> BASE FORMAT CODE <-----*/
/*------------------------------*/
/*******************
UTILITIES
*******************/
function setCreativeVersion() {EB._sendMessage("setCreativeVersion", {creativeId: creativeId, creativeVersion: creativeVersion, creativeLastModified: lastModified, uid: uid});}

function onPageScroll(event) {
    // use scrollPos anywhere to know the current x/y coordinates.
    scrollPos.x = event.scrollXPercent;
    scrollPos.y = event.scrollYPercent;

    console.log("scroll position Y: " + scrollPos.y);
}


function initializeGlobalVariables() {
    try {adId = EB._adConfig.adId;} catch (Error) {}
    try {rnd = EB._adConfig.rnd;} catch (Error) {}
    try { uid = EB._adConfig.uid;} catch (Error) {}
}




/*----------------------------*/
/*-----> INITIALIZATION <-----*/
/*----------------------------*/
function checkIfAdKitReady(event) {
    try{
        if (window.localPreview) {
            window.initializeLocalPreview(); //in localPreview.js
            init();
            return;
        }
    }catch(e){}

    adkit.onReady(init);
}

window.addEventListener("load", checkIfAdKitReady);



    
