// import { Alert, Button, TextInput } from 'flowbite-react'
// import React, { useEffect, useState } from 'react'
// import { useRef } from 'react'
// import { useSelector } from 'react-redux'
// import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
// import { app } from '../firebase'
// function DashProfile() {
//     const { currentUser } = useSelector(state => state.user)
//     const [imageFile, setImageFile] = useState(null)
//     const [imageFileUrl, setImageFileUrl] = useState(null)
//     const [imageFileUploadError, setImageFileUploadError] = useState(null)
//     const [imageFileUpoadingProcess, setImageFileUpoadingProcess] = useState(null)

//     const filePickerRef = useRef();
//     console.log(imageFileUpoadingProcess, imageFileUploadError)
//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         setImageFile(file)
//         setImageFileUrl(URL.createObjectURL(file))
//     }
//     useEffect(() => {
//         if (imageFile) {
//             uploadImage();
//         }
//     }, [imageFile])

//     const uploadImage = async () => {
//         const storage = getStorage(app)
//         const fileName = new Date().getTime() + imageFile.name;
//         const storageRef = ref(storage, fileName)
//         const uploadTask = uploadBytesResumable(storageRef, imageFile)
//         uploadTask.on(
//             'state_changed',
//             (snapshot) => {
//                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 setImageFileUpoadingProcess(progress.toFixed(0))
//             },
//             (error) => {
//                 setImageFileUploadError("Could not upload image")

//             },
//             () => {
//                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                     setImageFileUrl(downloadURL)
//                 })
//             }
//         )

//     }

//     return (
//         <div className="max-w-lg mx-auto p-3 w-full">
//             <h1 className="my-7 text-center font-semibold text-3xl">

//                 Profile
//             </h1>
//             <form className='flex flex-col gap-4'>
//                 <input type="file" accept='image/.*' onChange={handleImageChange} ref={filePickerRef} className="hidden" />
//                 <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={() => filePickerRef.current.click()}>
//                     <img src={imageFileUrl || currentUser.profilePicture} alt="user" className="rounded-full  w-full h-full object-cover border-8 border-[lightgray]" />

//                     {imageFileUploadError &&
//                         <Alert color='failure'>{imageFileUploadError}</Alert>}
//                 </div>

//                 <TextInput type="text" id="username" placeholder="Username" defaultValue={currentUser.username} />
//                 <TextInput type="email" id="email" placeholder="Email" defaultValue={currentUser.email} />
//                 <TextInput type="password" id="password" placeholder="Password" />
//                 <Button type="submit" gradientDuoTone="purpleToBlue" outline>Update</Button>

//             </form>
//             <div className='text-red-500 flex justify-between mt-5'>
//                 <span className="cursor-pointer"> Delete Account</span>
//                 <span className="cursor-pointer">Sign Out</span>
//             </div>
//         </div>
//     )
// }

// export default DashProfile

// import React, { useEffect, useState, useRef } from 'react';
// import { useSelector } from 'react-redux';
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { app } from '../firebase';
// import { Alert, Button, TextInput } from 'flowbite-react';

