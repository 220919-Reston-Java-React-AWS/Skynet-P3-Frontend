import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Button, Typography } from '@mui/material';
import { PostCard } from './PostCard';
import Post from '../../models/Post';
import {
  apiGetPosts,
  apiGetAllPosts,
} from '../../remote/social-media-api/post.api';
import { useContext, useCallback } from 'react';
import { UserContext } from '../../context/user.context';
import TextField from '@mui/material/TextField';
import {
  apiDeletePost,
  apiUpsertPost,
} from '../../remote/social-media-api/post.api';
import DeleteIcon from '@mui/icons-material/Delete';

export const PostFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useContext(UserContext);
  const [filterFollow, setFilterFollow] = useState(true);
  let welcomeText = 'Welcome!';
  let postForm = <></>;

  const handleDeleteP = async (post: Post) => {
    await apiDeletePost(post);
    let allPosts = filterFollow ? await apiGetPosts() : await apiGetAllPosts();
    setPosts(allPosts.payload);
    console.log(posts);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let payload = new Post(
      0,
      data.get('postText')?.toString() || '',
      data.get('postImage')?.toString() || '',
      [],
      user,
      []
    );
    await apiUpsertPost(payload);
    fetchData();
  };

  if (user) {
    postForm = (
      <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          required
          id='postText'
          name='postText'
          label='Thoughts You Would Like to Share?'
          fullWidth
        />
        <TextField
          id='postImage'
          name='postImage'
          label='Add an Image or Diagram?'
          fullWidth
          variant='standard'
        />
        <Button
          type='submit'
          variant='contained'
          sx={{ mt: 3, ml: 1 }}
          color='warning'
        >
          Create Post
        </Button>
      </Box>
    );

    welcomeText = `Welcome, ${user.firstName}!`;
  }

  const fetchData = useCallback(async () => {
    const result = filterFollow ? await apiGetPosts() : await apiGetAllPosts();
    setPosts(result.payload.reverse());
  }, [filterFollow]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  let noPostsText = <></>;

  if (posts.length === 0) {
    noPostsText = (
      <h2 style={{ textAlign: 'center', marginTop: '3%', color: 'gray' }}>
        There are no posts, share your art!
      </h2>
    );
  }

  let profile = <></>;

  if (user) {
    profile = (
      <div>
        <div style={{ textAlign: 'center' }}>
          <Button
            onClick={() => {
              setFilterFollow(!filterFollow);
            }}
          >
            See {filterFollow ? 'All posts' : 'Posts you follow'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Container
      maxWidth='lg'
      sx={{
        height: 'auto',
        minHeight: '90vh',
      }}
    >
      <Typography variant='h2' sx={{ textAlign: 'center', p: 5 }}>
        {welcomeText}
      </Typography>
      {profile}
      {postForm}
      <Grid container justifyContent={'center'} maxWidth='lg'>
        {posts.map((item) => (
          <Grid
            key={item.postId}
            item
            xs={12}
            sm={6}
            md={4}
            sx={{ width: '60%', mb: '20px' }}
          >
            <PostCard post={item} updatePosts={setPosts}>
              {user && item.author.id === user.id && (
                <Button
                  variant='text'
                  onClick={() => {
                    handleDeleteP(item);
                  }}
                >
                  <DeleteIcon></DeleteIcon>
                  {/* {item.postId} */}
                </Button>
              )}
            </PostCard>
          </Grid>
        ))}
      </Grid>
      {noPostsText}
    </Container>
  );
};
