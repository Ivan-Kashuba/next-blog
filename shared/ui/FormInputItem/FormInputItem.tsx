import React, { HTMLInputTypeAttribute, useCallback, useState } from 'react';
import { Input, Textarea } from '@nextui-org/react';
import { useFormikContext } from 'formik';
import { IRegistrationFormValues } from '@/features/registration/ui/RegistrationForm/RegistrationForm';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@nextui-org/shared-icons';

export interface IRegistrationFormInputItem {
    label: string;
    name: keyof IRegistrationFormValues;
    type?: HTMLInputTypeAttribute;
    isTextArea?: boolean;
    isRequired?: boolean;
}

export const FormInputItem = (props: IRegistrationFormInputItem) => {
    const { name, label, type, isTextArea, isRequired } = props;
    const { values, handleChange, handleBlur } = useFormikContext<IRegistrationFormValues>();
    const [show, setShow] = useState(type !== 'password');

    const onShowClick = useCallback(() => {
        setShow((prev) => !prev);
    }, []);

    return (
        <>
            {isTextArea ? (
                <Textarea
                    label={label}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name={name}
                    value={values[name]}
                />
            ) : (
                <Input
                    variant="underlined"
                    onBlur={handleBlur}
                    type={show ? 'text' : 'password'}
                    onChange={handleChange}
                    name={name}
                    value={values[name]}
                    label={label}
                    placeholder="Type"
                    isRequired={isRequired}
                    endContent={
                        type === 'password' && (
                            <>
                                <button
                                    className="focus:outline-none"
                                    type="button"
                                    onClick={onShowClick}
                                >
                                    {show ? (
                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            </>
                        )
                    }
                />
            )}
        </>
    );
};
