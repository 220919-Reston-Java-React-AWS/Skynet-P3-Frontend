interface CommentProps {
  text: string;
  key: number;
  commenter: { firstName: string; lastName: string };
  readonly children: React.ReactNode;
}

const CommentCard = (props: CommentProps) => {
  return (
    <div>
      <div>{props.commenter.firstName}</div>
      <div>{props.text}</div>
      {props.children}
    </div>
  );
};

export default CommentCard;
