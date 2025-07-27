# Google Login Implementation Guide for ChatKro

## Overview
This guide will walk you through implementing Google OAuth authentication in your React ChatKro application using Google's official libraries.

## Prerequisites
- Node.js and npm installed
- React application setup (already done)
- Google Developer Console access

---

## Step 1: Google Cloud Console Setup

### 1.1 Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: `ChatKro-Auth`
4. Click "Create"

### 1.2 Enable Google+ API
1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google+ API" and enable it
3. Also enable "Google Identity" API

### 1.3 Create OAuth 2.0 Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. If prompted, configure OAuth consent screen:
   - User Type: External
   - App name: ChatKro
   - User support email: your email
   - Developer contact: your email
4. Application type: Web application
5. Name: ChatKro Web Client
6. Authorized JavaScript origins:
   - `http://localhost:5173` (for development)
   - `http://localhost:3000` (alternative)
7. Authorized redirect URIs:
   - `http://localhost:5173/auth/google/callback`
8. Click "Create"
9. **IMPORTANT**: Copy the Client ID (you'll need this)

---

## Step 2: Install Required Dependencies

Open terminal in your client directory and run:

```bash
npm install @google-cloud/local-auth google-auth-library jwt-decode
```

Or if you prefer yarn:

```bash
yarn add @google-cloud/local-auth google-auth-library jwt-decode
```

---

## Step 3: Environment Variables Setup

### 3.1 Create Environment File
Create a `.env` file in your client root directory:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_API_URL=http://localhost:8000/api
```

### 3.2 Update .gitignore
Add to your `.gitignore` file:
```
.env
.env.local
.env.development
.env.production
```

---

## Step 4: Create Google Auth Service

### 4.1 Create Auth Service File
Create `src/services/googleAuth.js`:

```javascript
// Google Auth Configuration
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

class GoogleAuthService {
  constructor() {
    this.isInitialized = false;
    this.gapi = null;
  }

  async initialize() {
    if (this.isInitialized) return;

    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        reject(new Error('Google Auth can only be used in browser environment'));
        return;
      }

      // Load Google API script
      if (!window.gapi) {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = () => {
          window.gapi.load('auth2', () => {
            window.gapi.auth2.init({
              client_id: GOOGLE_CLIENT_ID,
            }).then(() => {
              this.gapi = window.gapi;
              this.isInitialized = true;
              resolve();
            }).catch(reject);
          });
        };
        script.onerror = reject;
        document.head.appendChild(script);
      } else {
        window.gapi.load('auth2', () => {
          window.gapi.auth2.init({
            client_id: GOOGLE_CLIENT_ID,
          }).then(() => {
            this.gapi = window.gapi;
            this.isInitialized = true;
            resolve();
          }).catch(reject);
        });
      }
    });
  }

  async signIn() {
    await this.initialize();
    
    const authInstance = this.gapi.auth2.getAuthInstance();
    const googleUser = await authInstance.signIn();
    
    const profile = googleUser.getBasicProfile();
    const idToken = googleUser.getAuthResponse().id_token;
    
    return {
      id: profile.getId(),
      name: profile.getName(),
      email: profile.getEmail(),
      imageUrl: profile.getImageUrl(),
      idToken: idToken
    };
  }

  async signOut() {
    if (!this.isInitialized) return;
    
    const authInstance = this.gapi.auth2.getAuthInstance();
    await authInstance.signOut();
  }

  async isSignedIn() {
    if (!this.isInitialized) return false;
    
    const authInstance = this.gapi.auth2.getAuthInstance();
    return authInstance.isSignedIn.get();
  }
}

