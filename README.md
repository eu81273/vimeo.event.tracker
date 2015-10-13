# vimeo.event.tracker
Vimeo Event Tracker (Flash/Universal embed supported) for Google Analytics/Universal Analytics/Google Tag Manager.

## Usage
Include the script just before the `</body>` tag.

    Flash and JS security restrictions will prevent the API from working when run locally, so you have to run this on a web server instead of open directly in your browser.

### Basic
```html
<body>
<iframe src="https://player.vimeo.com/video/22439234?api=1&player_id=vimeo-player-1" id="vimeo-player-1" width="640" height="390" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
<iframe src="https:////player.vimeo.com/video/22439234?api=1&player_id=vimeo-player-2" id="vimeo-player-2" width="640" height="390" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

<script src="vimeo.event.tracker.ga.min.js"></script>
</body>
```

### Basic event trackers
* Category: Vimeo
* Action:
  * **play**: when the video starts playing.
  * **pause**: when the video is paused.
  * **finish**: when the video reaches 100% completion.
* Label: URL of embedded video on Vimeo.


### Progress event trackers

* Category: Vimeo
* Action:
  * **playProgress 25%**: when the video reaches 25% of the total video time.
  * **playProgress 50%**: when the video reaches 50% of the total video time.
  * **playProgress 75%**: when the video reaches 75% of the total video time.
* Label: URL of embedded video on Vimeo.

## Browser Support
Tested in the latest versions of Chrome, Firefox, Safari, and IE8+.

## Changelog
### 1.0.1:
 * Fix JSON parsing error.

### 1.0.0:
 * Initial release.

## License
Licensed under the MIT license.

Copyright (c) 2014 - 2015 AHN JAE-HA.
