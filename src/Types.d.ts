interface ICategory {
  id: string;
  name: string;
}
interface IQuestion {
  id: string;
  answer: string;
  text: string;
  category: string;
  points: number;
}

interface IQuestionEdit {
  id: string;
  answer: string;
  text: string;
}
