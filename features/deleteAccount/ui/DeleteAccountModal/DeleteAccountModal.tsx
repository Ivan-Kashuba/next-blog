import React, { useCallback } from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@nextui-org/react';
import { Disclosure } from '@/shared/types/disclosure';
import http from '@/shared/lib/api/http';
import { signOut, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

interface DeleteAccountModalPropsT {
    disclosure: Disclosure;
}

export const DeleteAccountModal = ({ disclosure }: DeleteAccountModalPropsT) => {
    const { isOpen, onOpenChange } = disclosure;
    const { data: session } = useSession();

    const onDeleteAccountClick = useCallback(() => {
        http.delete(`/users/${session?.user._id}`)
            .then(() => {
                signOut({ callbackUrl: '/register' });
            })
            .catch(() => {
                toast.error('Something went wrong, try again later');
            });
    }, [session?.user._id]);

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="text-center text-danger">
                            Delete account?
                        </ModalHeader>
                        <ModalBody className="text-danger-600">
                            Are you sure you wanna delete your account? You will not be able to
                            restore data
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" variant="light" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button color="danger" variant="solid" onPress={onDeleteAccountClick}>
                                Delete
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
