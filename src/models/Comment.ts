import Post from "./Post";

export default class Comment {
  id: number;
  text: string;
  commenter: any;
  post: number;
  

  constructor(id: number, text: string, commenter: any, post: number) {
    this.id = id;
    this.text = text;
    this.commenter = commenter;
    this.post = post;
  }
}
