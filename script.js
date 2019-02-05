const context = cast.framework.CastReceiverContext.getInstance();
//const control = cast.framework.ui.Controls.getInstance();
const PlayerManager = context.getPlayerManager();

PlayerManager.get
const playerData = {};
const playerDataBinder = new cast.framework.ui.PlayerDataBinder(playerData);
var currentTime = PlayerManager.getCurrentTimeSec();


const metadata = new cast.framework.messages.GenericMediaMetadata();
metadata.title = "Title";

// Update ui according to player state
playerDataBinder.addEventListener(
    cast.framework.ui.PlayerDataEventType.STATE_CHANGED,
    e => {
      switch (e.value) {
        case cast.framework.ui.State.LAUNCHING:
          console.log("LAUNCHING");
          
        case cast.framework.ui.State.IDLE:
          // Write your own event handling code
          console.log("IDLE");
          loadingImageUI("hidden");
          break;
        case cast.framework.ui.State.LOADING:
          // Write your own event handling code
          console.log("LOADING");
          break;
        case cast.framework.ui.State.BUFFERING:
          // Write your own event handling code
          console.log(metadata.title);
          console.log("BUFFERING");
          bufferImageUI("visible");
          pauseButtonUI("hidden");
          
          break;
        case cast.framework.ui.State.PAUSED:
          // Write your own event handling code
          currentTime = PlayerManager.getCurrentTimeSec();
          durationTime = PlayerManager.getDurationSec() - currentTime;
          progressBarConfig(currentTime,PlayerManager.getDurationSec(),durationTime);
          console.log("PAUSED");
          pauseButtonUI("visible");
          watermarkImageUI("visible");
          progressBarUI("visible");
          titleUI("visible");
          console.log("TIME: " + currentTime);
          
          

          break;
        case cast.framework.ui.State.PLAYING:
          // Write your own event handling code
          pauseButtonUI("hidden");
          bufferImageUI("hidden");
          watermarkImageUI("hidden");
          progressBarUI("hidden");
          titleUI("invisible");
          console.log("PLAYING");

          break;
      }
    });


    //FUNCTIONS FOR SETTING THE UI
    /**
     * 
     * @param {String} doThis Sets the pause button UI (invisible/visible)
     */
    function pauseButtonUI(doThis){
      document.getElementById('pause-Button').style.visibility = doThis;
    }
    
    /**
     * 
     * @param {String} doThis Sets the splash image button UI (invisible/visible)
     */
    function loadingImageUI(doThis){
      document.getElementById('loading-Image').style.visibility = doThis;
    }


    /**
     * 
     * @param {String} doThis- Sets the buffer image button UI (invisible/visible)
     */
    function bufferImageUI(doThis){
      document.getElementById('buffer-Image').style.visibility = doThis;
    }

    /**
     * 
     * @param {String} doThis- Sets the watermark image button UI (invisible/visible)
     */
    function watermarkImageUI(doThis){
      document.getElementById('watermark').style.visibility = doThis;
    }

    function titleUI(doThis){
      document.getElementById('title-media').style.visibility = doThis;
      document.getElementById('title-media').innerHTML = metadata.title;
    }

    /**
     * 
     * @param {String} doThis- Sets the progress bar image button UI (invisible/visible)
     */
    function progressBarUI(doThis){
      document.getElementById('progress').style.visibility = doThis;
      document.getElementById('currentTime').style.visibility = doThis;
      document.getElementById('durationTime').style.visibility = doThis;

    }



   /**
    * CONFIGURATION FOR A VOD 
    * @param {int} currentTime - current time index of the media 
    * @param {int} fullTime - The full time of the media
    * @param {int} durTime - duration left in the media  
    */
    function progressBarConfig(currentTime, fullTime, durTime){

      //Sets the width of the current time on the progress bar
      var ProgressBarWidth = 100 * (currentTime / fullTime);

      //appends it to the pseudo element in CSS
      var styleElem  = document.head.appendChild(document.createElement("style"));
      styleElem.innerHTML = "#progress:after {width: " + ProgressBarWidth + "%;}";
      console.log("#progress:after {width: " + ProgressBarWidth + "%;}");

      //Set the times
      document.getElementById("currentTime").innerHTML = getTimeUI(currentTime);
      document.getElementById("durationTime").innerHTML = getTimeUI(durTime);
    }

    /**
     * TODO: THIS FUNCTION ASSUMES THE VIDEO IS LESS THAN 10 HOURS LONG.
     * IF THE VIDEO IS MORE THAN 10 HOURS, THE TIME WILL LOOK LIKE 010:00:00
     * @param {int} currentTime - The time passed - could be the duration or the current 
     * time value. 
     */
    function getTimeUI(currentTime){
      let hours = Math.floor(currentTime / 3600);
      currentTime %= 3600;
      let minutes = Math.floor(currentTime / 60);
      let seconds = Math.round(currentTime % 60);
      
      if(minutes < 10){
        if(seconds < 10) {
          return ("0" + hours + ":" + "0" + minutes + ":" + "0" + seconds);
        }
        return ("0" + hours + ":" + "0" + minutes + ":" + seconds);
      }      
      if(seconds < 10) {
        if(minutes < 10){
          return ("0" + hours + ":" + "0" + minutes + ":" + "0" + seconds);
        }
        return ("0" + hours + ":" + minutes + ":" + "0" + seconds);
      }
      if(minutes >= 10 && seconds >= 10) {
        return ("0" + hours + ":" + minutes + ":" + seconds);
      }
    }



context.start();