import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Upcoming from './Upcoming';

const Upcomingpage = () => {
    return (
        <div className='upcoming__page'>
            <Header />
            <Upcoming />
            <Footer />
        </div>
    );
}

export default Upcomingpage;
