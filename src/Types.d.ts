interface ICategory {
  id: string;
  name: string;
}
interface IQuestion {
  id: string;
  answer: string;
  text: string;
  category: ICategory;
  points: number;
}
