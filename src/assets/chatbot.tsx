import { Button } from "@mui/material";
import './chatbot.css';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';

export default function Chatbot() {
  return (
    <div className="container">
      <div className="chatbox rounded shadow-sm">
        

        <div className="chat-body p-3" id="chat-body">
          {/* Example Messages */}
          <div className="message user">Hi!</div>
          <div className="message bot">Hello! How can I help you today?</div>
        </div>

        <div className="chat-footer d-flex p-2 gap-2 align-items-center">
          <input
            type="text"
            placeholder="Ask anything here"
            className="form-control"
            style={{fontSize:'small'}}
          />
          <Button variant="contained" style={{background:'black'}}>
            <MicIcon  fontSize="small"  />
          </Button>
          <Button variant="contained" style={{background:'black'}}>
            <SendIcon fontSize="small" />
          </Button>
        </div>
      </div>
    </div>
  );
}
