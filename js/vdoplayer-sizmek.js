
var videoContainer;
var video;
var sdkVideoPlayer;
var sdkVideoPlayButton;
var isIOS = (/iPhone|iPad|iPod/i).test(navigator.userAgent);
var videoIsPlaying = false;




var videoDuration = 30;
// Custom Video Player ------------------------------------------------------------------
function createVideoPlayer (vidData)
{
    var playerContainer;
    var videoDuration;
    var FirstQofVid;
    var SecondQofVid;
    var ThirdQofVid;
    var imgW;
    var imgH;

    var quarterlyTracking = new Object();
    quarterlyTracking.Q1 = true;
    quarterlyTracking.Q2 = true;
    quarterlyTracking.Q3 = true;

    if (vidData.container)   { playerContainer = vidData.container;}

    var obj = document.createElement("video");
        obj.setAttribute('id', vidData.id);
        obj.setAttribute('playsinline', '');

        this.obj = obj;

        if (vidData.width) {
            imgW = vidData.width +'px';
            imgH = vidData.height +'px';
        }
        else {
            imgW = "100%";
            imgH = "100%";
        }
     
        //obj.width = vidData.width;
        //obj.height = vidData.height;

        var style = obj.style;
        style.width = imgW;
        style.height = imgH;
        style.position = 'absolute';
        style.objectFit = "cover";

        if (vidData.autoplay)    { obj.autoplay = vidData.autoplay;}
        if (vidData.poster)      { obj.poster = vidData.poster; }
        if (vidData.controls)    { obj.controls = true; }
        if (vidData.muted)       { obj.muted = true;}

     //   obj.playsinline = true;
          
        var sourceMP4 = document.createElement("source"); 
        sourceMP4.type = "video/mp4";
        if (vidData.source) { 
            sourceMP4.src = vidData.source;

        }
        obj.appendChild(sourceMP4);
        playerContainer.appendChild(obj);
        obj.width = imgW;
        obj.height = imgH;

        if (vidData.playwithsound)  { 

         var PlayWitS = new Sprite(
                {
                    id:vidData.id + "_play-with-sound",
                    position:"absolute",
                    container:playerContainer,
                    width: vidData.width,
                    height: vidData.height,
                    image: vidData.playwithsound,
                    click: {function: restartVid}
                });
        }

        if (vidData.endframe) {

            var VendScr = new Sprite(
                {
                    id:vidData.id + "_video-end-frame",
                    container:playerContainer,
                    class: "end-frame-style",
                    image: vidData.endframe,
                    display: "none",
                    click: {function: restartVid}
                });
        }

        obj.addEventListener('ended', function()
        {
            console.log("fire fourth quarter");

            if (vidData.endframe) 
                {
                    VendScr.obj.style.display = "block";
                    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){TweenMax.set(VendScr.obj,{css:{opacity:1}});}
                    else {TweenMax.from(VendScr.obj,1,{css:{opacity:0}});}
                }
            if (vidData.playwithsound) {PlayWitS.obj.style.display = "none";}
            if (vidData.callBack) { vidData.callBack();}
        });

         function activateWithDelay (whichOne)
            {
                window.setTimeout(function(){
                 whichOne = true;
                 //console.log(whichOne);
                 EB.userActionCounter(whichOne);
             },2000);
            }


        obj.addEventListener('timeupdate', function(){

          //  console.log(obj.currentTime);
            var calculatedCurrentTime = Math.round(obj.currentTime);
            if (calculatedCurrentTime == FirstQofVid)
            {
                if (quarterlyTracking.Q1 == true)
                {
                    quarterlyTracking.Q1 = false;
                    //console.log("fire first quarter");
                    activateWithDelay(quarterlyTracking.Q1);
                }
            }

            if (calculatedCurrentTime == SecondQofVid)
            {
                if (quarterlyTracking.Q2 == true)
                {
                    quarterlyTracking.Q2 = false;
                    //console.log("fire second quarter");
                    activateWithDelay(quarterlyTracking.Q2);
                }
            }

             if (calculatedCurrentTime == ThirdQofVid)
            {
                if (quarterlyTracking.Q3 == true)
                {
                    quarterlyTracking.Q3 = false;
                    //console.log("fire third quarter");
                    activateWithDelay(quarterlyTracking.Q3);
                }
            }
        });

         function restartVid (event)
          {
            quarterlyTracking.Q1 = true;
            quarterlyTracking.Q2 = true;
            quarterlyTracking.Q3 = true;
            var desktopVideoPlayer = document.getElementById(vidData.id);
              desktopVideoPlayer.muted = false;
              desktopVideoPlayer.pause();
              desktopVideoPlayer.currentTime = 0;
              desktopVideoPlayer.load();
              if (vidData.playwithsound)    {PlayWitS.obj.style.display = "none";}
              if (vidData.endframe)         {VendScr.obj.style.display = "none";}
          }


        obj.onloadedmetadata = function() {
        videoDuration = obj.duration;
        FirstQofVid = Math.round(videoDuration/4);
        SecondQofVid = Math.round(videoDuration/2);
        ThirdQofVid = Math.round((videoDuration/4) *3);
        audioDuration = obj.duration;

        };


        /*-----> SIZMEK VIDEO CODE <-----*/
     
    // video = document.getElementById(vidData.id);
    // sdkVideoPlayer = document.getElementById("sdk-video-player");
    // sdkVideoPlayButton = document.getElementById("sdk-video-play-button");
    // initVideo();
    // if (isIOS) {centerWebkitVideoControls();}

    //videoContainer = videoContainer;
    video = obj;
    try{var videoTrackingModule = new EBG.VideoModule(video);}
    catch(Error) {}


}

// vidPlayer.newVideo(vdoQueue[whichOne][0],vdoQueue[whichOne][1]);
createVideoPlayer.prototype.newVideo = function(videourl, posterFrame)
{
    var obj = this.obj;
    obj.firstChild.src = videourl;
    obj.currentTime = 0;
    obj.autoplay = true;
    obj.muted = false;
    obj.load();

    try {
        var poster = obj.nextSibling;
        poster.style.display = "none";
        poster.style.backgroundImage = 'url(' + posterFrame + ')';
    }
    catch (Error) {}

   

};

createVideoPlayer.prototype.pause = function()
{
    var obj = this.obj;
    obj.pause();  
};

createVideoPlayer.prototype.play = function()
{
    var obj = this.obj;
    obj.autoplay = true;
    obj.muted = false;
    obj.play();  
};


createVideoPlayer.prototype.updatePlayhead = function(whichOne)
{
    var obj = this.obj;
    obj.currentTime = whichOne;
    obj.autoplay = true;
    obj.muted = false;
    obj.play();  
};

createVideoPlayer.prototype.currentTime = function()
{
    var obj = this.obj;
    return obj.currentTime;
};


createVideoPlayer.prototype.resize = function(w,h)
{
    try {
        var obj = this.obj;
        var vdoPlayerID = obj.id;
        var vdoPlayerEndFrameID = vdoPlayerID + "_video-end-frame";
        obj.height = h;
        obj.width = w;
        obj.style.height = h + "px";
        obj.style.width = w + "px";
        obj.style.backgroundSize = "cover";
        obj.nextElementSibling.style.height = h + "px";
        obj.nextElementSibling.style.width = w + "px";
        obj.nextElementSibling.style.backgroundSize = "cover";
        var poster = obj.nextSibling;
        poster.style.height = h + "px";
        poster.style.width = w + "px";
        poster.style.backgroundSize = "cover";
    }
    catch (Err) {}
  
};

