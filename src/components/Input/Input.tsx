import React, { useRef } from 'react'
import './Input.css'

export const Input = ({ onClickHandler }: { onClickHandler: (value: string) => void }) => {
    const textareaAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleClick = () => {
        if (textareaAreaRef.current) {
            onClickHandler(textareaAreaRef.current.value);
            textareaAreaRef.current.value = '';
        }
    }

    return (
        <div className='input-component'>
            <div className='input-title'>New note</div>
            <div className='input-area'>
                <textarea className='input-textarea' ref={textareaAreaRef}></textarea>
                <button className='input-button' onClick={handleClick}>&#10095;</button>
            </div>
        </div>
    )
}
