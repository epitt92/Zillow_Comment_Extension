import { SendSharp } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { apiCaller } from '../../Popup/utils/fetcher';

const ChatFrame = () => {
  const [cursor, setCursor] = useState();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [fetching, setFetching] = useState(false);
  const divRef = useRef(null);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [ref.current, comments]);

  useEffect(() => {
    if (divRef.current && !cursor) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [comments, cursor]);

  useEffect(() => {
    setFetching(true);

    async function fetchData() {
      let url = window.location.href;
      const {
        data: { comments },
      } = await apiCaller.post('/comments/url', { url });
      setComments(comments);
      setFetching(false);
    }
    fetchData();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();

    if (content) {
      chrome.storage.local.get(null, async (obj) => {
        let newComment = {
          username: obj.profile.name,
          content,
          url: window.location.href,
        };
        console.log(newComment);
        const {
          data: { success, comments },
        } = await apiCaller.post('/comments', newComment);
        setContent('');
        if (success) {
          setComments(comments);
        }
        console.log('comments =>', comments);
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          height: '100%',
          width: '99%',
          display: 'flex',
          backgroundColor: '#212121',
          margin: '0',
          borderRadius: '10px',
          padding: '1rem',
          boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <div
          ref={divRef}
          style={{
            overflowY: 'scroll',
            height: '90%',
            width: '100%',
          }}
          onScroll={(evt) => {
            const target = evt.target;
            if (target.scrollTop === 0) {
              // setCursor(comments[0].id - 1);
            }
          }}
        >
          {comments.length ? (
            comments.map((comment, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  padding: '.3rem',
                  width: '99%',
                  ':hover': {
                    backgroundColor: '#424242',
                  },
                }}
              >
                <img
                  width={40}
                  height={40}
                  src="https://freesvg.org/img/abstract-user-flat-4.png"
                  alt={comment.username}
                  style={{ borderRadius: '50%' }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    justifyContent: 'flex-start',
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="body1">{comment.username}</Typography>
                    <Typography variant="caption" color="GrayText">
                      {new Date(comment.createdAt).toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                        weekday: 'short',
                        day: 'numeric',
                      })}
                    </Typography>
                  </Box>
                  <p
                    style={{
                      width: '99%',
                      wordBreak: 'break-word',
                      fontWeight: 'lighter',
                    }}
                  >
                    {comment.content}
                  </p>
                </Box>
              </Box>
            ))
          ) : fetching ? (
            [1, 2, 3, 4, 5, 6, 7, 8].map((_, idx) => {
              return (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    width: '100%',
                  }}
                >
                  <Skeleton variant="circular" width={40} height={40} />
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'left',
                      justifyContent: 'flex-start',
                      width: '100%',
                    }}
                  >
                    <Skeleton width={100} />
                    <Skeleton width={200} />
                  </Box>
                </Box>
              );
            })
          ) : (
            <Typography variant="body1" color="GrayText">
              No messages yet
            </Typography>
          )}{' '}
        </div>
        <TextField
          sx={{
            width: '92%',
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            right: '1rem',
          }}
          placeholder="Message"
          disabled={fetching && !comments.length}
          autoComplete="off"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === 'Enter') {
              await handleSend();
            }
          }}
          InputProps={{
            endAdornment: (
              <IconButton
                disabled={fetching && !comments.length}
                onClick={async (e) => await handleSend(e)}
              >
                <SendSharp />
              </IconButton>
            ),
          }}
        />
      </Box>
    </>
  );
};

export default ChatFrame;
