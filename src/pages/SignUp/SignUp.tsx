import BackToWelcomePage from '../../components/BackToWelcomePage';
import Authorization from '../../components/Authorization/index';

function SignUp() {
  return (
    <div className="flex flex-col p-3 w-full h-full">
      <BackToWelcomePage />
      <Authorization type="SignUp" />
    </div>
  );
}

export default SignUp;
