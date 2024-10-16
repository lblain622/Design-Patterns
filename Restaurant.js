class Restaurant {

    constructor(name) {
        this.name = name;
        this.maxTableSize = 4;
        this.reservations = [];
        this.tables = [];
        this.manager = new Manager(); // Manager handles reservations
        this.completedReservations = [];
        this.createTables();
    }

    // Create tables for the restaurant
    createTables() {
        for (let i = 0; i < 5; i++) {
            let table = new Table(i, 4);  // Create 5 tables with capacity 4
            this.tables.push(table);
        }
        this.tables.push(new Table(5, 2)); // Create two small tables with capacity 2
        this.tables.push(new Table(6, 2));
    }

    // Make a reservation through the manager
    makeReservation(name, date, time, special, partySize) {
        console.log(`Making reservation for ${name}...`);
        console.log(`Reservation details: ${date} at ${time} for ${partySize} people`);
        let reservation = this.manager.construct_reservation(name, date, time, special, partySize);
        this.reservations.push(reservation);
        console.log(`Reservation for ${name} created.`);

    }

    // Process reservations and assign tables
    processTables() {
        this.reservations.forEach(reservation => {
            if (reservation.getStatus() === 'Confirmed') {
                let table = this.findAvailableTable(reservation.partySize);
                if (table) {
                    reservation.proceed();
                    table.setReservation(reservation);
                    console.log(`Table ${table.id} reserved for ${reservation.name}`);
                } else {
                    console.log(`No available table for reservation: ${reservation.name}`);
                }
            } else if (reservation.getStatus() === 'Cancelled') {
                let table = this.findTableByReservation(reservation);
                
                if (table) {
                    table.clearReservation();
                    console.log(`Table ${table.id} reservation cancelled`);
                }
                this.reservations.splice(this.reservations.indexOf(reservation), 1);
                this.completedReservations.push(reservation);
            } else if (reservation.getStatus() === 'Pending') {
                reservation.proceed(); // Move reservation from pending to confirmed
            } else if (reservation.getStatus() === 'Seated') {
                console.log(`${reservation.name} is already seated, processing...`);
                reservation.proceed();
                this.handleCompletedReservation(reservation);
            } else if (reservation.partySize > this.maxTableSize) {
                console.log(`Sorry, we don't have tables for party size ${reservation.partySize}`);
                reservation.cancel();
                this.handleCompletedReservation(reservation);
            }

        });
    }


// Find table based on the reservation
findTableByReservation(reservation){
    return this.tables.find(table => table.getReservation() === reservation);
}

// Find available table based on party size
findAvailableTable(partySize){
    return this.tables.find(table => table.isAvailable() && table.maxSize >= partySize);
}

// Handle completed reservations: remove from active tables and write to JSON file
handleCompletedReservation(reservation){

    let table = this.findTableByReservation(reservation);

    if (table) {
        table.clearReservation(); // Clear the reservation from the table
        console.log(`Reservation for ${reservation.name} is completed and table ${table.id} is cleared.`);

        this.reservations.splice(this.reservations.indexOf(reservation), 1);
        this.completedReservations.push(reservation);

    }
}
}
    

