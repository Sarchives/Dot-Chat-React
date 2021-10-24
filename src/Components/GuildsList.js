import { createRef, useEffect, useState } from "react";

function GuildsList(props) {
    const [guildsLoaded, setGuildsLoaded] = useState(false);
    const [guildImage, setGuildImage] = useState(new Map());
    const [guilds, setGuilds] = useState([]);

    useEffect(() => {
      props.guilds.forEach((guildO, index) => {
        setGuilds(preGuilds => {
          let guilds = [...preGuilds];
          guilds.push(guildO);
        guilds[guilds.length - 1].ref = createRef();
        return guilds;
        });
        fetch(props.domain + '/icons/' + guildO.id + '.png')
        .then(res => {
          if(res.status === 200) {
            setGuildImage(preMap => { 
              let map = new Map(preMap);
              map.set(guildO.id, <img src={props.domain + '/icons/' + guildO.id + '.png'} className="guildIcon" alt="icon"></img>);
              return map;
            });
          } else {
            setGuildImage(preMap => { 
              let map = new Map(preMap);
              map.set(guildO.id, <div>{guildO.name.split('')[0]}</div>);
              return map;
            });
          }
          if(props.guilds.length === (index + 1)) {
            setGuildsLoaded(true);
          }
          }
        )
      });
    }, []);

    if(guildsLoaded) {
    return (<div className="guildsList">
    <button disabled={props.homeButtonDisabled} className="fluentIcon guildsListButtons guildsListFirstButton guildsListSpecialButton" onClick={() => {
      if(props.guild) {
        guilds[guilds.findIndex(x => x.id === props.guild)].ref.current.disabled = false;
      }
      props.setHomeButtonDisabled(true);
      props.setChannel('');
      props.setGuild('');
    }}>&#xf489;</button>
    {Object.values(guilds).map(guildO => <button ref={guildO.ref} className="guildsListButtons" key={guildO.id} onClick={() => {
      if(props.guild) {
      guilds[guilds.findIndex(x => x.id === props.guild)].ref.current.disabled = false;
      }
      if(props.homeButtonDisabled) {
        props.setHomeButtonDisabled(false);
      }
      props.setChannel('');
      props.setGuild(guildO.id);
      guilds[guilds.findIndex(x => x.id === guildO.id)].ref.current.disabled = true;
    }}>{guildImage.get(guildO.id)}</button>)}
    <button className="fluentIcon guildsListButtons guildsListBottom guildsListSpecialButton">&#xf10b;</button>
  </div>);
    } else {
      return(<div className="guildsList"></div>);
    }
}

export default GuildsList;