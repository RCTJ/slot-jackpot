'use babel';

import SlotJackpotView from './slot-jackpot-view';
import { CompositeDisposable } from 'atom';

export default {

  slotJackpotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.slotJackpotView = new SlotJackpotView(state.slotJackpotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.slotJackpotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'slot-jackpot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.slotJackpotView.destroy();
  },

  serialize() {
    return {
      slotJackpotViewState: this.slotJackpotView.serialize()
    };
  },

  toggle() {
    console.log('SlotJackpot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
