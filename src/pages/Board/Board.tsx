import { useParams } from 'react-router-dom';

function Board() {
  const { id } = useParams();
  return <div>Open modal {id}</div>;
}

export default Board;
