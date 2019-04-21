import App from './App.vue';

figmaPlus.addCommand({ label: 'Find and Replace', action: () => {
	figmaPlus.showUI({
		title: 'Find and Replace',
		callback: (tabContent1, tabContent2) => {
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
		width: 360,
		positionX: 1,
		positionY: 0.08,
		tabs: ['Text', 'Layer Name']
	});
}, shortcut: {
	mac: { command: true, key: 'F' },
	windows: { control: true, key: 'F' }
}, showInCanvasMenu: true });
