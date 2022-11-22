import * as React from "react";
import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import Post from "../../models/Post";
import Comment from "../../models/Comment";
import CommentCard from "./CommentCard";
import { Button, Paper, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import InsertThumbUpIcon from "@mui/icons-material/ThumbUpAlt";
import PersonIcon from "@mui/icons-material/Person";
import {
  apiDeleteComment,
  apiUpsertComment,
} from "../../remote/social-media-api/post.api";
import { UserContext } from "../../context/user.context";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { apiAddorRemoveLike } from "../../remote/social-media-api/post.api";
import {
  apiGetAllComments,
  apiGetAllPosts,
} from "../../remote/social-media-api/postFeed.api";
import DeleteIcon from "@mui/icons-material/Delete";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";

interface postProps {
  post: Post;
  key: number;
  updatePosts: Function;
  readonly children: React.ReactNode;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
}));

export const PostCard = (props: postProps) => {
  const { user } = useContext(UserContext);
  const [expanded, setExpanded] = React.useState(false);
  const [post, setPost] = useState(props.post);
  const [comments, setComments] = useState(post.comments);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      let payload = new Comment(
        0,
        data.get("commentText")?.toString() || "",
        user,
        post
      );
      await apiUpsertComment(payload);
      fetchData();
    } catch (e: any) {
      if (e.response.status === 401) {
        alert("You must be logged in to comment.");
      } else {
        alert(e.response.status);
      }
    }
  };

  const handleDeleteC = async (comment: Comment) => {
    let res = await apiDeleteComment(comment);
    let allComments = await apiGetAllComments();
    setComments(allComments.payload);
    console.log(comments);
  };

  const handleLike = async () => {
    let res = await apiAddorRemoveLike(post);
    let newPost = res.payload;
    setPost(newPost);
    console.log(props.post.likes);
    console.log(res.payload.likes);
  };

  let media = <></>;
  let commentForm = <></>;

  commentForm = (
    <Paper
      component="form"
      sx={{
        p: "4px 0",
        display: "flex",
        alignItems: "center",
        width: "100%",
        mb: "15px",
      }}
      elevation={1}
      onSubmit={handleComment}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        id="commentText"
        name="commentText"
        required
        placeholder="Make a comment..."
        inputProps={{ "aria-label": "Make a comment" }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="submit">
        <AddCircleIcon color="warning" />
      </IconButton>
    </Paper>
  );

  const fetchData = async () => {
    const result = await apiGetAllComments();
    setComments(result.payload.reverse());
    props.post.comments = result.payload.reverse();
    setPost(props.post);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (props.post.imageUrl) {
    media = (
      <CardMedia
        component="img"
        src={props.post.imageUrl}
        alt="post image"
        sx={{
          maxHeight: "300px",
          width: "auto",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
    );
  }

  return (
    <Card sx={{ maxWidth: "100%", marginTop: "3%" }}>
      <CardHeader
        title={props.post.author.firstName}
        avatar={
          <Avatar sx={{ bgcolor: "#ed6c02" }} aria-label="recipe">
            <PersonIcon />
          </Avatar>
        }
      />

      {media}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.post.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button variant="text">
          <InsertThumbUpIcon onClick={handleLike} />
        </Button>
        <span>{post.likes.length}</span>

        {props.children}

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <InsertCommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {commentForm}
          <Typography paragraph>comments:</Typography>
          <Grid container justifyContent={"center"}>
            <Grid item sx={{ width: "100%" }}>
              {comments.map((item) => (
                <CommentCard
                  text={item.text}
                  key={item.id}
                  commenter={item.commenter}
                  updateComments={setComments}
                >
                  <Button
                    variant="text"
                    onClick={() => {
                      handleDeleteC(item);
                    }}
                  >
                    <DeleteIcon></DeleteIcon>
                    {/* {comment.id} */}
                  </Button>
                </CommentCard>
              ))}
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
};
