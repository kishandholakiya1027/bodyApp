import React, { createContext } from 'react';

const BookingContext = createContext({ booking: null, setBooking: () => { } });
export default BookingContext;