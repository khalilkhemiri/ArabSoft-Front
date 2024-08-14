import { Component, OnInit } from '@angular/core';

declare var ZegoUIKitPrebuilt: any;

@Component({
  selector: 'app-meeting',
  template: `<div id="root" style="width: 100vw; height: 100vh;"></div>`,
  styles: []
})
export class MeetingComponent implements OnInit {

  ngOnInit(): void {
    function getUrlParams(url: string) {
      let urlStr = url.split('?')[1];
      const urlSearchParams = new URLSearchParams(urlStr);
      return Object.fromEntries(urlSearchParams.entries());
    }

    const roomID = getUrlParams(window.location.href)['roomID'] || (Math.floor(Math.random() * 10000) + "");
    const userID = Math.floor(Math.random() * 10000) + "";
    const userName = getUrlParams(window.location.href)['username'] || "userName" + userID;
    const appID = 1633619230;
    const serverSecret = "208a0651fc2a554b2ce6d690cacbe4ef";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: document.querySelector("#root"),
      sharedLinks: [{
        name: 'Personal link',
        url: window.location.protocol + '//' + window.location.host  + window.location.pathname + '?roomID=' + roomID,
      }],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      turnOnMicrophoneWhenJoining: false,
      turnOnCameraWhenJoining: false,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: true,
      showTextChat: true,
      showUserList: true,
      maxUsers: 2,
      layout: "Auto",
      showLayoutButton: false,
    });
  }

}
