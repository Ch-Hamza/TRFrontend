export class FormSumo {

    winner : String;
    loser : String;
 
    constructor(winner: String, loser : String) 
    {
        this.winner = winner || "";
        this.loser = loser || "";
    }
}