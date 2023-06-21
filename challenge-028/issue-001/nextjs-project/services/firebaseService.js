import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
    sendPasswordResetEmail,
    signOut
} from "firebase/auth";

const auth = getAuth()


export const signUp = (email, pw) => {
    //const auth = getAuth()
  
    return new Promise((resolve) => {
  
      createUserWithEmailAndPassword(
        auth, //firebaseAuth,
        email,
        pw
      )
        .then((userCredential) => {
          //sendEmailVerification(auth.currentUser).then(() => {
          //  getAdditionalUserInfo
          //})
          console.log('user created, now to send email verification:')
          console.log(auth.currentUser)
          // these two should be the same
          //sendEmailVerification(userCredential.user)
          sendEmailVerification(auth.currentUser)
          console.log('email sent')
          const param = {
            status: 'success',
            uid : userCredential.user.uid,
            accessToken: userCredential.user.accessToken
          }
          resolve(param)
        })
        .catch((error) => {
          console.log(error)  
          const param = {
                status: 'failed',
                reason : error.message
            }
      
            // eslint-disable-next-line prefer-promise-reject-errors
            resolve(param)
        })
    })
}


export const signIn = (email, pw) => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, pw)
        .then((userCredential) => {
          const param = {
            status: 'success',
            uid : userCredential.user.uid,
            accessToken: userCredential.user.accessToken
          }
          resolve(param)
        })
        .catch((error) => {
          const param = {
            status: 'failed',
            reason : error.message
          }
  
          // eslint-disable-next-line prefer-promise-reject-errors
          resolve(param)
        })
    })
  }

export const signOutUser = () => {
  signOut(auth).then(() => {
    console.log('sign out successful')
  }).catch((error) => {
    console.log('error in sign out')
    console.log(error)
  });
  }
  
  
export const handleUserPasswordChange = async (currentPw, pw) => {
  const credential = EmailAuthProvider.credential(
    auth.currentUser.email,
    currentPw
  )

  return new Promise((resolve, reject) => {
    reauthenticateWithCredential(
      auth.currentUser, 
      credential
    )
    .then((result) => {
      console.log(result)

      
        if (pw) {
          updatePassword(auth.currentUser, pw)
            .then(() => {
              const param = {
                status: 'success',
              }
              resolve(param)
            })
            .catch((error) => {
              console.log('false pwd setting', error.message, error)
              resolve({status: 'failure', reason: error.message})
            })
        }
      })
    
    .catch((error) => {
      console.log('here we go' + error.message)
      if (error.message.includes('wrong-password')) {
        resolve({status: 'failure', reason: 'WrongPassword'})
      }
      else if (error.message.includes('too-many-requests')) {
        resolve({status: 'failure', reason: 'TooManyRequests'})
      }
      else {
        resolve({status: 'failure', reason: 'AuthenticationFailed'})
      }
    })
  })
}
  
export const PasswordResetEmail = (email) => {
  
    return new Promise((resolve) => {
  
      sendPasswordResetEmail(auth, email)
        .then(() => {
          resolve({status: 'success'})
        })
        .catch((error) => {
          const errorCode = error.code
  
          resolve({status: 'failed', reason: error.message})
        // ..
        })
    })
   
  }
  