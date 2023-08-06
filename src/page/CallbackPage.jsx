import axios from 'axios';
import { React, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';

const CallbackPage = () => {
    const navigate = useNavigate();
    // const code = window.location.search;
    // console.log(code);
    // const tmpCode = `http://localhost:3000/kakao/callback${code}`;
    const code = new URL(document.location.toString()).searchParams.get('code');
    console.log(code);
    useEffect(()=>{
        axios
            .get(`https://stalksound.store/accounts/kakao/callback/`,{
                params : {
                "code" : code
            }})
            .then((res)=>{
                console.log('로그인 성공~');
                console.log(res);
                localStorage.setItem('accessToken', res.data.token.access);
                localStorage.setItem('refreshToken',res.data.token.refresh);
                // localStorage.setItem('user_email',res.data.user.user_email);
                // localStorage.setItem('user_property', res.data.user.user_property);
                // localStorage.setItem('user_nickname', res.data.user.user_nickname);
            })
            .catch((e)=>{
                console.log(e);
            })
    },[code]);

    // localStorage.removeItem('user_email');
    // localStorage.removeItem('user_property');
    // localStorage.removeItem('user_nickname');

    function GetUserInfo(){
        axios
            .get(`https://stalksound.store/accounts/userinfo/`,{
                headers : {
                    access : localStorage.getItem('accessToken'),
                    refresh : localStorage.getItem('refreshToken'),
                }
            })
            .then((res)=>{
                console.log(res);
            })
            .catch((e)=>{
                console.log(e);
            })
    }

    return (
        <div>
            <p>로그인 완료. callback page입니다.</p>
            <button onClick={()=>{navigate(`/main`)}}>메인으로 돌아가기</button>
            <button onClick={GetUserInfo}>유저 정보 불러오기</button>
        </div>
    );
};

export default CallbackPage;