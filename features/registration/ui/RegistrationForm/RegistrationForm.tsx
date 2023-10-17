'use client';
import { Form, FormikProps, FormikProvider, useFormik } from 'formik';
import http from '@/shared/lib/api/http';
import { useMemo } from 'react';
import { FormInputItem, IRegistrationFormInputItem } from '@/shared/ui/FormInputItem/FormInputItem';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { registrationValidationSchema } from '@/features/registration/model/validation/registrationValidation';

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
        validationSchema: registrationValidationSchema,
        onSubmit: (values, { setSubmitting }) => {
            http.post('http://test-blog-api.ficuslife.com/api/v1/users', values)
                .then(() => {
                    signIn('credentials', {
                        email: values.email,
                        password: values.password,
                        redirect: false,
                    })
                        .then(() => {
                            router.push('/profile');
                            toast.success('Welcome!');
                        })
                        .catch(() => {
                            router.push('/login');
                            toast.error('Something went wrong');
                        });
                })
                .catch((err) => {
                    const errorText =
                        err?.data?.error[0]?.message ||
                        err?.data?.error.toString() ||
                        'Something went wrong';

                    toast.error(errorText);
                })
                .finally(() => {
                    setSubmitting(false);
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
                    return (
                        <FormInputItem
                            key={formItem.name}
                            {...formItem}
                            errorMessage={
                                formik.touched[formItem.name] && formik.errors[formItem.name]
                                    ? formik.errors[formItem.name]
                                    : undefined
                            }
                        />
                    );
                })}

                <Button
                    variant="ghost"
                    className="w-[100%]"
                    isLoading={formik.isSubmitting}
                    type="submit"
                >
                    Create account
                </Button>
            </Form>
        </FormikProvider>
    );
};
