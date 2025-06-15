import { useEffect, useState } from "react";
import { useForm} from "react-hook-form";

export default function CustomForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields},
    reset
  } = useForm({ mode: "onChange" });

  const [validFieldsCount, setValidFieldsCount] = useState(0);
  const [progress, setProgress] = useState(0);

  const totalFields = 5; // name, email, password, mobile, file

  const watchAllFields = watch(); // this function return object when ever any value of field change so it give new object with update

  useEffect(() => {

    const dirtyFieldsArr = Object.keys(dirtyFields) ///[name, password(error), email]

    if (dirtyFieldsArr.length > 0) {
      const validCount = dirtyFieldsArr.reduce((count, key) => {

        if (!errors[key]) {
          return count + 1
        } else {
          return count
        }

      }, 0)

      setValidFieldsCount(validCount);
      setProgress((validCount / totalFields) * 100);
    }

  }, [watchAllFields, errors]);

  const onSubmit = (data) => {
    alert("Form submitted successfully!");
    reset()
    setValidFieldsCount(0);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">
          React Hook Form with Progress
        </h2>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-center text-sm text-gray-600 mb-4">
          {validFieldsCount} of {totalFields} fields completed
        </p>

        {/* Name Field */}
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            {...register("name", {
              required: "Please fill this field",
              pattern: {
                value: /^[A-Za-z\s]{2,50}$/,
                message: "Only alphabets are allowed and length should be between 2 to 50",
              }
            })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            {...register("email", {
              required: "Please fill this field",
              maxLength: {
                value: 60,
                message: "Maximum 60 characters allowed",
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                message: "Invalid email format",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Please fill this field",
              validate: (value) =>
              (value.length >= 8 && value.length <= 14)
                  ? /^[A-Za-z0-9$@_%&#]+$/.test(value) ||
                  "Only A-Z, a-z, 0-9, and $@_%&# are allowed"
                  : "Password must be between 8 to 14 characters",
            })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter a secure password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Mobile Number Field */}
        <div>
          <label className="block mb-1 font-semibold">Mobile Number</label>
          <input
            type="text"
            {...register("mobile", {
              required: "Please fill this field",
              pattern: {
                value: /^[1-9][0-9]{9}$/,
                message: "Must be 10 digits and not start with 0",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter 10 digit mobile number"
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm mt-1">
              {errors.mobile.message}
            </p>
          )}
        </div>

        {/* File Upload */}
        <div>
          <label className="block mb-1 font-semibold">Upload File</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.avif"
            {...register("file", {
              required: "Please upload a file",
              validate: {
                fileType: (value) => {
                  const allowedTypes = [
                    "image/png",
                    "image/jpeg",
                    "image/jpg",
                    "image/avif",
                  ];
                  return (
                    value &&
                    allowedTypes.includes(value[0]?.type)
                  ) || "Only JPG, JPEG, PNG, AVIF files allowed";
                },
                fileSize: (value) => {
                  return (
                    value &&
                    value[0]?.size <= 2 * 1024 * 1024
                  ) || "File size must be under 2MB";
                },
              },
            })}
            className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.file && (
            <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
