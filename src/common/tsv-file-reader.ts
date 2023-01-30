import EventEmitter from 'events';
import { createReadStream } from 'fs';
import { FileReaderInterface } from './file-reader.interface.js';

export default class TSVFileReader extends EventEmitter implements FileReaderInterface {
  constructor(public fileName: string) {
    super();
  }

  public async read(): Promise<void> {
    const stream = createReadStream(this.fileName, {
      highWaterMark: 2 ** 14,
      encoding: 'utf-8',
    });

    let lineRead = '';
    let endLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of stream) {
      lineRead += chunk.toString();

      while ((endLinePosition = lineRead.indexOf('\n')) >= 0) {
        const completeRow = lineRead.slice(0, endLinePosition + 1);
        endLinePosition++;
        importedRowCount++;
        lineRead = lineRead.slice(endLinePosition);

        await new Promise((resolve) => {
          this.emit('completeLine', completeRow, resolve);
        });
      }
    }

    this.emit('end', importedRowCount);
  }
}
