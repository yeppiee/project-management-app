import { useParams } from 'react-router-dom';

function Board() {
  const { id } = useParams();

  return <div>Board id: {id}</div>;
}

export default Board;
