const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbx7gQR0kDe4og_hTSI0nroUQ88uL6zNIYvV-0Fi9tVPgYd5tAWsDS9T-tZdRWZq1wlkOw/exec";

const EVENT = {
  id: "UFCDOHA",
  titleLine1: "UFC",
  titleLine2: "Doha",
  matchupLabel: "Procházka x Stirling",
  venue: "ABHA Arena, Doha",
  dateLabel: "21 de novembro",
  lockTimestamp: "2026-11-21T15:00:00Z", // sábado 21/11, 12h de Brasília (início do preliminar)
  deadlineLabel: "sábado (21/11), 12:00 (horário de Brasília)",
  prizeAmount: "R$30",
  adminPinHash: "a4c42a3f5f7103ddb1042c34864a1bd8e7854308d80ab8b4bf41eb46ad62b3dc",
  // LISTA DE E-MAILS AUTORIZADOS: só quem digitar um desses e-mails na tela de entrada acessa o site.
  // Maiúscula/minúscula não importa. Lista vazia = acesso liberado para todos.
  allowedEmails: [
    "teste@email.com"
  ],
  fights: [
    { id:"f1",  title:false, weight:"Meio-Pesado (Main Event)", a:{name:"Jiří Procházka", rec:"32-6-1"},     b:{name:"Navajo Stirling", rec:"11-0"} },
    { id:"f2",  title:false, weight:"Peso-Pena (Co-Main)",      a:{name:"Aljamain Sterling", rec:"26-5"},    b:{name:"Kevin Vallejos", rec:"18-1"} },
    { id:"f3",  title:false, weight:"Peso-Leve",                a:{name:"Dan Hooker", rec:"24-15"},          b:{name:"Brian Ortega", rec:"16-5"} },
    { id:"f4",  title:false, weight:"Peso-Mosca",               a:{name:"Kyoji Horiguchi", rec:"36-6"},      b:{name:"Asu Almabayev", rec:"24-3"} },
    { id:"f5",  title:false, weight:"Peso-Médio",               a:{name:"Ikram Aliskerov", rec:"18-2"},      b:{name:"Jared Cannonier", rec:"18-10"} },
    { id:"f6",  title:false, weight:"Peso-Galo",                a:{name:"Santiago Luna", rec:"8-1"},         b:{name:"Aleksandre Topuria", rec:"7-1"} },
    { id:"f7",  title:false, weight:"Peso-Pesado",              a:{name:"Shamil Gaziev", rec:"15-3"},        b:{name:"Tallison Teixeira", rec:"9-2"} },
    { id:"f8",  title:false, weight:"Peso-Mosca",               a:{name:"Amir Albazi", rec:"17-3"},          b:{name:"Alessandro Costa", rec:"17-5"} },
    { id:"f9",  title:false, weight:"Meio-Médio",               a:{name:"Jake Matthews", rec:"23-8"},        b:{name:"Tahir Abdullayev", rec:"22-3"} },
    { id:"f10", title:false, weight:"Peso-Leve",                a:{name:"Nikolas Motta", rec:"15-6"},        b:{name:"Dom Mar Fan", rec:"9-3"} },
    { id:"f11", title:false, weight:"Meio-Pesado",              a:{name:"Diyar Nurgozhay", rec:"12-2"},      b:{name:"Alik Lorenz", rec:"8-2"} }
  ]
};