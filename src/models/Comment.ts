export default class Comment {
  id: number;
  text: string;
  commenter: any;
  post: any;

  constructor(id: number, text: string, commenter: any, post: any) {
    this.id = id;
    this.text = text;
    this.commenter = commenter;
    this.post = post;
  }
}
