import { FC } from 'react';
import ReactModal from 'react-modal';
import { useHistory } from 'react-router';

import s from './Modal.module.css';
import { Image } from '../Image';
import { usePost } from '../../hooks/usePost';
import { isUndefined } from '../../util';

ReactModal.setAppElement('#root');

export const Modal: FC = () => {
  const { goBack } = useHistory();
  const post = usePost();

  const image = !isUndefined(post) && (
    <Image {...post.image} />
  );

  return (
    <ReactModal
      isOpen
      onRequestClose={() => goBack()}
      contentLabel="fullscreen"
      overlayClassName={s.overlay}
      className={s.modal}
      bodyOpenClassName={s.bodyOpen}
      htmlOpenClassName={s.rootOpen}
      portalClassName=""

      // onAfterOpen={
      //   handleAfterOpenFunc
      //   /* Function that will be run after the modal has opened. */}

      // onAfterClose={
      //   handleAfterCloseFunc
      //   /* Function that will be run after the modal has closed. */}

      // closeTimeoutMS={
      //   0
      //   /* Number indicating the milliseconds to wait before closing
      //  the modal. */}

      // style={
      //   { overlay: {}, content: {} }
      //   /* Object indicating styles to be used for the modal.
      //  It has two keys, `overlay` and `content`.
      //  See the `Styles` section for more details. */}

      // id={
      //   'some-id'
      //   /* String id to be applied to the content div. */}

      // ariaHideApp={
      //   true
      //   /* Boolean indicating if the appElement should be hidden */}

      // shouldFocusAfterRender={
      //   true
      //   /* Boolean indicating if the modal should be focused after render. */}

      // shouldCloseOnOverlayClick={
      //   true
      //   /* Boolean indicating if the overlay should close the modal */}

      // shouldCloseOnEsc={
      //   true
      //   /* Boolean indicating if pressing the esc key should close the modal
      //  Note: By disabling the esc key from closing the modal
      //  you may introduce an accessibility issue. */}

      // shouldReturnFocusAfterClose={
      //   true
      //   /* Boolean indicating if the modal should restore focus to the element
      //  that had focus prior to its display. */}

      // role={
      //   'dialog'
      //   /* String indicating the role of the modal, allowing the 'dialog' role
      //  to be applied if desired.
      //  This attribute is `dialog` by default. */}

      // parentSelector={
      //   () => document.body
      //   /* Function that will be called to get the parent element
      //  that the modal will be attached to. */}

      // aria={
      //   {
      //     labelledby: 'heading',
      //     describedby: 'full_description',
      //   }
      //   /* Additional aria attributes (optional). */}

      // data={
      //   { background: 'green' }
      //   /* Additional data attributes (optional). */}

      // overlayRef={
      //   setOverlayRef
      //   /* Overlay ref callback. */}

      // contentRef={
      //   setContentRef
      //   /* Content ref callback. */}
    >
      {image}
    </ReactModal>
  );
};
