import React, { ChangeEvent, useState } from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@nextui-org/react';
import { toast } from 'react-toastify';
import { Disclosure } from '@/shared/types/disclosure';
import http from '@/shared/lib/api/http';
import { useSession } from 'next-auth/react';

interface ProfileChangeAvatarModalPropsI {
    disclosure: Disclosure;
}

export const ProfileChangeAvatarModal = (props: ProfileChangeAvatarModalPropsI) => {
    const { disclosure } = props;

    const { isOpen, onClose, onOpenChange } = disclosure;
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { update, data: session } = useSession();

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedFile(file);
        }
    };

    const onSendFile = () => {
        if (selectedFile) {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('avatar', selectedFile);
            http.put(`/users/upload/${session?.user._id}`, formData)
                .then((responseUser) => {
                    const updateData = {
                        ...session,
                        user: { ...responseUser, token: session?.user.token },
                    };

                    update(updateData).then(() => {
                        onClose();
                        toast.success('Avatar change successfully');
                    });
                })
                .catch(() => {
                    toast.error("Can't upload this file, try to change one");
                })
                .finally(() => {
                    setIsLoading(false);
                    setSelectedFile(null);
                });
        } else {
            toast.error('You should select file!');
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-[20px]">
                            Upload your file
                        </ModalHeader>
                        <ModalBody>
                            <input type="file" onChange={onFileChange} />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button isLoading={isLoading} color="primary" onPress={onSendFile}>
                                Save
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
