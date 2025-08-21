'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Paper, Box, Typography, TextField, Button, Alert, InputAdornment, IconButton, Fade, CircularProgress } from '@mui/material';
import { AccountBalance as AccountBalanceIcon, Visibility, VisibilityOff, Person as PersonIcon, Lock as LockIcon } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { apiClient } from '@/lib/api';

export default function SignUp() {
	const router = useRouter();
	const { enqueueSnackbar } = useSnackbar();
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const { register, handleSubmit, watch, formState: { errors } } = useForm();
	const password = watch('password');

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			// API call to register user
			const response = await apiClient.user.register({
				fullname: data.fullName, // Changed to match backend 'fullname'
				email: data.email,
				nic: data.nicNumber,     // Changed to match backend 'nic'
				password: data.password,
				role: 'citizen' // Only citizens can sign up through this page
			});

			enqueueSnackbar('Account created successfully! Please check your email for activation instructions.', { variant: 'success' });
			router.push('/login');
		} catch (error) {
			console.error('Registration error:', error);
			enqueueSnackbar(error.message || 'Registration failed. Please try again.', { variant: 'error' });
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box sx={{ 
			minHeight: '100vh', 
			background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			py: 4
		}}>
			{/* Animated background orbs */}
			<Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
				<Box sx={{
					position: 'absolute',
					top: '10%',
					left: '10%',
					width: 200,
					height: 200,
					borderRadius: '50%',
					background: 'rgba(255,255,255,0.1)',
					animation: 'float 6s ease-in-out infinite',
					'@keyframes float': {
						'0%, 100%': { transform: 'translateY(0px)' },
						'50%': { transform: 'translateY(-20px)' }
					}
				}} />
				<Box sx={{
					position: 'absolute',
					top: '60%',
					right: '15%',
					width: 150,
					height: 150,
					borderRadius: '50%',
					background: 'rgba(255,255,255,0.08)',
					animation: 'float 8s ease-in-out infinite reverse',
				}} />
			</Box>

			<Container maxWidth="sm">
				<Fade in timeout={800}>
					<Paper elevation={24} sx={{ 
						p: { xs: 3, md: 5 }, 
						borderRadius: 4,
						background: 'rgba(255,255,255,0.95)',
						backdropFilter: 'blur(20px)',
						border: '1px solid rgba(255,255,255,0.2)',
						boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
					}}>
						<Box sx={{ textAlign: 'center', mb: 4 }}>
							<AccountBalanceIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
							<Typography variant="h4" fontWeight="bold" gutterBottom>
								Create Account
							</Typography>
							<Typography variant="body1" color="text.secondary">
								Join the Land Registry System
							</Typography>
						</Box>

						{/* Role Selection Tabs */}
						<Box sx={{ mb: 4 }}>
							<Box sx={{ textAlign: 'center', mb: 4 }}>
								<Typography variant="h6" fontWeight="bold" gutterBottom>
									Register as a Citizen
								</Typography>
								<Typography variant="body2" color="text.secondary">
									Complete the form below to create your citizen account.
								</Typography>
							</Box>
						</Box>

						<Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ space: 3 }}>
							<TextField
								fullWidth
								label="Full Name"
								autoComplete="name"
								{...register('fullName', { 
									required: 'Full name is required',
									minLength: { value: 2, message: 'Name must be at least 2 characters' }
								})}
								error={!!errors.fullName}
								helperText={errors.fullName?.message}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<PersonIcon color="action" />
										</InputAdornment>
									),
								}}
								sx={{ mb: 3 }}
							/>

							<TextField
								fullWidth
								label="Email Address"
								type="email"
								autoComplete="email"
								{...register('email', { 
									required: 'Email is required',
									pattern: { 
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
										message: 'Invalid email address' 
									}
								})}
								error={!!errors.email}
								helperText={errors.email?.message}
								sx={{ mb: 3 }}
							/>

							<TextField
								fullWidth
								label="NIC Number"
								autoComplete="off"
								{...register('nicNumber', { 
									required: 'NIC number is required',
									pattern: { 
										value: /^[0-9]{9}[VX]$/, 
										message: 'Invalid NIC format (e.g., 123456789V)' 
									}
								})}
								error={!!errors.nicNumber}
								helperText={errors.nicNumber?.message}
								sx={{ mb: 3 }}
							/>

							<TextField
								fullWidth
								label="Password"
								type={showPassword ? 'text' : 'password'}
								autoComplete="new-password"
								{...register('password', { 
									required: 'Password is required',
									minLength: { value: 8, message: 'Password must be at least 8 characters' },
									pattern: { 
										value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
										message: 'Password must contain uppercase, lowercase, and number' 
									}
								})}
								error={!!errors.password}
								helperText={errors.password?.message}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<LockIcon color="action" />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												onClick={() => setShowPassword(!showPassword)}
												edge="end"
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								}}
								sx={{ mb: 3 }}
							/>

							<TextField
								fullWidth
								label="Confirm Password"
								type={showConfirmPassword ? 'text' : 'password'}
								autoComplete="new-password"
								{...register('confirmPassword', { 
									required: 'Please confirm your password',
									validate: value => value === password || 'Passwords do not match'
								})}
								error={!!errors.confirmPassword}
								helperText={errors.confirmPassword?.message}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<LockIcon color="action" />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												onClick={() => setShowConfirmPassword(!showConfirmPassword)}
												edge="end"
											>
												{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								}}
								sx={{ mb: 4 }}
							/>

							<Alert severity="info" sx={{ mb: 3 }}>
								<Typography variant="body2">
									By creating an account, you agree to our Terms of Service and Privacy Policy.
								</Typography>
							</Alert>

							<Button
								type="submit"
								fullWidth
								variant="contained"
								disabled={loading}
								startIcon={loading ? <CircularProgress size={18} /> : null}
								sx={{ py: 1.25, mb: 3 }}
							>
								{loading ? 'Creating Account...' : 'Create Account'}
							</Button>

							<Box sx={{ textAlign: 'center' }}>
								<Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
									Already have an account?
								</Typography>
								<Button
									variant="text"
									onClick={() => router.push('/login')}
									sx={{ textTransform: 'none' }}
								>
									Back to Login
								</Button>
							</Box>
						</Box>
					</Paper>
				</Fade>
			</Container>
		</Box>
	);
};