// function DashProfile() {
//     const { currentUser } = useSelector(state => state.user);
//     const [imageFile, setImageFile] = useState(null);
//     const [imageFileUrl, setImageFileUrl] = useState(null);
//     const [imageFileUploadError, setImageFileUploadError] = useState(null);
//     const [imageFileUploadingProcess, setImageFileUploadingProcess] = useState(null);
//     console.log(imageFileUploadError, imageFileUploadingProcess)
//     const filePickerRef = useRef();

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file && file.type.startsWith('image/')) {
//             setImageFile(file);
//             setImageFileUrl(URL.createObjectURL(file));
//             setImageFileUploadError(null);
//         } else {
//             setImageFile(null);
//             setImageFileUrl(null);
//             setImageFileUploadError('Please select a valid image file.');
//             setImageFileUploadingProcess(null);
//         }
//     };

//     useEffect(() => {
//         if (imageFile) {
//             uploadImage();
//         }
//     }, [imageFile]);

//     const uploadImage = async () => {
//         const storage = getStorage(app);
//         const fileName = new Date().getTime() + imageFile.name;
//         const storageRef = ref(storage, fileName);
//         const uploadTask = uploadBytesResumable(storageRef, imageFile);

//         uploadTask.on(
//             'state_changed',
//             (snapshot) => {
//                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 setImageFileUploadingProcess(progress.toFixed(0));
//             },
//             (error) => {
//                 setImageFileUploadError('Could not upload image');
//                 setImageFileUploadingProcess(null);
//             },
//             () => {
//                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                     setImageFileUrl(downloadURL);
//                 });
//             }
//         );
//     };

//     return (
//         <div className="max-w-lg mx-auto p-3 w-full">
//             <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
//             <form className='flex flex-col gap-4'>
//                 <input
//                     type="file"
//                     accept='image/*'
//                     onChange={handleImageChange}
//                     ref={filePickerRef}
//                     className="hidden"
//                 />
//                 <div
//                     className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
//                     onClick={() => filePickerRef.current.click()}
//                 >
//                     <img
//                         src={imageFileUrl || currentUser.profilePicture}
//                         alt="user"
//                         className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
//                     />

//                 </div>
//                 {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}

//                 <TextInput type="text" id="username" placeholder="Username" defaultValue={currentUser.username} />
//                 <TextInput type="email" id="email" placeholder="Email" defaultValue={currentUser.email} />
//                 <TextInput type="password" id="password" placeholder="Password" />
//                 <Button type="submit" gradientDuoTone="purpleToBlue" outline>Update</Button>
//             </form>
//             <div className='text-red-500 flex justify-between mt-5'>
//                 <span className="cursor-pointer">Delete Account</span>
//                 <span className="cursor-pointer">Sign Out</span>
//             </div>
//         </div>
//     );
// }

// export default DashProfile;



// import React, { useEffect, useState, useRef } from 'react';
// import { useSelector } from 'react-redux';
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { app } from '../firebase';
// import { Alert, Button, TextInput } from 'flowbite-react';

// function DashProfile() {
//     const { currentUser } = useSelector(state => state.user);
//     const [imageFile, setImageFile] = useState(null);
//     const [imageFileUrl, setImageFileUrl] = useState(null);
//     const [imageFileUploadError, setImageFileUploadError] = useState(null);
//     const [imageFileUploadingProcess, setImageFileUploadingProcess] = useState(null);
//     console.log(imageFileUploadError, imageFileUploadingProcess)
//     const filePickerRef = useRef();

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file && file.type.startsWith('image/')) {
//             setImageFile(file);
//             setImageFileUrl(URL.createObjectURL(file));
//             setImageFileUploadError(null);
//         } else {
//             setImageFileUploadError('Please select a valid image file.');
//             console.error('Please select a valid image file.');
//         }
//     };

//     useEffect(() => {
//         if (imageFile) {
//             uploadImage();
//         }
//     }, [imageFile]);

//     const uploadImage = async () => {
//         const storage = getStorage(app);
//         const fileName = new Date().getTime() + imageFile.name;
//         const storageRef = ref(storage, fileName);
//         const uploadTask = uploadBytesResumable(storageRef, imageFile);

//         uploadTask.on(
//             'state_changed',
//             (snapshot) => {
//                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 setImageFileUploadingProcess(progress.toFixed(0));
//             },
//             (error) => {
//                 setImageFileUploadError('Could not upload image');
//                 setImageFileUploadingProcess(null);
//             },
//             () => {
//                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                     setImageFileUrl(downloadURL);
//                 });
//             }
//         );
//     };

//     return (
//         <div className="max-w-lg mx-auto p-3 w-full">
//             <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
//             <form className='flex flex-col gap-4'>
//                 <input
//                     type="file"
//                     accept='image/*'
//                     onChange={handleImageChange}
//                     ref={filePickerRef}
//                     className="hidden"
//                 />
//                 <div
//                     className=" relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
//                     onClick={() => filePickerRef.current.click()}
//                 >
//                     {imageFileUploadingProcess && (
//                         <CircularProgressbar value={imageFileUploadingProcess || 0} text={`${imageFileUploadingProcess}`}
//                             strokeWidth={5}
//                             styles={{
//                                 root: {
//                                     width: "100%",
//                                     height: '100%',
//                                     position: 'absolute',
//                                     top: 0,
//                                     left: 0
//                                 },
//                                 path: {
//                                     storke: `rgba(62,152,199,${imageFileUploadingProcess / 100})`
//                                 }
//                             }}
//                         />
//                     )}
//                     <img
//                         src={imageFileUrl || currentUser.profilePicture}
//                         alt="user"
//                         className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadingProcess && imageFileUploadingProcess < 100 && "opacity-60"}`}
//                     />

//                 </div>
//                 {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}

//                 <TextInput type="text" id="username" placeholder="Username" defaultValue={currentUser.username} />
//                 <TextInput type="email" id="email" placeholder="Email" defaultValue={currentUser.email} />
//                 <TextInput type="password" id="password" placeholder="Password" />
//                 <Button type="submit" gradientDuoTone="purpleToBlue" outline>Update</Button>
//             </form>
//             <div className='text-red-500 flex justify-between mt-5'>
//                 <span className="cursor-pointer">Delete Account</span>
//                 <span className="cursor-pointer">Sign Out</span>
//             </div>
//         </div>
//     );
// }

// export default DashProfile;

import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { Alert, Button, TextInput } from 'flowbite-react';

function DashProfile() {
    const { currentUser } = useSelector(state => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploadingProcess, setImageFileUploadingProcess] = useState(null);
    console.log(imageFileUploadError, imageFileUploadingProcess)
    const filePickerRef = useRef();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
            setImageFileUploadError(null);
        } else {
            setImageFileUploadError('Please select a valid image file.');
            console.error('Please select a valid image file.');
        }
    };

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    const uploadImage = async () => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUploadingProcess(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError('Could not upload image');
                setImageFileUploadingProcess(null);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setImageFileUploadingProcess(null); // Reset the progress once upload is complete
                });
            }
        );
    };

    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form className='flex flex-col gap-4'>
                <input
                    type="file"
                    accept='image/*'
                    onChange={handleImageChange}
                    ref={filePickerRef}
                    className="hidden"
                />
                <div
                    className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
                    onClick={() => filePickerRef.current.click()}
                >
                    {imageFileUploadingProcess && (
                        <CircularProgressbar value={imageFileUploadingProcess || 0} text={`${imageFileUploadingProcess}%`}
                            strokeWidth={5}
                            styles={{
                                root: {
                                    width: "100%",
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0
                                },
                                path: {
                                    stroke: `rgba(62, 152, 199, ${imageFileUploadingProcess / 100})`
                                },
                                text: {
                                    fill: '#000',
                                    fontSize: '20px',
                                    fontWeight: 'bold'
                                }
                            }}
                        />
                    )}
                    <img
                        src={imageFileUrl || currentUser.profilePicture}
                        alt="user"
                        className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadingProcess && imageFileUploadingProcess < 100 && "opacity-60"}`}
                    />
                </div>
                {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}

                <TextInput type="text" id="username" placeholder="Username" defaultValue={currentUser.username} />
                <TextInput type="email" id="email" placeholder="Email" defaultValue={currentUser.email} />
                <TextInput type="password" id="password" placeholder="Password" />
                <Button type="submit" gradientDuoTone="purpleToBlue" outline>Update</Button>
            </form>
            <div className='text-red-500 flex justify-between mt-5'>
                <span className="cursor-pointer">Delete Account</span>
                <span className="cursor-pointer">Sign Out</span>
            </div>
        </div>
    );
}

export default DashProfile;
