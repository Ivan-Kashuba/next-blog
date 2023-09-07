import React, { HTMLInputTypeAttribute, useCallback, useState } from 'react';
import {
    FormControl,
    FormHelperText,
    FormLabel,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Textarea,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { IRegistrationFormValues } from '@/features/registration/ui/RegistrationForm/RegistrationForm';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export interface IRegistrationFormInputItem {
    label: string;
    name: keyof IRegistrationFormValues;
    helperText?: string;
    type?: HTMLInputTypeAttribute;
    isTextArea?: boolean;
}

export const RegistrationFormInputItem = (props: IRegistrationFormInputItem) => {
    const { name, helperText, label, type, isTextArea } = props;
    const { values, handleChange, handleBlur } = useFormikContext<IRegistrationFormValues>();
    const [show, setShow] = useState(type !== 'password');

    const onShowClick = useCallback(() => {
        setShow((prev) => !prev);
    }, []);

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            {isTextArea ? (
                <Textarea
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name={name}
                    value={values[name]}
                />
            ) : (
                <InputGroup>
                    <Input
                        onBlur={handleBlur}
                        type={show ? 'text' : 'password'}
                        onChange={handleChange}
                        name={name}
                        value={values[name]}
                    />
                    {type === 'password' && (
                        <InputRightElement width="2.5rem">
                            <Icon
                                className="cursor-pointer"
                                onClick={onShowClick}
                                as={show ? AiFillEyeInvisible : AiFillEye}
                            />
                        </InputRightElement>
                    )}
                </InputGroup>
            )}

            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};
