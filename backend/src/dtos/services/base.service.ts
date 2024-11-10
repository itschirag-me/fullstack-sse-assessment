import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  ObjectId,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

/**
 * BaseService is an abstract class providing core CRUD operations for managing entities with a TypeORM repository.
 * It includes methods to retrieve all entities, find a single entity by specific options, create a new entity, update
 * an existing entity by ID, and delete an entity by ID. This class is intended to be extended by specific service
 * classes to manage various entity types in a standardized way.
 *
 * @template E The entity type managed by this service.
 */
export abstract class BaseService<E> {
  /**
   * Initializes the BaseService with a repository to perform database operations.
   *
   * @param repository - A TypeORM repository used to perform CRUD operations on the entity.
   */
  constructor(private readonly repository: Repository<E>) { }

  /**
   * Retrieves all entities of type E from the database.
   *
   * @returns A promise that resolves with an array of entities of type E.
   */
  findAll(): Promise<E[]> {
    return this.repository.find();
  }

  /**
   * Find entities based on the provided options.
   * 
   * @param options FindManyOptions
   * @returns {Promise<E[]>}
   */
  find(options: FindManyOptions<E>): Promise<E[]> {
    return this.repository.find(options);
  }

  /**
   * Finds a single entity based on the provided options.
   *
   * @param options - Options to filter the query, such as conditions, relations, and other query constraints.
   * @returns A promise that resolves with the found entity or undefined if no entity matches the criteria.
   */
  findOne(options: FindOneOptions<E>): Promise<E> {
    return this.repository.findOne(options);
  }

  /**
   * Creates a new entity in the database.
   *
   * @param entity - The entity object to be saved in the database.
   * @returns A promise that resolves with the created entity after it has been saved in the database.
   */
  create(payload: DeepPartial<E>): Promise<E> {
    const newEntity = this.repository.create(payload);
    return this.repository.save(newEntity);
  }

  /**
   * Updates an existing entity in the database.
   *
   * @param id - The ID of the entity to be updated.
   * @param entity - A partial entity object containing the fields to be updated.
   * @returns A promise that resolves with the result of the update operation.
   */
  update(
    id: ObjectId,
    entity: QueryDeepPartialEntity<E>,
  ): Promise<UpdateResult> {
    return this.repository.update(id, entity);
  }

  /**
   * Deletes an entity from the database based on its ID.
   *
   * @param id - The ID of the entity to be deleted.
   * @returns A promise that resolves with the result of the deletion operation.
   */
  delete(id: ObjectId): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
