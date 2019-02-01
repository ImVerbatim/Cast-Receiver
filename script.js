const context = cast.framework.CastReceiverContext.getInstance();
//const control = cast.framework.ui.Controls.getInstance();
const PlayerManager = context.getPlayerManager();
let playerElement = document.getElementsByTagName("cast-media-player")[0];



const playerData = {};
const playerDataBinder = new cast.framework.ui.PlayerDataBinder(playerData);

// Update ui according to player state
playerDataBinder.addEventListener(
    cast.framework.ui.PlayerDataEventType.STATE_CHANGED,
    e => {
      switch (e.value) {
        case cast.framework.ui.State.LAUNCHING:
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

    function pauseButtonUI(doThis){
      document.getElementById('pause-Button').style.visibility = doThis;
    }

context.start();