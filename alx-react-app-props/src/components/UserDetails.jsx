import {useContext} from 'react';
import UserContext from './UserContext';

function UserDetails() {
    const userData = useContext(UserContext)
    return (
      <div>
       {userData.name}
       {userData.email}
      </div>
    );
  }
  
  export default UserDetails;