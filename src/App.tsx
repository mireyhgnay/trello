import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function App() {
  const onDragEnd = () => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId='one'>
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              <Draggable draggableId='first' index={0}>
                {(provided) => (
                  <li ref={provided.innerRef} {...provided.draggableProps}>
                    <span {...provided.dragHandleProps}>🔥</span>One
                  </li>
                )}
              </Draggable>
              <Draggable draggableId='second' index={1}>
                {(provided) => (
                  <li ref={provided.innerRef} {...provided.draggableProps}>
                    <span {...provided.dragHandleProps}>🔥</span>Two
                  </li>
                )}
              </Draggable>
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
