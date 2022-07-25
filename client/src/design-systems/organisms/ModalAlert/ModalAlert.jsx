import classNames from "classnames";
import { forwardRef, useImperativeHandle, Fragment, useCallback, useMemo } from "react";
import { Transition, Dialog } from '@headlessui/react'
import TransparentButton from "../../atoms/TransparentButton";
import useModalAlertState from "../../../hooks/useModalAlertState";

const ModalAlert = forwardRef(({
  isOpen: isOpenProp,
  title: titleProp,
  description: descriptionProp,
  type: typeProp,
  buttons: buttonsProp,
  closeModal: closeModalProp,
  positifText: positifTextProp,
  negatifText: negatifTextProp,
}, ref) => {

  const {
    isOpen,
    setIsOpen,
    title,
    setTitle,
    description,
    setDescription,
    type,
    positifText,
    negatifText,
    setType,
    openModal,
    closeModal,
    toggleModal,
    setPositifText,
    setNegatifText
  } = useModalAlertState({
    isOpen: isOpenProp,
    title: titleProp,
    description: descriptionProp,
    type: typeProp,
    buttons: buttonsProp,
    positifText: positifTextProp,
    negatifText: negatifTextProp,
  });

  const handleCloseModal = useCallback(() => {
    closeModal();

    if (closeModalProp) {
      closeModalProp()
    }
  }, [closeModal, closeModalProp])

  useImperativeHandle(ref, () => ({
    isOpen,
    open: openModal,
    close: handleCloseModal,
    toggle: toggleModal,
    setIsOpen,
    setTitle,
    setDescription,
    setType,
    setPositifText,
    setNegatifText
  }), [handleCloseModal, isOpen, openModal, setDescription, setIsOpen, setNegatifText, setPositifText, setTitle, setType, toggleModal]);

  const titleClassNames = useMemo(() => {

    const cn = ['text-lg', 'font-medium', 'leading-6']

    if (type === 'success') {
      cn.push('text-green-600')
    } else if (type === 'error') {
      cn.push('text-red-600')
    } else {
      cn.push('text-gray-900')
    }

    return cn
  }, [type])

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className={classNames(titleClassNames)}
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 capitalize">
                      {description}
                    </p>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <TransparentButton onClick={handleCloseModal}>
                      {positifText}
                    </TransparentButton>

                    {negatifText !== undefined && (
                      <TransparentButton
                        onClick={handleCloseModal}
                        color="red"
                      >
                        {negatifText}
                      </TransparentButton>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )

})

export default ModalAlert;