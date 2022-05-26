import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

function BackToWelcomePage() {
  const navigate = useNavigate();

  const handleClick = () => navigate('/welcome');

  return (
    <div className="flex">
      <button
        type="button"
        className="cursor-pointer hover:text-mainHover transition-colors border-2 p-1 hover:border-main"
        onClick={handleClick}
      >
        <FormattedMessage id="auth-input-back" />
      </button>
    </div>
  );
}

export default BackToWelcomePage;
