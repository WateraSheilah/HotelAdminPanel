import React from 'react';
import PropTypes from 'prop-types';

interface SubmitButtonProps {
    bgColor: string;
    textColor: string;
    width?: string;
    height?: string;
    className?: string;
    text?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
       bgColor,
       textColor,
       width,
       height,
       className = '',
       text = 'Submit',
       onClick = () => {},
   }) => {
    return (
        <button
            className={`rounded ${className}`}
            style={{
                backgroundColor: bgColor,
                color: textColor,
                width: width,
                height: height,
            }}
            onClick={onClick}
            type="button"
        >
            {text}
        </button>
    );
};

SubmitButton.propTypes = {
    bgColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    className: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
};

export default SubmitButton;
