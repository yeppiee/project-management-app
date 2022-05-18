import { useNavigate } from 'react-router-dom';

function BackToWelcomePage() {
  const navigate = useNavigate();

  const handleClick = () => navigate('/welcome');

  return (
    <div className="flex">
      <button
        type="button"
        className="cursor-pointer hover:text-mainHover transition-colors"
        onClick={handleClick}
      >
        Back
      </button>
    </div>
  );
}

export default BackToWelcomePage;
