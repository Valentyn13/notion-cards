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
import  { type UserSignInRequestDto } from 'shared/build';
import { userSignInValidationSchema } from 'shared/build';

import { useAppForm } from '~/bundles/common/hooks/hooks';
import { useFormFieldCreator } from '~/bundles/common/hooks/use-form-field-creator/use-form-field-creator.hook';

import { DEFAULT_SIGN_IN_PAYLOAD } from './constants/constants';

type Properties = {
    onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {

    const { control, errors, handleSubmit } =
    useAppForm<UserSignInRequestDto>({
        defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
        validationSchema: userSignInValidationSchema,
    });

    const handleSubmitForm = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            void handleSubmit(onSubmit)(event);
        },
        [onSubmit, handleSubmit],
    );

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
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmitForm}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        {...useFormFieldCreator({ name:'email', control })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        {...useFormFieldCreator({ name:'password', control })}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {'Don\'t have an account? Sign Up'}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export { SignInForm };
