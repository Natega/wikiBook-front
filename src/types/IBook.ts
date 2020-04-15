export default interface IBook {
  _id?: string;
  img: string;
  title: string;
  author: string;
  videos?: string[];
  podcasts?: string[];
}
