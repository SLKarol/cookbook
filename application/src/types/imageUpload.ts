export type UploadComponentProps = {
  /**
   * Id фото
   */
  id?: string;
  /**
   * Обработчик выбора изображения
   */
  onSelectImage?: TypeHandlerSelect;
  /**
   * Обязательно выбирать фото?
   */
  required?: boolean;
  /**
   * Выбранное фото
   */
  selectedImage?: string;
  /**
   * Какая-то ошибка?
   */
  error?: boolean;
};

/**
 * Возвращаемая информация о выбранном изображении в контроле
 */
export type InfoImage = {
  id: string;
  imageContent: string | ArrayBuffer | null;
};

/**
 * Функция обработки выбора изображения
 */
export type TypeHandlerSelect = (info: InfoImage) => void;
