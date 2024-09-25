import { useRecoilValue } from 'recoil';
import CrateToDo from './CreateToDo';
import ToDo from './ToDo';
import { toDoState } from '../atom';

export default function ToDoList() {
  const toDos = useRecoilValue(toDoState);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CrateToDo />

      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}
