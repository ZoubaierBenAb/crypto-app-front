import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from 'antd';
import { Row, Col ,Button} from 'antd';
import { useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Link } from 'react-router-dom';
import '../components/components-style/comment.css';
import {blue} from '@ant-design/colors'

function CommentsSection(props) {
  const { coinId } = props;
  const [comment, setComment] = useState('');
  const [coinComments, setCoinComments] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCoinComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/coins/${coinId}/comments`);
        const comments = response.data.comments;
        setCoinComments(comments);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setCoinComments([]);
        } else {
          console.error('Error fetching comments:', error);
        }
      }
    };
    fetchCoinComments();
  }, [coinId, coinComments, comment]);

  const handleCommentPost = async () => {
    const commentData = {
      content: comment,
    };

    try {
      const response = await axios.post(`http://localhost:5000/coins/${coinId}/comments`, commentData,{ headers : {
        authorization: `Bearer ${user.token}`,
      }});
      setComment('');
      
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="commentBox">
      <Scrollbars >
        {coinComments.length === 0 ? (
          <div className="no-posts" style={{ animation: 'fadeIn 1s forwards' }}>
             <h4>No comments yet!</h4>
          </div>
        ) : (
          [...coinComments].reverse().map((comment, index) => (
            <div className="posts-container" key={index}>
              <div className="posts">
                <span className="author">{comment.user}: </span>
                <span className="content">{comment.content}</span>
              </div>
            </div>
          ))
        )}
      </Scrollbars>
     
      {user ? (
        <>
          <Button type="primary" size="small" onClick={handleCommentPost}>
            Post
          </Button>
          <input
            className="commentInput"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder="Enter your comment..."
          />
        </>
      ) : (
        <div className='notSignedin' >Sign in to leave a comment.


          <Link className='signin' style={{backgroundColor : blue[4]}} to ='/signin'>Sign In</Link>
        </div>
        
      )}
      
    </div>
  );
}

export default CommentsSection;
