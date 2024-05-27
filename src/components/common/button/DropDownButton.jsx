import React, { useState } from 'react';

export const DropdownButton = ({ options, onSelect, className }) => {
    console.log(options)
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleDropdown = (e) => {
        console.log('On click')
        setIsOpen(!isOpen);
    }

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        option.onSelect(option);
        // option.callback();
    };

    return (
        <div className={className}>
            <div className={'relative inline-block text-left'}>
                <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    id="options-menu"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={e => {
                        setIsOpen(prev => !prev);
                    }}
                >
                    {selectedOption ? selectedOption.label : 'Select an option'}
                    <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 01.707.293l3.586 3.586a1 1 0 01-1.414 1.414L10 5.414 7.121 8.293a1 1 0 11-1.414-1.414l3.586-3.586A1 1 0 0110 3zm0 14a1 1 0 01-.707-.293l-3.586-3.586a1 1 0 111.414-1.414L10 14.586l2.879-2.879a1 1 0 111.414 1.414l-3.586 3.586A1 1 0 0110 17z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
            {isOpen &&
                <div
                    className="origin-top-right absolute z-10 left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                >
                    <div className="py-1" role="none">
                        {options.map((option) => (
                            <a
                                href="#"
                                key={option.value}
                                onClick={(e) =>  {
                                    e.stopPropagation();
                                    handleOptionClick(option)
                                }}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                            >
                                {option.label}
                            </a>
                        ))}
                    </div>
                </div>
            }


        </div>
    );
};
