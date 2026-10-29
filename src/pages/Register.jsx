import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import authApi from "../services/authApi";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  function validateFormWithData(data) {
    const newErrors = {};

    const trimmedName = data.name.trim();
    const trimmedEmail = data.email.trim();

    if (!trimmedName) {
      newErrors.name = "Full name is required.";
    } else if (trimmedName.length < 2) {
      newErrors.name = "Name must contain at least 2 characters.";
    } else if (trimmedName.length > 50) {
      newErrors.name = "Name cannot exceed 50 characters.";
    }

    if (!trimmedEmail) {
      newErrors.email = "Email address is required.";
    } else if (
      trimmedEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!data.password) {
      newErrors.password = "Password is required.";
    } else if (data.password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters.";
    } else if (data.password.length > 128) {
      newErrors.password = "Password cannot exceed 128 characters.";
    } else if (!/[a-z]/.test(data.password)) {
      newErrors.password = "Include at least one lowercase letter.";
    } else if (!/[A-Z]/.test(data.password)) {
      newErrors.password = "Include at least one uppercase letter.";
    } else if (!/[0-9]/.test(data.password)) {
      newErrors.password = "Include at least one number.";
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
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

    const validationErrors = validateFormWithData(updatedFormData);

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: validationErrors[name] || "",
      ...(name === "password"
        ? {
            confirmPassword:
              updatedFormData.confirmPassword &&
              updatedFormData.password !== updatedFormData.confirmPassword
                ? "Passwords do not match."
                : "",
          }
        : {}),
    }));
  }

  // Validate form data
  function validateForm() {
    const newErrors = {};

    // Full name validation
    const trimmedName = formData.name.trim();

    if (!trimmedName) {
      newErrors.name = "Full name is required.";
    } else if (trimmedName.length < 2) {
      newErrors.name = "Name must contain at least 2 characters.";
    } else if (trimmedName.length > 50) {
      newErrors.name = "Name cannot exceed 50 characters.";
    }

    // Email validation
    const trimmedEmail = formData.email.trim();

    if (!trimmedEmail) {
      newErrors.email = "Email address is required.";
    } else if (
      trimmedEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters.";
    } else if (formData.password.length > 128) {
      newErrors.password = "Password cannot exceed 128 characters.";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = "Include at least one lowercase letter.";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Include at least one uppercase letter.";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Include at least one number.";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  }

  // Handle registration form submission
  async function handleSubmit(event) {
    event.preventDefault();

    // Prevent duplicate requests
    if (isSubmitting) return;

    setServerError("");
    setSuccessMessage("");

    // Validate the form before making an API request
    const validationErrors = validateForm();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setIsSubmitting(true);

      // Send registration details to the backend
      const response = await authApi.register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      console.log("Registration successful:", response);

      setSuccessMessage(
        response.message || "Registration successful! You can now log in.",
      );

      // Clear the form after successful registration
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setErrors({});
    } catch (error) {
      setServerError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

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

        {/* Registration Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-700">
              <UserPlus size={28} />
            </div>

            <h1 className="text-2xl font-bold text-gray-900">
              Create Your Account
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Join DREX and get ready for your next game.
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`${inputClass} ${
                  errors.name ? "border-red-500 focus:border-red-500" : ""
                }`}
              />

              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

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
                  autoComplete="new-password"
                  placeholder="Create a password"
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

              <p className="mt-1 text-xs text-gray-500">
                Use at least 8 characters.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Enter your password again"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.confirmPassword)}
                  aria-describedby={
                    errors.confirmPassword
                      ? "confirm-password-error"
                      : undefined
                  }
                  className={`${inputClass} pr-12 ${
                    errors.confirmPassword
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((previous) => !previous)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p
                  id="confirm-password-error"
                  className="mt-1 text-sm text-red-600"
                >
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Success Message */}
            {successMessage && (
              <div
                role="status"
                className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700"
              >
                {successMessage}
              </div>
            )}
            {/* Backend Error */}
            {serverError && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                {serverError}
              </div>
            )}
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-700 hover:text-blue-800 hover:underline"
            >
              Log in
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

export default Register;
