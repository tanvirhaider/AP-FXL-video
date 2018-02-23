

// @codekit-prepend  "TweenMax.min.js"
// @codekit-prepend  "willow_ad_creator_v1.01.js"
// @codekit-prepend  "vdoplayer-sizmek.js"
// @codekit-append  "sizmek.js"

/*------------------------*/
/*-----> VARIABLES  <-----*/
/*------------------------*/
var timer;
var fromBegining = true;
var isPlayer = false;
var getTime;
var vidURL = "assets/video/client-vdo.mp4";
var stillFrame = "assets/images/posterFrame.jpg";
var adType = "box"; // box, fullBleed

//console.log(DEBUG);

 // ------ function to break down seconds into minutes and hours -------------
    function getTimeBreakDown (seconds) {
      var h = Math.floor(seconds / 3600);
      var m = Math.floor((seconds % 3600) / 60);
      var s = Math.floor(seconds % 60);

      if (h<10) { h = String("0" + h);}
      if (m<10) { m = String("0" + m);}
      if (s<10) { s = String("0" + s);}

      var timeObject = {"hours":h,"minutes":m,"seconds":s};
      return timeObject;
    }



var currentWidthOfSite;




function init () {
  // starting of the  canvas of the ad unit ------------------
  console.log("------------- NYT FXL ---------------")
  var stage = new Stage({
      id:"willow-ad-stage",
      class: "stageStyle"
  });

  var adContainer = new Sprite({
      id:"adContainer",
      class: "adContainerStyle",
      position:"absolute",
      container:stage,
      mousemove: {function: stageMouseMovement}
  });

  var videoStillShot;

  if (adType == "box") {
    videoStillShot = new Sprite({
      id:"videoStillShot",
      class: "videoStillShotStyle square",
      container:adContainer.obj
    });
  }
  else {
    videoStillShot = new Sprite({
      id:"videoStillShot",
      class: "videoStillShotStyle fullBleed",
      container:adContainer.obj
    });
  }



  var videoContainer = new Sprite({
        id:"videoContainer",
        class: "videoContainerStyle",
        container:adContainer.obj
  });

  var centerElements = new Sprite({
        id:"centerElements",
        class: "centerElementsStyle",
        container:adContainer.obj,
        click: {function: onCtaClk}
  });


  var contentHolder = new Sprite({
    id:"contentHolder",
    class: "contentHolderStyle",
    container:centerElements.obj
  });


  var logo = new Sprite({
    id:"logo",
    class: "logo-style",
    container:contentHolder.obj,
    click: {function: onCtaClk}
  });



  var Headline = new Sprite({
    id:"Headline",
    class: "headline-style",
    container:contentHolder.obj,
    text: {
      content: "OPENING HEARTS AND MINDS THROUGH TRAVEL. THIS IS WHY WE SAIL.",
      class: "headline_copy_style no-select"
    }
  });

  var sub_headline = new Sprite({
    id:"sub_headline",
    class: "subheadline-style",
    container:contentHolder.obj,
    text: {
      content: "At Holland America Line, we believe that travel is more than an itinerary. It’s a chance to build connections and bring the world closer together.",
      class: "sub_headline_copy_style no-select"
    }
  });

    var cta = new Sprite({
      id:"cta",
      class: "ctaStyle",
      container:adContainer.obj,
      text: {
          id:"cta-copy",
          content: "LEARN MORE",
          class: "cta_copy_style no-select"
      },
      click: {function: onCtaClk}
    });


  var ph = new Sprite({
      id:"ph",
      class: "playerHolderStyle",
      container:videoContainer.obj,
      click: {function: onCtaClk}
  });


          
  var vidPlayer = new createVideoPlayer ({
    container:ph.obj,
    source:vidURL,id:"tannisvidplayer",
    autoplay:false,
    muted: true,
    callBack:callBackFunction
  });


  
  function stageMouseMovement (event) {
    if (isPlayer) {
      
      var adStage = document.getElementById("willow-ad-stage");
      var currentWidthOfSite = adStage.clientWidth;

      if (currentWidthOfSite >= 975) {
          if ((event.clientY < 500) && (event.clientY > 10) && (event.clientX < (currentWidthOfSite-100)) && (event.clientX > 100))
          {
            TweenMax.set(controllerBtn.obj,{alpha:1});
            console.log("show play icon");
          }
        else {
          TweenMax.set(controllerBtn.obj,{alpha:0});
          console.log("hide play icon");
        }
      }
     
    }
  }

  function callBackFunction (event) {

    centerElements.obj.style.display = "block";
    vdo_progress_holder.obj.style.opacity = "0";
    videoStillShot.obj.style.visibility = "visible";
    videoContainer.obj.style.visibility = "hidden";
    controllerBtn.obj.classList.remove('centerit');


    fromBegining = true;
    clearInterval(timer);
    isPlayer = false;
    document.getElementById("controllerBtn").classList.add('vdo-button-play');
    document.getElementById("controllerBtn").classList.remove('vdo-button-pause');
    document.getElementById("controllerBtn").style.display = "block";
    document.getElementById("progressBar").style.width = 0 + "%";

    TweenMax.set(controllerBtn.obj,{alpha:1});

    if (adType == "box") {
      videoControllerHolder.obj.classList.add('square');
      videoControllerHolder.obj.classList.remove('fullBleed');
    }

    
  }


  function stillClicked (event) {
    EB.clickthrough(); 
  }

  var videoControllerHolder;
  if (adType == "box") {
    videoControllerHolder = new Sprite({
      id:"videoControllerHolder",
      class: "videoControllerHolderStyle square",
      container:adContainer.obj
    });
  }
  else {
    videoControllerHolder = new Sprite({
      id:"videoControllerHolder",
      class: "videoControllerHolderStyle fullBleed",
      container:adContainer.obj
    });

  }

  var controllerBtn = new Sprite({
    element: "button",
    id:"controllerBtn",
    class:"vdo-button",
    position:"aboslute",
    container:videoControllerHolder.obj,
    z: 9999,
    click: {function: playPauseClicked}
  });



  function video_state_play () {
    isPlayer = true;

    console.log("video playing");
    videoStillShot.obj.style.visibility = "hidden";
    videoContainer.obj.style.visibility = "visible";
    TweenMax.set(ph.obj,{alpha:1});
    vdo_progress_holder.obj.style.opacity = "1";
    controllerBtn.obj.classList.add('centerit');
    controllerBtn.obj.classList.add('vdo-button-pause');
    controllerBtn.obj.classList.remove('vdo-button-play');
    videoControllerHolder.obj.classList.remove('square');
    videoControllerHolder.obj.classList.add('fullBleed');
    centerElements.obj.style.display = "none";

    
    if (fromBegining) {vidPlayer.newVideo(vidURL,stillFrame);} 
    else {vidPlayer.play();}
    timer = setInterval(function(){ update_playHead_position(); }, 1000);
    fromBegining = false;
  }

  function video_state_paused () {
    isPlayer = false;

    console.log("video is paused");
    controllerBtn.obj.style.opacity = "1";
    videoContainer.obj.style.visibility = "hidden";
    videoStillShot.obj.style.visibility = "visible";
    controllerBtn.obj.classList.add('vdo-button-play');
    controllerBtn.obj.classList.remove('vdo-button-pause');
    controllerBtn.obj.classList.remove('centerit');
    centerElements.obj.style.display = "block";

    if (adType == "box") {
      videoControllerHolder.obj.classList.add('square');
      videoControllerHolder.obj.classList.remove('fullBleed');
    }
    
    vidPlayer.pause();
    clearInterval(timer);
  }


  function playPauseClicked (event) {
    if (!isPlayer) { video_state_play ();}
    else { video_state_paused ();}
  }

  function pauseThe_vid (event) {
    console.log("pause the video");
    vidPlayer.pause();
    controllerBtn.obj.classList.add('vdo-button-play');
    controllerBtn.obj.classList.remove('vdo-button-pause');
    controllerBtn.obj.style.opacity = "1";
    isPlayer = false;

    clearInterval(timer);
  }


  // -------- video progress bar -------------------------------------

  var vdo_progress_holder = new Sprite({
    id:"vdo_progress_holder",
    class: "vdo-progress-holder",
    position:"absolute",
    container:adContainer.obj,
    click: {function: durationClicked}
  });

  vdo_progress_holder.obj.style.opacity = "0";

  var durationTrack = new Sprite({
    id:"durationTrack",
    class: "track highlight-fix",
    position:"absolute",
    container:vdo_progress_holder.obj
  });

  var progressBar = new Sprite({
    id:"progressBar",
    class: "progress",
    position:"absolute",
    container:durationTrack.obj
  });


 function durationClicked (event) {
    if (videoDuration != null) {
      var durationLength = document.getElementById("durationTrack").offsetWidth;
      var x = event.clientX;
      var y = event.clientY;
      var totalDuration = videoDuration;
      var currentSelectedPlayhead = event.clientX - vdo_progress_holder.obj.offsetLeft;
      var calculatedDistance = (currentSelectedPlayhead/durationLength) * 100;
      var calculatedTime = (totalDuration / 100) * calculatedDistance;
      vidPlayer.updatePlayhead(calculatedTime);
    }
  }

  function update_playHead_position () {
    var currentTimeInSecond = vidPlayer.currentTime();
    var currentTimePercentage = Math.round(currentTimeInSecond/videoDuration * 100);
    progressBar.obj.style.width = currentTimePercentage + "%";
  }


  function onCtaClk(e){
    console.log("click thorugh");
    pauseThe_vid ();
    EB.clickthrough();
  }

  // -------- video progress bar -------------------------------------

  function responsiveSetting (event) {
    console.log("responsive setting triggered");
    var adStage = document.getElementById("willow-ad-stage");
    currentWidthOfSite = adStage.clientWidth;
    if (currentWidthOfSite > 1080) {}
    if ((currentWidthOfSite < 975)&&(currentWidthOfSite >= 705)) {}
    if ((currentWidthOfSite < 705)&&(currentWidthOfSite > 0)) {}
  }


  responsiveSetting ();
  window.addEventListener("resize", responsiveSetting);

  initializeGlobalVariables();
  setCreativeVersion();

}


