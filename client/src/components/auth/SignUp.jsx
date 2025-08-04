import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Split name into first and last name
    const [firstName, ...rest] = name.trim().split(' ');
    const lastName = rest.join(' ');
    if (!firstName || !lastName) {
      setError('Please enter your full name (first and last).');
      setLoading(false);
      return;
    }
    
    try {
      await register(firstName, lastName, email, password);
      navigate('/signin');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl w-full max-w-4xl relative">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        {/* Back Arrow */}
        <Link to="/" className="mb-5 text-gray-700 hover:text-black flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <span className="hidden md:inline text-sm font-medium">Back</span>
        </Link>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Create an account</h1>
            <p className="text-gray-500 mt-2">Sign up and get 30 day free trial</p>
          </div>
          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Full name
              </label>
              <input
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-400"
                id="name"
                type="text"
                placeholder="Amélie Laurent"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-400"
                id="email"
                type="email"
                placeholder="amelielaurent7622@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-400"
                id="password"
                type="password"
                placeholder="*********************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <button
                className="bg-black hover:bg-gray-900 text-white font-bold py-3 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline disabled:opacity-50"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Already have an account?{' '}
              <Link to="/signin" className="font-bold text-black-500 hover:text-black-600">
                Sign in
              </Link>
            </p>
          </div>
        </div>
        {/* Image Section */}
        <div className="hidden md:block md:w-1/2">
          <img
            className="object-cover rounded-r-2xl h-full w-full"
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt="Team working"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp; 