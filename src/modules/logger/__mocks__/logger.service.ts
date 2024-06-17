import { MockServiceType } from '../../../../test/types/mock-service.type';
import { LoggerService } from '../logger.service';

export const mockLoggerService: MockServiceType<LoggerService> = {
  log: jest.fn(),
  error: jest.fn(),
};
