import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
import { useContext } from 'react';
import ModContext from '../../store/modalShow-context';

function Backdrop () {
    const modCtx = useContext(ModContext);

    return (
        <div className={classes.backdrop} onClick={modCtx.hideCart} />
    );      //passing props here instead of using context might be better to allow the Modal component to be reusable
};

function ModalOverlay (props) {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const portalElement = document.getElementById('overlays');

function Modal (props) {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </>
    );
};

export default Modal;