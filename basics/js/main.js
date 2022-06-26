const configuration = {
	iceServers: [{urls: "stun:stun.1.google.com:19302"}]
};

let peerConnection1 = null
let peerConnection2 = null
let stream = null
let video1 = document.getElementById('video1')
let video2 = document.getElementById('video2')


startButton.onclick = () => {
	peerConnection1 = new RTCPeerConnection(configuration);
	console.log("create peerConnection1")
	peerConnection2 = new RTCPeerConnection(configuration);
	console.log("create peerConnection2")

	peerConnection2.ontrack = function (event) {
		console.log("peerConnection2 received a track:", event.track.kind)

		if (event.track.kind == 'video') {
			video2.srcObject = event.streams[0]
			video2.autoplay = true
			video2.controls = true
			video2.muted = true
		}
	}

	peerConnection1.onicecandidate = function (event) {
		peerConnection2.addIceCandidate(event.candidate)
	}

	peerConnection2.onicecandidate = function (event) {
		peerConnection1.addIceCandidate(event.candidate)
	}

	navigator.mediaDevices.getUserMedia({ video: true, audio: true })
	.then(s => {
		stream = s
		video1.srcObject = s
		video1.autoplay = true
		video1.controls = true
		video1.muted = true
	})
	.catch(error => console.log(error));
}


connect.onclick = () => {
	var tracks = stream.getTracks();
	tracks.forEach(track => peerConnection1.addTrack(track, stream))

	console.log("peerConnection1 creates offer")
	peerConnection1.createOffer()
	.then(offer => {

		peerConnection1.setLocalDescription(offer)
		console.log("peerConnection1 sets local description")
		peerConnection2.setRemoteDescription(offer)
		console.log("peerConnection2 sets remote description")



		peerConnection2.createAnswer()
		.then(answer => {
			peerConnection2.setLocalDescription(answer)
			console.log("peerConnection2 sets local description")
			peerConnection1.setRemoteDescription(answer)
			console.log("peerConnection2 sets remote description")
		})

	})
}


stopit.onclick = () => {
	peerConnection1 = null
	peerConnection2 = null

	// remove local video
	video1.autoplay = false
	video1.controls = false
	video1.srcObject = null

	// remove remote video
	video2.autoplay = false
	video2.controls = false
	video2.srcObject = null
}
