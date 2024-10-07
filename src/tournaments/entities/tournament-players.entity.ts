import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tournament } from "./tournament.entity";
import { User } from "src/users/entities/user.entity";

@Entity('tournament_players')
export class TournamentPlayers {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Tournament, (tournament) => tournament.players)
    @JoinColumn({ name: 'tournament_id'})
    tournament: Tournament;

    @ManyToOne(() => User, (user) => user.tournaments)
    @JoinColumn({ name: 'user_id'})
    user: User;

    @Column()
    points: number;
}