'use client';
import http from '@/shared/lib/api/http';
import { Form, FormikProps, FormikProvider, useFormik } from 'formik';
import { Button, useToast } from '@chakra-ui/react';
import React from 'react';
import { RegistrationFormInputItem } from '@/features/registration/ui/RegistrationForm/RegistrationFormInputItem';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/global/providers/auth/useAuth';

export type ILoginFormValues = {
    email: string;
    password: string;
};

export const LoginForm = () => {
    const router = useRouter();
    const toast = useToast();

    const formik: FormikProps<ILoginFormValues> = useFormik<ILoginFormValues>({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            http.post('/auth', values)
                .then((res) => {
                    toast({
                        title: 'Welcome back',
                        status: 'success',
                        isClosable: true,
                        position: 'top-right',
                    });
                    http.setAuthHeader(res.token);
                    router.push('/');
                })
                .catch(() => {
                    toast({
                        title: 'Something went wrong',
                        status: 'error',
                        isClosable: true,
                        position: 'top-right',
                    });
                })
                .finally(() => {
                    formik.setSubmitting(false);
                });
        },
    });

    return (
        <FormikProvider value={formik}>
            <Form className="flex flex-col gap-[30px] items-center justify-center w-[500px] m-auto">
                <RegistrationFormInputItem name="email" label="Email" />
                <RegistrationFormInputItem name="password" type="password" label="Password" />

                <Button className="w-[100%]" isLoading={formik.isSubmitting} type="submit">
                    Log in
                </Button>
            </Form>
        </FormikProvider>
    );
};
