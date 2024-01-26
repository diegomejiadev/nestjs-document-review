import { Test, TestingModule } from '@nestjs/testing';
import { ApproverController } from './approver.controller';

describe('ApproverController', () => {
  let controller: ApproverController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApproverController],
    }).compile();

    controller = module.get<ApproverController>(ApproverController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
