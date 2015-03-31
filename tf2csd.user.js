// ==UserScript==
// @name        TF2Center Scrub Detector
// @namespace   tf2csd
// @description Very simple and robust script to notify you about scrubs on TF2Center.
// @include     /^(http|https):\/\/tf2center\.com\/lobbies\/[0-9]+$/
// @version     0.11.0
// @grant       GM_xmlhttpRequest
// ==/UserScript==
 
var conjecturalScrubs = document.getElementById('lobbyPanel').getElementsByClassName('filled'), actualScrubs;
 
function detectScrubs() {
        for(var i = 0; i < conjecturalScrubs.length; i++) {
        for(var j = 0; j < actualScrubs.length;      j++) {
                if(conjecturalScrubs[i].getElementsByTagName('a')[0].getAttribute('href').substr(9) == actualScrubs[j]) {
                        var scrubNotification = document.createElement('span');
                        scrubNotification.setAttribute('class', 'darkgrey');
                        scrubNotification.setAttribute('style', 'color: #d4d4d4');
                        scrubNotification.textContent = 'SCRUB!';
                        var scrubDetails = conjecturalScrubs[i].getElementsByClassName('statsContainer')[0];
                        if(!conjecturalScrubs[i].textContent.match(/SCRUB!/)) scrubDetails.insertBefore(scrubNotification, scrubDetails.firstChild);
                }
        }
        }
}
 
GM_xmlhttpRequest({
        method: 'GET',
        url: '',
        onload: function(response) {
                actualScrubs = response.responseText.split('\n');
                setInterval(detectScrubs, 2500);
        },
        onerror: function(response) {
                Notification.requestPermission();
                if(Notification.permission === 'granted') new Notification(response.status + ' ' + response.statusText, { body: 'I failed to load scrublist, sorry.' });
                else alert('I failed to load scrublist, sorry. Maybe this can help: ' + response.status + ' ' + response.statusText);
        }
});