// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

class Terminal {
	static terminalName: string = 'touchbar-pro';
	static _terminal: vscode.Terminal | null;

	static getTerminal() {
		if (!Terminal._terminal) {
			Terminal._terminal = vscode.window.createTerminal(Terminal.terminalName);

			vscode.window.onDidCloseTerminal(event => {
				if (Terminal.getTerminal() && event.name === Terminal.terminalName) {
					Terminal._terminal = null;
				}
			});
		}

		return Terminal._terminal;
	}

	static run(command: string) {
		const terminal = Terminal.getTerminal();
		terminal.show();
		terminal.sendText(command, true);
	}

	static dispose() {
		if (Terminal.getTerminal()) {
			Terminal.getTerminal().dispose();
			Terminal._terminal = null;
		}
	}
}

// this method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
	console.log('"touchbar-pro" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let runAndroid = vscode.commands.registerCommand('touchbar-pro.runAndroid', () => {
		Terminal.run('npx react-native run-android');
	});

	let runIos = vscode.commands.registerCommand('touchbar-pro.runIos', () => {
		Terminal.run('npx react-native run-ios');
	});

	let cleanGradlew = vscode.commands.registerCommand('touchbar-pro.cleanGradlew', () => {
		Terminal.run('cd android &&./gradlew clean &&cd ..');
	});

	context.subscriptions.push(runAndroid, runIos, cleanGradlew);
}

// this method is called when your extension is deactivated
export function deactivate() { }
