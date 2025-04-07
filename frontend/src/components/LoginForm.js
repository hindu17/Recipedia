// import React, { useState } from 'react';
// import axios from 'axios';


// const LoginForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/auth/login', {
//         username,
//         password
//       });

//       const { token } = res.data;
//       localStorage.setItem('token', token);
//       alert('✅ Login successful!');
//     } catch (err) {
//       console.error(err);
//       alert('❌ Login failed. Check your credentials.');
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <h2>🔓 Login</h2>
//       <input
//         type="text"
//         value={username}
//         onChange={e => setUsername(e.target.value)}
//         placeholder="Username"
//         required
//       /><br />
//       <input
//         type="password"
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//         placeholder="Password"
//         required
//       /><br />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginForm;
