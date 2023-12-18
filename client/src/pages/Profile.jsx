import { useSelector } from "react-redux"
import { useRef,useState,useEffect } from "react"
import {getDownloadURL, getStorage, ref, uploadBytesResumable, } from 'firebase/storage'
import { useDispatch } from "react-redux"
import {Link} from 'react-router-dom'

export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser} = useSelector((state)=>state.user)
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  

  useEffect(()=>{
    if(file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error)=>{
        setFileUploadError(true);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
        setFormData({...formData, avatar:downloadURL}));
      }
    );
  };


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input 
          type="file" 
          hidden
          accept="image/*"
        />
        <img 
          src={currentUser.avatar}
          alt="profile" 
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input 
          type="text" 
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
        />
        <input 
          type="email" 
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
        /><input 
          type="password" 
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95 disabled:opacity-80">
          Update
        </button>
        <Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95" to='/create-listing'>
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">
          Delete account
        </span>
        <span className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>

    </div>
  )
}
