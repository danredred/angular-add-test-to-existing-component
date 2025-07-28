import * as vscode from "vscode";
import { Template } from "./template";
import { Component } from "./templates/component";
import { Service } from "./templates/service";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "ng-generate-spec.create",
    (uri) => {
      const filePath = uri.fsPath;
      const templates: Template[] = [new Component(), new Service()];
      let found = false;
      for (const template of templates) {
        template.init(filePath);

        if (template.createTemplateIfMatches()) {
          found = true;
          break;
        }
      }
      if (!found) {
        vscode.window.showErrorMessage("Does not have a matching template");
      }
    }
  );

  context.subscriptions.push(disposable);
}
