import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import authApi from "../services/authApi";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

  // Validate form fields
  function validateForm() {
    const newErrors = {};

    const trimmedEmail = formData.email.trim();

    if (!trimmedEmail) {
      newErrors.email = "Email address is required.";
    } else if (
      trimmedEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    return newErrors;
  }

  // Update form fields
  function handleChange(event) {
    const { name, value } = event.target;

    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);
    setSuccessMessage("");
    setServerError("");

    // Keep your existing field validation logic here.
    const fieldErrors = {};

    if (name === "email") {
      const trimmedEmail = value.trim();

      if (!trimmedEmail) {
        fieldErrors.email = "Email address is required.";
      } else if (
        trimmedEmail.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
      ) {
        fieldErrors.email = "Please enter a valid email address.";
      }
    }

    if (name === "password" && !value) {
      fieldErrors.password = "Password is required.";
    }

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: fieldErrors[name] || "",
    }));
  }

  // Handle login form submission
  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    setServerError("");
    setSuccessMessage("");

    // Validate the form before sending the request
    const validationErrors = validateForm();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setIsSubmitting(true);

      // Send credentials to the backend
      const response = await authApi.login({
        email: formData.email.trim(),
        password: formData.password,
      });

      setSuccessMessage(response.message || "Login successful!");

      setErrors({});
    } catch (error) {
      console.error("Login request failed:", error);

      setServerError(error.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="mb-6 text-center">
          <Link
            to="/"
            className="inline-block text-4xl font-extrabold tracking-wider text-blue-700"
          >
            DREX
          </Link>

          <p className="mt-2 text-sm text-gray-500">
            Your destination for sports essentials
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-700">
              <LogIn size={28} />
            </div>

            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>

            <p className="mt-2 text-sm text-gray-500">
              Log in to continue your DREX journey.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`${inputClass} ${
                  errors.email ? "border-red-500 focus:border-red-500" : ""
                }`}
              />

              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  className={`${inputClass} pr-12 ${
                    errors.password ? "border-red-500 focus:border-red-500" : ""
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {errors.password && (
                <p id="password-error" className="mt-1 text-sm text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Forgot Password Placeholder */}
            <div className="flex justify-end">
              <span className="text-sm text-gray-400">Forgot password?</span>
            </div>

            {/* Success Message */}
            {/* Backend Error */}
            {serverError && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                {serverError}
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div
                role="status"
                className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700"
              >
                {successMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogIn size={18} />

              {isSubmitting ? "Logging In..." : "Log In"}
            </button>
          </form>

          {/* Registration Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-700 hover:text-blue-800 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} DREX. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;
