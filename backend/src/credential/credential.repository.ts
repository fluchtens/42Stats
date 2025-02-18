import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from 'src/core/database/database.service';
import { Credential } from './types/credential.type';

@Injectable()
export class CredentialRepository {
  private readonly logger = new Logger(CredentialRepository.name);

  constructor(private readonly databaseService: DatabaseService) {}

  public async findById(id: number): Promise<Credential> {
    const query = `
      SELECT *
      FROM external_credentials
      WHERE id = ?
    `;
    const rows = await this.databaseService.query(query, [id]);
    return rows[0];
  }

  public async findByProvider(provider: string): Promise<Credential> {
    const query = `
      SELECT *
      FROM external_credentials
      WHERE provider = ?
    `;
    const rows = await this.databaseService.query(query, [provider]);
    return rows[0];
  }

  public async findClientIdByProvider(provider: string): Promise<string> {
    const query = `
      SELECT client_id
      FROM external_credentials
      WHERE provider = ?
    `;
    const rows = await this.databaseService.query(query, [provider]);
    return rows[0].client_id;
  }

  public async findClientSecretByProvider(provider: string): Promise<string> {
    const query = `
      SELECT client_secret
      FROM external_credentials
      WHERE provider = ?
    `;
    const rows = await this.databaseService.query(query, [provider]);
    return rows[0].client_secret;
  }

  public async save(
    provider: string,
    client_id: string,
    client_secret: string,
  ): Promise<void> {
    const query = `
        INSERT INTO external_credentials (provider, client_id, client_secret, expires_at)
        VALUES (?, ?, ?, ?)
      `;
    const params = [provider, client_id, client_secret, null];
    await this.databaseService.query(query, params);
  }

  updateField(id: number, field: string, value: string): Promise<void> {
    const query = `
      UPDATE external_credentials
      SET ${field} = ?
      WHERE id = ?
    `;
    const params = [value, id];
    return this.databaseService.query(query, params);
  }
}
