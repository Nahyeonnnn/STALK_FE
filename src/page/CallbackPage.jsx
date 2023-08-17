import axios from 'axios';
import { React, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
// import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { styled } from 'styled-components';

axios.defaults.withCredentials = true;

const CallbackDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

const CheckIcon = styled(FontAwesomeIcon)`
    color: #F1D00A;
    margin-top: 20vh;
`;

const LoginMsg = styled.p`
    color: white;
    margin: auto;
`;

const HorizonLine = styled.div`
    background-color: #ffffff8d;
    height: 1px;
    width: 60vw;
    margin-top: 2rem;
    margin-bottom: 2rem;
    margin-left: auto;
    margin-right: auto;
`;

const CallbackPage = () => {
    const navigate = useNavigate();
    // const code = window.location.search;
    const code = new URL(document.location.toString()).searchParams.get('code');
    console.log(code);
    
    const setCookie = (name, value, days) => {
        const expires = new Date(Date.now()+days*24*60*60*1000).toUTCString();
        document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=None; Secure`;
    };

    // const deleteCookie = (name) => {
    //     document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    // };

    const getCookie = (name) => {
        const cookieString = decodeURIComponent(document.cookie);
        const cookies = cookieString.split(';');
    
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
    
            if (cookieName.trim() === name) {
                return cookieValue;
            }
        }
        return null; // 해당하는 쿠키가 없는 경우
    }

    useEffect(()=>{
        axios
            .get(`https://stalksound.store/accounts/kakao/callback/`,{
                params : {
                "code" : code
            }})
            .then((res)=>{
                console.log('로그인 성공~');
                console.log(res);
                // localStorage.setItem('accessToken', res.data.token.access);
                // localStorage.setItem('refreshToken',res.data.token.refresh);
                setCookie('accessToken', res.data.token.access, 1);
                setCookie('refreshToken', res.data.token.refresh, 1);
                setTimeout(function(){
                    navigate(`/main`);
                },5000);
            })
            .catch((e)=>{
                console.log(e);
                alert('로그인 오류! 다시 시도해 주십시오');
                navigate(`/login`);
            })
    },[code]);

    // function GetUserInfo(){
    //     axios
    //         .get(`https://stalksound.store/accounts/userinfo/`,{
    //         withCredentials: true,
    //         headers: {
    //             Authorization: `Bearer ${getCookie('accessToken')}`
    //         }
    //     })
    //         .then((res)=>{
    //             console.log(res);
    //         })
    //         .catch((e)=>{
    //             console.log(e);
    //         })
    // }

    // function LogOutButton() {
    //     axios
    //         .get(`https://stalksound.store/accounts/kakao/logout/`,{withCredentials: true})
    //         .then((res)=>{
    //             console.log(res);
    //             deleteCookie('accessToken');
    //             deleteCookie('refreshToken');
    //         })
    //         .catch((e)=>{
    //             console.log(e);
    //         })
    // }

    // function Test403(){
    //     axios
    //         .get(`https://stalksound.store/accounts/test403`,{
    //             withCredentials: true,
    //             headers: {
    //                 Authorization: `Bearer ${getCookie('accessToken')}`
    //             }
    //         })
    //         .then((res)=>{
    //             console.log(res);
    //         })
    //         .catch((e)=>{
    //             console.log(e);
    //         })
    // }

    return (
        <CallbackDiv>
            <CheckIcon icon={faCircleCheck} size="4x"/>
            <br/>
            <LoginMsg>로그인 완료.</LoginMsg>
            <HorizonLine></HorizonLine>
            <LoginMsg>5초 후에 메인 페이지로 이동합니다.</LoginMsg>
            {/* <button onClick={GetUserInfo}>userinfo 연습</button>*/}
        </CallbackDiv>
    );
};

export default CallbackPage;