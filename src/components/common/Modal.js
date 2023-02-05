import { useEffect } from "react";
function Modal(props) {
    useEffect(() => {
        //모달 컴포넌트 마운트시 스크롤기능 비활성화
        document.body.style.overflow = 'hidden';

        return () => {
            //모달 컴포넌트 언마운트시 스크롤기능 다시 활성화 (clean-up)
            document.body.style.overflow = 'auto';
        };
    }, []);
    return (
        <aside className='modal'>
            <div className='con'>{props.children}</div>
            <span
                className='close'
                onClick={() => {
                    //부모로부터 props로 state변경함수를 전달받아서 호출
                    props.setOpen(false);
                }}
            >
                close
            </span>
        </aside>
    );
}

export default Modal;