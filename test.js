import { ChildProcessor } from './ChildProcessor';

describe('ChildProcessor', () => {
    let childProcessor;

    beforeEach(() => {
        childProcessor = new ChildProcessor();
    });

    test('run method should return success status', async () => {
        const filePath = 'childProcessTestSuccess.js';
        const result = await childProcessor.run(filePath);

        expect(result.status).toBe('success');
    });

    test('run method should return error status when an error occurs', async () => {
        const filePath = 'childProcessTestError.js';
        const result = await childProcessor.run(filePath);

        expect(result.status).toBe('error');
    });
});
