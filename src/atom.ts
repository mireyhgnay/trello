import { atom, selector } from 'recoil';

export enum Categories {
  'TO_DO' = 'TO_DO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: 'category',
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
});

export const toDoSelector = selector({
  // selector : 가져온 값을 변형하여 output!
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState); // toDo 값을 가져온다.
    const category = get(categoryState); // category 값을 가져온다.

    // category 가 같은 값들을 모아 내보낸다.
    return toDos.filter((toDo) => toDo.category === category);
  },
});
