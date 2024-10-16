class ReservationState{
    proceed(reservation){}
    cancel(reservation) {}
    status(){}
}

class PendingState extends ReservationState{
    proceed(reservation){
        reservation.setState(new ConfirmedState());
    }
    cancel(reservation){
        reservation.setState(new CancelledState());
    }
    status(){
        return "Pending";
    }
}

class ConfirmedState extends ReservationState{
    proceed(reservation){
        reservation.setState(new SeatedState());
    }
    cancel(reservation){
        reservation.setState(new CancelledState());
    }
    status(){
        return "Confirmed";
    }
}

class SeatedState extends ReservationState{
    proceed(reservation){
        reservation.setState(new DoneState());
    }
    cancel(reservation){
        reservation.setState(new CancelledState());
    }
    status(){
        return "Seated";
    }
}

class DoneState extends ReservationState{
    proceed(reservation){
        reservation.setState(new DoneState());
    }
    cancel(reservation){
        reservation.setState(new CancelledState());
    }
    status(){
        return "Done";
    }
}

class CancelledState extends ReservationState{
    proceed(reservation){
        reservation.setState(new CancelledState());
    }
    status(){
        return "Cancelled";
    }
}

