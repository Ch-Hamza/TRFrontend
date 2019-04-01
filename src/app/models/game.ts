import { Team } from './team';

export class Game {
    id: number;
    competition: string;
    state: string;
    teams: Array<Team>;
}