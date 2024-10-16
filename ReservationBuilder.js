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
        this.name = "";
        this.date = "";
        this.time = "";
        this.partySize = "";
        this.special = "";
        this.status = "";
        
    }

    createName(name){
        this.name = name;
    }
    createTime(time){
        this.time = time;
    }
    createDate(date){
        this.date = date;
    }
    createParty(partySize){
        this.partySize = partySize;
    }
    createSpecial(special){
        this.special = special;
    }
    createStatus(status){
        this.status = status;
    }
    
    createReservation(){
        return new Reservation(this.name,this.date,this.time,this.special,this.partySize,this.status);
    }
}