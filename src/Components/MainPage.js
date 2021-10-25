import { useState } from "react";

function MainPage() {
   const [dashboard, setDashboard] = useState(true);
   const [friends, setFriends] = useState(false);
   const [explore, setExplore] = useState(false);
   const [store, setStore] = useState(false);

   return <>
      <ul className="pivotParent">
         <li className={'pivotItem ' + (dashboard ? 'pivotSelected' : '')} onClick={() => {
            setDashboard(true);
            setFriends(false);
            setExplore(false);
            setStore(false);
         }}>Dashboard</li>
         <li className={'pivotItem ' + (friends ? 'pivotSelected' : '')} onClick={() => {
            setDashboard(false);
            setFriends(true);
            setExplore(false);
            setStore(false);
         }}>Friends</li>
         <li className={'pivotItem ' + (explore ? 'pivotSelected' : '')} onClick={() => {
            setDashboard(false);
            setFriends(false);
            setExplore(true);
            setStore(false);
         }}>Explore</li>
         <li className={'pivotItem ' + (store ? 'pivotSelected' : '')} onClick={() => {
            setDashboard(false);
            setFriends(false);
            setExplore(false);
            setStore(true);
         }}>Store</li>
      </ul>
   </>;
}

export default MainPage;