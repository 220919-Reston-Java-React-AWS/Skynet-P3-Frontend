import Comment from './Comment';

export default class Post {
  id: number;
  text: string;
  imageUrl: string;
  comments: Comment[];
  author: any;
  likes: any[];

  constructor(
    id: number,
    text: string,
    imageUrl: string,
    comments: Comment[],
    author: any,
    likes: any[]
  ) {
    this.id = id;
    this.text = text;
    this.imageUrl = imageUrl;
    this.comments = comments;
    this.author = author;
    this.likes = likes;
  }
}
