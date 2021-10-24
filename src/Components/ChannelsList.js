import { createRef, useEffect, useState } from "react";

function ChannelsList(props) {
  const [channels, setChannels] = useState([]);

    useEffect(() => {
      fetch(props.domain + '/guilds/' + props.guild, {
        headers: new Headers({
          'Authorization': localStorage.getItem('token')
        })
      })
      .then(res => res.json())
      .then(result => {
        result.channels.forEach((x, i) => {
        setChannels(preChannels => {
            let channels = [...preChannels];
            channels.push(result.channels[i]);
          channels[channels.length - 1].ref = createRef();
          return channels;
          });
        });
        }
      )
    }, []);

   return (<div className="channelsList">{channels.map(channel => <button ref={channel.ref} key={channel.id} className="channel" onClick={() => {
    if(props.channel) {
      channels[channels.findIndex(x => x.id === props.channel)].ref.current.disabled = false;
      }
      props.setChannel(channel.id);
      channels[channels.findIndex(x => x.id === channel.id)].ref.current.disabled = true;
   }}># {channel.name}</button>)}</div>);
}

export default ChannelsList;