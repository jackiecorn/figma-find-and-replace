import App from './App.vue';

figmaPlus.addCommand({
	label: 'Find and Replace',
	action: () => {
		figmaPlus.showUI({
			title: 'Find and Replace',
			tabs: [
				{
					title: 'Text',
					vueComponent: figmaPlus.Vue.component('text', {
						components: { App },
						template: `<App :mode='mode'></App>`,
						data: function() {
							return {
								mode: 'text'
							};
						}
					})
				},
				{
					title: 'Layer name',
					vueComponent: figmaPlus.Vue.component('layer-name', {
						components: { App },
						template: `<App :mode='mode'></App>`,
						data: function() {
							return {
								mode: 'layerName'
							};
						}
					})
				}
			],
			width: 360,
			positionX: 1,
			positionY: 0.08
		});
	},
	shortcut: {
		mac: { command: true, key: 'F' },
		windows: { control: true, key: 'F' }
	},
	showInCanvasMenu: true
});
