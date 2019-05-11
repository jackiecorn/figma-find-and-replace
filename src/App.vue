<template lang="pug">
.find-and-replace-tab(:class='{ darkMode: darkMode }')
	.section
		h3 Find
		#findControl
			input(id='findInput' ref='findInput' v-model='findText' @keydown='findInputKeyboard')
			#resultCount {{ resultText }}
			#prevButton.figma-icon.chevron-up(ref='prevButton' :class='{ disabled: disabled }' @click='prev')
			#nextButton.figma-icon.chevron-down(ref='nextButton' :class='{ disabled: disabled }' @click='next')
			.figma-icon-button.more(ref='findSettingsButton' @click='showFindSettings = !showFindSettings' :class='{active: showFindSettings}')
		#findSettings(v-show='showFindSettings')
			#wherePicker
				.figma-icon.align-left(ref='startButton' :class='{active: matchWhere === "start"}' @click='matchWhere = "start"')
				.figma-icon.align-center(ref='anywhereButton' :class='{active: matchWhere === "anywhere"}' @click='matchWhere = "anywhere"')
				.figma-icon.align-right(ref='endButton' :class='{active: matchWhere === "end"}' @click='matchWhere = "end"')
				.figma-icon.align-justified(ref='exactButton' :class='{active: matchWhere === "exact"}' @click='matchWhere = "exact"')
			#caseButton.figma-icon.capitalize(ref='caseButton' :class='{ active: caseSensitive }' @click='caseSensitive = !caseSensitive')
			#wholeButton(ref='wholeButton' :class='{ active: matchWhole }' @click='matchWhole = !matchWhole') [A]
	.section
		h3 Replace with
		#replaceControl
			input(v-model='replaceText' id='replaceInput' @keydown='replaceInputKeyboard')
			.figma-icon-button.more(ref='replaceSettingsButton' @click='showReplaceSettings = !showReplaceSettings' :class='{active: showReplaceSettings}')
		#previewText {{previewText}}
		#replaceSettings(v-show='showReplaceSettings')
			.checkboxGroup
				input(type="checkbox" id='keepCaseCheckbox' v-model='keepCase')
				label(for='keepCaseCheckbox') Keep original case
			.checkboxGroup(v-show='mode === "text"')
				input(type="checkbox" id='replaceLayerNameCheckbox' v-model='replaceLayerName')
				label(for='replaceLayerNameCheckbox') Update layer name
			.checkboxGroup(v-show='mode !== "text"')
				input(type="checkbox" id='replaceWholeLayerNameCheckbox' v-model='replaceWholeLayerName')
				label(for='replaceWholeLayerNameCheckbox') Replace whole layer name
	#footer
		button#replaceButton(@click='replace' :disabled='replaceDisabled') Replace
		button#replaceAllButton.primary(@click='replaceAll' :disabled='replaceDisabled' @keydown='replaceAllButtonKeyboard') Replace all
</template>

