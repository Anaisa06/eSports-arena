import { MatchStates } from "src/common/enums/match-states.enum";
import { Tournament } from "src/tournaments/entities/tournament.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('matches')
export class Match {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'enum', enum: MatchStates})
    state: MatchStates;

    @Column({name: 'points_to_give'})
    pointsToGive: number;

    @ManyToOne(() => User)
    @JoinColumn({name: 'player_one_id'})
    playerOne: User;

    @ManyToOne(() => User)
    @JoinColumn({name: 'player_two_id'})
    playerTwo: User;

    @ManyToOne(() => Tournament)
    @JoinColumn({name: 'tournament_id'})
    torunament: Tournament;

    @ManyToOne(() => User)
    @JoinColumn({name: 'match_winner'})
    matchWinner: User;
}
