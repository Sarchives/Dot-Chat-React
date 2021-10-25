import { createRef, useEffect, useState } from "react";

function Messages(props) {
  const [messages, setMessages] = useState([]);
  const scroll = createRef();

  useEffect(() => {
    props.ws.onmessage = (event => {
      const data = JSON.parse(event.data);
      if(props.channel === data.channel) {
      setMessages(messages => messages.concat(data.message));
      }
    });
  }, [props.ws]);

  useEffect(() => {
    fetch(props.domain + '/guilds/' + props.guild + '/channels/' + props.channel + '/messages', {
      headers: new Headers({
        'Authorization': localStorage.getItem('token')
      })
    })
      .then(res => res.json())
      .then(result => {
        setMessages(result);
      }
      )
  }, [props.channel]);

  useEffect(() => {
    scroll.current.scrollTop = 9007199254740991;
  }, [messages]);

  return (<div className="messagesScroll" ref={scroll}>
    <div className="messages">
      {messages.map(message =>
        <div className="bubbleContainer" key={message.id}>
          <img src={'http://localhost:3000/icons/' + message.author.id + '.png'} alt={message.author.username} className="bubblePfp"></img>
          <div className="postPfp">
            <h4 className="bubbleUsername">{message.author.nickname ?? message.author.username}</h4>
            <h5 className="bubble">{message.content}</h5>
          </div>
        </div>)}
    </div>
  </div>);
}

export default Messages;