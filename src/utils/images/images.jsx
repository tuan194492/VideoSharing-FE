import avatar from '../../assets/icon/avatar.png';
import saleoff from '../../assets/icon/saleoff.svg';
import appLogo from '../../assets/icon/logo.png';
import defaultAvatar from '../../assets/icon/defaultAvatar.png'
import noImage from '../../assets/icon/noImage.png'
import collapse from '../../assets/icon/collapse.png'
import uploadIcon from '../../assets/icon/icons8-upload-100.png'
import likeButton from '../../assets/icon/like-button.jpg'
import empty from '../../assets/icon/empty.jpg'

const home = (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
    </svg>
)

const subscription = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="subscription">
        <circle cx="12" cy="11" r="1"></circle>
        <circle cx="17" cy="11" r="1"></circle>
        <circle cx="22" cy="11" r="1"></circle>
        <path
            d="M53 16H7a1 1 0 0 1 0-2H53a1 1 0 0 1 0 2zM37 44a1 1 0 0 1-1-1V39a1 1 0 0 1 2 0v4A1 1 0 0 1 37 44zM55.11 53h0a1 1 0 0 1 .12 1.28 14.52 14.52 0 0 1-3.68 3.52A.94.94 0 0 1 51 58a1 1 0 0 1-.55-1.83 12.76 12.76 0 0 0 3.15-3A1 1 0 0 1 55.11 53z"></path>
        <path
            d="M58 40.64v5.15a14.34 14.34 0 0 1-.73 4.54 1 1 0 0 1-1.65.37h0a1 1 0 0 1-.23-1A12.85 12.85 0 0 0 56 45.79V40.64A1.59 1.59 0 0 0 54.66 39a1.48 1.48 0 0 0-1.17.38A1.51 1.51 0 0 0 53 40.5a1 1 0 0 1-2 0V38.64A1.59 1.59 0 0 0 49.66 37a1.48 1.48 0 0 0-1.17.38A1.51 1.51 0 0 0 48 38.5a1 1 0 0 1-2 0v-.86A1.59 1.59 0 0 0 44.66 36a1.48 1.48 0 0 0-1.17.38A1.51 1.51 0 0 0 43 37.5a1 1 0 0 1-2 0v-9A1.5 1.5 0 0 0 39.34 27 1.59 1.59 0 0 0 38 28.64V39a1 1 0 0 1-2 0 3 3 0 0 0-3.1-3 1 1 0 0 0-.9 1v8.79a12.47 12.47 0 0 0 5.55 10.38 1 1 0 0 1-1.1 1.66 14.43 14.43 0 0 1-6.45-12V37a3 3 0 0 1 2.84-3A5 5 0 0 1 36 35V28.64A3.61 3.61 0 0 1 39.14 25 3.49 3.49 0 0 1 43 28.5v5.84A3.59 3.59 0 0 1 44.86 34a3.5 3.5 0 0 1 2.58 1.65 3.47 3.47 0 0 1 5.36 1.77A3.57 3.57 0 0 1 54.86 37 3.61 3.61 0 0 1 58 40.64zM7 28H7a1 1 0 0 1-1-1V10a4 4 0 0 1 4-4H29a1 1 0 0 1 0 2H10a2 2 0 0 0-2 2V27A1 1 0 0 1 7 28z"></path>
        <path
            d="M32,43a1,1,0,0,1-1,1H10a4,4,0,0,1-4-4V31a1,1,0,0,1,1-1H7a1,1,0,0,1,1,1v9a2,2,0,0,0,2,2H31A1,1,0,0,1,32,43Z"></path>
        <rect width="2" height="2" x="32" y="6" rx="1" ry="1"></rect>
        <path
            d="M54,10V38.5a1,1,0,0,1-2,0V10a2,2,0,0,0-2-2H37a1,1,0,0,1-1-1h0a1,1,0,0,1,1-1H50A4,4,0,0,1,54,10Z"></path>
        <path
            d="M45.31 29H42a1 1 0 0 1 0-2h3.36a1.83 1.83 0 0 0 1.22-.46 1.42 1.42 0 0 0 .47-1A1.6 1.6 0 0 0 45.31 24H36.69a1.83 1.83 0 0 0-1.22.46 1.42 1.42 0 0 0-.47 1A1.6 1.6 0 0 0 36.69 27h.39a1 1 0 0 1 0 2h-.39A3.61 3.61 0 0 1 33 25.5 3.46 3.46 0 0 1 34.11 23a3.81 3.81 0 0 1 2.58-1h8.62A3.61 3.61 0 0 1 49 25.5 3.46 3.46 0 0 1 47.89 28 3.81 3.81 0 0 1 45.31 29zM29 31H12a1 1 0 0 1-1-1V20a1 1 0 0 1 1-1H29a1 1 0 0 1 1 1V30A1 1 0 0 1 29 31zM13 29H28V21H13zM28 35H13a1 1 0 0 1 0-2H28a1 1 0 0 1 0 2zM22 39H13a1 1 0 0 1 0-2h9a1 1 0 0 1 0 2z"></path>
    </svg>
)

const personal = (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
    </svg>
)

const post = (
    <img width="35" height="35" src="https://img.icons8.com/ios/50/news.png" alt="news"/>
)

const contract = (
    <img width="50" height="50" src="https://img.icons8.com/ios/50/signing-a-document.png" alt="signing-a-document"/>
)

const transaction = (
    <img width="50" height="50" src="https://img.icons8.com/ios/50/refund-2.png" alt="refund-2"/>
)


const item = (
    <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
    </svg>
)

const blackItem = (
    <svg className="w-6 h-6" fill="none" stroke="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
    </svg>
)


const you = (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
    </svg>
)

const help = (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
)

const warehouse = (
    <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
    </svg>
)

const setting = (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
    </svg>
)

const customer = (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
    </svg>
)

const addButton = (
    <svg fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6"></path>
    </svg>
)

const supply = (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
    </svg>
)
const blackSupply = (
    <svg className="w-6 h-6 hover:fill-blue-900" fill="none" stroke="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
    </svg>
)

const goIcon = (
    <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
    </svg>
)
const backIcon = (
    <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
    </svg>
)

const backBlackIcon = (
    <svg className="w-6 h-6" fill="none" stroke="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
    </svg>
)

const importIcon = (
    <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path>
    </svg>
)

const sellIcon = (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
    </svg>
)

const itemIcon = (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
)

const leftPaginationIcon = (
    <svg fill="none" stroke="gray" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path>
    </svg>
)

const rightPaginationIcon = (
    <svg fill="none" stroke="gray" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
    </svg>
)

const tableSortItem = (
    <svg fill="none" stroke="gray" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"></path>
    </svg>
)

const tableUpSortItem = (
    <svg fill="none" stroke="gray" strokeWidth="5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"></path>
    </svg>
)

const tableDownSortItem = (
    <svg fill="none" stroke="gray" strokeWidth="5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
    </svg>
)

const voucher = (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"></path>
    </svg>
)

const permission = (
    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"></path>
    </svg>
)

const calendar = (
    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"></path>
    </svg>
)

const close = (
    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
)

const table = (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"></path>
    </svg>
)

const grid = (
    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"></path>
    </svg>
)

const xMark = (
    <svg fill="none" stroke="gray" strokeWidth="5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
)

const receipt = (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"></path>
    </svg>
)

const collapseIn = (<svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
        <g data-name="Layer 2">
            <g data-name="arrowhead-left">
                <rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"></rect>
                <path
                    d="M11.64 5.23a1 1 0 0 0-1.41.13l-5 6a1 1 0 0 0 0 1.27l4.83 6a1 1 0 0 0 .78.37 1 1 0 0 0 .78-1.63L7.29 12l4.48-5.37a1 1 0 0 0-.13-1.4z"></path>
                <path
                    d="M14.29 12l4.48-5.37a1 1 0 0 0-1.54-1.28l-5 6a1 1 0 0 0 0 1.27l4.83 6a1 1 0 0 0 .78.37 1 1 0 0 0 .78-1.63z"></path>
            </g>
        </g>
    </g>
</svg>)

const collapseOut = (
    <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <g data-name="Layer 2">
                <g data-name="arrowhead-right">
                    <rect width="24" height="24" transform="rotate(-90 12 12)" opacity="0"></rect>
                    <path
                        d="M18.78 11.37l-4.78-6a1 1 0 0 0-1.41-.15 1 1 0 0 0-.15 1.41L16.71 12l-4.48 5.37a1 1 0 0 0 .13 1.41A1 1 0 0 0 13 19a1 1 0 0 0 .77-.36l5-6a1 1 0 0 0 .01-1.27z"></path>
                    <path
                        d="M7 5.37a1 1 0 0 0-1.61 1.26L9.71 12l-4.48 5.36a1 1 0 0 0 .13 1.41A1 1 0 0 0 6 19a1 1 0 0 0 .77-.36l5-6a1 1 0 0 0 0-1.27z"></path>
                </g>
            </g>
        </g>
    </svg>
)

