let mediaRecorder;
let audioChunks = [];

document.getElementById("microphone-button").onclick = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = (event) => {
    audioChunks.push(event.data);
  };

  mediaRecorder.onstop = async () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
    await sendAudioToServer(audioBlob);
    audioChunks = [];
  };

  mediaRecorder.start();
  document.getElementById("start").disabled = true;
  document.getElementById("stop").disabled = false;
};



document.getElementById("microphone-button").onclick = () => {
  mediaRecorder.stop();
  document.getElementById("start").disabled = false;
  document.getElementById("stop").disabled = true;
};


async function sendAudioToServer(audioBlob) {
  const formData = new FormData();
  formData.append("file", audioBlob, "recording.wav");

  await fetch("http://127.0.0.1:4000/upload", {
    method: "POST",
    body: formData,
  }).then(response => {
    if (response.ok) {
        console.log(response.text())
      console.log("Audio successfully sent!");
    } else {
      console.error("Error sending audio");
    }
  });
}
