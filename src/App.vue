<template lang="pug">
.tab-content
	.section
		h3 Find
		#findControl
			input(id='findInput' ref='findInput' v-model='findText' @keydown='findInputKeyboard')
			#resultCount {{ resultText }}
			#prevButton.figma-icon.chevron-up(ref='prevButton' :class='{ disabled: disabled }' @click='prev')
			#nextButton.figma-icon.chevron-down(ref='nextButton' :class='{ disabled: disabled }' @click='next')
			.figma-icon-button.more(ref='findSettingsButton' @click='showFindSettings = !showFindSettings')
		#findSettings(v-show='showFindSettings')
			#wherePicker
				.figma-icon.align-left(ref='startButton' :class='{active: matchWhere === "start"}' @click='matchWhere = "start"')
				.figma-icon.align-center(ref='anywhereButton' :class='{active: matchWhere === "anywhere"}' @click='matchWhere = "anywhere"')
				.figma-icon.align-right(ref='endButton' :class='{active: matchWhere === "end"}' @click='matchWhere = "end"')
				.figma-icon.align-justified(ref='exactButton' :class='{active: matchWhere === "exact"}' @click='matchWhere = "exact"')
			#caseButton(ref='caseButton' :class='{ active: caseSensitive }' @click='caseSensitive = !caseSensitive')
				<svg class="svg" width="30" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 15c1.105 0 2-.895 2-2 0-1.105-.895-2-2-2-1.104 0-2 .895-2 2 0 1.105.896 2 2 2zm0 1c1.657 0 3-1.343 3-3 0-1.657-1.343-3-3-3-1.656 0-3 1.343-3 3 0 1.657 1.344 3 3 3z" fill-rule="evenodd" fill="#fff"></path><path d="M21 10h1v6h-1v-6z" fill="#fff"></path><path d="M11.25 8h-.344l-.123.322L7.85 16h1.07l2.58-6.754L14.083 16h1.07l-2.936-7.679L12.095 8h-.845zm2.605 6h-4.5v-1h4.5v1z" fill-rule="evenodd" fill="#fff"></path></svg>
			#wholeButton(ref='wholeButton' :class='{ active: matchWhole }' @click='matchWhole = !matchWhole') [ A ]
	.section
		h3 Replace with
		#replaceControl
			input(v-model='replaceText' id='replaceInput' @keydown='replaceInputKeyboard')
			.figma-icon-button.more(ref='replaceSettingsButton' @click='showReplaceSettings = !showReplaceSettings')
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
		button(@click='replace' :disabled='replaceDisabled') Replace
		button.primary(@click='replaceAll' :disabled='replaceDisabled' @keydown='replaceAllButtonKeyboard') Replace all
</template>

