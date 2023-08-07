import React, { useState, useEffect } from "react";
import styled from "styled-components";

import BottomBar from "../component/global/bottomBar";
import TopBar from "../component/global/topBar";

const NewsContainer = styled.div`
  width: 23.4375rem;
  margin: 0 auto;
`;

const NewsImage = styled.img`
  width: 100%;
  height: 15rem;
  object-fit: cover;
  z-index: 1;
  //position: absolute;
`;

const JournalistInfo = styled.div`
  font-size: 12px;
  color: gray;
  margin-top: 0.5rem;
`;

const ArticleBox = styled.div`
  background-color: white;
  padding: 1.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
  border-radius: 0.625rem 0.625rem 0px 0px;
  margin-top: -0.7rem;
  position: relative;
  z-index: 2;
`;

const ArticleContent = styled.p`
  color: var(--black, #000);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Apple SD Gothic Neo;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 22.5px */
  overflow-x: scroll;
  margin-bottom: 3rem;
`;

const NewsdetailPage = () => {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fakeApiResponse = {
      title: "[속보] 김승환 여친 생길까 말까~",
      imageUrl:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABDlBMVEX2zQ////8EAADymTEAAAD2zAD0pBf1zg31ywD//v/1zw721Sj2zRD1yQD5zw/ylzL++vH42kn99t7///v++ebylTP1ogb3v2j80w/yoiz+++3//vj88L3988r++uP31kzUsQ2fhgr1whf42l/87rT32lb52mb64Xr75o/99c/43m776qL31TY0KgNkUwVQQgXfug3FpQv0rCXzpSr1tSL1uhP0sSL98OD86Zr64oz76Kj411n31D765ob977X77qaNcwgWDgE+MQSnjAtzXggbFQDpwg2DbAm8nQuTeghGOQRXSQXOrA0pHwFtWQY5LwT3sTr2uVT3y4P84Lj86c/86MX5zIP3t1n3yW30qQCg97vkAAANBElEQVR4nO2daXvaOBeG3YBGrjA7bRyWkLAlEJpJSUIphWkzaeneSdN25u3//yOvJK+AZGRjk8jhmWs+NG0k3T5HR0eyLCmP4i7lrhsQubaE8mtLKL+2hPJrSyi/toTya0sov7aE8mtLKL+2hPJrSyi/toTyazOEjzfwGzxtbSi/oiOc87NiJVcul0oFrFp1PJoedZr5fD+VQgAgkDakYgEE9VQqlc83m9Pjk1YX//tSqZyrMAsVU6Q2LJYL3Vq1NR6PXh512vl+H0GgUhAqCCBUFAW6hP+gqIrx1/SfIpSatHvTk3GrWtvPBWlENITlWms07XVe1Sf9FASWCBGloFT0fwNQsWT8DeUkfzD+o7AAEtTm0fF4f1OEy/6Sw15YGx+1+wh7XNo0lKqEJ8uwKH9cK5RyxYgJ51TqVscve/kUSBNTwdWNDSzqBRgT9DvHrVp5I4T7r6fNeh9RN1Sg4WXRAdrOS+pL1XvHhWgIDQcpl2rTvhE3jJqNPhaxIKL9lD5J4rUw/1eB2pITZwPbsFQddRCOAArUDDLqP1q0JlTcUVdRNMqKB5z2iO+wAQlf9+rYLy0u6ERHqETrpe5qoPVoFeKwx5wgG4Aw1+1h24HoMIIIR590v1WyG+m4rG/CQqup3jM6Ik2DGlD7o2VD+iQsjiYRDwfBhAOARgPsZFpZaLIvwkorhe2nbSBg+hWNcgp1VnAyn9z5ISz0VGB28bsmWhQB1MwhC7yqBiTsToCZMt5LQmxDM8YCNApCWDxJ38MAwxJh7DnDoyhhcUTNp9118wVEOiTo2Xm5KGFLAfcwwDBFEitFnfokLNzHIYIjGikUYPVFMcJynVhQBhclouFGhTU/hCeADKgSieSqfR+EXTwMykVIpI7ECesA3sMx0Ft4yKiXRAmr6mbmtqGKtHgsSFhug3uZqXmL9sSSGGEVKfcxUVslktqcCBA+flQ5AvYSpkwijUZCNuxKko6ypFZFCI/CXNTdsEBPgLAoTT7KEJgUVhO2VIkJFdhaTdiR2YZ4ilFcRViYSDSrWBaYlFcRjqUGVCDoriCs4EgqMyIEoxWEpT6QLl+bE2ivIKyqMiZsjsiEwZuwB6J90xK1SNu9CZF8k4ol8djoy5v99F03LwR5mvC1xDmpLU9CmbNuW16AubrEMydbXoTdftxtWJU9jFJ5EZ7EwUm9CHOduBPipPSuWxeGPAgLKO79sKrGnXAK4k6Yjz2hLv20gooPWIlDQqN4EXbjEWg8CF/Lvcxmi084jT1hB8j37p4lLmCuLfV6viMu4f5E/kUoKi5hLZWJBSCfsIXibsNxTLohn3AUd0KyBeOu2xaOeITlZtxtWJqoSjwQuYQpqV+rucQjLIBMPEzIJcRzp3ikpVzCsRqDV4dUPMJj+u3dXbcuDPEI8WARk1DDI8yDuHtpSvI9Co54hLEB5BKmFfl2r7PFASyrMeHjEnZl/AKBLQ5hNSYL3gqXcKzCmI/4IxEb2sevGF/+B/64zTyxIKLvVjiEUyFC2i4Eoa5n1jrzA/9ixiwjYAke4hCK7YYybKefvfl4pkMl8GQEF6PPDt98wYybI+yJblLQFHiYxHqvZdbwMf35FS7j71kUS7QcwqYQIflEXL++Su7sJJOHWmAfg/rBDi5jJ/k2iikpG7D4SoyQfFecJI3bSb47QIEJtVOjjOS1HqwEL7EJS6J79qD+ljYON++T7h/QeCb6tfGUdpJfzzKhf0XGJtwXIsQN0Q+emYQ7yQP/vciIwLNTu4xDnRzigwKAcMUmLEwERwv78ePWvQ/gYsRimTOnjGd66CdNsQlrfcH2OY8fu+ksE6QFmu3opJAZMs7wCE8cwpTI7+KHfXblEL774N+INBpfuQg/6sHHVbbYhFWhnoCTmedO43aCREIjGrvK+KZvxktbYn1d09+7W/fed2JKUPQP7jL+nIW9uMDie/yoJTZYQP3TfOt8d0SoIP2ju4xnX8JO3dg2HAtVgtPJd3OtO/NLSMzlDjTBOrO3OISCibfuahxOSQ58E5IyTt2EuDOHPC9di1CZI9zxT0imlPDz3GM61EN+q8cmHAkm3rPkTnIdQuKlsz8XCDdhw8pUjBAdrGtDiDOaT4s23ECkqRyJEWa+rE2osAijt2FOcAKcWdeGNCtdJAx5jsgmFJwAZ2ZrE+KUZqkfbsBLy23BCbC2rpcuE15nYLgHUrEJ84KxdN3xkATTxfEws4lYWhIndLfua4CcBmd+39xlXH3YSD8s9YVq0aD+t7t1n33npTRre7OQlwag8BKHUNSGcznl25nf2slMKXPtLuPTWSbkk+GYhPtiXzwtzg8PfSfNZMF8fn54GnbSxiYU/KYL4qTGydpIF/JdPVl3cndmPMffyFqbsA0zrqQy+U+gUIoJXal3EnfDTczxC4JV4NYdOoRvA87sXLlfcif8JWGOlwr9LgmEz7/aK4FB47wrbyMLUWGLTSi4iEESN2u8Tr4LnG5lDq0176sgWdEKsQlF33FDezk3mXwenNDszcnkx/AB1yKkR6EaC0nk9RrUAo5jZNChhXz2nRQJiElYE/tsjb6dzsy+kfeHp7PAr54I4kdSxtUs7IyNiEm48AWwdaogRMjKit2Dlv7l27drfY2nT98jvz+9zjAXEo0qSd3B3vULEdJLHZCSbqTTyMR1dtvQd/Brh0BaBrf1CGm4cg3Rin32BSbhGCzYED/CxmCPaHCBkPVWzPrbddfhrct1OOXgn1qVXwa4QINJuHBcBDbfZeJJNkGUzWYvtLn9UtA47n0NQeeRsbxUcyp/kiCV+ytdiDA9NGowlD1v0KzOseG6hE4HWy4HpgeuuhNPBo1QCOdHC23gBsSICfcmcDhn0SAyL3JhF4P2som557vn8+Ubk/DYsSGp+eJJYl7Zc8/+AJ07WcwtN/Y9OxBacVjA8tRRhotPN7uHfPV8JqFzmgJdDMsmlnTpXQWZ9Vkg1qYwDdp/MNlXGYMGuOW6nzR8hRtvQtqiy2XC7MBr94z9iG0eE00zo4piduNVhFBBF8uE2QEie83CIaSVDBiV7KU9+p7Rr4xNb844jWi7oP3hpoAhsJkHjMe75yt6cwg1G1BD58uEib008iA0hUfpRuPSpQaRpjnOuqp1HELyeIXHfSahvahPnz2jEkzo0T5sLdS4HA5//8HSYDAcXjbSaLWfQbYNE54OJEZoH59EQwS7H7LTD2oYTMdkm9fQSMM8mkoe7wWDcID8jE8rCEkA1BheegGZiOSpN4bnAnxUFw2IPHoULowTS3046QpCerUZGi6Nh3tp9h5piNIi5nMxenk7xVhy0+x5CONhxx4tjFt4FqJpNgE5h2LCxjLE03kt/nWDPypChB2F5DQLT9fMF9YhbLvHQwXhvHT+ITYQO8UigIN5sj9ubr5/37X03/fvN4MFUH6eaZhqIS89b8CMrzSRSZh3j4fUjnZ6j/P7Idez0MAFN9i9/fHzBVaunHNUxj/4+eN2d2BjDvhdyhhUtcus2U2y2cRQQ+ZQsybhQk3QNT/kjITE2IaPPv3j++6PlXdLFn/9+9+AMD79H1K8WkyShEuj8vNLzf/GTBFCkm5BOs1uaLxeTn98QRo8uP0leK1t5dftDWa88f4S0MiHrMr9L3YJEVq+aqebrIZgJx1i/7x9IXjJKzXki1vsrE3Ps37sFBfZs5UoCF0pNLsO+rPfT3dFrne1RY7y/XnzdCLQZnuK4nu2LU5ornlB9us9Oqr83s1ZDRfXr/O+Z2i0TOheCoiCkI6/dj1MRAX+DnSB9r+rVlqtND3Y1YTLFeLGBTh7ltQMXvoynqVutCdOM+tM+T/XhDgvaAciPIn2S0A2of/1T5qJA79w1JnFticFVliEtB+SC+t8X2EvuOM6sMIipGOxeRGYL0V+li+H0Hc5RqSld0j5Uzfqs4zCIjSFauJs1J8rkR9lFC4hNO46E1e5E/lxVCETuu84FVBRbDPyWgqZECN2cGr6WCCiPjYAozZh6IQ42nQ497gvEZan6dC/VFtWyIRk6QzUu0KIJWOfbtSnhodLaAioJ8uTKHf3JD6ce53ezJl3URBCqNb/YhTr7pyt5qbuWYqCkIRU1Kwyi7b40MbO8I2GEBJXRcel8vLQkSvVjlQAgsxlgykaLzVerwFUf9mqFqx1qWK5UGud9FIAWDPZiHNuQ5HY0H41CgBITdrNTg+r86o+wXTAWvQJex8pT9EQuoVd0tKdHHoTPeFda0sov7aE8otNGItLgkwxCWNy/4ohNmGMAB+sDR8A4V03K0Q9UMJ27L00HtcCmuIQxt2GvdgTxuTWPENbQvnFJBzF5FI5KiZhxLsjNismYSv2NozJHauGHihhXK6vpGISFuJPGPvxUPBMBTn0QAkFT2+RQ0zCUpwWvdmEYidhyaEHSlgWPZJdBrEJxU4VlENMwsj37W5SbELh6y0kEJNQ8IRWKfR/hNAjc8yVSOsAAAAASUVORK5CYII=",
      content: `국무총리는 국회의 동의를 얻어 대통령이 임명한다. 
        형사피해자는 법률이 정하는 바에 의하여 당해 사건의 재판절차에서 진술할 수 있다. 
        국회의 회의는 공개한다. 다만, 출석의원 과반수의 찬성이 있거나 
        의장이 국가의 안전보장을 위하여 필요하다고 인정할 때에는 공개하지 아니할 수 있다. 
        국회의원은 그 지위를 남용하여 국가·공공단체 또는 기업체와의 계약이나 
        그 처분에 의하여 재산상의 권리·이익 또는 직위를 취득하거나 
        타인을 위하여 그 취득을 알선할 수 없다.

        피고인의 자백이 고문·폭행·협박·구속의 부당한 장기화 또는 
        기망 기타의 방법에 의하여 자의로 진술된 것이 아니라고 인정될 때 또는 
        정식재판에 있어서 피고인의 자백이 그에게 불리한 유일한 증거일 때에는 
        이를 유죄의 증거로 삼거나 이를 이유로 처벌할 수 없다. 
        대통령은 국무총리·국무위원·행정각부의 장 기타 법률이 정하는 공사의 직을 겸할 수 없다.
        
        피고인의 자백이 고문·폭행·협박·구속의 부당한 장기화 또는 
        기망 기타의 방법에 의하여 자의로 진술된 것이 아니라고 인정될 때 또는 
        정식재판에 있어서 피고인의 자백이 그에게 불리한 유일한 증거일 때에는 
        이를 유죄의 증거로 삼거나 이를 이유로 처벌할 수 없다. 
        대통령은 국무총리·국무위원·행정각부의 장 기타 법률이 정하는 공사의 직을 겸할 수 없다.`,
    };
    setArticle(fakeApiResponse);
  }, []);
  return (
    <>
      <TopBar></TopBar>
      {article && (
        <NewsContainer>
          <NewsImage src={article.imageUrl} alt={article.title} />
          <ArticleBox>
            <h2>{article.title}</h2>
            <JournalistInfo>장유선 기자 | 2023.08.06</JournalistInfo>
            <ArticleContent>{article.content}</ArticleContent>
          </ArticleBox>
        </NewsContainer>
      )}
      <BottomBar></BottomBar>
    </>
  );
};

export default NewsdetailPage;
