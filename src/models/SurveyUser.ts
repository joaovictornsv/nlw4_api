import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne } from 'typeorm'
import Survey from './Survey'
import User from './User'

@Entity('surveys_users')
class SurveyUser {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  @OneToOne(type => User, { cascade: true })
  user_id: string;

  @Column()
  @OneToOne(type => Survey, { cascade: true })
  survey_id: string;

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;
}

export { SurveyUser }
