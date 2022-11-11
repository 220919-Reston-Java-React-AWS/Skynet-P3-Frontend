interface CommentProps {
  text: string;
  key: number;
  commenter: { firstName: string; lastName: string };
}

const CommentCard = (props: CommentProps) => {
  return (
    <div>
      <div>{props.commenter.firstName}</div>
      <div>{props.text}</div>
    </div>
  );
};

export default CommentCard;
