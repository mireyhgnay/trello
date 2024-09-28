import { atom } from 'recoil';

interface IToDoState {
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: 'toDo',
  default: {
    'To Do': ['카페가기', '야구장 티켓팅'],
    Doing: ['개발 공부', '여행 계획세우기'],
    Done: ['팩하기'],
  },
});
