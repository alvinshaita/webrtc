## WebRTC basics
### Basic concepts of webrtc


To serve the html file, use:

`./run.sh` on unix or

`python3 -m http.server 8000` anywhere

The basics of webrtc can then be observed from you browser at:

`127.0.0.1:8000`


This is probably the most basic version of webrtc application.

Basically what you'll be observing is your webcam video stream being sent from one peer to another.

Two video outputs, the left one is the local webcam video stream, directly from the first peer's webcam, and the one on the right is a video stream received by another peer, from the first peer.

We have two peers, the first one who is streaming video from the webcam, and sending it through a WebRTC connection, between the two peers, and the second one who is receiving the video stream from the first peer.

Interesting stuff!! I know :)
