import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';

function Board() {
  const { id } = useParams();
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setOpen(true)}>
        Open modal
      </button>
      <Modal isOpen={isOpen} closeModal={() => setOpen(false)}>
        <p>{id}</p>
        <button type="button" onClick={() => setOpen(false)}>
          close
        </button>
      </Modal>
    </div>
  );
}

export default Board;
