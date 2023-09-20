'use client';
import { Form, FormikProps, FormikProvider, useFormik } from 'formik';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@nextui-org/react';
import { FormInputItem } from '@/shared/ui/FormInputItem/FormInputItem';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { loginByEmailValidationSchema } from '@/features/loginByEmail/model/validation/loginByEmailValidation';

export type ILoginFormValues = {
    email: string;
    password: string;
};

export const LoginByEmailForm = () => {
    const router = useRouter();

    const formik: FormikProps<ILoginFormValues> = useFormik<ILoginFormValues>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginByEmailValidationSchema,
        onSubmit: (values, { setSubmitting }) => {
            signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false,
            })
                .then(() => {
                    toast.success('Welcome back!');
                    router.push('/profile');
                })
                .catch(() => {
                    toast.error('Something went wrong');
                })
                .finally(() => {
                    setSubmitting(false);
                });
        },
    });

    return (
        <FormikProvider value={formik}>
            <Form className="flex flex-col gap-[30px] items-center justify-center w-[500px] m-auto">
                <Input
                    variant="underlined"
                    onBlur={formik.handleBlur}
                    type="text"
                    onChange={formik.handleChange}
                    name="email"
                    value={formik.values.email}
                    label="Email"
                    errorMessage={
                        formik.touched.email && formik.errors.email
                            ? formik.errors.email
                            : undefined
                    }
                    role="presentation"
                />

                <FormInputItem
                    errorMessage={
                        formik.touched.password && formik.errors.password
                            ? formik.errors.password
                            : undefined
                    }
                    name="password"
                    type="password"
                    label="Password"
                />

                <Button
                    className="w-[100%]"
                    variant="ghost"
                    isLoading={formik.isSubmitting}
                    type="submit"
                >
                    Log in with Email
                </Button>
            </Form>
        </FormikProvider>
    );
};
