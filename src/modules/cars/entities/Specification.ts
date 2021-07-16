import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("specifications")
export class Specification {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;
}
