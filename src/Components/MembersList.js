import { useEffect, useState } from "react";

function MembersList(props) {
  const [members, setMembers] = useState([]);

    useEffect(() => {
      fetch(props.domain + '/guilds/' + props.guild + '/members', {
        headers: new Headers({
          'Authorization': localStorage.getItem('token')
        })
      })
      .then(res => res.json())
      .then(result => {
        setMembers(result);
        }
      )
    }, []);

   return (<div className="membersList">{members.map(member => <h4 key={member.id}>{member.nickname ?? member.username}</h4>)}</div>);
}

export default MembersList;