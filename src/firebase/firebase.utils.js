import firebase from 'firebase/app'; //what gives us access to firestore and auth
import 'firebase/firestore'; //for the database
import 'firebase/auth'; //for the auth

const config = {
    apiKey: "AIzaSyCEi6YyPVXSOnXIFaUtDSHbgcSiJMdbeh4",
    authDomain: "crwn-db-9c283.firebaseapp.com",
    projectId: "crwn-db-9c283",
    storageBucket: "crwn-db-9c283.appspot.com",
    messagingSenderId: "1022933280912",
    appId: "1:1022933280912:web:b7ead9b9bf64ee01de9015",
    measurementId: "G-1DVG636GXG"
};

export const createUserProfileDocument = async (userAuth, additonalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additonalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;