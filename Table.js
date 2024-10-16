class Table {
    constructor(id, maxSize) {
        this.id = id;  // Table ID or number
        this.maxSize = maxSize; // Max number of guests for the table
        this.reservation = null; // Current reservation for the table (null if available)
    }

    setReservation(reservation) {
        if (reservation.partySize <= this.maxSize) {
            this.reservation = reservation; // Assign reservation if guests fit
        } else {
            console.log(`Table ${this.id} can't fit ${reservation.guests} guests.`);
        }
    }

    getReservation() {
        return this.reservation;
    }

    isAvailable() {
        return this.reservation === null;
    }

    clearReservation() {
        this.reservation = null; // Free the table
    }
}