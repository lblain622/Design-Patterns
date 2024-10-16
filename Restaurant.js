

class Restaurant {
    
    constructor(name) {
        this.name = name;
        this.maxTableSize = 4;
        this.reservations = [];
        this.tables = [];
        this.manager = new Manager(); // Manager handles reservations
        this.completedReservations = [];
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
        let reservation = this.manager.construct_reservation(name, date, time, special, partySize);
        this.reservations.push(reservation);
        console.log(`Reservation for ${name} created.`);
    }

    // Process reservations and assign tables
    processTables() {
        for (let reservation of this.reservations) {
            if (reservation.getStatus() === 'confirmed') {
                let table = this.findAvailableTable(reservation.partySize);
                if (table) {
                    table.setReservation(reservation);
                    console.log(`Table ${table.id} reserved for ${reservation.name}`);
                } else {
                    console.log(`No available table for reservation: ${reservation.name}`);
                }
            } else if (reservation.getStatus() === 'cancelled') {
                let table = this.findTableByReservation(reservation);
                if (table) {
                    table.clearReservation();
                    console.log(`Table ${table.id} reservation cancelled`);
                }
            } else if (reservation.status() === 'pending') {
                reservation.proceed(); // Move reservation from pending to confirmed
            } else if (reservation.getStatus() === 'seated') {
                console.log(`${reservation.name} is already seated, processing...`);
                reservation.proceed(); 
                this.handleCompletedReservation(reservation); 
            }
        }
    }

    // Find table based on the reservation
    findTableByReservation(reservation) {
        return this.tables.find(table => table.getReservation() === reservation);
    }

    // Find available table based on party size
    findAvailableTable(partySize) {
        return this.tables.find(table => table.isAvailable() && table.maxSize >= partySize);
    }

    // Handle completed reservations: remove from active tables and write to JSON file
    handleCompletedReservation(reservation) {
       
        let table = this.findTableByReservation(reservation);
        
        if (table) {
            table.clearReservation(); // Clear the reservation from the table
            console.log(`Reservation for ${reservation.name} is completed and table ${table.id} is cleared.`);

            
            this.completedReservations.push(reservation);
           
        }
    }

    
   
}
