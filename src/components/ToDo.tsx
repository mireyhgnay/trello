import { IToDo } from '../atom';

export default function ToDo({ text }: IToDo) {
  return (
    <li>
      <span>{text}</span>
      <button>Doing</button>
      <button>ToDo</button>
      <button>Done</button>
    </li>
  );
}
