import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export abstract class Template {
  protected isFlat = true;
  protected abstract name: string;
  protected importPath!: string;
  protected className!: string;
  protected specPath!: string;
  protected filePath!: string;
  abstract createContent(): string;

  protected toClassName(fileName: string): string {
    const capsName =
      String(this.name).charAt(0).toUpperCase() + String(this.name).slice(1);
    return (
      fileName
        .split("-")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join("") + capsName
    );
  }

  constructor(subjectPath: string = "") {
    this.init(subjectPath);
  }

  createTemplateIfMatches(): boolean {
    if (!this.filePath.length) {
      throw new Error("Did not initlized");
    }
    if (this.filePath.endsWith(`.${this.name}.ts`)) {
      this.createSpecFile();
      return true;
    } else {
      //vscode.window.showWarningMessage(`Please select a .${this.name}.ts file.`);
      return false;
    }
  }

   init(subjectPath: string) {
    this.filePath = subjectPath;
    const dir = path.dirname(subjectPath);
    const fileBase = path.basename(subjectPath, `.${this.name}.ts`);
    this.importPath = `${this.isFlat? '.':'..'}/${fileBase}.${this.name}`;
    this.className = this.toClassName(fileBase);
    if(this.isFlat){
        this.specPath = path.join(dir, `${fileBase}.${this.name}.spec.ts`);
    }
    else {
        this.specPath = path.join(dir, 'tests',`${fileBase}.${this.name}.spec.ts`);
    }
    
  }

  protected createTestsDir(){
    const dir = path.dirname(this.specPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      vscode.window.showInformationMessage(`Created directory: ${dir}`);
    }
  }

  protected createSpecFile() {
    if(!this.isFlat){
        this.createTestsDir();
    }
    if (fs.existsSync(this.specPath)) {
      vscode.window.showInformationMessage("Spec file already exists.");
      return;
    }
    fs.writeFileSync(
      this.specPath,
      this.createContent()
    );
    vscode.window.showInformationMessage(
      `Spec file created at ${this.specPath}`
    );
  }
}
