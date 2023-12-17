import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success===false){
        setLoading(false);
        setError(data.message);
        return;
        }setLoading(false);
        setError(null);
        navigate('/');
      
    } catch (error) {
      setLoading(false);
      setError(error.message)
    }
  }
  return (
    <section>
    <h1 className='text-3xl text-center mt-6 font-bold'>Sign In</h1>
    <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
      <div className='md:w-[60%] lg:w-[45%] mb-10 md:mb-5'>
        <img 
          src="https://plus.unsplash.com/premium_photo-1661775953246-410e3a33977c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8a2V5fGVufDB8fDB8fHww" 
          alt="key" 
          className='w-full rounded'
        />

      </div>
      <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
      <form  onSubmit={handleSubmit} className='flex flex-col gap-4'>
      
      <input
        type='email'
        placeholder='email'
        className='border p-3 rounded-lg'
        id='email'
        onChange={handleChange}

      />
      <input
        type='password'
        placeholder='password'
        className='border p-3 rounded-lg'
        id='password'
        onChange={handleChange}

      />

      <button
        disabled={loading}
        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
      >
        {loading ? 'Loading...' : 'Sign In'}
      </button>
    </form>
    <div className='flex gap-2 mt-5'>
      <p>Don't have an account?</p>
      <Link to={'/sign-up'}>
        <span className='text-blue-700'>Sign up</span>
      </Link>
    </div>
    {error && <p className='text-red-500 mt-5'>{error}</p>}

    </div>

    </div>
  </section>
  )
}
