import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * BaseEntity is an abstract class that provides common fields and functionality for all entities in the application.
 * It includes auto-managed columns for entity creation, updating, and soft deletion timestamps, along with a unique
 * primary identifier. This class can be extended by other entity classes to inherit these properties and reduce
 * repetitive code.
 */
export abstract class BaseEntity {
  /**
   * The primary key identifier for the entity, automatically generated as an incrementing integer.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The timestamp when the entity was created, automatically set by TypeORM upon insertion.
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * The timestamp of the last update to the entity, automatically updated by TypeORM whenever the entity is modified.
   */
  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * The timestamp marking when the entity was soft deleted. Null if the entity has not been soft deleted.
   */
  @DeleteDateColumn()
  deletedAt: Date;
}
