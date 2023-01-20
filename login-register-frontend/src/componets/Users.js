import React, { useState, useEffect } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { apiCaller } from '../utils/fetcher';
import Navbar from './Navbar';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [fetching, setFetching] = useState(false);

	useEffect(() => {
    setFetching(true);
    
    async function fetchData() {
			const {
				data: { users }
			} = await apiCaller.get("/users");
			setUsers(users);
			setFetching(false);
    }
    fetchData();
  }, []);

  const removeUser = async ( _id ) => {
    console.log(_id)
    const {
      data: { users }
    } = await apiCaller.delete(`/users/${_id}`);
    setUsers(users);
    setFetching(false);
  }
  return (
    <>
    <Navbar />
    <div className='p-5'>
      { users.length > 0 ? (
      <MDBTable align='middle'>
        <MDBTableHead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Password</th>
            <th scope='col'>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
            <>
              {users.map((user, idx) => (
                <tr key={idx}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.pwd}</td>
                  <td>
                    <MDBBtn color='danger' onClick={() => removeUser(user._id)} rounded size='sm'>
                      Delete
                    </MDBBtn>
                  </td>
                </tr>
              ))}
            </>
          </MDBTableBody>
      </MDBTable>) : (<h2>No Users.</h2>)}
    </div>
    </>
  );
}