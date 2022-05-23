import BackToWelcomePage from '../../components/BackToWelcomePage';
import Authorization from '../../components/Authorization/index';

function SignUp() {
  return (
    <div className="flex flex-col p-3">
      <BackToWelcomePage />
      <Authorization type="SingUp" />
    </div>
  );
}

export default SignUp;
