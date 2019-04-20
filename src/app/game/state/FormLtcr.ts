export class FormLtcr {

    panSol : string;
    ballonDeg : boolean;

    elemDep : string;
    eoliennesAss : string;

    graineB : string;
    graineM : string;
    tubeG : boolean;
    graineNP : string;

    graineE : string;

    arbreDep : string;

    calculate(team) {
        if(this.panSol) {team.score.score = Number(team.score.score) + +15*Number(this.panSol);}
        if(this.ballonDeg) {team.score.score = Number(team.score.score) + 20;}

        if(this.elemDep) {team.score.score = Number(team.score.score) + 5*Number(this.elemDep);}
        if(this.eoliennesAss) {team.score.score = Number(team.score.score) + 30*Number(this.eoliennesAss);}

        if(this.graineB) {team.score.score = Number(team.score.score) + 5*Number(this.graineB);}
        if(this.graineM) {team.score.score = Number(team.score.score) - 5*Number(this.graineM);}

        if(this.tubeG) {team.score.score = Number(team.score.score) + 10;}
        if(this.graineNP) {team.score.score = Number(team.score.score) + 5*Number(this.graineNP);}
        

        if(this.graineE) {team.score.score = Number(team.score.score) + Number(this.graineE);}
        if(this.arbreDep) {team.score.score = Number(team.score.score) + 10*Number(this.arbreDep);}
    }
 
    constructor(panSol: string, ballonDeg : boolean, elemDep : string, 
        eoliennesAss : string, graineB : string, 
        graineM : string, tubeG : boolean, graineNP : string, 
        graineE : string, arbreDep : string) 
    {
        this.panSol = panSol || "";
        this.ballonDeg = ballonDeg || false;
        this.elemDep = elemDep || "";

        this.eoliennesAss = eoliennesAss || "";
        this.graineB = graineB || "";

        this.graineM = graineM || "";
        this.tubeG = tubeG || false;
        this.graineNP = graineNP || "";

        this.graineE = graineE || "";
        this.arbreDep = arbreDep || "";
    }
}