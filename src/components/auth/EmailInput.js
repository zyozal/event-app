import React, { useEffect, useRef, useState } from 'react';
import styles from './SignUpForm.module.scss';
import { AUTH_URL } from '../../config/host-config';
import { debounce } from 'lodash';

const EmailInput = ({ onSuccess }) => {
  const inputRef = useRef();

  // 검증여부
  const [emailVaild, setEmailValid] = useState(false);

  // 에러 메시지
  const [error, setError] = useState('');

  // 이메일 패턴 검증
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 간단한 이메일 패턴 검사
    return emailPattern.test(email);
  };

  // 이메일 검증 후속 처리
  const checkEmail = debounce(async (email) => {
    if (!validateEmail(email)) {
      // 에러메시지 세팅
      setError('이메일 형식이 유효하지 않습니다.');
      return;
    }

    // 중복 검사
    const response = await fetch(`${AUTH_URL}/check-email?email=${email}`);
    // console.log('res: ', response);
    const flag = await response.json();
    // console.log('flag: ', flag);
    if (flag) {
      setEmailValid(false);
      setError('이메일이 중복되었습니다.');
      return;
    }

    // 이메일 중복확인 끝
    setEmailValid(true);
    onSuccess(email);

  }, 1500);

  const changeHandler = (e) => {
    const email = e.target.value;

    // 이메일 검증 후속처리
    checkEmail(email);
  };

  // 렌더링 되자마자 입력창에 포커싱
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <p>Step 1: 유효한 이메일을 입력해주세요.</p>
      <input
        ref={inputRef}
        type="email"
        placeholder="Enter your email"
        onChange={changeHandler}
        className={!emailVaild ? styles.invalidInput : ''}
      />
      {!emailVaild && <p className={styles.errorMessage}>{error}</p>}
    </>
  );
};

export default EmailInput;