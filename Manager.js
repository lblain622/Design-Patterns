class Manager{
    constructor(){
            this.builder = new ReservationManager();
    }

    construct_reservation(name,date,time,special,partySize){
        this.builder.createName(name);
        this.builder.createDate(date);
        this.builder.createTime(time);
        this.builder.createSpecial(special);
        this.builder.createParty(partySize);
        this.builder.createStatus(new PendingState());
        return this.builder.createReservation();

    }

}
    

    