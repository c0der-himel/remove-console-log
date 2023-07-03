// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "remove-console-log" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'remove-console-log.helloWorld',
    function () {
      // The code you place here will be executed every time your command is executed
      let editor = vscode.window.activeTextEditor;
      let document = editor.document;

      fs.readFile(document.fileName, 'utf-8', (err, data) => {
        if (data.length > 0) {
          const matches = data.match(/console\.log\(\s*[^()]*\);/g);
          if (matches) {
            let count = 0;
            for (const match of matches) {
              count++;
              data = data.replace(match, '');
            }
            fs.writeFile(document.fileName, data, (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log('Success');
              }
            });
            // Display a message box to the user
            vscode.window.showInformationMessage(
              `Successfully removed all (${count}) console logs`
            );
          } else {
            // Display a message box to the user
            vscode.window.showInformationMessage(
              'There is no console log to remove'
            );
          }
        }
      });
    }
  );
  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
