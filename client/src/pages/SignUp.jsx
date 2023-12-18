import {useState} from 'react';
import {Link , useNavigate} from 'react-router-dom';
import OAuth from '../components/OAuth';


export default function SignUp() {
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
      const res = await fetch('/api/auth/signup', {
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
        navigate('/sign-in');
      
    } catch (error) {
      setLoading(false);
      setError(error.message)
    }
  }
  return (
    <section className="flex  justify-center flex-wrap items-center min-h-screen">
      <div className="max-w-md w-full lg:w-[60%] bg-white p-8 rounded-md shadow-lg">
        <h1 className="text-3xl text-center font-bold mb-6">Sign Up</h1>
        <img
          src="https://plus.unsplash.com/premium_photo-1661775953246-410e3a33977c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8a2V5fGVufDB8fDB8fHww"
          alt="key"
          className="w-full rounded mb-6"
        />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
            type="username"
            placeholder="username"
            className="border p-3 rounded-lg"
            id="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
          <OAuth />
        </form>
        <div className="flex gap-2 mt-5">
          <p>have an account?</p>
          <Link to={'/sign-in'} className="text-blue-700">
            Sign in
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </section>
  )
}
