
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "Angular Template Helper" is now active!');
	let disposable = vscode.commands.registerCommand('angularTemplateHelper.openAsSplit', () => {
	
		const wsFolders = vscode.workspace.workspaceFolders;
		if(vscode.workspace.workspaceFolders !== undefined) {
			let openWindow = vscode.window.activeTextEditor?.document.fileName;
			let allOpenFiles = vscode.workspace.textDocuments;

			if(openWindow != undefined) {
				if( openWindow.match('.html') ) {
					openFileIfNotOpen(openWindow, allOpenFiles, '.html', '.ts');
				} else if( openWindow.match('.ts') ) {
					openFileIfNotOpen(openWindow, allOpenFiles, '.ts', '.html');
				}
			}
		} 

	});
	context.subscriptions.push(disposable);

	function openFileIfNotOpen(openWindow: string, allOpenFiles: readonly vscode.TextDocument[], fileEndingOld: string, fileEndingNew: string ) {
		const newfileName = openWindow.replace(fileEndingOld, fileEndingNew);
		let files = allOpenFiles.find(v => v.fileName === newfileName);
		if (files == undefined) {
			vscode.workspace.openTextDocument(newfileName).then(doc => {
				vscode.window.showTextDocument(doc, {
					viewColumn: vscode.ViewColumn.Four,
					preserveFocus: true
				});
			});
		}
	}
}

// this method is called when your extension is deactivated
export function deactivate() {}
