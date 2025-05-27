import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core'; 
import { useDispatch, useSelector } from 'react-redux'; 
import moment from 'moment'; 
import { useParams, useHistory } from 'react-router-dom'; 
import useStyles from './styles';
import { getPost, getPostsBySearch } from '../../actions/posts'; 

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts); 
  const dispatch = useDispatch(); 
  const history = useHistory(); 
  const classes = useStyles(); 
  const { id } = useParams(); 

  useEffect(() => {
    dispatch(getPost(id)); 
  }, [id, dispatch]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post, dispatch]);

  if (!post) return null; 

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" /> 
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id); 
  const openPost = (_id) => history.push(`/posts/${_id}`);

  return (
    <Paper elevation={6} className={classes.card} style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'nowrap', alignItems: 'stretch' }}>
        {/* Left content: all text sections in one container */}
        <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>

        {/* Right content: image stretched full height of left container */}
        <div style={{ width: '400px', height: '100%' }}>
          <img
            style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }}
            src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
            alt={post.title}
          />
        </div>
      </div>

      {/* Recommended posts section at bottom */}
      {recommendedPosts.length > 0 && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, message, name, likes, selectedFile, _id }) => (
              <div
                style={{ margin: '20px', cursor: 'pointer' }}
                onClick={() => openPost(_id)}
                key={_id}
              >
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle2">Likes: {likes.length}</Typography>
                <img src={selectedFile} alt={title} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;








