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
