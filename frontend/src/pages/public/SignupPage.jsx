import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/auth/authStore';
import { signupStep1Schema, signupStep2Schema } from '../../utils/schemas/authSchemas';
import { useZodForm } from '../../hooks/common/useZodForm';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const SignupPage = () => {
  const navigate = useNavigate();
  const { sendSignupOTP, verifySignupOTP, isLoading, error } = useAuthStore();
  
  const [step, setStep] = useState(1); // 1: Email/Phone, 2: OTP
  const [otpSent, setOtpSent] = useState(false);
  const [step1Data, setStep1Data] = useState({ email: '', phone: '' });
  const [isSendingOTP, setIsSendingOTP] = useState(false);

  // Step 1 form (Email/Phone)
  const handleSendOTP = async (formData) => {
    setIsSendingOTP(true);
    try {
      const result = await sendSignupOTP(
        formData.email,
        formData.phone || null
      );
      
      if (result.success) {
        // Set step1Data first
        const newStep1Data = { email: formData.email, phone: formData.phone || '' };
        setStep1Data(newStep1Data);
        setOtpSent(true);
        // Then change step - this will trigger useEffect to sync step2Form
        setStep(2);
      }
    } finally {
      setIsSendingOTP(false);
    }
  };
  const step1Form = useZodForm(
    signupStep1Schema,
    { email: '', phone: '' },
    handleSendOTP
  );

  // Step 2 form (OTP)
  const handleVerifyOTP = async (formData) => {
    const result = await verifySignupOTP(
      formData.email,
      formData.otp,
      formData.phone || null,
      formData.password
    );
    
    if (result.success) {
      navigate('/dashboard');
    }
  };

  // Initialize step2Form with default values, will be updated when step changes
  const step2Form = useZodForm(
    signupStep2Schema,
    {
      email: '',
      phone: '',
      otp: '',
      password: '',
    },
    handleVerifyOTP
  );

  // Sync step 2 form when step changes to 2
  useEffect(() => {
    if (step === 2 && step1Data.email) {
      // Update step2Form with step1Data
      step2Form.setFieldValue('email', step1Data.email);
      step2Form.setFieldValue('phone', step1Data.phone || '');
      step2Form.setFieldValue('otp', '');
      step2Form.setFieldValue('password', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, step1Data.email, step1Data.phone]);

  const handleResendOTP = async () => {
    const result = await sendSignupOTP(
      step2Form.formData.email,
      step2Form.formData.phone || null
    );
    
    if (result.success) {
      alert('OTP resent successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link to="/" className="flex justify-center">
            <span className="text-3xl font-bold text-blue-600">Buildafeature</span>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        {step === 1 ? (
          <form className="mt-8 space-y-6" onSubmit={step1Form.handleSubmit}>
            <div className="space-y-4">
              <Input
                label="Email address"
                type="email"
                name="email"
                value={step1Form.formData.email}
                onChange={step1Form.handleChange}
                error={step1Form.errors.email}
                placeholder="you@example.com"
                required
              />
              
              <Input
                label="Phone number (optional)"
                type="tel"
                name="phone"
                value={step1Form.formData.phone}
                onChange={step1Form.handleChange}
                error={step1Form.errors.phone}
                placeholder="+1234567890"
              />
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isSendingOTP || step1Form.isSubmitting}
              >
                {isSendingOTP || step1Form.isSubmitting ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={step2Form.handleSubmit}>
            {otpSent && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                OTP sent to {step2Form.formData.email}. Please check your email.
              </div>
            )}
            
            <div className="space-y-4">
              <Input
                label="Enter OTP"
                type="text"
                name="otp"
                value={step2Form.formData.otp}
                onChange={step2Form.handleChange}
                error={step2Form.errors.otp}
                placeholder="000000"
                maxLength="6"
                required
              />
              
              <Input
                label="Password"
                type="password"
                name="password"
                value={step2Form.formData.password}
                onChange={step2Form.handleChange}
                error={step2Form.errors.password}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isLoading || step2Form.isSubmitting}
              >
                {isLoading || step2Form.isSubmitting ? 'Verifying...' : 'Verify OTP & Sign Up'}
              </Button>
              
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setStep(1);
                    step2Form.setFieldValue('otp', '');
                  }}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={async () => {
                    const result = await sendSignupOTP(
                      step2Form.formData.email,
                      step2Form.formData.phone || null
                    );
                    if (result.success) {
                      alert('OTP resent successfully!');
                    }
                  }}
                  disabled={isLoading}
                >
                  Resend OTP
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
