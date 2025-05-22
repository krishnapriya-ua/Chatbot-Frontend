import { useState } from "react";
import { Button } from "@mui/material";
import './chatbot.css';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios'
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';


const SpeechRecognition=(window as any).SpeechRecognition||(window as any).webkitSpeechRecognition
const recognition = new SpeechRecognition()
recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = 'en-US'
recognition.maxAlternatives = 1;

export default function Chatbot() {

  const [inputText,setInputText] = useState('')
  const [messages,setMessages] = useState<{role:"user" | "bot"; text:string}[]>([])
  const [audioEnabled,setAudioEnabled] = useState(false)

  const handleMicClick=()=>{
    recognition.start()
  }

  recognition.onresult=(event :any)=>{
    const speechResult=event.results[0][0].transcript
    setInputText(speechResult)
    console.log('SpeechResult',speechResult)
  }

  recognition.onspeechend = () => {
  recognition.stop();
  };

  recognition.onerror = (event :any)=>{
    console.log('Error recognizing the voice',event.error)
  }

  const SpeakText = (text :string)=>{
    if("SpeechSynthesis" in window){
      const utterThis = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterThis)
    }
  }

  const SendMessage = async()=>{
    
    if(!inputText.trim()) return
    const userMessage=inputText
    setInputText('')

    setMessages((prev)=>[...prev,{role:'user',text:userMessage}])

    try {

    const response = await axios.post('http://localhost:5000/api/chat',
      {message:userMessage},
      {headers:{'Content-Type':'application/json'}}
    )

    const reply = response.data.reply

    setMessages((prev)=>[...prev,{role:'bot',text:reply}])

    if(audioEnabled){
      SpeakText(reply)
    }
    

    setInputText('')
    } catch (error) {
      console.log(error)
    }
    
  }

  


  return (
    <div className="container">
      <div className="chatbox rounded shadow-sm">

        <div className="chat-body p-3" id="chat-body">
            {messages.map((m,i)=>(
              <div key={i} className={`message ${m.role}`}>{m.text}</div>
            ))}       
        </div>

        <div className="chat-footer d-flex p-2 gap-2 align-items-center">
          <input
            type="text"
            placeholder="Ask anything here"
            className="form-control"
            style={{fontSize:'small'}}
            value={inputText}
            onChange={(e)=>setInputText(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key==='Enter') SendMessage()
            }}
          />
          <Button variant="contained" onClick={handleMicClick} style={{minWidth: '20px',background:'black'}}>
            <MicIcon  fontSize="small"  />
          </Button>
          <Button variant="contained" onClick={SendMessage} style={{minWidth: '20px',background:'black'}}>
            <SendIcon fontSize="small" />
          </Button>
          <Button
          variant="contained"
          onClick={() => setAudioEnabled((prev) => !prev)}
          style={{ minWidth: '20px',background:'black' }}>
          {audioEnabled ? <VolumeUpIcon  fontSize="small"/> : <VolumeOffIcon fontSize="small"/>}
          </Button>
        </div>
      </div>
    </div>
  );
}