const addPlaylist = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
        <path
            d="M 0.96875 0.25 A 0.75 0.75 0 0 0 1 1.75 L 20 1.75 A 0.75 0.75 0 0 0 20 0.25 L 1 0.25 A 0.75 0.75 0 0 0 0.96875 0.25 z M 0.96875 5.25 A 0.75 0.75 0 0 0 1 6.75 L 17 6.75 A 0.75 0.75 0 0 0 17 5.25 L 1 5.25 A 0.75 0.75 0 0 0 0.96875 5.25 z M 0.96875 10.25 A 0.75 0.75 0 0 0 1 11.75 L 14 11.75 A 0.75 0.75 0 0 0 14 10.25 L 1 10.25 A 0.75 0.75 0 0 0 0.96875 10.25 z M 19.021484 14.25 A 0.75 0.75 0 0 0 18.25 15 L 18.25 18.25 L 15 18.25 A 0.75 0.75 0 0 0 15 19.75 L 18.25 19.75 L 18.25 23 A 0.75 0.75 0 0 0 19 23.75 A 0.75 0.75 0 0 0 19.75 23 L 19.75 19.75 L 23 19.75 A 0.75 0.75 0 0 0 23 18.25 L 19.75 18.25 L 19.75 15 A 0.75 0.75 0 0 0 19.021484 14.25 z M 0.96875 15.25 A 0.75 0.75 0 0 0 1 16.75 L 10 16.75 A 0.75 0.75 0 0 0 10 15.25 L 1 15.25 A 0.75 0.75 0 0 0 0.96875 15.25 z M 0.96875 20.25 A 0.75 0.75 0 0 0 1 21.75 L 10 21.75 A 0.75 0.75 0 0 0 10 20.25 L 1 20.25 A 0.75 0.75 0 0 0 0.96875 20.25 z"/>
    </svg>
)

const uploadButton = (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="64" height="64" viewBox="0 0 512 512">
        <path d="M 258.91406 38.402344 A 10 10 0 0 0 251.66406 41.048828 L 180.25586 107.0625 A 10 10 0 1 0 193.83203 121.74805 L 248.45117 71.255859 L 248.45117 305.71875 A 10 10 0 0 0 268.45117 305.71875 L 268.45117 71.255859 L 323.07227 121.74805 A 10 10 0 1 0 336.64844 107.0625 L 265.24023 41.048828 A 10 10 0 0 0 258.91406 38.402344 z M 126.42578 183.11523 A 50.057 50.057 0 0 0 76.425781 233.11523 L 76.425781 423.60742 A 50.057 50.057 0 0 0 126.42578 473.60742 L 385.57422 473.60742 A 50.057 50.057 0 0 0 435.57422 423.60742 L 435.57422 233.11523 A 50.056 50.056 0 0 0 385.57422 183.11523 L 337.10938 183.11523 A 10 10 0 0 0 337.10938 203.11523 L 385.57422 203.11523 A 30.034 30.034 0 0 1 415.57422 233.11523 L 415.57422 423.60742 A 30.034 30.034 0 0 1 385.57422 453.60742 L 126.42578 453.60742 A 30.034 30.034 0 0 1 96.425781 423.60742 L 96.425781 233.11523 A 30.034 30.034 0 0 1 126.42578 203.11523 L 174.89062 203.11523 A 10 10 0 0 0 174.89062 183.11523 L 126.42578 183.11523 z"></path>
    </svg>
)

const uploadButtonSmaller = (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 512 512">
        <path d="M 258.91406 38.402344 A 10 10 0 0 0 251.66406 41.048828 L 180.25586 107.0625 A 10 10 0 1 0 193.83203 121.74805 L 248.45117 71.255859 L 248.45117 305.71875 A 10 10 0 0 0 268.45117 305.71875 L 268.45117 71.255859 L 323.07227 121.74805 A 10 10 0 1 0 336.64844 107.0625 L 265.24023 41.048828 A 10 10 0 0 0 258.91406 38.402344 z M 126.42578 183.11523 A 50.057 50.057 0 0 0 76.425781 233.11523 L 76.425781 423.60742 A 50.057 50.057 0 0 0 126.42578 473.60742 L 385.57422 473.60742 A 50.057 50.057 0 0 0 435.57422 423.60742 L 435.57422 233.11523 A 50.056 50.056 0 0 0 385.57422 183.11523 L 337.10938 183.11523 A 10 10 0 0 0 337.10938 203.11523 L 385.57422 203.11523 A 30.034 30.034 0 0 1 415.57422 233.11523 L 415.57422 423.60742 A 30.034 30.034 0 0 1 385.57422 453.60742 L 126.42578 453.60742 A 30.034 30.034 0 0 1 96.425781 423.60742 L 96.425781 233.11523 A 30.034 30.034 0 0 1 126.42578 203.11523 L 174.89062 203.11523 A 10 10 0 0 0 174.89062 183.11523 L 126.42578 183.11523 z"></path>
    </svg>
)

