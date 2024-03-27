import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useCallback } from 'react';
import { type UserSignUpRequestDto,userSignUpValidationSchema } from 'shared/build';

import { useAppForm } from '~/bundles/common/hooks/hooks';
import { useFormFieldCreator } from '~/bundles/common/hooks/use-form-field-creator/use-form-field-creator.hook';

import { DEFAULT_SIGN_UP_PAYLOAD } from './constants/constants';

type Properties = {
    onSubmit: (payload: UserSignUpRequestDto) => void
};
const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
  const { control, errors, handleSubmit } =
  useAppForm<UserSignUpRequestDto>({
      defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
      validationSchema: userSignUpValidationSchema,
  });

    const handleSubmitForm = useCallback((event: React.FormEvent<HTMLFormElement>) => {
      void handleSubmit(onSubmit)(event);
      },[onSubmit, handleSubmit]);
    
      return (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmitForm} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                      {...useFormFieldCreator({ name:'firstName', control })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      autoComplete="family-name"
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                      {...useFormFieldCreator({ name:'lastName', control })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      autoComplete="email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      {...useFormFieldCreator({ name:'email', control })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      {...useFormFieldCreator({ name:'password', control })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
      );
};

export { SignUpForm };
