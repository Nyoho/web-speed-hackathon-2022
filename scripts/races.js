import { v4 as uuid } from "uuid";

import { Race } from "../src/model/index.js";
import { createConnection } from "../src/server/typeorm/connection.js";

function date2string(d) {
  const y = d.getFullYear();
  const mm = ('0' + (d.getMonth() + 1)).slice(-2);
  const dd = ('0' + d.getDate()).slice(-2);
  return `${y}-${mm}-${dd}`
}

export async function insertRaces(startDate, endDate) {
  const connection = await createConnection();

  const NAMES = [
    "じゃんけんグランプリ2022",
    "じゃんけん初心者杯",
    "じゃんけんチャンピョンシップ",
    "才場雀拳賞",
    "東京優拳",
    "勝利へポン！カップ",
    "あいこで、しょ！杯",
    "サイバーエージェント記念カップ",
    "ミッドナイトじゃんけん",
    "さんすくみ杯",
    "RPSステークス",
    "みつどもえ杯",
    "アウステルリッツ記念",
    "さざえ杯",
    "グチョパカップ",
    "セイヨウオトギリカップ",
    "銀鮎賞",
    "琵琶湖特別",
    "菅平特別",
    "ニセコ杯",
    "志賀高原カップ",
    "斑尾杯",
    "白馬カップ",
    "苗場特別",
    "安比ステークス",
    "富良野ラベンダーカップ",
    "ヴェルホヤンスクカップ",
    "トリスタンダクーニャ杯",
    "ウシュアイア特別",
    "ニーオーレスンじゃんけんカップ",
    "ウトキアグヴィクカップ",
    "ケベフセヌエフ賞",
  ];

  const start = Date.parse(`${startDate}T00:30:00.000+09:00`);
  const end = Date.parse(`${endDate}T00:30:00.000+09:00`);
  const days = (end - start) / (60 * 60 * 24 * 1000);
  process.stdout.write(
    `Creating races from ${date2string(new Date(start))} to ${date2string(new Date(end))}...`,
  );

  const races = [];

  for (let i = 0; i <= days; i++) {
    for (let j = 0; j < 24; j++) {
      const startAt = start + i * (60*60*24 * 1000) + j * (60*60*1000); // ミリ秒単位の整数

      races.push(
        new Race({
          closeAt: new Date(startAt - 10 * 60 * 1000),
          id: uuid(),
          image: `/assets/images/races/${`${((i * 24 + j) % 20) + 1}`.padStart(
            3,
            "0",
          )}.webp`,
          name: NAMES[Math.floor(Math.random() * NAMES.length)],
          startAt: new Date(startAt),
        }),
      );
    }
  }

  await connection
    .createQueryBuilder()
    .insert()
    .into(Race)
    .values(races)
    .execute();

  console.log("Done.");
}
