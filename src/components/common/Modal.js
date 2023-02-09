import { useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
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
        // <aside className='modal'>
        //     <div className='con'>{props.children}</div>
        //     <span
        //         className='close'
        //         onClick={() => {
        //             //부모로부터 props로 state변경함수를 전달받아서 호출
        //             props.setOpen(false);
        //         }}
        //     >
        //         close
        //     </span>
        // </aside>
        <AnimatePresence>
            {Open && (
                <motion.aside
                    className='modal'
                    initial={{ opacity: 0, scale: 0, rotate: 45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0, transition: { duration: 1 } }}
                    exit={{ opacity: 0, x: '50%', transition: { duration: 0.5, delay: 0.5 } }}
                >
                    <motion.div
                        className='con'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 1 } }}
                        exit={{ opacity: 0 }}
                    >
                        {props.children}
                    </motion.div>
                    <motion.span
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: 1 } }}
                        exit={{ opacity: 0, x: 100 }}
                        className='close'
                        onClick={() => setOpen(false)}
                    >
                        close
                    </motion.span>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}

export default Modal;