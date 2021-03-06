import { OnMessage } from "./discord-event-handlers";
import { Message } from "discord.js";
import * as logger from "winston";
import { FightBotModule } from "./fight-bot-module";

@FightBotModule.register
export class Roll implements OnMessage {
  public onMessageCommands = ["roll"];
  async onMessage(msg: Message, args: string[]): Promise<boolean> {
    if (args) {
      const diceRegex = /(?:(\d+)\s*X\s*)?(\d*)D(\d*)((?:[+\/*-]\d+)|(?:[+-][LH]))?/i;

      // roll count
      // dice count
      // sides
      // modifier
      if (diceRegex.test(args.join(" "))) {
        const result = diceRegex.exec(args.join(" "));
        if (result) {
          if (result[3]) {
            let total = 0;
            let diceCount = 1;
            if (result[2]) {
              diceCount = +result[2];
            }
            for (let i = 0; i < +diceCount; i++) {
              total += this.rollDice(+result[3]);
            }
            msg.reply("You rolled " + total);
            return true;
          }
        }
      }
    }

    msg.reply("Invalid dice format");
    return false;
  }

  rollDice(max: number) {
    return 1 + Math.floor(Math.random() * max);
  }
}
