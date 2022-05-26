import BackToWelcomePage from '../../components/BackToWelcomePage';
import Authorization from '../../components/Authorization/index';

function SignIn() {
  return (
    <div className="flex flex-col p-3 w-full h-full">
      <BackToWelcomePage />
      <Authorization type="SingIn" />
    </div>
  );
}

export default SignIn;
