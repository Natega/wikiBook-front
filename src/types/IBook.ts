export default interface IBook {
  _id?: string;
  img: string;
  title: string;
  author: string;
  description?: string;
  subtitle?: string;
  videos?: string[];
  podcasts?: string[];
}