export default new GoogleAuthService();
```

---

## Step 5: Create Auth Context

### 5.1 Create Auth Context File
Create `src/contexts/AuthContext.jsx`:

```javascript
import React, { createContext, useContext, useState, useEffect } from 'react';
import googleAuthService from '../services/googleAuth';
import api from '../config/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
      // Set default authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(user);
      setIsAuthenticated(true);
      toast.success('Login successful!');
      
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return { success: false, error: error.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    try {
      const googleUser = await googleAuthService.signIn();
      
      // Send Google user data to your backend
      const response = await api.post('/auth/google', {
        googleId: googleUser.id,
        name: googleUser.name,
        email: googleUser.email,
        imageUrl: googleUser.imageUrl,
        idToken: googleUser.idToken
      });
      
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(user);
      setIsAuthenticated(true);
      toast.success('Google login successful!');
      
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Google login failed');
      return { success: false, error: error.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/register', userData);
      toast.success(response.data.message || 'Registration successful!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      return { success: false, error: error.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await googleAuthService.signOut();
    } catch (error) {
      console.log('Google signout error:', error);
    }
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    googleLogin,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## Step 6: Update Main App Component

### 6.1 Update main.jsx
Update `src/main.jsx`:

```javascript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
```

---

## Step 7: Update Login Page

### 7.1 Update LoginPage.jsx
Replace the content in `src/pages/LoginPage.jsx`:

```javascript
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const { theme } = useTheme();
  const { login, googleLogin, loading } = useAuth();
  const navigate = useNavigate();
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(loginData.email, loginData.password);
    if (result.success) {
      navigate('/chat');
    }
  };

  const handleGoogleLogin = async () => {
    const result = await googleLogin();
    if (result.success) {
      navigate('/chat');
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-bold text-base-content font-sans">
            Welcome Back
          </h2>
          <p className="mt-2 text-base-content/70 font-sans">
            Sign in to your ChatKro account
          </p>
        </div>

        {/* Login Form */}
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-sans">Email Address</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleInputChange}
                  className="input input-bordered w-full font-sans"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-sans">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                  className="input input-bordered w-full font-sans"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Remember Me */}
              <div className="form-control flex items-center justify-between">
                <label className="label cursor-pointer justify-start gap-1 flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={loginData.rememberMe}
                    onChange={handleInputChange}
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text font-sans">Remember me</span>
                </label>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover font-sans">
                    Forgot password?
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-block font-sans"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="divider font-sans">Or continue with</div>

            {/* Google Login Button */}
            <button 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="btn btn-outline font-sans flex items-center justify-center gap-2 m-2"
            >
              <FcGoogle className="text-xl" />
              {loading ? "Connecting..." : "Continue with Google"}
            </button>

            {/* Sign Up Link */}
            <div className="text-center mt-2">
              <p className="text-base-content/70 font-sans">
                Don't have an account?{" "}
                <Link to="/register" className="link link-primary font-sans">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Theme Demo */}
        <div className="text-center">
          <p className="text-sm text-base-content/50 font-sans">
            Currently using{" "}
            <span className="font-semibold capitalize">{theme}</span> theme
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
```

---

## Step 8: Update Register Page

### 8.1 Update RegisterPage.jsx
Add Google signup to your register page by updating the imports and adding the auth context:

```javascript
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";

const RegisterPage = () => {
  const { theme } = useTheme();
  const { register, googleLogin, loading } = useAuth();
  const navigate = useNavigate();
  
  // ... rest of your existing code ...

  const handleGoogleSignup = async () => {
    const result = await googleLogin();
    if (result.success) {
      navigate('/chat');
    }
  };

  // In your JSX, update the Google button:
  <button 
    onClick={handleGoogleSignup}
    disabled={loading}
    className="btn btn-outline font-sans flex items-center justify-center m-2"
  >
    <FcGoogle className="text-xl" />
    {loading ? "Connecting..." : "Continue with Google"}
  </button>

  // ... rest of your existing JSX ...
};
```

---

## Step 9: Backend API Endpoints

### 9.1 Required Backend Endpoints
Your backend needs these endpoints:

```javascript
// POST /api/auth/login
// POST /api/auth/register  
// POST /api/auth/google
```

### 9.2 Google Auth Endpoint Structure
Your backend `/api/auth/google` endpoint should:

1. Verify the Google ID token
2. Extract user information
3. Check if user exists in database
4. Create user if doesn't exist
5. Return JWT token and user data

---

## Step 10: Testing

### 10.1 Test Steps
1. Start your development server: `npm run dev`
2. Navigate to login page
3. Click "Continue with Google"
4. Complete Google OAuth flow
5. Verify successful login and redirect

### 10.2 Common Issues
- **CORS errors**: Ensure your backend allows your frontend domain
- **Client ID errors**: Double-check your Google Client ID in .env
- **Redirect URI mismatch**: Ensure URLs match in Google Console

---

## Step 11: Production Deployment

### 11.1 Update Google Console
1. Add your production domain to authorized origins
2. Add production redirect URIs
3. Update environment variables on your hosting platform

### 11.2 Security Considerations
- Never expose client secrets in frontend
- Validate ID tokens on backend
- Implement proper session management
- Use HTTPS in production

---

## Troubleshooting

### Common Errors:
1. **"API key not valid"**: Check your Google Client ID
2. **"Redirect URI mismatch"**: Verify URLs in Google Console
3. **"Network Error"**: Check CORS settings
4. **"Invalid token"**: Verify backend token validation

### Debug Steps:
1. Check browser console for errors
2. Verify network requests in DevTools
3. Test with different browsers
4. Check backend logs

---

## Conclusion

You now have a complete Google OAuth implementation for your ChatKro application! Users can sign in with their Google accounts seamlessly.

Remember to:
- Keep your credentials secure
- Test thoroughly before deployment
- Monitor for any authentication issues
- Update dependencies regularly

For additional help, refer to:
- [Google OAuth Documentation](https://developers.google.com/identity/oauth2/web/guides/overview)
- [React Auth Best Practices](https://react.dev/reference/react/useContext)
