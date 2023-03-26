import React from "react";

interface Props {
    type: string;
    placeholder: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<Props> = ({ type, placeholder, name, value, onChange}) => {
    return (
        <div>
            <input type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} />
        </div>
    );
};

export default InputField;