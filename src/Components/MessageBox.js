import { useEffect, useState } from "react";

function MessageBox(props) {
    const [channelName, setChannelName] = useState('');

    useEffect(() => {
      fetch(props.domain + '/guilds/' + props.guild + '/channels/' + props.channel, {
        headers: new Headers({
          'Authorization': localStorage.getItem('token')
        })
      })
      .then(res => res.json())
      .then(result => {
        setChannelName(result.name);
        }
      )
    }, [props.channel]);

   return (<div className="messageBoxContainer"><input type="text" placeholder={'Write a message to #' + channelName} className="messageBox"></input><button className="sendButton fluentIcon">&#xf6a4;</button></div>);
}

export default MessageBox;