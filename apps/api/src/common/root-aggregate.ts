import { AggregateRoot } from '@nestjs/cqrs'

/**
 * Базовый корень домена
 */
export class RootAggregate extends AggregateRoot {
  protected createdAt: Date | null = null
}
