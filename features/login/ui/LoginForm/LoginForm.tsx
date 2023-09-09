'use client';
import http from '@/shared/lib/api/http';
import { Form, FormikProps, FormikProvider, useFormik } from 'formik';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@nextui-org/react';

export type ILoginFormValues = {
    email: string;
    password: string;
};

export const LoginForm = () => {
    const router = useRouter();

    const formik: FormikProps<ILoginFormValues> = useFormik<ILoginFormValues>({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            http.post('/auth', values)
                .then((res) => {
                    http.setAuthHeader(res.token);
                    router.push('/');
                })
                .catch(() => {})
                .finally(() => {
                    formik.setSubmitting(false);
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
                    name={'email'}
                    value={formik.values.email}
                    label={'Email'}
                    placeholder="Type"
                />
                <Input
                    variant="underlined"
                    onBlur={formik.handleBlur}
                    type="text"
                    onChange={formik.handleChange}
                    name={'password'}
                    value={formik.values.password}
                    label={'Password'}
                    placeholder="Type"
                />

                <Button
                    className="w-[100%]"
                    variant="ghost"
                    isLoading={formik.isSubmitting}
                    type="submit"
                >
                    Log in
                </Button>
            </Form>
        </FormikProvider>
    );
};
