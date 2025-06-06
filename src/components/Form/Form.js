import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
 import { useHistory} from 'react-router-dom'; 

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((message) => message._id === currentId) : null
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post) {
      setPostData({ ...post, tags: post.tags.join(', ') });
    }
  }, [post]);

  const clear = () => {
    setCurrentId(null);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedPost = {
      ...postData,
      tags: postData.tags.split(',').map((tag) => tag.trim()),
      name: user?.result?.name,
    };

    if (!currentId) {
      dispatch(createPost(formattedPost), history);
      
    } else {
      dispatch(updatePost(currentId, formattedPost));
    }
    clear();
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your memories and like others' memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${post?.title}"` : 'Creating a Memory'}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          minRows={4}
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (comma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;












