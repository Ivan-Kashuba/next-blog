import { Disclosure } from '@/shared/types/disclosure';
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@nextui-org/react';
import React, { useCallback, useMemo } from 'react';
import { Form, FormikProps, FormikProvider, useFormik } from 'formik';
import { toast } from 'react-toastify';
import { ProfileChangeType } from '../../../../entities/User/model/types/User';
import http from '@/shared/lib/api/http';
import { useSession } from 'next-auth/react';
import { FormInputItem, IRegistrationFormInputItem } from '@/shared/ui/FormInputItem/FormInputItem';

interface ProfileChangeDataModalPropsI {
    disclosure: Disclosure;
}

export const ProfileChangeDataModal = (props: ProfileChangeDataModalPropsI) => {
    const { disclosure } = props;
    const { data: session, update } = useSession();
    const user = session?.user;

    const { isOpen, onClose, onOpenChange } = disclosure;

    const formik: FormikProps<ProfileChangeType> = useFormik<ProfileChangeType>({
        initialValues: {
            name: user?.name || '',
            skills: user?.skills || '',
            profession: user?.profession || '',
            extra_details: user?.extra_details || '',
            details: user?.details || '',
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            http.patch(`users/${session?.user._id}`, values)
                .then((responseUser) => {
                    const updateData = {
                        ...session,
                        user: { ...responseUser, token: session?.user.token },
                    };

                    update(updateData).then(() => {
                        toast.success('Profile was updated successfully!');
                        onClose();
                    });
                })
                .catch((err) => {
                    toast.error(err.data.error || 'Something went wrong');
                })
                .finally(() => {
                    formik.setSubmitting(false);
                });
        },
    });

    const onModalClose = useCallback(() => {
        onClose();
        formik.resetForm();
    }, [formik, onClose]);

    const formDataToMap: IRegistrationFormInputItem[] = useMemo(() => {
        return [
            { name: 'name', label: 'Name' },
            { name: 'profession', label: 'Profession' },
            { name: 'skills', label: 'Skills', isTextArea: true },
            { name: 'details', label: 'Details', isTextArea: true },
            { name: 'extra_details', label: 'Extra details', isTextArea: true },
        ];
    }, []);

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={onModalClose}
            isDismissable={false}
        >
            <FormikProvider value={formik}>
                <Form>
                    <ModalContent>
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[20px]">
                                Update profile
                            </ModalHeader>
                            <ModalBody>
                                {formDataToMap.map((formItem) => {
                                    return <FormInputItem key={formItem.name} {...formItem} />;
                                })}
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    isLoading={formik.isSubmitting}
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </ModalFooter>
                        </>
                    </ModalContent>
                </Form>
            </FormikProvider>
        </Modal>
    );
};
