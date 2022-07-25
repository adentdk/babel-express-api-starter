const { useState, useEffect, useCallback } = require("react");

const useModalAlertState = ({
  isOpen: isOpenParam,
  title: titleParam,
  description: descriptionParam,
  type: typeParam,
  positifText: positifTextParam,
  negatifText: negatifTextParam,
} = {}) => {

  const [isOpen, setIsOpen] = useState(() => isOpenParam || false);
  const [title, setTitle] = useState(() => titleParam || 'Alert')
  const [description, setDescription] = useState(() => descriptionParam || '')
  const [type, setType] = useState(() => typeParam || 'info');
  const [positifText, setPositifText] = useState(() => positifTextParam || 'Ok');
  const [negatifText, setNegatifText] = useState(() => negatifTextParam)


  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  const openModal = useCallback(() => {
    setIsOpen(true)
  }, [])

  const toggleModal = useCallback(() => {
    setIsOpen(prevState => !prevState)
  }, [])


  useEffect(() => {
    if (isOpenParam !== undefined && isOpen !== isOpenParam) {
      setIsOpen(isOpenParam)
    }

    if (titleParam !== undefined && title !== titleParam) {
      setTitle(titleParam)
    }

    if (descriptionParam !== undefined && description !== descriptionParam) {
      setDescription(descriptionParam)
    }

    if (typeParam !== undefined && type !== typeParam) {
      setType(typeParam)
    }

    if (positifTextParam !== undefined && positifText !== positifTextParam) {
      setPositifText(positifTextParam)
    }

    if (negatifTextParam !== undefined && negatifText !== negatifTextParam) {
      setNegatifText(negatifTextParam)
    }

  }, [description, descriptionParam, isOpen, isOpenParam, negatifText, negatifTextParam, positifText, positifTextParam, title, titleParam, type, typeParam]);


  return {
    isOpen, setIsOpen,
    title, setTitle,
    description, setDescription,
    type, setType,
    positifText, setPositifText,
    negatifText, setNegatifText,
    openModal,
    closeModal,
    toggleModal
  }
}

export default useModalAlertState;
