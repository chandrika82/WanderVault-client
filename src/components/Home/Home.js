import React, { useState } from 'react';
import {
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
  Container,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getPostsBySearch } from '../../actions/posts';
import Pagination from '../pagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const tagQuery = query.get('tags');
  const classes = useStyles();

  const searchPost = () => {
    if (search.trim() || tags.length) {
      const searchPayload = { search: search.trim(), tags: tags.join(',') };
      dispatch(getPostsBySearch(searchPayload));
      history.push(
        `/posts/search?searchQuery=${search.trim() || 'none'}&tags=${tags.join(',')}`
      );
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);
  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={7} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onKeyPress={handleKeyPress}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={handleAddChip}
                onDelete={handleDeleteChip}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tagQuery) && (
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;









