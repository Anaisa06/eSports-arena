import { AuditableEntity } from "src/common/entities/auditable.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TournamentPlayers } from "./tournament-players.entity";
import { Result } from "src/results/entities/result.entity";
import { MatchStates } from "src/common/enums/match-states.enum";

@Entity('tournaments')
export class Tournament extends AuditableEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    date: Date;

    @Column({type: 'enum', enum:MatchStates, default: MatchStates.PENDING })
    state: MatchStates;

    @OneToMany(() => TournamentPlayers, (tournamentPlayers) => tournamentPlayers.tournament)
    players: TournamentPlayers[]

    @OneToOne(() => Result, (result) => result.tournament)
    result: Result;

}
