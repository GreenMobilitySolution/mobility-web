import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RegisterButton from '../../components/Buttons/RegisterButton';

interface RegisterCompanyData {
  id?: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  address: string;
  tin: string;
  password: string;
}

const RegisterCompany: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<RegisterCompanyData>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterCompanyData> = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/register-company', data);
      toast.success(response.data.message);
      reset();
      navigate('/login');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Something went wrong, please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const password = watch('password', '');

  const passwordRequirements = (
    <ul className="text-grey2 text-sm mt-1">
      <li className={password.length >= 8 ? 'text-green-600' : ''}>- At least 8 characters</li>
      <li className={/[A-Z]/.test(password) ? 'text-green-600' : ''}>- One uppercase letter</li>
      <li className={/[a-z]/.test(password) ? 'text-green-600' : ''}>- One lowercase letter</li>
      <li className={/\d/.test(password) ? 'text-green-600' : ''}>- One number</li>
      <li className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-600' : ''}>- One special character</li>
    </ul>
  );

  return (
    <div className="min-h-[100vh] h-auto w-full flex items-center justify-center py-10 px-4 bg-transparent1">
      <form
        className="min-w-[90%] flex flex-col items-center justify-start gap-y-4 bg-white p-12 md:min-w-[500px] md:max-w-[500px] rounded-lg shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="min-w-[100%] text-black1 text-2xl font-medium">Register Company</h1>

        <div className="mt-2 w-full flex flex-col items-start justify-start gap-y-2">
          <p className="text-black1 text-lg">Company Name</p>
          <div className="w-full min-h-[50px] flex items-center justify-between gap-x-1 px-4 py-2 border border-grey1 bg-white rounded-lg">
            <input
              className="w-full h-[100%] border-none outline-none bg-white text-grey2 text-lg rounded-lg"
              type="text"
              placeholder="Company Name"
              {...register('companyName', { required: true })}
            />
          </div>
          {errors.companyName && <span className="text-orange">Company name is required</span>}
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-y-2">
          <p className="text-black1 text-lg">Email Address</p>
          <div className="w-full min-h-[50px] flex items-center justify-between gap-x-1 px-4 py-2 border border-grey1 bg-white rounded-lg">
            <input
              className="w-full h-[100%] border-none outline-none bg-white text-grey2 text-lg rounded-lg"
              type="email"
              placeholder="company@example.com"
              {...register('email', { required: true })}
            />
          </div>
          {errors.email && <span className="text-orange">Email is required</span>}
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-y-2">
          <p className="text-black1 text-lg">Phone Number</p>
          <div className="w-full min-h-[50px] flex items-center justify-between gap-x-1 px-4 py-2 border border-grey1 bg-white rounded-lg">
            <input
              className="w-full h-[100%] border-none outline-none bg-white text-grey2 text-lg rounded-lg"
              type="text"
              placeholder="0788302145"
              {...register('phoneNumber', { required: true })}
            />
          </div>
          {errors.phoneNumber && <span className="text-orange">Phone number is required</span>}
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-y-2">
          <p className="text-black1 text-lg">Address</p>
          <div className="w-full min-h-[50px] flex items-center justify-between gap-x-1 px-4 py-2 border border-grey1 bg-white rounded-lg">
            <input
              className="w-full h-[100%] border-none outline-none bg-white text-grey2 text-lg rounded-lg"
              type="text"
              placeholder="123 Main St, City, Country"
              {...register('address', { required: true })}
            />
          </div>
          {errors.address && <span className="text-orange">Address is required</span>}
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-y-2">
          <p className="text-black1 text-lg">TIN (Tax Identification Number)</p>
          <div className="w-full min-h-[50px] flex items-center justify-between gap-x-1 px-4 py-2 border border-grey1 bg-white rounded-lg">
            <input
              className="w-full h-[100%] border-none outline-none bg-white text-grey2 text-lg rounded-lg"
              type="text"
              placeholder="TIN"
              {...register('tin', { required: true })}
            />
          </div>
          {errors.tin && <span className="text-orange">TIN is required</span>}
        </div>

        <div className="w-full flex flex-col items-start justify-start gap-y-2">
          <p className="text-black1 text-lg">Create Password</p>
          <div className="w-full min-h-[50px] flex items-center justify-between gap-x-1 px-4 py-2 border border-grey1 bg-white rounded-lg">
            <input
              className="w-full h-[100%] border-none outline-none bg-white text-grey2 text-lg rounded-lg"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long'
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                  message: 'Password must include uppercase, lowercase, number, and special character'
                }
              })}
            />
            {showPassword ? (
              <EyeOff
                data-testid="eye-icon"
                strokeWidth={1.5}
                className="text-grey2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <Eye
                data-testid="eye-icon"
                strokeWidth={1.5}
                className="text-grey2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          {password && passwordRequirements}
          {errors.password && <span className="text-orange">{errors.password.message}</span>}
        </div>

        <RegisterButton type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Register'}
        </RegisterButton>

        <p className="text-small text-black1 md:text-lg">
          Already have an account?{' '}
          <a href="/login" className="ml-1 text-orange">
            login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterCompany;