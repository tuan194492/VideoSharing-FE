import React from 'react';

const SearchBar = (props) => {
    return (
        <div className="max-w-md mx-auto flex items-center">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div className="relative flex-grow">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border-b-2 border-gray-400  "
                    placeholder="Search ..."
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            props.filter && props.filter(e.target.value);
                        }
                    }}

                    onBlur={e => {
                        props.filter && props.filter(e.target.value);
                    }}
                />
            </div>
        </div>
    );
}

export default SearchBar;
