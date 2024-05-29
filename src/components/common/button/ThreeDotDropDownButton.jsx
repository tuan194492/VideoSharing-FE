import React, {useEffect, useRef, useState} from 'react';

export const ThreeDotDropDownButton = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const dropdownRef = useRef(null);
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOptionClick = (option) => {
        option.onSelect();
    }

    return (
        <div className={props.className}>
            <div className="relative">
                <button
                    id="dropdownMenuIconButton"
                    onClick={toggleDropdown}
                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                    type="button"
                >
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 4 15"
                    >
                        <path
                            d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                    </svg>
                </button>
                <div
                    id="dropdownDots"
                    className={`absolute right-0 mt-2 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ${isOpen ? 'block' : 'hidden'}`}
                    ref={dropdownRef}
                >
                    <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownMenuIconButton">
                        {props.options && props.options.map((option) => (
                            <a
                                href="#"
                                key={option.value}
                                onClick={(e) =>{
                                    e.stopPropagation()
                                    setIsOpen(false);
                                    handleOptionClick(option)}
                                }
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                            >
                                {option.label}
                            </a>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    );
};
