import { Fragment } from "react"
import ModalAlert from "../design-systems/organisms/ModalAlert/ModalAlert"
import useModalAlertState from "../hooks/useModalAlertState"

function withModalAlert(Component) {
  return (props) => {
    const {
      setTitle,
      setDescription,
      setType,
      setIsOpen,
      setButtons,
      openModal,
      closeModal,
      toggleModal,
      ...modalProps
    } = useModalAlertState()

    return (
      <Fragment>
        <Component {...props} modalAction={{
          setTitle,
          setDescription,
          setType,
          setIsOpen,
          setButtons,
          open: openModal,
          close: closeModal,
          toggle: toggleModal,
        }} />
        <ModalAlert {...modalProps} closeModal={closeModal} />
      </Fragment>
    )
  }
}

export default withModalAlert