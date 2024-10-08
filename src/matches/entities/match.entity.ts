import { AuditableEntity } from "src/common/entities/auditable.entity";
import { MatchStates } from "src/common/enums/match-states.enum";
import { Tournament } from "src/tournaments/entities/tournament.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('matches')
export class Match extends AuditableEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'enum', enum: MatchStates, default: MatchStates.PENDING})
    state: MatchStates;

    @Column({name: 'player_one_points', default: 0})
    playerOnePoints: number;

    @Column({ name: 'player_two_points', default: 0})
    playerTwoPoints: number;

    @ManyToOne(() => User)
    @JoinColumn({name: 'player_one_id'})
    playerOne: User;

    @ManyToOne(() => User)
    @JoinColumn({name: 'player_two_id'})
    playerTwo: User;

    @ManyToOne(() => Tournament)
    @JoinColumn({name: 'tournament_id'})
    tournament: Tournament;
}
