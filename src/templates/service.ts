
import { Template } from "../template";

export class Service extends Template {
    name = 'service';
    protected isFlat: false = false;

  createContent(): string {
    return `import { TestBed } from '@angular/core/testing';

import { ${this.className} } from '${this.importPath}';

describe('${this.className}', () => {
  let service: ${this.className};

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(${this.className});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
`;
  }
}
