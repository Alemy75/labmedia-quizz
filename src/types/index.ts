export type Answers = {
    id: number;
    title: string;
};

export type Status = "start" | "finished" | "answering";

export type Question = {
    id: number;
    title: string;
    right: number;
    answers: Answers[] | [];
};
