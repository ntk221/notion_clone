import React from "react";

interface Props {
    type: string;
    placeholder: string;
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<Props> = ({ type, placeholder, name, onChange}) => {
    return (
        <div>
            <input type={type} placeholder={placeholder} name={name} onChange={onChange} />
        </div>
    );
};

export default InputField;