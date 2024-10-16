class ReservationBuilder{
    createName(){}
    createTime(){}
    createDate(){}
    createParty(){}
    createStatus(){}
    createSpecial(){}
    getResult(){}
    createReservation(){}

}

class ReservationManager extends ReservationBuilder{
    constructor(){
        super();
        this.reservation = new Reservation();
    }

    createName(name){
        this.reservation.name = name;
    }
    createTime(time){
        this.reservation.time = time;
    }
    createDate(date){
        this.reservation.date = date;
    }
    createParty(party){
        this.reservation.party = party;
    }
    createSpecial(special){
        this.reservation.special = special;
    }
    createStatus(status){
        this.reservation.status = status;
    }
    getResult(){
        print(this.reservation);
    }
    createReservation(){
        return this.reservation;
    }
}