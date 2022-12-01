import { Typography, Paper } from '@mui/material';

interface CommentProps {
  text: string;
  key: number;
  commenter: { firstName: string; lastName: string };
  updateComments: Function;
  readonly children: React.ReactNode;
}

const CommentCard = (props: CommentProps) => {
  return (
    <Paper
      sx={{ backgroundColor: 'rgba(0,0,0,0.5)', p: 1, borderRadius: '5px' }}
    >
      <Typography variant='subtitle2'>{props.commenter.firstName}:</Typography>

      <Typography variant='caption'>{props.text}</Typography>

      {props.children}
    </Paper>
  );
};

export default CommentCard;
