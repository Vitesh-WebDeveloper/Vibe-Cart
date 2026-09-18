// We import useState to remember what the user types, 
// and useNavigate to change pages without reloading the whole website.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  // State variables act like short-term memory. 
  // They hold the email and password exactly as the user types them.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Holds any error messages (like "Invalid Credentials")
  
  // navigate allows us to redirect the user (e.g., send them to the Home page after logging in)
  const navigate = useNavigate();

  // QUESTION ANSWERED: What is React.FormEvent?
  // Because we are using TypeScript, we can't just pass 'e' (the event). 
  // We have to tell TypeScript exactly what KIND of event 'e' is. 
  // React.FormEvent tells TypeScript: "This event comes from a user submitting an HTML <form>".
  const handleLogin = async (e: React.FormEvent) => {
    
    // This stops the browser's default behavior of refreshing the page when a form is submitted.
    // If the page refreshes, we lose all our React state!
    e.preventDefault(); 
    
    // Clear any old errors before trying to log in again.
    setError('');

    // QUESTION ANSWERED: Explain the Try block
    // The try/catch block is like making a phone call. 
    // "Try" to call the backend. If anything goes wrong (network drops, wrong password), 
    // immediately jump down to "catch" and handle the error gracefully without crashing the app.
    try {
      // 1. Make the phone call to our Node.js backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST', // We are sending data, so we use POST
        headers: { 'Content-Type': 'application/json' }, // We tell the backend to expect JSON data
        body: JSON.stringify({ email, password }), // We package the email/password into a JSON string
      });

      // 2. Wait for the backend to answer and unpack the JSON response
      const data = await response.json();

      // 3. Check if the backend sent a 400 or 401 error status (response.ok is false)
      if (!response.ok) {
        // If it failed, we "throw" an error. This immediately stops the 'try' block 
        // and jumps directly to the 'catch' block below.
        throw new Error(data.error || 'Login failed');
      }

      // 4. If we made it this far, the login was a success! 
      // The backend gave us the VIP keycard (data.token). 
      // We save the token and the user's name permanently in the browser's wallet (localStorage).
      localStorage.setItem('token', data.token);
      localStorage.setItem('userName', data.name);

      // 5. Send the user to the Home page ('/')
      navigate('/');
      
      // 6. Force a quick browser refresh. This makes the Navbar re-render so it 
      // can see the new token in localStorage and change "Login" to "Logout".
      window.location.reload(); 
      
    } catch (err: any) {
      // If ANYTHING failed in the 'try' block (wrong password, server down),
      // we catch the error here and update our error state to show it in red on the screen.
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      
      {/* If the 'error' state has text in it, display this red paragraph */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      {/* When the user presses Enter or clicks the button, trigger handleLogin */}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input 
          type="email" 
          placeholder="Email" 
          value={email} // Ties the input box directly to our 'email' state
          onChange={(e) => setEmail(e.target.value)} // Updates the state every time they type a letter
          className="p-2 border rounded"
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} // Ties the input box to our 'password' state
          onChange={(e) => setPassword(e.target.value)} // Updates the state
          className="p-2 border rounded"
          required 
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Sign In
        </button>
      </form>
    </div>
  );
}