<script>
export default {
  watch: {
    findText(findString) {
      findString = findString.replace(/'/g, "’");
      self.currentText = "";
      findString !== ""
        ? this.find(findString)
        : App.sendMessage("clearSelection");
    },
    currentNode(node) {
      if (node && node.id !== undefined) {
        this.currentText = this.mode === "text" ? node.characters : node.name;
        figmaPlus.scene.panToNode(node);
        figmaPlus.scene.selection = [node];
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
    showReplaceSettings: false
  }),
  computed: {
    resultText: function() {
      var self = this;
      if (self.findText === "") return "";
      if (self.foundNodes.length === 0) return "0/0";
      else
        return (
          self.foundNodes.indexOf(self.currentNode) +
          1 +
          "/" +
          self.foundNodes.length
        );
    },
    disabled: function() {
      return this.foundNodes.length < 2 || this.findText === "";
    },
    replaceDisabled: function() {
      return this.foundNodes.length < 1 || this.findText === "";
    },
    newText: function() {
      var self = this;
      if (self.currentText === undefined) return "";
      else {
        if (!self.replaceWholeLayerName) {
          var newStringValue = self.currentText.replace(
            new RegExp(self.findText, "gi"),
            function(eachMatch) {
              return intelligentReplace(
                eachMatch,
                self.replaceText,
                self.keepCase
              );
            }
          );
          newStringValue = newStringValue.replace(/\n/g, " ");
          return newStringValue;
        } else
          return intelligentReplace(
            self.currentText,
            self.replaceText,
            self.keepCase
          );
      }
    },
    foundText: function() {
      if (this.findText === "" || this.currentText === undefined) return "";
      else return this.currentText;
    },
    previewText: function() {
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
  mounted() {
    this.$refs.findInput.focus();
    window.figmaPlus.addTooltip(
      this.$refs.startButton,
      "Beginning of text",
      false
    );
    window.figmaPlus.addTooltip(
      this.$refs.anywhereButton,
      "Anywhere in text",
      false
    );
    window.figmaPlus.addTooltip(this.$refs.endButton, "End of text", false);
    window.figmaPlus.addTooltip(this.$refs.exactButton, "Exact match", false);
    window.figmaPlus.addTooltip(this.$refs.caseButton, "Match case", false);
    window.figmaPlus.addTooltip(
      this.$refs.wholeButton,
      "Whole words only",
      false
    );
  },
  methods: {
    hide() {
      figmaPlus.hideUI("Find and Replace");
    },
    find(findText) {
      var self = this;
      self.foundNodes = [];
      let currentPageNodes = figmaPlus.scene.currentPage
        .getAllDescendents()
        .reverse();
      var global = self.caseSensitive ? "g" : "gi";
      findText = (findText + "").trim();
      if (this.mode === "text")
        currentPageNodes = currentPageNodes.filter(
          node => node.type === "TEXT"
        );
      currentPageNodes.forEach(node => {
        var textToFind = self.mode === "text" ? node.characters : node.name;
        switch (self.matchWhere) {
          case "anywhere":
            if (self.matchWhole) {
              if (
                textToFind.split(" ").some(word => {
                  if (self.caseSensitive) return word === findText;
                  else return word.toLowerCase() === findText.toLowerCase();
                })
              )
                self.foundNodes.push(node);
            } else {
              if (self.caseSensitive) {
                if (textToFind.includes(findText)) self.foundNodes.push(node);
              } else {
                if (node.id === "2491:69")
                  console.log(textToFind.toLowerCase());
                if (node.id === "2491:69") console.log(findText.toLowerCase());
                if (textToFind.toLowerCase().includes(findText.toLowerCase()))
                  self.foundNodes.push(node);
              }
            }
            break;
          case "exact":
            if (self.caseSensitive) {
              if (textToFind === findText) self.foundNodes.push(node);
            } else {
              if (textToFind.toLowerCase() === findText.toLowerCase())
                self.foundNodes.push(node);
            }
            break;
          case "start":
            var regexStart = self.matchWhole
              ? new RegExp("^\\b" + findText + "\\b", global)
              : new RegExp("^" + findText, global);
            if (regexStart.test(textToFind)) self.foundNodes.push(node);
            break;
          case "end":
            var regexEnd = self.matchWhole
              ? new RegExp("\\b" + findText + "\\b$", global)
              : new RegExp(findText + "$", global);
            if (regexEnd.test(textToFind)) self.foundNodes.push(node);
        }
      });
      if (self.foundNodes.length > 0) {
        self.currentNode = self.foundNodes[0];
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
          figmaPlus.scene.selection = [];
        }
        document.querySelector("#replaceInput").focus();
      }, 500);
    },
    replaceAll() {
      var self = this;
      self.foundNodes.forEach(node => {
        var text = self.mode === "text" ? node.characters : node.name;
        var newStringValue;
        if (!self.replaceWholeLayerName) {
          newStringValue = text.replace(
            new RegExp(self.findText, "gi"),
            function(eachMatch) {
              return intelligentReplace(
                eachMatch,
                self.replaceText,
                self.keepCase
              );
            }
          );
          newStringValue = newStringValue.replace(/\n/g, " ");
        } else
          newStringValue = intelligentReplace(
            text,
            self.replaceText,
            self.keepCase
          );
        if (self.mode === "text") {
          node.characters = newStringValue;
          if (this.replaceLayerName) node.name = newStringValue;
        }
        if (self.mode === "layerName") {
          if (self.replaceWholeLayerName && self.replaceText === "")
            newStringValue = "";
          node.name = newStringValue;
        }
      });
      figmaPlus.scene.selection = [];
      self.foundNodes = [];
      self.currentNode = undefined;
      self.currentText = "";
      self.find(self.findText);
    }
  }
};

function intelligentReplace(replaceThis, replaceWith, keepCase) {
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
}
</script>

<style lang="scss">
.tab-content {
  .section {
    margin-bottom: 12px;
  }
  button {
    margin-left: 12px;
  }
}

#findControl,
#findSettings,
#replaceControl {
  display: flex;
}

#findSettings {
  margin-top: 6px;
  .active {
    background-color: #30c2ff !important;
  }
}

#findInput {
  padding-right: 84px;
}

#findInput,
#replaceInput {
  flex-grow: 1;
  margin-right: 6px;
}

#footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 24px;
}

#resultCount {
  color: #aaa;
  padding-top: 5px;
  position: absolute;
  right: 97px;
  font-weight: 300;
}

#previewText,
#foundText {
  color: #aaa;
  margin-top: 6px;
}

#wherePicker {
  display: flex;
  border-radius: 3px;
  margin-right: 8px;
  overflow: hidden;
  .figma-icon {
    background: #d4d4d4;
    color: #fff;
    width: 28px;
  }
}

#prevButton {
  position: absolute;
  right: 67px;
  border-radius: 0px;
  height: 22px;
  margin-top: 1px;
  border-left: 1px solid #d4d4d4;
  width: 22px;
  &:after {
    font-size: 13px;
    transform: translateY(-1px) rotate(180deg);
  }
}

#nextButton {
  position: absolute;
  right: 44.5px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  height: 22px;
  margin-top: 1px;
  width: 22px;
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

#findInput:focus ~ #prevButton {
  height: 20px;
  margin-top: 2px;
}

#findInput:focus ~ #nextButton {
  height: 20px;
  margin-top: 2px;
  right: 44px;
  width: 23px;
  min-width: 23px;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}

#caseButton {
  background: #d4d4d4;
  border-radius: 3px;
  position: relative;
  width: 34px;
  height: 24px;
  padding-left: 2px;
}

#wholeButton {
  background: #d4d4d4;
  border-radius: 3px;
  width: 28px;
  height: 19px;
  color: #fff;
  padding-top: 5px;
  padding-left: 8px;
  margin-left: 7px;
  font-size: 12px;
}

#replaceSettings {
  margin-top: 6px;
}

.disabled {
  color: #d4d4d4 !important;
}
</style>
