type FileProps = {
  filename: string
  ext: string
  name: string
}

export const extractFileProps = (filename: string): FileProps => {
  return {
    filename,
    ext: filename.split('.')[1],
    name: filename.split('.')[0],
  }
}

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
