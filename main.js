import {
  generateKeyPair
} from "crypto";

//options
const CLIENT_ID = '688440605640-n8pvgsurus1hcq9v9unkuv7kctboamrs.apps.googleusercontent.com'
//quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest/"];
//scopes
var SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';
var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');
var content = document.getElementByID('content');
var channelForm = document.getElementByID('channel-form');
var channelInput = document.getElementByID('channel-input');
var videoContainer = document.getElementByID('video-container');
var defaultChannel= 'bellaandgracehair';

function handleClientLoad() {
  gapi.load('client:auth2', intiClient);

  //API client Library
  function inticlient() {
    gapi.client.init({
      discoveryDocs: DISCOVERY_DOCS,
      clientID: CLIENT_ID,
      scope: SCOPES
    }).then(() => {
      // listener for signin and signout
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      //Signin handler
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      authorizeButton.onclick = handleAuthClick;
      signoutButton.onclick = handleSignoutClick;
    });
  }
}
//property signin update
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display='none';
    signoutButton.style.display='block';
    content.style.display='block';
    videoContainer.style.display='block';
    getChannel(defaultChannel);
  } else {
    authorizeButton.style.display='block';
    signoutButton.style.display='none';
    content.style.display= 'none';
    videoContainer.style.display='block';
  }
}
//login handle
function handleSignoutClick(){
    gapi.auth2.getAuthinstance().signOut();
}
//Channel API
function getChannel(channel){
    gapi.client.youtube.channels.list({
        part:'snippet,contentDetails,statistics',
        forUsername:channel
    })
    .then(response =>{
       console.log(response);
       const channel= reponse.result.items[0];
       
       const output=`
       <ul class="collection">
       <li class ="collection-item">ID: $(channel.id)</li>
       </ul>`;
    })
    .catch(err => alert('Sorry,channel doesnt exsist'));
}
