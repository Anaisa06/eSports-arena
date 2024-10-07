import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";

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

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamptz',
        select: false,
    })
    deletedAt: Date;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'created_by' })
    createdBy?: User;
  
    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'updated_by' })
    updatedBy?: User;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'deleted_by' })
    deletedBy?: User;
}