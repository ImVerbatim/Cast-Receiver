const context = cast.framework.CastReceiverContext.getInstance();
//const control = cast.framework.ui.Controls.getInstance();
const PlayerManager = context.getPlayerManager();
let playerElement = document.getElementsByTagName("cast-media-player")[0];

var loadingImageIsOn = false;

const playerData = {};
const playerDataBinder = new cast.framework.ui.PlayerDataBinder(playerData);

// Update ui according to player state
playerDataBinder.addEventListener(
    cast.framework.ui.PlayerDataEventType.STATE_CHANGED,
    e => {
      switch (e.value) {
        case cast.framework.ui.State.LAUNCHING:
          console.log("LAUNCHING");
          loadingImageIsOn = true;
          loadingImageUI('visible');
          
        case cast.framework.ui.State.IDLE:
          // Write your own event handling code
          console.log("IDLE");
          break;
        case cast.framework.ui.State.LOADING:
          // Write your own event handling code
          console.log("LOADING");
          break;
        case cast.framework.ui.State.BUFFERING:
          // Write your own event handling code
          console.log("BUFFERING");
          break;
        case cast.framework.ui.State.PAUSED:
          // Write your own event handling code

          console.log("PAUSED");
          pauseButtonUI('visible');
          break;
        case cast.framework.ui.State.PLAYING:
          // Write your own event handling code
          pauseButtonUI("hidden");
          console.log("PLAYING");

          break;
      }
    });

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

context.start();