<script>
export default {
  watch: {
    findText(findString) {
      findString = findString.replace(/'/g, "’");
      this.currentText = "";
      findString !== ""
        ? this.find(findString)
        : App.sendMessage("clearSelection");
    },
    currentNode(node) {
      if (node && node.id !== undefined) {
        this.currentText = this.mode === "text" ? node.characters : node.name;
        figma.currentPage.selection = [node];
        figma.viewport.center = {
          x: node.absoluteTransform[0][2],
          y: node.absoluteTransform[1][2]
        };
      }
    },
    caseSensitive() {
      this.find(this.findText);
    },
    matchWhole() {
      this.find(this.findText);
    },
    matchWhere() {
      this.find(this.findText);
    }
  },
  props: ["mode"],
  data: () => ({
    treeObj: [],
    foundNodes: [],
    findText: "",
    replaceText: "",
    currentText: "",
    currentNode: {},
    caseSensitive: false,
    matchWhole: false,
    matchWhere: "anywhere",
    keepCase: true,
    replaceLayerName: true,
    replaceWholeLayerName: false,
    showFindSettings: false,
    showReplaceSettings: false,
    darkMode: false
  }),
  computed: {
    resultText() {
      if (this.findText === "") return "";
      if (this.foundNodes.length === 0) return "0/0";
      else
        return (
          this.foundNodes.indexOf(this.currentNode) +
          1 +
          "/" +
          this.foundNodes.length
        );
    },
    disabled() {
      return this.foundNodes.length < 2 || this.findText === "";
    },
    replaceDisabled() {
      return this.foundNodes.length < 1 || this.findText === "";
    },
    newText() {
      if (this.currentText === undefined) return "";
      else {
        if (!this.replaceWholeLayerName) {
          var newStringValue = this.currentText.replace(
            new RegExp(this.findText, "gi"),
            eachMatch => {
              return intelligentReplace(
                eachMatch,
                this.replaceText,
                this.keepCase
              );
            }
          );
          newStringValue = newStringValue.replace(/\n/g, " ");
          return newStringValue;
        } else
          return intelligentReplace(
            this.currentText,
            this.replaceText,
            this.keepCase
          );
      }
    },
    foundText() {
      if (this.findText === "" || this.currentText === undefined) return "";
      else return this.currentText;
    },
    previewText() {
      if (
        this.replaceWholeLayerName &&
        this.replaceText === "" &&
        this.mode === "layerName"
      )
        return "Reset to default layer name";
      if (
        this.findText === "" ||
        this.replaceText === "" ||
        this.currentText === undefined ||
        this.replaceDisabled
      )
        return "";
      else return "Preview: " + this.newText;
    }
  },
  beforeMount() {
    if (document.getElementById("figma-dark-mode")) {
      this.darkMode = true;
    }
  },
  mounted() {
    this.$refs.findInput.focus();
    figmaPlus.addTooltip({
      element: this.$refs.startButton,
      text: "Beginning of text"
    });
    figmaPlus.addTooltip({
      element: this.$refs.anywhereButton,
      text: "Anywhere in text"
    });
    figmaPlus.addTooltip({
      element: this.$refs.endButton,
      text: "End of text"
    });
    figmaPlus.addTooltip({
      element: this.$refs.exactButton,
      text: "Exact match"
    });
    figmaPlus.addTooltip({
      element: this.$refs.caseButton,
      text: "Match case"
    });
    figmaPlus.addTooltip({
      element: this.$refs.wholeButton,
      text: "Whole words only"
    });
  },
  methods: {
    hide() {
      figmaPlus.hideUI("Find and Replace");
    },
    find(findText) {
      findText = (findText + "").trim();
      const global = this.caseSensitive ? "g" : "gi";
      this.foundNodes = figma.currentPage.findAll(node => {
        if (this.mode === "text" && node.type !== "TEXT") return false;
        else {
          const textToFind = this.mode === "text" ? node.characters : node.name;
          switch (this.matchWhere) {
            case "anywhere":
              if (this.matchWhole) {
                return textToFind.split(" ").some(word => {
                  if (this.caseSensitive) return word === findText;
                  else return word.toLowerCase() === findText.toLowerCase();
                });
              } else {
                if (this.caseSensitive) return textToFind.includes(findText);
                else
                  return textToFind
                    .toLowerCase()
                    .includes(findText.toLowerCase());
              }
              break;
            case "exact":
              if (this.caseSensitive) return textToFind === findText;
              else return textToFind.toLowerCase() === findText.toLowerCase();
              break;
            case "start":
              let regexStart = this.matchWhole
                ? new RegExp("^\\b" + findText + "\\b", global)
                : new RegExp("^" + findText, global);
              return regexStart.test(textToFind);
              break;
            case "end":
              var regexEnd = this.matchWhole
                ? new RegExp("\\b" + findText + "\\b$", global)
                : new RegExp(findText + "$", global);
              return regexEnd.test(textToFind);
          }
        }
      });

      if (this.foundNodes.length > 0) {
        this.currentNode = this.foundNodes[0];
        this.currentText = this.foundNodes[0].characters;
      } else {
        App.sendMessage("clearSelection");
      }
    },

    next() {
      var index = this.foundNodes.indexOf(this.currentNode);
      var nextIndex;
      if (index === this.foundNodes.length - 1) nextIndex = 0;
      else nextIndex = index + 1;
      var nextNode = this.foundNodes[nextIndex];
      this.currentNode = nextNode;
    },
    prev() {
      var index = this.foundNodes.indexOf(this.currentNode);
      var prevIndex;
      if (index === 0) prevIndex = this.foundNodes.length - 1;
      else prevIndex = index - 1;
      var prevNode = this.foundNodes[prevIndex];
      this.currentNode = prevNode;
    },
    findInputKeyboard(e) {
      if (e.which === 13 && e.shiftKey) {
        if (this.disabled) this.find(this.findText);
        else this.prev();
      }
      if (e.which === 13 && !e.shiftKey) {
        if (this.disabled) this.find(this.findText);
        else this.next();
      }
      if (e.metaKey && e.keyCode === 70) {
        e.preventDefault();
        document.querySelector("#findInput").focus();
      }
      if (e.which === 9 && e.shiftKey) {
        e.preventDefault();
        document.querySelector("#replaceAllButton").focus();
      }
    },
    replaceInputKeyboard(e) {
      if (e.which === 13 && !e.metaKey) this.replace();
      if (e.which === 13 && e.metaKey) this.replaceAll();
      if (e.metaKey && e.keyCode === 70) {
        e.preventDefault();
        document.querySelector("#findInput").focus();
      }
      if (e.which === 9 && !e.shiftKey) {
        e.preventDefault();
        document.querySelector("#replaceButton").focus();
      }
    },
    replaceAllButtonKeyboard(e) {
      if (e.which === 9 && !e.shiftKey) {
        e.preventDefault();
        document.querySelector("#findInput").focus();
      }
    },
    replace() {
      if (this.mode === "text") {
        this.currentNode.characters = this.newText;
        if (this.replaceLayerName) this.currentNode.name = this.newText;
      }
      if (this.mode === "layerName") {
        if (this.replaceWholeLayerName && this.newText === "")
          this.newText = "";
        this.currentNode.name = this.newText;
      }
      setTimeout(() => {
        var index = this.foundNodes.indexOf(this.currentNode);
        this.foundNodes.splice(this.foundNodes.indexOf(this.currentNode), 1);
        if (this.foundNodes.length > 0) {
          if (index >= this.foundNodes.length) index = 0;
          this.currentNode = this.foundNodes[index];
        } else {
          this.currentNode = undefined;
          this.currentText = "";
          figma.currentPage.selection = [];
        }
        document.querySelector("#replaceInput").focus();
      }, 500);
    },
    replaceAll() {
      this.foundNodes.forEach(node => {
        var text = this.mode === "text" ? node.characters : node.name;
        var newStringValue;
        if (!this.replaceWholeLayerName) {
          newStringValue = text.replace(
            new RegExp(this.findText, "gi"),
            eachMatch => {
              return intelligentReplace(
                eachMatch,
                this.replaceText,
                this.keepCase
              );
            }
          );
          newStringValue = newStringValue.replace(/\n/g, " ");
        } else
          newStringValue = intelligentReplace(
            text,
            this.replaceText,
            this.keepCase
          );
        if (this.mode === "text") {
          node.characters = newStringValue;
          if (this.replaceLayerName) node.name = newStringValue;
        }
        if (this.mode === "layerName") {
          if (this.replaceWholeLayerName && this.replaceText === "")
            newStringValue = "";
          node.name = newStringValue;
        }
      });
      figma.currentPage.selection = [];
      this.foundNodes = [];
      this.currentNode = undefined;
      this.currentText = "";
      this.find(this.findText);
    }
  }
};

const intelligentReplace = (replaceThis, replaceWith, keepCase) => {
  var replacement = replaceWith;
  if (keepCase) {
    if (replaceThis.charAt(0) === replaceThis.charAt(0).toLowerCase()) {
      replacement = replaceWith.charAt(0).toLowerCase() + replaceWith.slice(1);
    }
    if (replaceThis.charAt(0) === replaceThis.charAt(0).toUpperCase()) {
      replacement = replaceWith.charAt(0).toUpperCase() + replaceWith.slice(1);
    }
    if (replaceThis === replaceThis.toLowerCase()) {
      replacement = replaceWith.toLowerCase();
    }
    if (replaceThis === replaceThis.toUpperCase()) {
      replacement = replaceWith.toUpperCase();
    }
  }
  return replacement;
};
</script>

<style lang="scss" scoped>
.section {
  margin-bottom: 12px;
}
button {
  margin-left: 12px;
}
.figma-icon {
  width: 24px;
  height: 24px;
}

#findControl,
#findSettings,
#replaceControl {
  display: flex;
  align-items: center;
}

