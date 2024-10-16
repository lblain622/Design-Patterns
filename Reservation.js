class Reservation{
    constructor(name,date,time,special,partySize){
        this.name=name;
        this.date=date;
        this.time=time;
        this.special=special;
        this.partySize=partySize;
        this.table_status=new PendingState();

    }
    setState(state){
        this.table_status=state;
    }

    proceed(){
        this.table_status.proceed(this);
    }

    cancel(){
        this.table_status.cancel(this);
    }

    getStatus(){
        return this.table_status.status();
    }
    
    getDetails(){
        return "Reservation for "+this.name+" on "+this.date+" at "+this.time+" for "+this.partySize+" people \nspecial requests: "+this.special;
    }


}

    