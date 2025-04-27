/**
 * Свойства файла
 * @typedef {Object} FileProps
 * @property {string} filename - Полное имя файла (с расширением)
 * @property {string} ext - Расширение файла
 * @property {string} name - Имя файла без расширения
 */
type FileProps = {
  filename: string
  ext: string
  name: string
}

/**
 * Извлекает свойства файла из его имени
 * @function extractFileProps
 * @param {string} filename - Полное имя файла (например, "document.pdf")
 * @returns {FileProps} Объект с разобранными свойствами файла
 *
 * @example
 * // Пример использования
 * const fileProps = extractFileProps('report.pdf');
 * // Возвращает: { filename: 'report.pdf', ext: 'pdf', name: 'report' }
 */
export const extractFileProps = (filename: string): FileProps => {
  return {
    filename,
    ext: filename.split('.')[1],
    name: filename.split('.')[0],
  }
}

/**
 * Применяет миксины к классу
 * @function applyMixins
 * @param {any} derivedCtor - Класс-получатель миксинов
 * @param {any[]} constructors - Массив классов-миксинов
 * @description Копирует все методы из классов-миксинов в прототип целевого класса
 *
 * @example
 * // Пример использования
 * class Disposable {}
 * class Activatable {}
 * class SmartObject {}
 * applyMixins(SmartObject, [Disposable, Activatable]);
 */
export function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null)
      )
    })
  })
}

/**
 * Генерирует политику доступа для S3 бакета
 * @function getS3BucketPolicy
 * @param {string} bucket - Название S3 бакета
 * @returns {Object} Политика доступа в формате AWS IAM
 *
 * @example
 * // Пример возвращаемого значения
 * {
 *   Version: '2012-10-17',
 *   Statement: [{
 *     Effect: 'Allow',
 *     Principal: { AWS: ['*'] },
 *     Action: ['s3:GetObject'],
 *     Resource: [`arn:aws:s3:::bucket-name/*`]
 *   }]
 * }
 */
export const getS3BucketPolicy = (bucket: string) => ({
  Version: '2012-10-17',
  Statement: [
    {
      Effect: 'Allow',
      Principal: {
        AWS: ['*'],
      },
      Action: ['s3:GetObject'],
      Resource: [`arn:aws:s3:::${bucket}/*`],
    },
  ],
})

/**
 * Добавляет указанное количество секунд к переданной дате и возвращает изменённый объект Date.
 * Исходный объект даты будет изменён (мутирован).
 *
 * @param {Date} date - Объект Date, к которому нужно добавить секунды
 * @param {number} seconds - Количество секунд для добавления (может быть отрицательным)
 * @returns {Date} Возвращает изменённый объект Date (тот же объект, что и в параметре date)
 *
 * @example
 * const now = new Date();
 * const later = addSeconds(now, 30); // добавляет 30 секунд к текущей дате
 *
 * @example
 * const date = new Date('2023-01-01T00:00:00Z');
 * addSeconds(date, -10); // вычитает 10 секунд из даты
 */
export const addSeconds = (date: Date, seconds: number): Date => {
  date.setSeconds(date.getSeconds() + seconds)

  return date
}

/**
 * Деструктурирует поля объекта, перемещая вложенные свойства в указанное поле.
 * Все свойства, имена которых начинаются с `field + separator`, будут перемещены
 * в объект `initialObject[field]`, а их имена будут обрезаны до части после разделителя.
 *
 * @template T - Тип исходного объекта
 * @param {T} initialObject - Исходный объект для деструктуризации
 * @param {string} field - Имя поля, в которое будут собраны вложенные свойства
 * @param {string} [separator='.'] - Разделитель для определения вложенных свойств
 * @returns {T} - Модифицированный объект с деструктурированными полями
 *
 * @example
 * const obj = { 'user.name': 'John', 'user.age': 30, role: 'admin' };
 * destructObject (obj, 'user');
 * // Результат: { user: { name: 'John', age: 30 }, role: 'admin' }
 */
export const destructObject = <T extends Record<string, any>>(
  initialObject: T,
  field: string,
  separator: string = '.'
): T => {
  // Создаем целевой объект для деструктурированных полей
  initialObject[field as keyof typeof initialObject] = {} as any

  // Копируем ключи, чтобы избежать проблем с изменением объекта во время итерации
  const keys = Object.keys(initialObject)

  for (const key of keys) {
    const separatorIndex = key.indexOf(separator)

    // Проверяем, что ключ содержит разделитель и начинается с указанного поля
    if (separatorIndex > 0 && key.startsWith(field + separator)) {
      const destructedField = key.slice(separatorIndex + separator.length)

      // Перемещаем значение в целевой объект
      initialObject[field][destructedField] = initialObject[key]
      delete initialObject[key]
    }
  }

  return initialObject
}
