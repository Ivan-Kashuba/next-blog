import { object, string } from 'yup';

export const registrationValidationSchema = object().shape({
    email: string().email('Invalid email').required('Email should be stated'),
    password: string().required('Password should be stated').min(5, 'At least 5 symbols'),
});
