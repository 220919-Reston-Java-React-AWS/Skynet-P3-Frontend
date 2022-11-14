export default class Comment {
  id: number;
  text: string;
  commenter: any;

  constructor(id: number, text: string, commenter: any) {
    this.id = id;
    this.text = text;
    this.commenter = commenter;
  }
}
