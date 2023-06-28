import { app } from '@/firebase';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

const storage = getStorage(app);

// Create the file metadata

const uploadImage = (file: File) => {
  // Upload file and metadata to the object 'images/mountains.jpg'
  return new Promise((res, rej) => {
    /** @type {any} */

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      rej('File is not an image');
    }

    const metadata: any = {
      contentType: file.type,
    };
    console.log('metadata = ', metadata);
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            console.log("User doesn't have permission to access the object");
            console.log(error);
            rej(error);
            break;
          case 'storage/canceled':
            // User canceled the upload
            console.log('User canceled the upload');
            rej(error);
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            console.log('Unknown');
            rej(error);
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          res(downloadURL);
        });
      }
    );
  });
};

export default uploadImage;
