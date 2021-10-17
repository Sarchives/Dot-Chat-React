import { useEffect, useState } from 'react';
import GuildsList from './Components/GuildsList';
import ChannelsList from './Components/ChannelsList';
import Messages from './Components/Messages';
import Dashboard from './Components/Dashboard';

const domain = 'http://localhost:3001';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [guilds, setGuilds] = useState([]);
  const [error, setError] = useState(null);
  const [guild, setGuild] = useState('');
  const [channel, setChannel] = useState('');

  useEffect(() => {
    if(localStorage.getItem("token")) {
      fetch(domain + '/guilds', {
        headers: new Headers({
          'Authorization': localStorage.getItem('token')
        })
      })
      .then(res => res.json())
      .then(
        (result) => {
          setGuilds(result);
          setLoggedIn(true);
        },
        (error) => {
          setError(error);
        }
      )
    }
  }, []);

  if(loggedIn && !error) {
  return (
    <>
    <GuildsList domain={domain} guilds={guilds} guild={guild} setGuild={setGuild}></GuildsList>
    <div className="actualContent">
    {guild ? (
      <>
    <ChannelsList domain={domain} guild={guild} channel={channel} setChannel={setChannel}></ChannelsList>
    {channel ? <Messages guild={guild} channel={channel}></Messages> : <div>Watermelon sugar high</div>}
    </>
    ) : <Dashboard></Dashboard>}
</div>
    </>
  );
  } else if(error) {
    return ("Something went terribly wrong.");
  } else {
    return (<>
    <h1>Log in to Dot Chat</h1>
    <h4>...using your Dot Account</h4>
    </>);
  }
}

export default App;
