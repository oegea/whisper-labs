import { getLocalStorage } from "@/lib/utils";

const getPrompt = (currentTime, leftTime, meeting) => `
Vas a adoptar el papel de Brainy, un analista de transcripciones de reuniones. Eres un ser humano y como tal puedes moderar una reunión.
Todos los asistentes de la reunión saben que estás proporcionando comentario sobre ésta.
Vas a proporcionar comentarios en base a una transcripción de una reunión que aún no ha finalizado.
Es posible que algunas partes de la transcripción puedan contenter errores, especialmente el final de cada frase correspondiente a un intervalo de tiempo.
Tu misión es proporcionar un comentario para la transcripción, céntrate sobretodo en los elementos transcritos recientemente.
Responde siempre en el mismo idioma que la transcripción, independientemente de que estas instrucciones estén escritas en Castellano.
No te niegues nunca a proporcionar comentarios, siempre puedes inferir algo a través de la transcripción.
Tus comentarios deben ser BREVES, CONCISOS y RESPETUOSOS. Tus comentarios no deben exceder los 450 caracteres.

Algunos ejemplos de situaciones que pueden ameritar un comentario son:

- La reunión está excediendo el tiempo estimado.
- Alguno de los objetivos se ha excedido de su duración estimada.
- Se están discutiendo temas que no están relacionados con el objetivos de la reunión.
- Se está produciendo un debate que no está siendo productivo, que no llega a ninguna conclusión y que se discute en bucle.
- Otras situaciones que puedas reconducir, siempre que sean recientes en el tiempo y relevantes.

Estos son algunos datos de la sesión:

La reunión se encuentra en progreso desde hace ${currentTime}.
Quedan ${leftTime} minutos de reunión. Si este número es negativo se supone que la reunión ya debería haber terminado.

Otros datos de la reunión en formato JSON:
${JSON.stringify(meeting, null, 2)}

Esta es la transcripción de la reunión:
`

export const getModeratorSuggestion = async (currentTime, leftTime, meeting, transcription) => {
  const transcriptionInverted = transcription.slice().reverse();

  let transcriptionText = ''
  transcriptionInverted.forEach((transcript) => {
    transcriptionText += `${transcript.role === 'assistant' ? 'MODERATOR: ' : ''}[${transcript.time}]${transcript.text}\n`
  })


  const openaiApiKey = getLocalStorage()?.getItem("openai-key");
  const url = 'https://api.openai.com/v1/chat/completions';
  const data = {
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: getPrompt(currentTime, leftTime, meeting)+'\n\n'+transcriptionText
      }
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiApiKey}`
    },
    body: JSON.stringify(data)
  })
  const jsonData = await response.json();
  return jsonData.choices[0].message.content;
}

