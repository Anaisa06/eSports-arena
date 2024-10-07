import { Tournament } from "src/tournaments/entities/tournament.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('results')
export class Result {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(() => Tournament, (tournament) => tournament.result)
    @JoinColumn({ name: 'tournament_id'})
    tournament: Tournament;

    @ManyToOne(() => User)
    @JoinColumn({name: 'winner'})
    winner: User;
}
