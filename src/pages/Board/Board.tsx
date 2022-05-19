import { useParams } from 'react-router-dom';

function Board() {
  const { id } = useParams();
  return <div>{id}</div>;
}

export default Board;