const playlist = (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" id="playlist">
        <path fill="none" d="M0 0h48v48H0z"></path>
        <path d="M28 20H4v4h24v-4zm0-8H4v4h24v-4zm8 16v-8h-4v8h-8v4h8v8h4v-8h8v-4h-8zM4 32h16v-4H4v4z"></path>
    </svg>
)

const history = (
    <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"
         image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 513.11">
        <path fill-rule="nonzero"
              d="M210.48 160.8c0-14.61 11.84-26.46 26.45-26.46s26.45 11.85 26.45 26.46v110.88l73.34 32.24c13.36 5.88 19.42 21.47 13.54 34.82-5.88 13.35-21.47 19.41-34.82 13.54l-87.8-38.6c-10.03-3.76-17.16-13.43-17.16-24.77V160.8zM5.4 168.54c-.76-2.25-1.23-4.64-1.36-7.13l-4-73.49c-.75-14.55 10.45-26.95 25-27.69 14.55-.75 26.95 10.45 27.69 25l.74 13.6a254.258 254.258 0 0136.81-38.32c17.97-15.16 38.38-28.09 61.01-38.18 64.67-28.85 134.85-28.78 196.02-5.35 60.55 23.2 112.36 69.27 141.4 132.83.77 1.38 1.42 2.84 1.94 4.36 27.86 64.06 27.53 133.33 4.37 193.81-23.2 60.55-69.27 112.36-132.83 141.39a26.24 26.24 0 01-12.89 3.35c-14.61 0-26.45-11.84-26.45-26.45 0-11.5 7.34-21.28 17.59-24.92 7.69-3.53 15.06-7.47 22.09-11.8.8-.66 1.65-1.28 2.55-1.86 11.33-7.32 22.1-15.7 31.84-25.04.64-.61 1.31-1.19 2-1.72 20.66-20.5 36.48-45.06 46.71-71.76 18.66-48.7 18.77-104.46-4.1-155.72l-.01-.03C418.65 122.16 377.13 85 328.5 66.37c-48.7-18.65-104.46-18.76-155.72 4.1a203.616 203.616 0 00-48.4 30.33c-9.86 8.32-18.8 17.46-26.75 27.29l3.45-.43c14.49-1.77 27.68 8.55 29.45 23.04 1.77 14.49-8.55 27.68-23.04 29.45l-73.06 9c-13.66 1.66-26.16-7.41-29.03-20.61zM283.49 511.5c20.88-2.34 30.84-26.93 17.46-43.16-5.71-6.93-14.39-10.34-23.29-9.42-15.56 1.75-31.13 1.72-46.68-.13-9.34-1.11-18.45 2.72-24.19 10.17-12.36 16.43-2.55 39.77 17.82 42.35 19.58 2.34 39.28 2.39 58.88.19zm-168.74-40.67c7.92 5.26 17.77 5.86 26.32 1.74 18.29-9.06 19.97-34.41 3.01-45.76-12.81-8.45-25.14-18.96-35.61-30.16-9.58-10.2-25.28-11.25-36.11-2.39a26.436 26.436 0 00-2.55 38.5c13.34 14.2 28.66 27.34 44.94 38.07zM10.93 331.97c2.92 9.44 10.72 16.32 20.41 18.18 19.54 3.63 36.01-14.84 30.13-33.82-4.66-15-7.49-30.26-8.64-45.93-1.36-18.33-20.21-29.62-37.06-22.33C5.5 252.72-.69 262.86.06 274.14c1.42 19.66 5.02 39 10.87 57.83z"/>
    </svg>
)
export const IMAGES = {
    icon: {
        contract,
        transaction,
        post,
        avatar,
        home,
        personal,
        item,
        supply,
        customer,
        warehouse,
        you,
        help,
        setting,
        saleoff,
        blackSupply,
        goIcon,
        backIcon,
        blackItem,
        sellIcon,
        importIcon,
        itemIcon,
        voucher,
        permission,
        leftPaginationIcon,
        rightPaginationIcon,
        tableSortItem,
        tableUpSortItem,
        tableDownSortItem,
        addButton,
        calendar,
        close,
        backBlackIcon,
        defaultAvatar,
        table, grid,
        xMark,
        receipt,
        appLogo,
        noImage,
        collapseIn,
        collapseOut,
        collapse,
        uploadIcon,
        likeButton,
        addPlaylist,
        uploadButton,
        uploadButtonSmaller,
        subscription,
        playlist,
        history,
        empty
    },
    logo: {},
};
