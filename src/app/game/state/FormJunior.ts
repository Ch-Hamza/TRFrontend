export class FormJunior {

    passage : boolean;
    ballon : boolean;
    passagep : boolean;

    ballondeg1 : string;
    bordure1 : number;

    ballondeg2 : string;
    recette : boolean;
    casea : boolean;

    bordure2 : number;
    obstacle : number;
    ballondeg3 : string;

    ralenti : boolean;

    calculate(team, adversaire) {
        if(this.passage) {team.score.score = Number(team.score.score) + 40;}
        if(this.ballon) {team.score.score = Number(team.score.score) + 10;}
        if(this.passagep) {team.score.score = Number(team.score.score) + 30;}

        if(this.ballondeg1) {team.score.score = Number(team.score.score) - 5*Number(this.ballondeg1);}
        if(this.bordure1) {team.score.score = Number(team.score.score) - 10*Number(this.bordure1);}

        if(this.ballondeg2) {team.score.score = Number(team.score.score) + 15*Number(this.ballondeg2);}
        if(this.recette) {team.score.score = Number(team.score.score) + 30;}
        

        if(this.bordure2) {team.score.score = Number(team.score.score) - 5*Number(this.bordure2);}
        if(this.obstacle) {team.score.score = Number(team.score.score) - 5*Number(this.obstacle);}
        //score pour l'adversaire
        if(this.ballondeg3) {adversaire.score.score = Number(adversaire.score.score) + 15*Number(this.ballondeg3);}

        if(this.ralenti) {team.score.score = Number(team.score.score) - 20;}
    }
 
    constructor(passage: boolean, ballon : boolean, passagep : boolean, 
        ballondeg1 : string, bordure1 : number, 
        ballondeg2 : string, recette : boolean, casea : boolean, 
        bordure2 : number, obstacle : number, ballondeg3 : string,
        ralenti : boolean) 
    {
        this.passage = passage ||false;
        this.ballon = ballon || false;
        this.passagep = passagep || false;

        this.ballondeg1 = ballondeg1 || "";
        this.bordure1 = bordure1 || 0;

        this.ballondeg2 = ballondeg2 || "";
        this.recette = recette || false;
        this.casea = casea || false;

        this.bordure2 = bordure2 || 0;
        this.obstacle = obstacle || 0;
        this.ballondeg3 = ballondeg3 || "";

        this.ralenti = ralenti || false;
    }
}