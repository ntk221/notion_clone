import React from 'react';

interface Props {
    onSubmit: () => void;
}

const SubmitButton: React.FC<Props> = ( { onSubmit }) => {
    return (
        <button type="submit" onClick={onSubmit}>
            送信
        </button>
    );
};

export default SubmitButton;