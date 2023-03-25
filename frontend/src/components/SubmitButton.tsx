import React from 'react';

interface Props {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }

const SubmitButton: React.FC<Props> = ( { onClick }) => {
    return (
        <button type="submit" onClick={onClick}>
            送信
        </button>
    );
};

export default SubmitButton;