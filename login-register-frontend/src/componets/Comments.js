import React, { useState, useEffect } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { apiCaller } from '../utils/fetcher';

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [fetching, setFetching] = useState(false);

	useEffect(() => {
    setFetching(true);
    
    async function fetchData() {
			const {
				data: { comments }
			} = await apiCaller.get("/comments");
			setComments(comments);
			setFetching(false);
    }
    fetchData();
  }, []);

  const removeComment = async ( _id ) => {
    console.log(_id)
    const {
      data: { comments }
    } = await apiCaller.delete(`/comments/${_id}`);
    setComments(comments);
    setFetching(false);
  }
  return (
    <div className='p-5'>
      { comments.length > 0 ? (
      <MDBTable align='middle'>
        <MDBTableHead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Url</th>
            <th scope='col'>Content</th>
            <th scope='col'>CreatedAt</th>
            <th scope='col'>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
            <>
              {comments.map((comment, idx) => (
                <tr key={idx}>
                  <td>{comment.username}</td>
                  <td>{comment.url}</td>
                  <td>{comment.content}</td>
                  <td>{new Date(comment.createdAt).toLocaleString('en-US', {
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true,
                          weekday: 'short',
                          day: 'numeric',
                        })}</td>
                  <td>
                    <MDBBtn color='danger' onClick={() => removeComment(comment._id)} rounded size='sm'>
                      Delete
                    </MDBBtn>
                  </td>
                </tr>
              ))}
            </>
          </MDBTableBody>
      </MDBTable>) : (<h2>No Comments.</h2>)}
    </div>
  );
}