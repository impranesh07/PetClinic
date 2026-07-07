import React, { useState } from 'react';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle your authentication logic here
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="bg-base-200 flex min-h-screen items-center justify-center p-4">
      <div className="card bg-base-100 w-full max-w-md shadow-xl border border-base-300">
        <div className="card-body gap-6">
          
          {/* Header */}
          <div class="text-center">
            <h2 className="card-title justify-center text-3xl font-bold tracking-tight text-base-content">
              Welcome back
            </h2>
            <p className="text-sm text-base-content/60 mt-2">
              Don't have an account?{' '}
              <a href="#" className="link link-primary no-underline hover:underline font-medium">
                Sign up
              </a>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Input */}
            <div className="form-control w-full">
              <label className="label" htmlFor="email">
                <span className="label-text font-medium">Email address</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autocomplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full focus:input-primary"
              />
            </div>

            {/* Password Input */}
            <div className="form-control w-full">
              <div className="flex items-center justify-between">
                <label className="label" htmlFor="password">
                  <span className="label-text font-medium">Password</span>
                </label>
                <a href="#" className="link link-primary text-sm no-underline hover:underline font-medium">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                autocomplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered w-full focus:input-primary"
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3 select-none">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="checkbox checkbox-primary checkbox-sm"
                />
                <span className="label-text text-base-content/70">Remember me for 30 days</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-2">
              <button type="submit" className="btn btn-primary btn-block text-white font-semibold">
                Sign in
              </button>
            </div>
          </form>

          {/* Social Divider */}
          <div className="divider text-sm text-base-content/50">Or continue with</div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            {/* Google */}
            <button
              type="button"
              className="btn btn-outline btn-sm h-11 gap-2 border-base-300 hover:bg-base-200 hover:text-base-content normal-case font-medium"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.258-3.133C18.42 1.921 15.56 1 12.24 1c-6.07 0-11 4.93-11 11s4.93 11 11 11c6.34 0 10.56-4.45 10.56-10.75 0-.725-.078-1.28-.174-1.665H12.24z"/>
              </svg>
              Google
            </button>

            {/* GitHub */}
            <button
              type="button"
              className="btn btn-outline btn-sm h-11 gap-2 border-base-300 hover:bg-base-200 hover:text-base-content normal-case font-medium"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.2 20 14.444 20 10.017 20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
              </svg>
              GitHub
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signin;