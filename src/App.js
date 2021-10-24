import { useEffect, useState } from 'react';
import GuildsList from './Components/GuildsList';
import ChannelsList from './Components/ChannelsList';
import Messages from './Components/Messages';
import MessageBox from './Components/MessageBox';
import Dashboard from './Components/Dashboard';

const domain = 'http://localhost:3001';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [guilds, setGuilds] = useState([]);
  const [error, setError] = useState(null);
  const [homeButtonDisabled, setHomeButtonDisabled] = useState(true);
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
          if(Array.isArray(result)) {
          setGuilds(result);
          setLoggedIn(true);
          } else {
            setError(result);
          }
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
    <GuildsList domain={domain} guilds={guilds} guild={guild} setGuild={setGuild} setChannel={setChannel} homeButtonDisabled={homeButtonDisabled} setHomeButtonDisabled={setHomeButtonDisabled}></GuildsList>
    <div className="actualContent">
    {guild ? (
      <>
    <ChannelsList domain={domain} guild={guild} channel={channel} setChannel={setChannel}></ChannelsList>
    {channel ? <>
    <Messages domain={domain} guild={guild} channel={channel}></Messages>
    <MessageBox domain={domain} guild={guild} channel={channel}></MessageBox>
    </> : null}
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
