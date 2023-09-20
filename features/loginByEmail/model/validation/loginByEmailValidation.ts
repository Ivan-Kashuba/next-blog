import { object, string } from 'yup';

export const loginByEmailValidationSchema = object().shape({
    email: string().email('Invalid email').required('Email should be stated'),
    password: string().required('Password should be stated'),
});
