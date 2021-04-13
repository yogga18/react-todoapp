import firebase, {database} from '../../firebase';

// Async Handle Redux Thunk
// const actionUser = () => {
//   return (dispatch) => {
//     setTimeout(() => {
//       return dispatch({type : 'CHANGE_USER', value : 'Yogga Aditya Candra'})
//     }, 2000);
//   }
// }

// Refactoring 
export const actionUser = () => (dispatch) => {
    setTimeout(() => {
      return dispatch({type : 'CHANGE_USER', value : 'Yogga Aditya Candra'})
    }, 2000);
  }

// Register
  export const registerUserAPI = (data) => (dispatch) => {

    dispatch({type: 'CHANGE_LOADING', value: true})

    return (
      firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
          .then((userCredential) => {
              var user = userCredential.user;
              alert('Registration Success')
              console.log('sucsess', user)
              dispatch({type: 'CHANGE_LOADING', value : false})
          })
          .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorCode)
              alert(errorMessage)
              dispatch({type: 'CHANGE_LOADING', value : false})
          })
    )
  }
// Register End

// Login
export const loginUserAPI = (data) => (dispatch) => {

  return new Promise((resolve, reject) => {
    dispatch({type: 'CHANGE_LOADING', value: true})

      firebase.auth().signInWithEmailAndPassword(data.email, data.password)
          .then((userCredential) => {
              const user = userCredential.user;
              console.log('sucsess', user)
  
              const dataUser = {
                email : user.email,
                uid : user.uid,
                emailVerified : user.emailVerified,
                refreshToken : user.refreshToken,
              }
  
              dispatch({type: 'CHANGE_LOADING', value : false})
              dispatch({type: 'CHANGE_ISLOGIN', value : true})
              dispatch({type: 'CHANGE_USER', value : dataUser})
              resolve(true)
          })
          .catch((error) => {
            // Error Handling
              const errorCode = error.code;
              const errorMessage = error.message;
            // Information Error
              console.log(errorCode)
              alert(errorMessage)

              dispatch({type: 'CHANGE_LOADING', value : false})
              dispatch({type: 'CHANGE_ISLOGIN', value : false})
              reject(false)
          })
  })
}
// Login End

// Create
export const addDataToApi = (data) => (dispatch) => {
  database.ref('users/' + data.userId).push({
    title : data.title,
    content : data.content,
    date : data.date,
  })
}
// Create End

// Get
export const getDataFromApi = (userId) => (dispatch) => {
  const urlUsers = database.ref('users/' + userId);

  return new Promise((resolve, reject) => {
    urlUsers.on('value', (snapshot) => {
      // Merubah sebuah Object snapshot.val() menjadi Array
      // Namun data yang tersimpan hanya id-nya saja maka harus di lakukan membuat value baru dan di lakukan maping
      // const data = Object.keys(snapshot.val());

      if (snapshot.val() !== null) {
        const data = []
        Object.keys(snapshot.val()).map( key =>  {
            data.push({
              id : key,
              data : snapshot.val()[key]
            })
        });
  
        dispatch({type : 'SET_NOTES', value : data})
        // Check Data
        console.log('Get Data', data)
        resolve(data);
        // updateStarCount(postElement, data); 
      }
    });
  })
}
// Get End

// Update
export const updateDataAPI = (data) => (dispatch) => {
  const urlUsers = database.ref(`users/${data.userId}/${data.notesId}`);

  return new Promise((resolve, reject) => {
    urlUsers.set({
      title : data.title,
      content : data.content,
      date : data.date,
    }, (error) => {
      if (error) {
        reject(false);
      } else {
        resolve(true)
      }
    });
  })
}
// Update End

// Delete
  export const deletDataAPI = (data) => (dispatch) => {
    const urlUsers = database.ref(`users/${data.userId}/${data.notesId}`);

    return new Promise ((resolve, reject) => {
      urlUsers.remove();
    })
  }
// Delete End

// Logout
// export const logoutUserAPI = () => (dispatch) => {

//   return new Promise((resolve, reject) => {
//       firebase.auth().signOut()
//           .then(() => {
//             console.log('Logout Suksess')
//           })
//           .catch((error) => {
//               console.log('Logout Gagal', error)
//           })
//   })
// }
// Logout End