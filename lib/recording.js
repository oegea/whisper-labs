import { getLocalStorage } from "@/lib/utils";


let mediaRecorder;
let audioChunks = [];

const getNavigator = () => {
  try{
    return navigator
  } catch(e){
    return null
  }
}

const setupMediaRecorder = () => {
  if (mediaRecorder) return Promise.resolve(null)
  return getNavigator()?.mediaDevices?.getUserMedia({ audio: {
    echoCancellation: false, // Desactivar la cancelación de eco
    noiseSuppression: false, // Desactivar la supresión de ruido
    autoGainControl: true // Desactivar el control automático de ganancia
  } })
    .then(stream => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
      };
      mediaRecorder.onstop = () => {
        if (window.onTranscription === null) return;
        const audioBlob = new Blob(audioChunks);
        enviarAudioOpenAI(audioBlob, window.onTranscription); // Función para enviar este blob a OpenAI
        audioChunks = []; // Resetear para la próxima grabación
      };
    });
}

export async function record(onTranscription) {
  await setupMediaRecorder()
  if (mediaRecorder) {
    if (mediaRecorder.state === "recording") {
      window.onTranscription = null;
      mediaRecorder.stop();
    }
    mediaRecorder.start();
    setTimeout(async () => {
      if (mediaRecorder.state === "recording") {
        window.onTranscription = onTranscription;
        mediaRecorder.stop();
        // record(onTranscription); // Reiniciar la grabación
      }
    }, 20000); // Detener después de 20 segundos
  }
}

async function enviarAudioOpenAI(audioBlob, onTranscription) {
  const formData = new FormData();
  formData.append("file", audioBlob, "audio.mp3");
  formData.append("model", "whisper-1");

  try {
    const respuesta = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer "+getLocalStorage()?.getItem("openai-key")
      },
      body: formData
    });
    const data = await respuesta.json();
    onTranscription(data.text)
    
  } catch (error) {
    console.error("Error al enviar audio a OpenAI:", error);
  }
}