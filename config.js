const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbx7gQR0kDe4og_hTSI0nroUQ88uL6zNIYvV-0Fi9tVPgYd5tAWsDS9T-tZdRWZq1wlkOw/exec";

const EVENT = {
  id: "UFCVEGAS124",
  titleLine1: "UFC Vegas",
  titleLine2: "124",
  matchupLabel: "Cortes Acosta x Walker",
  venue: "Meta Apex, Las Vegas",
  dateLabel: "7 de novembro",
  lockTimestamp: "2026-11-07T22:00:00Z", // sábado 07/11, 19h de Brasília (início do preliminar)
  deadlineLabel: "sábado (07/11), 19:00 (horário de Brasília)",
  prizeAmount: "R$30",
  adminPinHash: "a4c42a3f5f7103ddb1042c34864a1bd8e7854308d80ab8b4bf41eb46ad62b3dc",
  // LISTA DE E-MAILS AUTORIZADOS: só quem digitar um desses e-mails na tela de entrada acessa o site.
  // Maiúscula/minúscula não importa. Lista vazia = acesso liberado para todos.
  allowedEmails: [
    "teste@email.com"
  ],
  fights: [
    { id:"f1",  title:false, weight:"Peso-Pesado (Main Event)", a:{name:"Waldo Cortes Acosta", rec:"17-4"},  b:{name:"Johnny Walker", rec:"23-10"} },
    { id:"f2",  title:false, weight:"Peso-Palha (F) (Co-Main)", a:{name:"Virna Jandiroba", rec:"23-4"},      b:{name:"Tatiana Suarez", rec:"12-1"} },
    { id:"f3",  title:false, weight:"Peso-Galo",                a:{name:"Davey Grant", rec:"16-8"},          b:{name:"Elijah Smith", rec:"10-1"} },
    { id:"f4",  title:false, weight:"Meio-Pesado",              a:{name:"Billy Elekana", rec:"10-2"},        b:{name:"Lucas Fernando", rec:"14-3"} },
    { id:"f5",  title:false, weight:"Peso-Galo (F)",            a:{name:"Priscila Cachoeira", rec:"13-9"},   b:{name:"Nina Milošević", rec:"9-1"} },
    { id:"f6",  title:false, weight:"Peso-Mosca",               a:{name:"Mitch Raposo", rec:"11-3"},         b:{name:"Marcos Degli", rec:"15-3"} },
    { id:"f7",  title:false, weight:"Peso-Pena",                a:{name:"Ollie Schmid", rec:"4-3"},          b:{name:"Keiichiro Nakamura", rec:"8-1"} },
    { id:"f8",  title:false, weight:"Peso-Pesado",              a:{name:"Thomas Petersen", rec:"11-5"},      b:{name:"Gabriel Lorenço", rec:"8-1"} },
    { id:"f9",  title:false, weight:"Peso-Mosca (F)",           a:{name:"Karine Silva", rec:"19-7"},         b:{name:"Gabriella Fernandes", rec:"11-4"} },
    { id:"f10", title:false, weight:"Peso-Pena",                a:{name:"José Delano", rec:"17-3"},          b:{name:"Murtazali Magomedov", rec:"11-0"} },
    { id:"f11", title:false, weight:"Peso-Pena",                a:{name:"Austin Bashi", rec:"14-2"},         b:{name:"Carlos Calderon", rec:"11-4"} },
    { id:"f12", title:false, weight:"Peso-Médio",               a:{name:"Andre Petroski", rec:"13-6"},       b:{name:"Mantas Kondratavičius", rec:"9-1"} },
    { id:"f13", title:false, weight:"Meio-Médio",               a:{name:"Seok Hyeon Ko", rec:"13-3"},        b:{name:"Wellington Turman", rec:"18-8"} },
    { id:"f14", title:false, weight:"Meio-Médio",               a:{name:"José Souza", rec:"9-1"},            b:{name:"Jonny Parsons", rec:"9-3"} }
  ]
};