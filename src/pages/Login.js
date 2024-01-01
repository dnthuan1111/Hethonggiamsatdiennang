import React, { useState } from "react";
import '../pages/Login.css'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validCredentials = {
    thuan: "admin",
    admin: "admin",
    kiet: "admin",
    user1: "password1",
    user2: "password2",
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (validCredentials.hasOwnProperty(username) && validCredentials[username] === password) {
      // Nếu đăng nhập thành công, chuyển hướng đến trang About
      window.location.href = "/about";
    } else {
      // Hiển thị thông báo lỗi
      setError("Tên đăng nhập hoặc mật khẩu không đúng.");
    }
  };

  return (
    <div className="full-screen-background">
      <h1 className="main-title">HỆ THỐNG GIÁM SÁT ĐIỆN NĂNG LƯỢNG MẶT TRỜI</h1>
      <div className="login-container">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Đăng nhập</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
  
}

export default Login;
