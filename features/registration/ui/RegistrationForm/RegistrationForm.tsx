'use client';
import { Form, FormikProps, FormikProvider, useFormik } from 'formik';
import http from '@/shared/lib/api/http';
import { useMemo, useState } from 'react';
import { IRegistrationFormInputItem, FormInputItem } from '@/shared/ui/FormInputItem/FormInputItem';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import { signIn } from 'next-auth/react';

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
        onSubmit: async (values) => {
            setIsSubmitting(true);
            http.post('http://test-blog-api.ficuslife.com/api/v1/users', values)
                .then(() => {
                    signIn('credentials', {
                        email: values.email,
                        password: values.password,
                        redirect: false,
                    }).then(() => {
                        router.push('/profile');
                    });
                })
                .catch(() => {
                    router.push('/login');
                })
                .finally(() => {
                    setIsSubmitting(false);
                });
        },
    });

    const formDataToMap: IRegistrationFormInputItem[] = useMemo(() => {
        return [
            {
                name: 'email',
                label: 'Email address',
                isRequired: true,
            },
            { name: 'name', label: 'Name' },
            {
                name: 'profession',
                label: 'Profession',
            },
            {
                name: 'skills',
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
                label: 'Password',
                type: 'password',
                isRequired: true,
            },
        ];
    }, []);

    return (
        <FormikProvider value={formik}>
            <Form className="flex flex-col gap-[30px] items-center justify-center w-[500px] m-auto">
                {formDataToMap.map((formItem) => {
                    return <FormInputItem key={formItem.name} {...formItem} />;
                })}

                <Button variant="ghost" className="w-[100%]" isLoading={isSubmitting} type="submit">
                    Create account
                </Button>
            </Form>
        </FormikProvider>
    );
};
