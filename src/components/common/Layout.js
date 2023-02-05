/*

기존 공통레이아웃으로 각 서브페이지에 분산되어있던 스타일을 commom폴더에 Loayout.js로 컨포넌트로 분리한다
그리고 각각의 세부 컨텐츠는 props로 전달할 수 있도록 한다



먼저 리액트가 render할 때 코드가 어떻게 컴파일하는지 알면 이해할수있다
React.createElement(Component,props, ... children)을 이요해서 반환한다
props는 객체형태로 children까지 전달한다
여는 태그와 닫는 태그가 있는 JSX 표현에서 두 태그 사이의 내용은 props.children이라는 특수한 prop으로 넘겨집니다.(출처 리액트공식노트)
어떤 컴포넌트들은 어떤 자식 엘레멘트가 들어올지 예상이 안되는 경우가 비일비재하다
이런 경우에서, 같은 레이아웃안에 다른 내용을 보여줘야 할경우 
(gallery의 경우 사진이, community경우 table태그 등) 이럴경우 children을 사용하면 효율적으로 Layout.js라는 컴포넌트를 재사용할 수 있다 =>props.children을 사용하는 이점

*/


function Layout(props) {
    //props는 부모로부터 전달받은 인수값
    return (
        <section className={`content ${props.name}`}>
            {/* class이름이 2가지, 하나는 content공통클래스, 다른하나는 부모로부터 props로 받은 값을 전달해서 생성되는 서브클래스 인데 공통클래스경우에는 문자열이고 서브클래스의 경우 매개변수이기 때문에 변수처리 ${}로 변수임을 알려야한다 그리고 변수와 문자열을 혼합해서 작성하기 위해서 백틱으로 감싸야한다 */}
            <figure></figure>
            <div className='inner'>
                <h1>{props.name}</h1>
                {/* props에서 넘기는 값을 그대로 사용해도 되는 값이기 때문에 클래스에도 적용하고 이곳에도 적용하는 케이스
        문자열과 혼용하거나 하지 않기 때문에 ${}없이도 매개변수로 인식할 수 있다 */}
                {props.children}
                {/*여는 태그와 닫는 태그가 있는 JSX 표현에서 두 태그 사이의 내용은 props.children이라는 특수한 prop으로 넘겨집니다.(출처 리액트공식노트) 부모컴포넌트에서 <layout></Layout>사이의 모든 내용들을 한번에 children으로 받아서 적용하는 것 */}
            </div>
        </section>
    );
}

export default Layout;