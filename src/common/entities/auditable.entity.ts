import { User } from "src/users/entities/user.entity";
import { CreateDateColumn, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";

export abstract class AuditableEntity {
    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => `CURRENT_TIMESTAMP AT TIME ZONE 'GMT-5'`,
        select: false,
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamptz',
        default: () => `CURRENT_TIMESTAMP AT TIME ZONE 'GMT-5'`,
        onUpdate: `CURRENT_TIMESTAMP AT TIME ZONE 'GMT-5'`,
        select: false,
    })
    updatedAt: Date;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'created_by' })
    createdBy?: User;
  
    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'updated_by' })
    updatedBy?: User;

}