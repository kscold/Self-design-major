import useCheckToken from '../hooks/useCheckToken';
import AlertModal from './modals/AlertModal';

const CheckToken = () => {
  const isTokenValid = useCheckToken();

  return (
    <div>
      {!isTokenValid && (
        <AlertModal closeMessage="토큰이 만료되었습니다. 다시 로그인 해주세요" />
      )}
    </div>
  );
};

export default CheckToken;
