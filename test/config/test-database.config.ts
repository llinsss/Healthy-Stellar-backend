import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

/**
 * Test Database Configuration
 * 
 * Uses in-memory SQLite for unit tests (fast, isolated)
 * Uses separate PostgreSQL database for E2E tests (realistic)
 */

/**
 * Get test database configuration based on test type
 */
export function getTestDatabaseConfig(testType: 'unit' | 'e2e' = 'unit'): TypeOrmModuleOptions {
  if (testType === 'unit') {
    // In-memory SQLite for fast unit tests
    return {
      type: 'sqlite',
      database: ':memory:',
      entities: [__dirname + '/../../src/**/*.entity{.ts,.js}'],
      synchronize: true, // Auto-create schema for tests
      dropSchema: true, // Clean slate for each test
      logging: false,
    };
  } else {
    // PostgreSQL test database for E2E tests
    return {
      type: 'postgres',
      host: process.env.TEST_DB_HOST || 'localhost',
      port: parseInt(process.env.TEST_DB_PORT || '5432'),
      username: process.env.TEST_DB_USERNAME || 'test_user',
      password: process.env.TEST_DB_PASSWORD || 'test_password',
      database: process.env.TEST_DB_NAME || 'healthy_stellar_test',
      entities: [__dirname + '/../../src/**/*.entity{.ts,.js}'],
      synchronize: true,
      dropSchema: true,
      logging: false,
      ssl: false, // No SSL for test database
    };
  }
}

/**
 * Create a test data source
 */
export async function createTestDataSource(testType: 'unit' | 'e2e' = 'unit'): Promise<DataSource> {
  const config = getTestDatabaseConfig(testType) as DataSourceOptions;
  const dataSource = new DataSource(config);
  await dataSource.initialize();
  return dataSource;
}

/**
 * Clean up test database
 */
export async function cleanupTestDatabase(dataSource: DataSource): Promise<void> {
  if (dataSource.isInitialized) {
    await dataSource.dropDatabase();
    await dataSource.destroy();
  }
}

/**
 * Seed test database with synthetic data
 */
export async function seedTestDatabase(
  dataSource: DataSource,
  seedData: { entity: any; data: any[] }[]
): Promise<void> {
  for (const { entity, data } of seedData) {
    const repository = dataSource.getRepository(entity);
    await repository.save(data);
  }
}

/**
 * Clear all data from test database
 */
export async function clearTestDatabase(dataSource: DataSource): Promise<void> {
  const entities = dataSource.entityMetadatas;
  
  for (const entity of entities) {
    const repository = dataSource.getRepository(entity.name);
    await repository.clear();
  }
}

/**
 * Test database helper class
 */
export class TestDatabaseHelper {
  private dataSource: DataSource | null = null;
  
  async initialize(testType: 'unit' | 'e2e' = 'unit'): Promise<DataSource> {
    this.dataSource = await createTestDataSource(testType);
    return this.dataSource;
  }
  
  async cleanup(): Promise<void> {
    if (this.dataSource) {
      await cleanupTestDatabase(this.dataSource);
      this.dataSource = null;
    }
  }
  
  async clear(): Promise<void> {
    if (this.dataSource) {
      await clearTestDatabase(this.dataSource);
    }
  }
  
  async seed(seedData: { entity: any; data: any[] }[]): Promise<void> {
    if (this.dataSource) {
      await seedTestDatabase(this.dataSource, seedData);
    }
  }
  
  getDataSource(): DataSource {
    if (!this.dataSource) {
      throw new Error('Test database not initialized');
    }
    return this.dataSource;
  }
}
