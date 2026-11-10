const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbx7gQR0kDe4og_hTSI0nroUQ88uL6zNIYvV-0Fi9tVPgYd5tAWsDS9T-tZdRWZq1wlkOw/exec";

const EVENT = {
  id: "UFC334",
  titleLine1: "UFC",
  titleLine2: "334",
  matchupLabel: "Gane x Hokit",
  venue: "Madison Square Garden, Nova York",
  dateLabel: "14 de novembro",
  lockTimestamp: "2026-11-14T22:00:00Z", // sábado 14/11, 19h de Brasília (início dos early prelims)
  deadlineLabel: "sábado (14/11), 19:00 (horário de Brasília)",
  prizeAmount: "R$30",
  adminPinHash: "a4c42a3f5f7103ddb1042c34864a1bd8e7854308d80ab8b4bf41eb46ad62b3dc",
  // LISTA DE E-MAILS AUTORIZADOS: só quem digitar um desses e-mails na tela de entrada acessa o site.
  // Maiúscula/minúscula não importa. Lista vazia = acesso liberado para todos.
  allowedEmails: [
    "teste@email.com"
  ],
  fights: [
    { id:"f1",  title:true,  weight:"Peso-Pesado (Título)",    a:{name:"Ciryl Gane", rec:"14-2"},          b:{name:"Josh Hokit", rec:"10-0"} },
    { id:"f2",  title:true,  weight:"Peso-Galo (F) (Título)",  a:{name:"Kayla Harrison", rec:"19-1"},      b:{name:"Amanda Nunes", rec:"23-5"} },
    { id:"f3",  title:false, weight:"Peso-Médio",              a:{name:"Caio Borralho", rec:"18-2"},       b:{name:"Yousri Belgaroui", rec:"11-3"} },
    { id:"f4",  title:false, weight:"Meio-Médio",              a:{name:"Uros Medic", rec:"14-3"},          b:{name:"Kevin Holland", rec:"29-15"} },
    { id:"f5",  title:false, weight:"Peso-Mosca",              a:{name:"Luis Gurule", rec:"11-4"},         b:{name:"Bilal Hasan", rec:"10-0"} },
    { id:"f6",  title:false, weight:"Meio-Médio",              a:{name:"Stephen Thompson", rec:"17-9-1"},  b:{name:"Charles Radtke", rec:"12-5"} },
    { id:"f7",  title:false, weight:"Peso-Leve",               a:{name:"Drew Dober", rec:"29-15"},         b:{name:"Chris Duncan", rec:"15-3"} },
    { id:"f8",  title:false, weight:"Peso-Leve",               a:{name:"Jim Miller", rec:"39-19"},         b:{name:"Terrance McKinney", rec:"18-9"} },
    { id:"f9",  title:false, weight:"Peso-Médio",              a:{name:"Donte Johnson", rec:"9-0"},        b:{name:"César Almeida", rec:"7-3"} },
    { id:"f10", title:false, weight:"Peso-Leve",               a:{name:"Melquizael Costa", rec:"26-8"},    b:{name:"Jared Gordon", rec:"21-9"} },
    { id:"f11", title:false, weight:"Peso-Galo (F)",           a:{name:"Macy Chiasson", rec:"10-6"},       b:{name:"Bia Mesquita", rec:"8-0"} },
    { id:"f12", title:false, weight:"Peso-Galo",               a:{name:"Alatengheili", rec:"18-10-2"},     b:{name:"Juan Díaz", rec:"16-1-1"} },
    { id:"f13", title:false, weight:"Peso-Leve",               a:{name:"Evan Elder", rec:"10-2"},          b:{name:"Samuel Sanches", rec:"11-1"} }
  ]
};