#findSettings {
  margin: 8px;
  .active {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 2px;
  }
}

.figma-icon-button.more {
  width: 32px;
  height: 32px;
  &.active {
    background-color: #18a0fb;
    color: #fff;
  }
  &:focus,
  &:active {
    border-color: #18a0fb;
    box-shadow: inset 0 0 0 2px #18a0fb;
    border-radius: 2px;
  }
}

#findInput {
  padding-right: 36px;
}

#findInput,
#replaceInput {
  flex-grow: 1;
  margin-right: 8px;
}

#footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 24px;
}

#resultCount {
  color: #b3b3b3;
  position: absolute;
  right: 110px;
  font-weight: 300;
}

#previewText,
#foundText {
  color: #aaa;
  margin: 6px 8px 0px 8px;
}

#wherePicker,
#caseButton,
#wholeButton {
  display: flex;
  border-radius: 3px;
  margin-right: 8px;
  border: 1px solid transparent;
  overflow: hidden;
  &:hover {
    border-color: rgba(0, 0, 0, 0.1);
    .active {
      border-radius: 0px;
    }
  }
  .figma-icon {
    color: #333;
    width: 24px;
  }
}

.darkMode {
  color: rgb(193, 197, 201);

  #wherePicker,
  #caseButton,
  #wholeButton {
    &:hover {
      border-color: rgba(255, 255, 255, 0.1);
    }
    .figma-icon {
      color: rgb(193, 197, 201);
    }
  }

  #findSettings .active {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

#prevButton {
  border-radius: 2px;
  height: 24px;
  width: 24px;
  &:after {
    font-size: 13px;
    transform: translateY(-1px) rotate(180deg);
  }
}

#nextButton {
  border-radius: 2px;
  height: 24px;
  width: 24px;
  margin-right: 4px;
  &:after {
    font-size: 13px;
  }
}

#nextButton:hover,
#prevButton:hover {
  background: #efefef;
}

#nextButton.disabled:hover,
#prevButton.disabled:hover {
  background: transparent;
}

#caseButton {
  width: 24px;
  &:after {
    font-size: 16px;
    height: 6px;
  }
}

#wholeButton {
  width: 24px;
  height: 24px;
  font-size: 11px;
  text-align: center;
  line-height: 24px;
  display: block;
}

#replaceSettings {
  margin-top: 6px;
}

.disabled {
  color: #d4d4d4 !important;
}
</style>
