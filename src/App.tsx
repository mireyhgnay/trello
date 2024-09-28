import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { toDoState } from './atom';
import Board from './components/Board';

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

export default function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;

    if (!destination) return;

    // same board movement
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]]; // 선택한 아이템의 보드 전체 배열 복사 (Doing에 있는 요소를 선택했다면 Doing전체 배열을 복사한다.)
        boardCopy.splice(source.index, 1); // 선택한 요소 제거
        boardCopy.splice(destination?.index, 0, draggableId); // 옮긴 index에 선택한 요소 추가
        return {
          ...allBoards,
          [source.droppableId]: boardCopy, // 변형한 배열을 반환
        };
      });
    }

    // cross board movement
    if (destination.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]]; // 선택한 요소의 보드의 배열
        const destinationBoard = [...allBoards[destination.droppableId]]; // 옮겨 도착한 보드의 배열
        sourceBoard.splice(source.index, 1); // 기존 보드에서는 제거
        destinationBoard.splice(destination?.index, 0, draggableId); // 옮긴 보드에는 요소 추가
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}
