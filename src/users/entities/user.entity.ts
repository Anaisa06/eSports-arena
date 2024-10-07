import { AuditableEntity } from "src/common/entities/auditable.entity";
import { Role } from "src/common/enums/roles.enum";
import { TournamentPlayers } from "src/tournaments/entities/tournament-players.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: Role })
    role: Role;

    @Column({ nullable: true, name: 'total_points' })
    totalPoints: number;

    @OneToMany(() => TournamentPlayers, (tournamentPlayers) => tournamentPlayers.user)
    tournaments: TournamentPlayers[]
}
