import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  // CHANGE 1: We added a new state variable specifically for the user's name
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError('');

    try {
      // CHANGE 2: The fetch URL now points to '/auth/signup', not login.
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // We must include the 'name' in the body because our backend Signup controller expects it!
        body: JSON.stringify({ name, email, password }), 
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      // We do NOT save a token to localStorage here. 
      // Why? Because our backend /signup route doesn't create a JWT token. It just creates the user.
      
      // CHANGE 3: Since the account was created successfully, we redirect them to the Login page
      // so they can log in and actually get their JWT keycard.
      navigate('/login'); 
      
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        {/* NEW INPUT: We added this input box so the user can type their name */}
        <input 
          type="text" 
          placeholder="Full Name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
          required 
        />
        <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Create Account
        </button>
      </form>
    </div>
  );
}