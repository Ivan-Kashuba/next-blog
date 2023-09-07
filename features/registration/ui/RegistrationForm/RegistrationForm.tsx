'use client';
import { Form, FormikProps, FormikProvider, useFormik } from 'formik';
import http from '@/shared/lib/api/http';
import { Button, useToast } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import {
    IRegistrationFormInputItem,
    RegistrationFormInputItem,
} from '@/features/registration/ui/RegistrationForm/RegistrationFormInputItem';
import { useRouter } from 'next/navigation';

export type IRegistrationFormValues = {
    email: string;
    password: string;
    name: string;
    extra_details: string;
    skills: string;
    profession: string;
    details: string;
};

export const RegistrationForm = () => {
    const toast = useToast();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formik: FormikProps<IRegistrationFormValues> = useFormik<IRegistrationFormValues>({
        initialValues: {
            email: '',
            password: '',
            name: '',
            extra_details: '',
            skills: '',
            profession: '',
            details: '',
        },
        onSubmit: async (values, { setSubmitting }) => {
            setIsSubmitting(true);
            http.post('http://test-blog-api.ficuslife.com/api/v1/users', values)
                .then(() => {
                    toast({
                        title: 'Account created successfully',
                        status: 'success',
                        isClosable: true,
                        position: 'top-right',
                    });

                    http.post('http://test-blog-api.ficuslife.com/api/v1/auth', {
                        email: values.email,
                        password: values.password,
                    })
                        .then((res) => {
                            http.setAuthHeader(res.token);
                            router.push('/');
                        })
                        .catch(() => {
                            router.push('/login');
                        });
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
                    setIsSubmitting(false);
                });
        },
    });

    const formDataToMap: IRegistrationFormInputItem[] = useMemo(() => {
        return [
            { name: 'email', helperText: "We'll never share your email.", label: 'Email address' },
            { name: 'name', label: 'Name' },
            {
                name: 'profession',
                label: 'Profession',
            },
            {
                name: 'skills',
                helperText: 'Describe your skills',
                label: 'Skills',
                isTextArea: true,
            },
            {
                name: 'details',
                label: 'Details',
                isTextArea: true,
            },
            {
                name: 'extra_details',
                label: 'Extra details',
                isTextArea: true,
            },
            {
                name: 'password',
                helperText: 'At least 5 symbols',
                label: 'Password',
                type: 'password',
            },
        ];
    }, []);

    return (
        <FormikProvider value={formik}>
            <Form className="flex flex-col gap-[30px] items-center justify-center w-[500px] m-auto">
                {formDataToMap.map((formItem) => {
                    return <RegistrationFormInputItem key={formItem.name} {...formItem} />;
                })}

                <Button className="w-[100%]" isLoading={isSubmitting} type="submit">
                    Create account
                </Button>
            </Form>
        </FormikProvider>
    );
};
