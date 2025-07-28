
import { Template } from "../template";

export class Component extends Template {
    name = 'component';

  createContent(): string {
    return `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ${this.className} } from '${this.importPath}';

describe('${this.className}', () => {
  let component: ${this.className};
  let fixture: ComponentFixture<${this.className}>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ${this.className} ],
      providers: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(${this.className});
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
`;
  }
}
