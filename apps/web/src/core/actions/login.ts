'use server'

export async function login(formData: FormData) {
  return new Promise(() => {
    console.log('hi')
  })
  // try {
  //   signIn('credentials', formData)
  // } catch (error) {
  //   if (error instanceof AuthError) {
  //     switch (error.type) {
  //       case 'CredentialsSignin': {
  //         return 'Некорректные данные.'
  //       }
  //       default: {
  //         return 'Неизвестная ошибка.'
  //       }
  //     }
  //   }
  //   throw error
  // }
}
