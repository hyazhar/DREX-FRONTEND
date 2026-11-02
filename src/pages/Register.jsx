
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import authApi from "../services/authApi";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");

  // React Hook Form
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

  // Clear messages when user edits the form
  function clearMessages() {
    setServerError("");
    setSuccessMessage("");
  }

  // Handle registration submission
  async function onSubmit(data) {
    clearMessages();

    try {
      const response = await authApi.register({
        name: data.name.trim(),
        email: data.email.trim(),
        password: data.password,
      });

      setSuccessMessage(
        response.message ||
          "Registration successful! You can now log in."
      );

      // Clear form after successful registration
      reset();

      setShowPassword(false);
      setShowConfirmPassword(false);

    } catch (error) {
      setServerError(
        error.message || "Registration failed. Please try again."
      );
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >

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
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                {...register("name", {
                  setValueAs: (value) => value.trim(),

                  required: "Full name is required.",

                  minLength: {
                    value: 2,
                    message: "Name must contain at least 2 characters.",
                  },

                  maxLength: {
                    value: 50,
                    message: "Name cannot exceed 50 characters.",
                  },

                  onChange: clearMessages,
                })}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={
                  errors.name ? "name-error" : undefined
                }
                className={`${inputClass} ${
                  errors.name ? "border-red-500 focus:border-red-500" : ""
                }`}
              />

              {errors.name && (
                <p
                  id="name-error"
                  className="mt-1 text-sm text-red-600"
                >
                  {errors.name.message}
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
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                {...register("email", {
                  setValueAs: (value) => value.trim(),

                  required: "Email address is required.",

                  maxLength: {
                    value: 254,
                    message: "Email address is too long.",
                  },

                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address.",
                  },

                  onChange: clearMessages,
                })}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "email-error" : undefined
                }
                className={`${inputClass} ${
                  errors.email ? "border-red-500 focus:border-red-500" : ""
                }`}
              />

              {errors.email && (
                <p
                  id="email-error"
                  className="mt-1 text-sm text-red-600"
                >
                  {errors.email.message}
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
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a password"
                  {...register("password", {
                    required: "Password is required.",

                    minLength: {
                      value: 8,
                      message: "Password must contain at least 8 characters.",
                    },

                    maxLength: {
                      value: 128,
                      message: "Password cannot exceed 128 characters.",
                    },

                    validate: {
                      lowercase: (value) =>
                        /[a-z]/.test(value) ||
                        "Include at least one lowercase letter.",

                      uppercase: (value) =>
                        /[A-Z]/.test(value) ||
                        "Include at least one uppercase letter.",

                      number: (value) =>
                        /[0-9]/.test(value) ||
                        "Include at least one number.",
                    },

                    onChange: () => {
                      clearMessages();

                      if (getValues("confirmPassword")) {
                        trigger("confirmPassword");
                      }
                    },
                  })}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  className={`${inputClass} pr-12 ${
                    errors.password
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p
                  id="password-error"
                  className="mt-1 text-sm text-red-600"
                >
                  {errors.password.message}
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
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Enter your password again"
                  {...register("confirmPassword", {
                    required: "Please confirm your password.",

                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match.",

                    onChange: clearMessages,
                  })}
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
                  {errors.confirmPassword.message}
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
