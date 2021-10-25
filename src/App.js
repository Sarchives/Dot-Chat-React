import { useEffect, useState } from 'react';
import GuildsList from './Components/GuildsList';
import ChannelsList from './Components/ChannelsList';
import Messages from './Components/Messages';
import MessageBox from './Components/MessageBox';
import MainPage from './Components/MainPage';

const domain = 'http://localhost:3001';

let ws = new WebSocket('ws://' + domain.split('//')[1] + '/socket');

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [webSocketConnected, setWebSocketConnected] = useState(false);
  const [guilds, setGuilds] = useState([]);
  const [homeButtonDisabled, setHomeButtonDisabled] = useState(true);
  const [guild, setGuild] = useState('');
  const [channel, setChannel] = useState('');

  useEffect(() => {
  ws.onopen = (() => {
    console.log('[WEBSOCKET] WebSocket connected');
    setWebSocketConnected(true);
  });

  ws.onclose = (() => {
    if(loggedIn) {
    window.location.reload();
    }
  });

  ws.onerror = (() => {
    if(loggedIn) {
    window.location.reload();
    }
  });
}, [loggedIn]);

  useEffect(() => {
    if(localStorage.getItem("token")) {
      fetch(domain + '/guilds', {
        headers: new Headers({
          'Authorization': localStorage.getItem('token')
        })
      })
      .then(res => res.json())
      .then(result => {
          if(Array.isArray(result)) {
          setGuilds(result);
          setLoggedIn(true);
          ws = new WebSocket('ws://' + domain.split('//')[1] + '/socket?token=' + localStorage.getItem('token'));
          }
        })
    }
  }, []);

  if(webSocketConnected) {
  return (
    <>
    <GuildsList domain={domain} guilds={guilds} guild={guild} setGuild={setGuild} setChannel={setChannel} homeButtonDisabled={homeButtonDisabled} setHomeButtonDisabled={setHomeButtonDisabled}></GuildsList>
    <div className="actualContent">
    {guild ? (
      <>
    <ChannelsList domain={domain} guild={guild} channel={channel} setChannel={setChannel}></ChannelsList>
    {channel ? <>
    <Messages domain={domain} guild={guild} channel={channel} ws={ws}></Messages>
    <MessageBox domain={domain} guild={guild} channel={channel}></MessageBox>
    </> : null}
    </>
    ) : <MainPage></MainPage>}
</div>
    </>
  );
  } else {
    if(loggedIn) {
      return (<h1>Loading...</h1>);
    } else {
      return null;
    }
  }
}

export default App;
