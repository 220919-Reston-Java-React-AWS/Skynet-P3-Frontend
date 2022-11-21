import Comment from './Comment';

export default class Post {
  postId: number;
  text: string;
  imageUrl: string;
  comments: Comment[];
  author: any;
  likes: any[];

  constructor(
    postId: number,
    text: string,
    imageUrl: string,
    comments: Comment[],
    author: any,
    likes: any[]
  ) {
    this.postId = postId;
    this.text = text;
    this.imageUrl = imageUrl;
    this.comments = comments;
    this.author = author;
    this.likes = likes;
  }
}
