import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function App() {
  const onDragEnd = () => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId='one'>
          {() => (
            <ul>
              <Draggable draggableId='first' index={0}>
                {() => <li>One</li>}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
