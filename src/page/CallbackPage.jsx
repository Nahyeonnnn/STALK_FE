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
            })
            .catch((e)=>{
                console.log(e);
            })
    },[]);

    return (
        <div>
            <p>로그인 완료. callback page입니다.</p>
            <button onClick={()=>{navigate(`/main`)}}>메인으로 돌아가기</button>
        </div>
    );
};

export default CallbackPage;