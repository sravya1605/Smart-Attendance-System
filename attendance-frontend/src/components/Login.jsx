import { useState } from 'react';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } else {
      setError('Invalid credentials');
    }
  };

  const handleRegister = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (storedUsers.some(u => u.email === email)) {
      setError('User already exists');
      return;
    }
    const newUser = { email, password };
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Teacher Login</h2>
        {error && <p className="error">{error}</p>}
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input"
          />
          <button onClick={handleLogin} className="button login-button">Login</button>
          <button onClick={handleRegister} className="button register-button">Register</button>
        </div>
      </div>
    </div>
  );
}

export default Login;