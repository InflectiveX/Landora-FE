'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Paper, Box, Typography, TextField, Button, Tab, Tabs, Alert, InputAdornment, IconButton, Fade, Zoom, CircularProgress, alpha } from '@mui/material';
import { AccountBalance as AccountBalanceIcon, Visibility, VisibilityOff, Person as PersonIcon, Lock as LockIcon, AdminPanelSettings as GovernmentIcon } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { apiClient } from '@/lib/api';

const SignUp = () => {
	const router = useRouter();
	const { enqueueSnackbar } = useSnackbar();
	const [tabValue, setTabValue] = useState(0);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
	const password = watch('password');

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
		reset();
	};

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			// API call to register user - align with backend Credentials { fullname, email, password, nic }
			const response = await apiClient.user.register({
				fullname: data.fullName,
				email: data.email,
				nic: data.nicNumber,
				password: data.password
			});

			enqueueSnackbar('Registration successful! Please check your email for verification.', { 
				variant: 'success' 
			});
			
			// Redirect to login
			router.push('/login');
		} catch (error) {
			enqueueSnackbar(error.message || 'Registration failed. Please try again.', { 
				variant: 'error' 
			});
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
							<Tabs 
								value={tabValue} 
								onChange={handleTabChange} 
								variant="fullWidth"
								sx={{
									'& .MuiTab-root': {
										fontWeight: 600,
										fontSize: '1rem',
										py: 2
									}
								}}
							>
								<Tab 
									icon={<PersonIcon />} 
									label="Citizen" 
									iconPosition="start"
								/>
								<Tab 
									icon={<GovernmentIcon />} 
									label="Government Officer" 
									iconPosition="start"
								/>
							</Tabs>
						</Box>

						<Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ space: 3 }}>
							<TextField
								fullWidth
								label="Full Name"
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

							<Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
								<Typography variant="body2">
									By creating an account, you agree to our Terms of Service and Privacy Policy.
									{tabValue === 1 && ' Government officers will be verified by administrators.'}
								</Typography>
							</Alert>

							<Button
								type="submit"
								fullWidth
								variant="contained"
								size="large"
								disabled={loading}
								startIcon={loading ? <CircularProgress size={20} /> : null}
								sx={{ 
									py: 1.5, 
									fontSize: '1.1rem', 
									fontWeight: 600,
									borderRadius: 2,
									background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
									'&:hover': {
										background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
									},
								}}
							>
								{loading ? 'Creating Account...' : 'Create Account'}
							</Button>

							<Box sx={{ textAlign: 'center', mt: 3 }}>
								<Typography variant="body2" color="text.secondary">
									Already have an account?{' '}
									<Button 
										variant="text" 
										onClick={() => router.push('/login')}
										sx={{ fontWeight: 600, textTransform: 'none' }}
									>
										Sign In
									</Button>
								</Typography>
							</Box>
						</Box>
					</Paper>
				</Fade>
			</Container>
		</Box>
	);
};

export default SignUp;
