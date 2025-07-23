import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

function toClassName(fileName: string): string {
  return (
    fileName
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join("") + "Component"
  );
}

function createSpecFile(componentPath: string) {
  const dir = path.dirname(componentPath);
  const fileBase = path.basename(componentPath, ".component.ts");
  const className = toClassName(fileBase);
  const specPath = path.join(dir, `${fileBase}.component.spec.ts`);

  if (fs.existsSync(specPath)) {
    vscode.window.showInformationMessage("Spec file already exists.");
    return;
  }

  const content = `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ${className} } from './${fileBase}.component';

describe('${className}', () => {
  let component: ${className};
  let fixture: ComponentFixture<${className}>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ${className} ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(${className});
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
`;

  fs.writeFileSync(specPath, content);
  vscode.window.showInformationMessage(`Spec file created at ${specPath}`);
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "ng-generate-spec.create",
    (uri) => {
      const filePath = uri.fsPath;
      if (filePath.endsWith(".component.ts")) {
        createSpecFile(filePath);
      } else {
        vscode.window.showWarningMessage("Please select a .component.ts file.");
      }
    }
  );

  context.subscriptions.push(disposable);
}
