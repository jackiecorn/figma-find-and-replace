import App from './App.vue';

const shortcut = {
	mac: { command: true, key: 'F' },
	windows: { control: true, key: 'F' }
};

const showUI = () => {
	figmaPlus.showUI(
		'Find and Replace',
		(tabContent1, tabContent2) => {
			new figmaPlus.Vue({
				el: tabContent1,
				components: { App },
				template: `<App :mode='mode'></App>`,
				data: function() {
					return {
						mode: 'text'
					};
				}
			});
			new figmaPlus.Vue({
				el: tabContent2,
				components: { App },
				template: `<App :mode='mode'></App>`,
				data: function() {
					return {
						mode: 'layerName'
					};
				}
			});
		},
		360,
		null,
		1,
		0.08,
		false,
		null,
		['Text', 'Layer Name']
	);
};

figmaPlus.createPluginsMenuItem('Find and Replace', showUI, null, shortcut);
figmaPlus.createContextMenuItem.Canvas('Find and Replace', showUI, null, shortcut);
figmaPlus.createKeyboardShortcut(shortcut, showUI);
