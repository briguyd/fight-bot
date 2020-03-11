import { OnReactAdd, OnReactRemove } from "./discord-event-handlers";
import { MessageReaction, User } from "discord.js";

import { FightBotModule } from "./fight-bot-module";

@FightBotModule.register
export class PinMessage implements OnReactAdd, OnReactRemove {
  private PIN_EMOJI = "📌";

  onReactRemove(messageReaction: MessageReaction, user: User): void {
    if (messageReaction.emoji.name === this.PIN_EMOJI) {
      let shouldUnpin = true;
      if (messageReaction.message.reactions) {
        for (let [, reaction] of messageReaction.message.reactions.cache) {
          if (reaction.emoji.name === this.PIN_EMOJI) {
            shouldUnpin = false;
            break;
          }
        }
      }
      if (shouldUnpin) {
        messageReaction.message.unpin();
      }
    }
  }
  onReactAdd(messageReaction: MessageReaction, user: User): void {
    if (messageReaction.emoji.name === this.PIN_EMOJI) {
      messageReaction.message.pin();
    }
  }
}
