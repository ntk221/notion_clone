import React from "react";

interface Props {
    type: string;
    placeholder: string;
}

const InputField: React.FC<Props> = ({ type, placeholder }) => {
    return (
        <div>
            <input type={type} placeholder={placeholder}/>
        </div>
    );
};

export default InputField;