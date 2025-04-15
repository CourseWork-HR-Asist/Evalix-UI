import React from 'react';
import ThemeToggleButton from '../themes/ThemeToggleButton';

const HomePage: React.FC = () => {
    return (
        <div className='flex flex-col items-center justify-center my-4'>
            <h1 className="dark:text-white">Welcome to Evalix</h1>
            <p className="dark:text-white">This is the home page of the application.</p>
            <ThemeToggleButton />
        </div>
    );
};

export default HomePage;