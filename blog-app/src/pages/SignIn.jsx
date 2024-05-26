// import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
// import { useState } from 'react'
// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// function SignIn() {

//   const [formData, setformData] = useState([])
//   const [errorMessage, setErrorMessage] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()
//   const handleChange = (e) => {
//     e.preventDefault();

//     setformData({ ...formData, [e.target.id]: e.target.value.trim() })

//   }
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.username || !formData.email || !formData.password) {
//       return setErrorMessage("Please fill out all fields.")
//     }
//     try {
//       setLoading(true)
//       setErrorMessage(null)
//       const res = await fetch("http://localhost:8000/api/user/signin", {
//         method: "POST",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       })
//       const data = await res.json();
//       if (data.success === false) {
//         return setErrorMessage(data.message)
//       }
//       setLoading(false)
//       navigate('/')
//     } catch (error) {
//       setErrorMessage(error.message)
//       setLoading(false)
//     }
//   }

//   return (
//     <div className='min-h-screen mt-20'>
//       <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
//         {/* left */}
//         <div className="flex-1">
//           <Link to="/" className='font-bold dark:text-white text-4xl'>
//             <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Bishal's</span>Blog
//           </Link>
//           <p className="text-sm mt-5"> This is bishal bhatta.</p>
//         </div>

//         {/* right */}
//         <div className="flex-1">
//           <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

//             <div>
//               <Label value="You Email" />
//               <TextInput

//                 type="email"
//                 placeholder='Someone@gmail.com'
//                 id="email"
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <Label value="Your Password" />
//               <TextInput

//                 type="password"
//                 placeholder='Password'
//                 id="password"
//                 onChange={handleChange}
//               />
//             </div>

//             <Button gradientDuoTone='purpleToPink' type="submit" disabled={loading} >
//               {
//                 loading ? (
//                   <>
//                     <Spinner size="sm" />
//                     <span className='pl-3'>Loading...</span>
//                   </>

//                 ) : 'Sign In'
//               }
//             </Button>
//           </form>
//           <div className=" flex gap-2 text-s mt-5"> <span> Create an account</span>
//             <Link to="/signUp" className="text-blue-500 ">Sign Up</Link></div>
//           {
//             errorMessage &&
//             <Alert className="mt-5 " color="failure">
//               {errorMessage}
//             </Alert>
//           }
//         </div>

//       </div>

//     </div>
//   )
// }

// export default SignIn

import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInSuccess, signInStart } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { loading, error: errorMessage } = useSelector(state => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields.'))
    }
    try {
      // setLoading(true);
      // setErrorMessage(null);
      dispatch(signInStart())
      const res = await fetch("http://localhost:8000/api/user/signin", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message))
      }
      // setLoading(false)
      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate('/');
      }

    } catch (error) {
      // setErrorMessage(error.message);
      // setLoading(false);
      dispatch(signInFailure(error.message))
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Bishal's</span>Blog
          </Link>
          <p className="text-sm mt-5"> This is bishal bhatta.</p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder='Someone@gmail.com'
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder='Password'
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone='purpleToPink' type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : 'Sign In'}
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 text-s mt-5">
            <span> Create an account</span>
            <Link to="/signUp" className="text-blue-500 ">Sign Up</Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
