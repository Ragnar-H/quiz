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
  status: "answered" | "answering" | "unanswered";
}

interface IQuestionEdit {
  id: string;
  answer: string;
  text: string;
}
interface IBuzz {
  id: string;
  username: string;
  userId: string;
  timestamp: firebase.firestore.Timestamp;
}

interface IPlayer {
  username: string;
  id: string;
  score: number;
}
