import * as React from 'react';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import Post from '../../models/Post';
import Comment from '../../models/Comment';
import CommentCard from './CommentCard';
import { Box, Container, Button, Paper, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { orange, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import InsertThumbUpIcon from '@mui/icons-material/ThumbUpAlt';
// Josiah
import DeleteIcon from '@mui/icons-material/Delete';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import TextField from '@mui/material/TextField';
import { apiDeletePost, apiUpsertPost } from '../../remote/social-media-api/post.api';
import { UserContext } from '../../context/user.context';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { apiAddorRemoveLike } from '../../remote/social-media-api/post.api';

interface postProps {
  post: Post;
  key: number;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
}));

export const PostCard = (props: postProps) => {
  const { user } = useContext(UserContext);
  const [expanded, setExpanded] = React.useState(false);
  const [post, setPost] = useState(props.post);
  const [deletedPosts, setDeletedPosts] = useState(0);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let media = <></>;
  let commentForm = <></>;

  const handleComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    props.post.comments.push(
      new Comment(0, data.get('commentText')?.toString() || '', user)
    );
    let payload = props.post;
    await apiUpsertPost(payload);
  };

  const handleLike = async () => {
    let res = await apiAddorRemoveLike(post);
    let newPost = res.payload;
    setPost(newPost);
    console.log(props.post.likes);
    console.log(res.payload.likes);
  };

  
  // Josiah
  const handleDeleteP = async () => {
    let res = await apiDeletePost(post);
    let newPost = res.payload;
    setDeletedPosts((prev)=> prev +1);
  };

  commentForm = (
    <Paper
      component='form'
      sx={{
        p: '4px 0',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        mb: '15px',
      }}
      elevation={1}
      onSubmit={handleComment}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        id='commentText'
        name='commentText'
        placeholder='Make a comment...'
        inputProps={{ 'aria-label': 'Make a comment' }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
      <IconButton type='submit' sx={{ p: '10px' }} aria-label='submit'>
        <AddCircleIcon color='warning' />
      </IconButton>
    </Paper>
  );

  if (props.post.imageUrl) {
    media = (
      <CardMedia
        component='img'
        src={props.post.imageUrl}
        alt='post image'
        sx={{
          maxHeight: '300px',
          width: 'auto',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />
    );
  }

  return (
    <Card sx={{ maxWidth: '100%', marginTop: '3%' }}>
      <CardHeader
        title={props.post.author.firstName}
        avatar={
          <Avatar sx={{ bgcolor: '#ed6c02' }} aria-label='recipe'>
            <PersonIcon />
          </Avatar>
        }
      />

      {media}
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {props.post.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button variant='text'>
          <InsertThumbUpIcon onClick={handleLike} />
        </Button>
        <span>{post.likes.length}</span>
        
        {/* Josiah */}
        <Button variant='text'>
          <DeleteIcon onClick={handleDeleteP}>
            
          </DeleteIcon>
        </Button>
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <InsertCommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          {commentForm}
          <Typography paragraph>comments:</Typography>
          <Grid container justifyContent={'center'}>
            <Grid item sx={{ width: '100%' }}>
              {props.post.comments.map((comment) => (
                <CommentCard
                  text={comment.text}
                  key={comment.id}
                  commenter={comment.commenter}
                />
              ))}
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
};
